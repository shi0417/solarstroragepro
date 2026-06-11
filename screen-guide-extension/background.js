// ============================================================
// background.js — Service worker
// Strategy: CAPTURE FIRST, then open popup
// When user clicks icon → screenshot active tab IMMEDIATELY
// → then open popup with screenshot ready
// ============================================================

let popupWindowId = null;
let pendingScreenshot = null; // { dataUrl, timestamp, url }
let lastUserUrl = '';

// ── Track user's real URL ──
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url && tab.active && !tab.url.startsWith('chrome://')) {
    lastUserUrl = tab.url;
  }
});

// ── Open popup window ──
async function openPopupWindow() {
  // If window already exists, focus it
  if (popupWindowId !== null) {
    try {
      await chrome.windows.get(popupWindowId);
      await chrome.windows.update(popupWindowId, { focused: true });
      return;
    } catch {
      popupWindowId = null;
    }
  }

  let displayWidth = 1920;
  try {
    const displays = await chrome.system?.display?.getInfo();
    if (displays && displays[0]) {
      displayWidth = displays[0].workArea.width || displays[0].bounds.width;
    }
  } catch { /* fallback */ }

  try {
    const win = await chrome.windows.create({
      url: chrome.runtime.getURL("popup.html"),
      type: "popup",
      width: 480,
      height: 720,
      left: Math.max(0, displayWidth - 520),
      top: 60
    });
    popupWindowId = win.id;
  } catch (err) {
    try {
      const win = await chrome.windows.create({
        url: chrome.runtime.getURL("popup.html"),
        type: "popup",
        width: 480,
        height: 720
      });
      popupWindowId = win.id;
    } catch (err2) {
      console.error('[ScreenGuide] Failed to create window:', err2);
    }
  }
}

// ── MAIN: Icon clicked → Capture first, then open popup ──
chrome.action.onClicked.addListener(async () => {
  console.log('[ScreenGuide] Icon clicked — capturing screen first...');

  pendingScreenshot = null;

  // Get the currently active tab (the REAL page user is viewing)
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tabs || !tabs[0]) {
    openPopupWindow();
    return;
  }

  const targetTab = tabs[0];
  lastUserUrl = targetTab.url || '';

  // Skip if user is on chrome:// pages
  if (targetTab.url.startsWith('chrome://') || targetTab.url.startsWith('chrome-extension://')) {
    openPopupWindow();
    return;
  }

  // Get the window ID of the REAL browser window (not any popup)
  const targetWindowId = targetTab.windowId;

  // CAPTURE THE REAL PAGE NOW — before opening any new windows
  let dataUrl = null;
  try {
    dataUrl = await new Promise((resolve) => {
      chrome.tabs.captureVisibleTab(targetWindowId, { format: "png", quality: 100 }, (url) => {
        if (chrome.runtime.lastError) {
          console.error('[ScreenGuide] capture error:', chrome.runtime.lastError.message);
          resolve(null);
        } else {
          resolve(url);
        }
      });
    });
  } catch (e) {
    console.error('[ScreenGuide] capture exception:', e);
  }

  if (dataUrl) {
    pendingScreenshot = {
      dataUrl,
      timestamp: Date.now(),
      url: targetTab.url,
      title: targetTab.title || '',
      windowId: targetWindowId,
      tabId: targetTab.id
    };
    console.log('[ScreenGuide] Captured successfully, now opening popup');
  } else {
    console.log('[ScreenGuide] Capture failed, opening popup without screenshot');
  }

  // NOW open popup (screenshot is ready)
  openPopupWindow();
});

chrome.windows.onRemoved.addListener((windowId) => {
  if (windowId === popupWindowId) popupWindowId = null;
});

// ── Message router ──
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  switch (msg.type) {
    // Get the pre-captured screenshot (taken on icon click)
    case "GET_SCREENSHOT":
      if (pendingScreenshot && pendingScreenshot.dataUrl) {
        sendResponse({ success: true, ...pendingScreenshot });
      } else {
        sendResponse({ success: false, error: '没有可用的截图，请关闭窗口后重新点击扩展图标' });
      }
      return true;

    // Re-capture the original page (user wants fresh screenshot)
    case "CAPTURE_FRESH":
      captureFresh(sendResponse);
      return true;

    // AI analysis of screenshot
    case "ANALYZE_SCREENSHOT":
      analyzeWithAI(msg.dataUrl, msg.userGoal, msg.apiKey, msg.apiEndpoint, msg.model, sendResponse);
      return true;

    // Forward drawing & guide commands to the ORIGINAL tab (not popup)
    case "START_GUIDE":
    case "STOP_GUIDE":
    case "NEXT_STEP":
    case "PREV_STEP":
    case "SHOW_STEP":
    case "DRAW_CIRCLE":
    case "DRAW_ARROW":
    case "DRAW_SPOTLIGHT":
    case "DRAW_HIGHLIGHT":
    case "CLEAR_ANNOTATIONS":
    case "SPOTLIGHT_MODE":
    case "HIGHLIGHT_MODE":
    case "CIRCLE_MODE":
    case "ARROW_MODE":
    case "HIGHLIGHT_ELEMENT": {
      // Always send to the original user tab (where pendingScreenshot was taken)
      const targetId = pendingScreenshot ? pendingScreenshot.tabId : null;
      if (targetId) {
        chrome.tabs.sendMessage(targetId, msg, (res) => {
          sendResponse(res || { success: true });
        });
      } else {
        // Fallback: try current active tab
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          if (tabs[0] && !tabs[0].url.startsWith('chrome-extension://')) {
            chrome.tabs.sendMessage(tabs[0].id, msg, (res) => {
              sendResponse(res || { success: true });
            });
          } else {
            sendResponse({ success: false, error: '找不到目标页面' });
          }
        });
      }
      return true;
    }

    case "GET_CURRENT_URL":
      sendResponse({ url: lastUserUrl || (pendingScreenshot ? pendingScreenshot.url : '') });
      return true;

    case "OPEN_POPUP_WINDOW":
      openPopupWindow();
      sendResponse({ success: true });
      return true;

    case "SAVE_SETTINGS":
      chrome.storage.local.set(msg.settings, () => {
        sendResponse({ success: true });
      });
      return true;

    case "GET_SETTINGS":
      chrome.storage.local.get(['apiKey', 'apiEndpoint', 'model'], (result) => {
        sendResponse(result);
      });
      return true;
  }
});

