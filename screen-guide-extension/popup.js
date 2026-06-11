// ============================================================
// popup.js — AI screenshot analysis (auto-loads pre-captured screenshot)
// Background captures screenshot BEFORE opening popup → we load it on startup
// ============================================================

const guides = window.SCREENGUIDE_GUIDES || [];
let currentGuide = null;
let currentStep = 0;
let currentShot = null;
let currentAnalysis = null;
let settings = { apiKey: '', apiEndpoint: '', model: 'gpt-4o-mini' };

// ── Load settings & pre-captured screenshot on startup ──
chrome.runtime.sendMessage({ type: "GET_SETTINGS" }, (res) => {
  if (res) {
    settings.apiKey = res.apiKey || '';
    settings.apiEndpoint = res.apiEndpoint || '';
    settings.model = res.model || 'gpt-4o-mini';
    document.getElementById('setting-api-key').value = settings.apiKey;
    document.getElementById('setting-endpoint').value = settings.apiEndpoint;
    document.getElementById('setting-model').value = settings.model;
    updateApiStatus();
  }
});

// Auto-load the screenshot that was captured before popup opened
chrome.runtime.sendMessage({ type: "GET_SCREENSHOT" }, (res) => {
  if (res && res.success && res.dataUrl) {
    currentShot = res.dataUrl;
    showScreenshot(res.dataUrl);
    setAiStatus(`✅ 已自动加载页面截图\n📍 ${(res.title || res.url || '').slice(0, 60)}`, 'success');
  } else {
    setAiStatus('点击「重新截取」获取最新页面截图', 'waiting');
  }
});

function updateApiStatus() {
  const el = document.getElementById('api-status');
  if (settings.apiKey && settings.apiKey.startsWith('sk-')) {
    el.textContent = '✅ API Key 已配置，可以使用 AI 分析';
    el.className = 'api-status ok';
  } else {
    el.textContent = '⚠️ 请填写 API Key 以启用 AI 分析（点击右上角「设置」）';
    el.className = 'api-status warn';
  }
}

// ── Settings ──
document.getElementById('btn-settings').addEventListener('click', () => {
  document.getElementById('settings-panel').classList.toggle('active');
});

document.getElementById('btn-save-settings').addEventListener('click', () => {
  settings.apiKey = document.getElementById('setting-api-key').value.trim();
  settings.apiEndpoint = document.getElementById('setting-endpoint').value.trim();
  settings.model = document.getElementById('setting-model').value;

  chrome.runtime.sendMessage({
    type: "SAVE_SETTINGS",
    settings: { apiKey: settings.apiKey, apiEndpoint: settings.apiEndpoint, model: settings.model }
  }, () => {
    updateApiStatus();
    const btn = document.getElementById('btn-save-settings');
    const orig = btn.textContent;
    btn.textContent = '✅ 已保存';
    setTimeout(() => btn.textContent = orig, 1500);
  });
});

// ── Tabs ──
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('panel-' + btn.dataset.tab).classList.add('active');
  });
});

// ═════════════════════════════════════════════════════
// Panel 1: AI Screenshot Analysis
// ═════════════════════════════════════════════════════

const captureArea = document.getElementById('capture-area');
const capturePlaceholder = document.getElementById('capture-placeholder');
const btnCapture = document.getElementById('btn-capture');
const btnCopy = document.getElementById('btn-copy');
const btnDownload = document.getElementById('btn-download');
const btnClear = document.getElementById('btn-clear');
const btnAnalyze = document.getElementById('btn-analyze');
const aiStatus = document.getElementById('ai-status');
const analysisBox = document.getElementById('analysis-box');
const analysisContent = document.getElementById('analysis-content');
const btnAnnotatePage = document.getElementById('btn-annotate-page');
const goalInput = document.getElementById('goal-input');

function setAiStatus(text, type) {
  aiStatus.textContent = text;
  aiStatus.className = 'status-box status-' + (type || 'waiting');
}

function showScreenshot(dataUrl) {
  captureArea.innerHTML = `<img src="${dataUrl}" alt="screenshot" />`;
  captureArea.classList.add('has-image');
  btnCopy.disabled = false;
  btnDownload.disabled = false;
  btnClear.disabled = false;
  btnAnalyze.classList.add('visible');
}

function clearPreview() {
  currentShot = null;
  currentAnalysis = null;
  captureArea.innerHTML = '';
  captureArea.appendChild(capturePlaceholder);
  captureArea.classList.remove('has-image');
  btnCopy.disabled = true;
  btnDownload.disabled = true;
  btnClear.disabled = true;
  btnAnalyze.classList.remove('visible');
  analysisBox.classList.remove('visible');
  btnAnnotatePage.classList.remove('visible');
  setAiStatus('点击「重新截取」获取最新页面截图', 'waiting');
}