// ── Fresh capture of the original page ──
function captureFresh(sendResponse) {
  if (!pendingScreenshot || !pendingScreenshot.tabId) {
    // Try to find the original tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const target = tabs.find(t => !t.url.startsWith('chrome-extension://'));
      if (target) {
        doCapture(target.windowId, target.id, target.url, sendResponse);
      } else {
        sendResponse({ success: false, error: '找不到要截图的页面' });
      }
    });
    return;
  }

  // Check if the original tab still exists
  chrome.tabs.get(pendingScreenshot.tabId, (tab) => {
    if (chrome.runtime.lastError || !tab) {
      sendResponse({ success: false, error: '原始标签页已关闭' });
      return;
    }
    doCapture(tab.windowId, tab.id, tab.url, sendResponse);
  });
}

function doCapture(windowId, tabId, tabUrl, sendResponse) {
  chrome.tabs.captureVisibleTab(windowId, { format: "png", quality: 100 }, (dataUrl) => {
    if (chrome.runtime.lastError) {
      sendResponse({ success: false, error: chrome.runtime.lastError.message });
    } else {
      // Update pending screenshot
      pendingScreenshot = {
        dataUrl,
        timestamp: Date.now(),
        url: tabUrl,
        windowId,
        tabId
      };
      sendResponse({ success: true, dataUrl, url: tabUrl });
    }
  });
}

// ── AI Analysis via OpenAI-compatible Vision API ──
async function analyzeWithAI(dataUrl, userGoal, apiKey, apiEndpoint, model, sendResponse) {
  if (!apiKey) {
    sendResponse({ success: false, error: '请先设置 API Key（点击右上角「设置」按钮）' });
    return;
  }

  const endpoint = apiEndpoint || 'https://api.openai.com/v1/chat/completions';
  const modelName = model || 'gpt-4o-mini';
  const base64Image = dataUrl.split(',')[1];

  const systemPrompt = `你是一位精通 Facebook 广告、Meta Business Manager、Google Ads 等广告平台的专家助手。

用户会给你一张网页截图，并告诉你他想做什么。请：
1. 先描述当前页面显示的内容和状态（你在哪个页面、看到了什么选项/按钮）
2. 判断用户当前在哪个步骤
3. 给出下一步具体该做什么（点击哪个按钮、填写什么内容、选择哪个选项）
4. 如果需要点击按钮，尽量描述按钮的文字、颜色、位置（如"页面上方蓝色的『继续』按钮"、"右侧的『创建广告』绿色按钮"）
5. 如果当前页面不对，告诉用户应该先去哪里
6. 用中文回复，简洁明了，分步骤说明

注意：截图可能包含中文界面。请仔细看图后给出精准指导。`;

  const promptText = userGoal || '请分析当前页面，告诉我下一步该做什么';

  try {
    const resp = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: modelName,
        messages: [
          { role: 'system', content: systemPrompt },
          {
            role: 'user',
            content: [
              { type: 'text', text: promptText },
              {
                type: 'image_url',
                image_url: {
                  url: `data:image/png;base64,${base64Image}`,
                  detail: 'high'
                }
              }
            ]
          }
        ],
        max_tokens: 2000
      })
    });

    if (!resp.ok) {
      const errText = await resp.text();
      sendResponse({ success: false, error: `API 错误 (${resp.status}): ${errText.slice(0, 200)}` });
      return;
    }

    const data = await resp.json();
    const content = data.choices?.[0]?.message?.content || 'AI 没有返回有效内容';
    sendResponse({ success: true, analysis: content });

  } catch (err) {
    sendResponse({ success: false, error: '请求失败: ' + err.message });
  }
}

// ── Auto URL detection banner ──
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.url && !tab.url.startsWith('chrome://')) {
    detectAndNotify(tabId, tab.url);
  }
});

function detectAndNotify(tabId, url) {
  const guides = [
    { match: /facebook\.com.*ads/, text: '在 Facebook Ads 页面？打开 ScreenGuide 截图获取 AI 指导！' },
    { match: /business\.facebook\.com.*pixel/, text: '在 Meta Pixel 页面？打开 ScreenGuide 获取安装指导！' },
    { match: /facebook\.com.*ad.*account|settings/, text: '在 Facebook 广告设置？打开 ScreenGuide 获取操作指导！' }
  ];
  const matched = guides.find(g => g.match.test(url));
  if (matched) {
    chrome.tabs.sendMessage(tabId, {
      type: "SHOW_URL_BANNER",
      title: "ScreenGuide",
      text: matched.text
    }).catch(() => {});
  }
}