// Capture / Re-capture button
btnCapture.addEventListener('click', () => {
  setAiStatus('正在重新截取页面...请保持页面可见', 'waiting');
  btnCapture.disabled = true;
  document.getElementById('capture-text').textContent = '截取中...';

  chrome.runtime.sendMessage({ type: "CAPTURE_FRESH" }, (res) => {
    btnCapture.disabled = false;
    document.getElementById('capture-text').textContent = '\u{1F4F7} 重新截取页面';

    if (res && res.success && res.dataUrl) {
      currentShot = res.dataUrl;
      showScreenshot(res.dataUrl);
      setAiStatus('✅ 截图成功！点击「AI 分析」获取指导', 'success');
    } else {
      setAiStatus('❌ ' + (res?.error || '截图失败，请确保你在一个普通网页上'), 'error');
    }
  });
});

// AI Analyze
btnAnalyze.addEventListener('click', () => {
  if (!currentShot) {
    setAiStatus('⚠️ 请先点击「重新截取」获取截图', 'error');
    return;
  }
  if (!settings.apiKey) {
    setAiStatus('⚠️ 请先点击右上角「设置」填写 API Key', 'error');
    document.getElementById('settings-panel').classList.add('active');
    return;
  }

  const userGoal = goalInput.value.trim() || '请分析当前页面，告诉我下一步该做什么';

  setAiStatus('🤖 AI 正在分析截图...请稍候（约 5-15 秒）', 'info');
  btnAnalyze.disabled = true;
  document.getElementById('analyze-spinner').style.display = 'inline-block';
  document.getElementById('analyze-text').textContent = 'AI 分析中...';

  chrome.runtime.sendMessage({
    type: "ANALYZE_SCREENSHOT",
    dataUrl: currentShot,
    userGoal: userGoal,
    apiKey: settings.apiKey,
    apiEndpoint: settings.apiEndpoint,
    model: settings.model
  }, (res) => {
    btnAnalyze.disabled = false;
    document.getElementById('analyze-spinner').style.display = 'none';
    document.getElementById('analyze-text').textContent = '\u{1F916} AI 分析截图并给出指导';

    if (res && res.success) {
      currentAnalysis = res.analysis;
      analysisContent.innerHTML = simpleMarkdownToHtml(res.analysis);
      analysisBox.classList.add('visible');
      btnAnnotatePage.classList.add('visible');
      setAiStatus('✅ AI 分析完成！下方查看详细指导', 'success');
    } else {
      setAiStatus('❌ AI 分析失败: ' + (res?.error || '未知错误'), 'error');
    }
  });
});

// Simple markdown → HTML
function simpleMarkdownToHtml(md) {
  if (!md) return '';
  let html = md
    .replace(/^(#{1,3})\s+(.*$)/gim, '<h3>$2</h3>')
    .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/gim, '<em>$1</em>')
    .replace(/`([^`]+)`/gim, '<code>$1</code>');

  // List items
  const lines = html.split('\n').filter(l => l.trim());
  const processed = [];
  let inList = false;

  for (const line of lines) {
    const trimmed = line.trim();
    const isLi = /^\d+\.|^[-•]\s/.test(trimmed);

    if (isLi && !inList) {
      processed.push('<ul>');
      inList = true;
    } else if (!isLi && inList) {
      processed.push('</ul>');
      inList = false;
    }

    if (isLi) {
      const text = trimmed.replace(/^\d+\.\s*|^[-•]\s*/, '');
      processed.push('<li>' + text + '</li>');
    } else if (trimmed.startsWith('<h')) {
      processed.push(trimmed);
    } else {
      processed.push('<p>' + trimmed + '</p>');
    }
  }
  if (inList) processed.push('</ul>');

  return processed.join('');
}

// Copy / Download / Clear
btnCopy.addEventListener('click', () => {
  if (!currentShot) return;
  fetch(currentShot)
    .then(r => r.blob())
    .then(blob => {
      const item = new ClipboardItem({ 'image/png': blob });
      return navigator.clipboard.write([item]);
    })
    .then(() => setAiStatus('✅ 图片已复制到剪贴板', 'success'))
    .catch(err => setAiStatus('❌ 复制失败: ' + err.message, 'error'));
});

btnDownload.addEventListener('click', () => {
  if (!currentShot) return;
  const a = document.createElement('a');
  a.href = currentShot;
  a.download = 'screenshot_' + new Date().toISOString().slice(0, 19).replace(/[:T]/g, '-') + '.png';
  a.click();
  setAiStatus('✅ 图片已下载', 'success');
});

btnClear.addEventListener('click', clearPreview);

// Annotate on page
btnAnnotatePage.addEventListener('click', () => {
  if (!currentAnalysis) return;
  chrome.runtime.sendMessage({ type: "HIGHLIGHT_ELEMENT", analysis: currentAnalysis }, (res) => {
    if (res && res.success) {
      setAiStatus(`✅ 已在网页上标注 ${res.count || 0} 个重点位置`, 'success');
    } else {
      setAiStatus('⚠️ 自动标注未完成，请根据 AI 指导手动操作', 'waiting');
    }
  });
});

// ═════════════════════════════════════════════════════
// Panel 2: Step-by-step Guides
// ═════════════════════════════════════════════════════

function loadGuideList() {
  const list = document.getElementById('guide-list');
  list.innerHTML = '';
  if (guides.length === 0) {
    list.innerHTML = '<p class="small-note">暂无预置指南，使用「AI 截图分析」获取智能指导</p>';
    return;
  }
  guides.forEach((g, i) => {
    const card = document.createElement('div');
    card.className = 'guide-card';
    card.innerHTML = `
      <div class="num">${i + 1}</div>
      <div class="info" style="flex:1;">
        <h3>${g.title}</h3>
        <p>${g.desc}</p>
      </div>
    `;
    card.addEventListener('click', () => startGuide(i));
    list.appendChild(card);
  });
}
loadGuideList();

chrome.runtime.sendMessage({ type: "GET_CURRENT_URL" }, (res) => {
  if (res && res.url) highlightMatchingGuides(res.url);
});

function highlightMatchingGuides(url) {
  const cards = document.querySelectorAll('.guide-card');
  cards.forEach((card, i) => {
    const g = guides[i];
    if (g && g.urlPattern && g.urlPattern.test(url)) {
      card.style.borderColor = '#4f46e5';
      card.style.background = '#eef2ff';
      if (!card.querySelector('.auto-badge')) {
        const badge = document.createElement('span');
        badge.className = 'auto-badge';
        badge.textContent = '\u{1F3AF} 当前页面';
        badge.style.cssText = 'margin-left:auto;font-size:10px;background:#4f46e5;color:white;padding:2px 8px;border-radius:10px;white-space:nowrap;';
        card.appendChild(badge);
      }
    }
  });
}

function startGuide(index) {
  currentGuide = guides[index];
  currentStep = 0;
  document.getElementById('guide-list').style.display = 'none';
  document.getElementById('guide-active').style.display = 'block';
  document.getElementById('active-title').textContent = currentGuide.title;
  chrome.runtime.sendMessage({ type: "START_GUIDE", guideId: currentGuide.id });
  setTimeout(() => updateStep(), 200);
}

function updateStep() {
  if (!currentGuide) return;
  const s = currentGuide.steps[currentStep];
  document.getElementById('active-step').textContent = s.text;
  document.getElementById('step-counter').textContent = `Step ${currentStep + 1} / ${currentGuide.steps.length}`;
  document.getElementById('btn-prev').disabled = currentStep === 0;
  document.getElementById('btn-next').disabled = currentStep === currentGuide.steps.length - 1;
  chrome.runtime.sendMessage({
    type: "SHOW_STEP",
    stepText: s.text,
    find: s.find || {},
    stepNumber: currentStep + 1,
    totalSteps: currentGuide.steps.length
  });
}

document.getElementById('btn-next').addEventListener('click', () => {
  if (currentGuide && currentStep < currentGuide.steps.length - 1) { currentStep++; updateStep(); }
});
document.getElementById('btn-prev').addEventListener('click', () => {
  if (currentGuide && currentStep > 0) { currentStep--; updateStep(); }
});
document.getElementById('btn-stop').addEventListener('click', () => {
  currentGuide = null;
  currentStep = 0;
  document.getElementById('guide-active').style.display = 'none';
  document.getElementById('guide-list').style.display = 'block';
  chrome.runtime.sendMessage({ type: "STOP_GUIDE" });
});

// ═════════════════════════════════════════════════════
// Panel 3: Annotation Tools
// ═════════════════════════════════════════════════════

document.getElementById('btn-spotlight').addEventListener('click', () => {
  chrome.runtime.sendMessage({ type: "SPOTLIGHT_MODE" });
  document.getElementById('anno-status').textContent = '聚光灯模式：在网页上点击要聚焦的位置';
});
document.getElementById('btn-highlight').addEventListener('click', () => {
  chrome.runtime.sendMessage({ type: "HIGHLIGHT_MODE" });
  document.getElementById('anno-status').textContent = '高亮模式：在网页上点击要高亮的位置';
});
document.getElementById('btn-circle').addEventListener('click', () => {
  chrome.runtime.sendMessage({ type: "CIRCLE_MODE" });
  document.getElementById('anno-status').textContent = '画圈模式：在网页上点击画红圈';
});
document.getElementById('btn-arrow').addEventListener('click', () => {
  chrome.runtime.sendMessage({ type: "ARROW_MODE" });
  document.getElementById('anno-status').textContent = '箭头模式：在网页上点击画箭头';
});
document.getElementById('btn-clear-anno').addEventListener('click', () => {
  chrome.runtime.sendMessage({ type: "CLEAR_ANNOTATIONS" });
  document.getElementById('anno-status').textContent = '所有标注已清除';
});
