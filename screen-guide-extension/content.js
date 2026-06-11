// ============================================================
// content.js — Smart page annotation engine
// Finds elements by text/content, then draws annotations at their REAL positions
// ============================================================

(function() {
  'use strict';

  if (window.__screenguide_loaded) return;
  window.__screenguide_loaded = true;

  const NS = 'http://www.w3.org/2000/svg';
  let overlayEl = null;
  let annoId = 0;
  let guideActive = false;
  let currentTool = null;
  let stepTipEl = null;

  // ── Overlay SVG ────────────────────────────────────
  function getOverlay() {
    if (overlayEl) return overlayEl;
    overlayEl = document.createElementNS(NS, 'svg');
    overlayEl.id = 'sg-overlay';
    overlayEl.style.cssText = `
      position: fixed; top: 0; left: 0;
      width: 100vw; height: 100vh;
      pointer-events: none;
      z-index: 2147483646;
      overflow: visible;
    `;
    document.body.appendChild(overlayEl);
    return overlayEl;
  }

  // ── Smart Element Finder ───────────────────────────
  function findElement(spec) {
    const { text, tag } = spec || {};
    if (!text || !text.length) return null;

    // Collect candidate elements
    const tags = tag || ['button', 'div', 'span', 'a', 'label', 'input', 'h1', 'h2', 'h3', 'h4'];
    const candidates = [];

    // Walk the DOM looking for text matches
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT, {
      acceptNode: (node) => {
        const tagName = node.tagName.toLowerCase();
        if (node.closest('#sg-overlay, #sg-step-tip, #sg-url-banner, #sg-toast')) {
          return NodeFilter.FILTER_REJECT;
        }
        // Check if tag matches (if specified)
        if (tag && tag.length > 0 && !tag.includes(tagName)) {
          return NodeFilter.FILTER_SKIP;
        }
        return NodeFilter.FILTER_ACCEPT;
      }
    });

    while (walker.nextNode()) {
      const el = walker.currentNode;
      const rect = el.getBoundingClientRect();
      if (rect.width < 5 || rect.height < 5) continue;
      if (rect.top < -10 || rect.left < -10) continue;

      // Extract searchable text from the element
      let elText = '';
      if (el.innerText) elText += ' ' + el.innerText.trim();
      if (el.getAttribute('aria-label')) elText += ' ' + el.getAttribute('aria-label');
      if (el.getAttribute('title')) elText += ' ' + el.getAttribute('title');
      if (el.getAttribute('placeholder')) elText += ' ' + el.getAttribute('placeholder');
      if (el.value) elText += ' ' + el.value;
      elText = elText.toLowerCase();

      // Score each keyword match
      let score = 0;
      let matched = false;
      for (const keyword of text) {
        const kw = keyword.toLowerCase().trim();
        if (!kw) continue;
        // Exact match gets highest score
        if (elText === kw) { score += 100; matched = true; }
        // Starts with gets high score
        else if (elText.startsWith(kw)) { score += 80; matched = true; }
        // Contains as word gets good score
        else if (new RegExp('\\b' + kw + '\\b').test(elText)) { score += 60; matched = true; }
        // Contains anywhere gets lower score
        else if (elText.includes(kw)) { score += 30; matched = true; }
      }

      if (matched) {
        // Bonus for being visible and reasonably sized
        if (rect.width > 20 && rect.height > 20) score += 10;
        if (rect.top >= 0 && rect.top < window.innerHeight * 0.8) score += 15;
        // Bonus for being interactive
        const style = window.getComputedStyle(el);
        if (el.tagName === 'BUTTON' || el.getAttribute('role') === 'button') score += 20;
        if (style.cursor === 'pointer') score += 10;

        candidates.push({ el, rect, score, text: el.innerText?.trim() || '' });
      }
    }

    // Sort by score descending
    candidates.sort((a, b) => b.score - a.score);

    // Debug
    console.log('[ScreenGuide] find candidates:', candidates.slice(0, 3).map(c => ({
      text: c.text?.slice(0, 40),
      score: c.score,
      tag: c.el.tagName
    })));

    return candidates.length > 0 ? candidates[0] : null;
  }

  // ── Scroll element into view ───────────────────────
  function scrollToElement(el, smooth = true) {
    const rect = el.getBoundingClientRect();
    const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight
      && rect.left >= 0 && rect.right <= window.innerWidth;
    if (!isVisible) {
      el.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'center', inline: 'center' });
      return true; // did scroll
    }
    return false;
  }

  // ── Draw functions ─────────────────────────────────
  function drawCircle(cx, cy, radius) {
    const svg = getOverlay();
    const g = document.createElementNS(NS, 'g');
    g.setAttribute('class', 'sg-anno sg-circle');
    g.innerHTML = `
      <circle cx="${cx}" cy="${cy}" r="${radius}" fill="none" stroke="#ef4444" stroke-width="3" class="sg-pulse" />
      <circle cx="${cx}" cy="${cy}" r="${radius + 8}" fill="none" stroke="#ef4444" stroke-width="1.5" opacity="0.3" class="sg-pulse-delay" />
      <circle cx="${cx}" cy="${cy}" r="${radius - 6}" fill="none" stroke="#ef4444" stroke-width="1" opacity="0.5" class="sg-pulse" />
    `;
    svg.appendChild(g);
  }

  function drawArrow(cx, cy, direction) {
    const svg = getOverlay();
    const g = document.createElementNS(NS, 'g');
    g.setAttribute('class', 'sg-anno sg-arrow');
    let rotate = 180; // down default
    switch (direction) {
      case 'up': rotate = 0; break;
      case 'down': rotate = 180; break;
      case 'left': rotate = -90; break;
      case 'right': rotate = 90; break;
    }
    const s = 28;
    const pathD = `M0,-${s} L${s*0.45},0 L-${s*0.45},0 Z`;
    g.innerHTML = `
      <path d="${pathD}" fill="#ef4444" transform="translate(${cx},${cy}) rotate(${rotate})" class="sg-bounce" />
      <line x1="${cx}" y1="${cy}" x2="${cx}" y2="${cy + (rotate===180?-55:55)}" stroke="#ef4444" stroke-width="2.5" stroke-dasharray="5,4" opacity="0.5" />
    `;
    svg.appendChild(g);
  }

  function drawSpotlight(cx, cy, radius) {
    const svg = getOverlay();
    clearAnnotations();
    const g = document.createElementNS(NS, 'g');
    g.setAttribute('class', 'sg-anno sg-spotlight');
    const w = window.innerWidth, h = window.innerHeight;
    g.innerHTML = `
      <defs>
        <mask id="sg-spotlight-mask">
          <rect x="0" y="0" width="${w}" height="${h}" fill="white" />
          <circle cx="${cx}" cy="${cy}" r="${radius}" fill="black" />
        </mask>
      </defs>
      <rect x="0" y="0" width="${w}" height="${h}" fill="rgba(0,0,0,0.6)" mask="url(#sg-spotlight-mask)" class="sg-fade-in" />
      <circle cx="${cx}" cy="${cy}" r="${radius}" fill="none" stroke="#3b82f6" stroke-width="2.5" stroke-dasharray="6,4" class="sg-pulse" />
    `;
    svg.appendChild(g);
  }

  function drawHighlightBox(x, y, width, height) {
    const svg = getOverlay();
    const g = document.createElementNS(NS, 'g');
    g.setAttribute('class', 'sg-anno sg-highlight');
    g.innerHTML = `
      <rect x="${x-4}" y="${y-4}" width="${width+8}" height="${height+8}" rx="8" fill="rgba(59,130,246,0.08)" stroke="#3b82f6" stroke-width="2" class="sg-pulse" />
    `;
    svg.appendChild(g);
  }

  function drawStepNumber(cx, cy, num) {
    const svg = getOverlay();
    const g = document.createElementNS(NS, 'g');
    g.setAttribute('class', 'sg-anno sg-step-num');
    const r = 14;
    g.innerHTML = `
      <circle cx="${cx}" cy="${cy}" r="${r}" fill="#ef4444" stroke="white" stroke-width="2" class="sg-pop" />
      <text x="${cx}" y="${cy + 4}" text-anchor="middle" fill="white" font-size="13" font-weight="700" font-family="sans-serif" class="sg-pop">${num}</text>
    `;
    svg.appendChild(g);
  }

  // ── Step tooltip (below the annotation) ────────────
  function showStepTip(text, anchorEl) {
    removeStepTip();
    const rect = anchorEl ? anchorEl.getBoundingClientRect() : { left: window.innerWidth/2, top: 120, width: 0, height: 0 };

    const tip = document.createElement('div');
    tip.id = 'sg-step-tip';
    tip.style.cssText = `
      position: fixed;
      left: ${Math.max(12, Math.min(window.innerWidth - 312, rect.left + rect.width/2 - 150))}px;
      top: ${Math.min(window.innerHeight - 100, rect.bottom + 24)}px;
      width: 300px;
      background: white;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 14px 16px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      font-size: 13px;
      line-height: 1.5;
      color: #1e293b;
      box-shadow: 0 8px 30px rgba(0,0,0,0.12);
      z-index: 2147483647;
      animation: sgTipPop 0.25s ease-out;
      pointer-events: auto;
    `;
    tip.innerHTML = `
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
        <span style="font-size:16px;">&#128161;</span>
        <span style="font-weight:700;color:#1e40af;font-size:13px;">操作提示</span>
      </div>
      <div style="color:#334155;">${text}</div>
      <div style="margin-top:10px;font-size:11px;color:#94a3b8;">如果找不到该按钮，请手动滚动或调整窗口大小</div>
    `;
    document.body.appendChild(tip);
    stepTipEl = tip;
  }

  function removeStepTip() {
    if (stepTipEl) { stepTipEl.remove(); stepTipEl = null; }
  }

  function clearAnnotations() {
    const svg = getOverlay();
    while (svg.lastChild) svg.removeChild(svg.lastChild);
    const defs = document.createElementNS(NS, 'defs');
    defs.innerHTML = `
      <filter id="sg-shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="rgba(0,0,0,0.12)" />
      </filter>
    `;
    svg.appendChild(defs);
  }

  // ── Inject CSS ─────────────────────────────────────
  function injectCSS() {
    if (document.getElementById('sg-anim-css')) return;
    const style = document.createElement('style');
    style.id = 'sg-anim-css';
    style.textContent = `
      @keyframes sgPulse { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.1);opacity:.7} }
      @keyframes sgPulseDelay { 0%,100%{transform:scale(1);opacity:.3} 50%{transform:scale(1.18);opacity:.1} }
      @keyframes sgBounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(5px)} }
      @keyframes sgPop { 0%{transform:scale(0);opacity:0} 60%{transform:scale(1.12)} 100%{transform:scale(1);opacity:1} }
      @keyframes sgFadeIn { from{opacity:0} to{opacity:1} }
      @keyframes sgTipPop { 0%{transform:translateY(8px);opacity:0} 100%{transform:translateY(0);opacity:1} }
      @keyframes sgBannerSlide { from{transform:translateY(-100%)} to{transform:translateY(0)} }
      .sg-pulse { animation: sgPulse 2s ease-in-out infinite; transform-origin: center; }
      .sg-pulse-delay { animation: sgPulseDelay 2.5s ease-in-out infinite; transform-origin: center; }
      .sg-bounce { animation: sgBounce 1.2s ease-in-out infinite; }
      .sg-pop { animation: sgPop 0.3s ease-out forwards; }
      .sg-fade-in { animation: sgFadeIn 0.3s ease-out forwards; }
    `;
    document.head.appendChild(style);
  }

  injectCSS();

  // ── Process a guide step (the SMART part) ──────────
  function processStep(stepText, findSpec, stepNumber, totalSteps) {
    clearAnnotations();
    removeStepTip();

    // Show a temporary "searching" hint
    showToast(`正在定位: ${stepText.slice(0, 30)}...`, 2000);

    // Delay slightly to let any dynamic UI settle
    setTimeout(() => {
      const found = findElement(findSpec);

      if (found) {
        const { el, rect } = found;
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;

        // Scroll into view first
        scrollToElement(el);

        // Then draw annotations (with a small delay for scroll to finish)
        setTimeout(() => {
          const scrolledRect = el.getBoundingClientRect();
          const scx = scrolledRect.left + scrolledRect.width / 2;
          const scy = scrolledRect.top + scrolledRect.height / 2;

          // Draw circle around the element
          const radius = Math.max(scrolledRect.width, scrolledRect.height) / 2 + 12;
          drawCircle(scx, scy, radius);

          // Draw step number
          drawStepNumber(scx, scy - radius - 18, stepNumber);

          // Highlight the element itself
          drawHighlightBox(scrolledRect.left, scrolledRect.top, scrolledRect.width, scrolledRect.height);

          // Show instruction tooltip
          showStepTip(`[${stepNumber}/${totalSteps}] ${stepText}`, el);
        }, 350);

        console.log('[ScreenGuide] Found element:', el.tagName, el.innerText?.slice(0, 40));
      } else {
        // Fallback: show message that we couldn't find it
        console.log('[ScreenGuide] Element not found for:', stepText);
        showStepTip(`[${stepNumber}/${totalSteps}] ${stepText}<br><br><span style="color:#ef4444;font-size:12px;">&#9888; 未能在页面上自动找到该按钮，请根据文字描述手动寻找</span>`, null);
      }
    }, 100);
  }

  // ── Toast ──────────────────────────────────────────
  function showToast(text, duration = 2500) {
    let toast = document.getElementById('sg-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'sg-toast';
      toast.style.cssText = `
        position: fixed; bottom: 28px; left: 50%;
        transform: translateX(-50%);
        background: #1e293b; color: white;
        padding: 10px 22px; border-radius: 20px;
        font-size: 13px; font-family: sans-serif;
        z-index: 2147483647; pointer-events: none;
        white-space: nowrap; box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        transition: opacity 0.2s;
      `;
      document.body.appendChild(toast);
    }
    toast.textContent = text;
    toast.style.opacity = '1';
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => { toast.style.opacity = '0'; }, duration);
  }

  // ── Message handler ────────────────────────────────
  chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    switch (msg.type) {
      case 'START_GUIDE':
        guideActive = true;
        currentTool = null;
        clearAnnotations();
        removeStepTip();
        sendResponse({ success: true });
        break;

      case 'STOP_GUIDE':
        guideActive = false;
        currentTool = null;
        clearAnnotations();
        removeStepTip();
        sendResponse({ success: true });
        break;

      case 'SHOW_STEP': {
        // NEW: smart element-finding step
        const { stepText, find, stepNumber, totalSteps } = msg;
        processStep(stepText, find, stepNumber, totalSteps);
        sendResponse({ success: true });
        break;
      }

      // Legacy fixed-coordinate handlers (keep for backward compat)
      case 'DRAW_CIRCLE':
        clearAnnotations();
        drawCircle(msg.x, msg.y, msg.radius || 40);
        sendResponse({ success: true });
        break;
      case 'DRAW_ARROW':
        clearAnnotations();
        drawArrow(msg.x, msg.y, msg.direction || 'down');
        sendResponse({ success: true });
        break;
      case 'CLEAR_ANNOTATIONS':
        clearAnnotations();
        removeStepTip();
        currentTool = null;
        sendResponse({ success: true });
        break;

      case 'SPOTLIGHT_MODE':
        currentTool = 'spotlight';
        clearAnnotations();
        showToast('聚光灯模式：点击页面聚焦位置');
        sendResponse({ success: true });
        break;
      case 'HIGHLIGHT_MODE':
        currentTool = 'highlight';
        clearAnnotations();
        showToast('高亮模式：点击页面高亮元素');
        sendResponse({ success: true });
        break;
      case 'CIRCLE_MODE':
        currentTool = 'circle';
        clearAnnotations();
        showToast('画圈模式：点击页面画红圈');
        sendResponse({ success: true });
        break;
      case 'ARROW_MODE':
        currentTool = 'arrow';
        clearAnnotations();
        showToast('箭头模式：点击页面画箭头');
        sendResponse({ success: true });
        break;

      case 'SHOW_URL_BANNER':
        showUrlBanner(msg.guideId, msg.title, msg.text);
        sendResponse({ success: true });
        break;

      case 'HIGHLIGHT_ELEMENT': {
        // Try to extract button/element names from AI analysis and highlight them
        const highlights = highlightFromAnalysis(msg.analysis);
        sendResponse({ success: highlights.length > 0, count: highlights.length });
        break;
      }
    }
    return true;
  });

  // ── Highlight elements based on AI analysis text ──
  function highlightFromAnalysis(analysis) {
    if (!analysis) return [];
    clearAnnotations();

    // Extract quoted text (button names, labels, etc.)
    const quotes = [];
    const patterns = [
      /["'"'`]([^"'"'`]{2,30})["'"'`]/g,       // quoted text
      /[『「]([^』」]{2,30})[』」]/g,             // Chinese quotes
      /点击\s*["'"'`]?([^"'"'`\n]{2,30})["'"'`]?/g, // "点击 xxx"
      /选择\s*["'"'`]?([^"'"'`\n]{2,30})["'"'`]?/g, // "选择 xxx"
      /按钮[「\s]*([^\n"'"'`]{2,30})/g,          // "xxx按钮"
    ];

    patterns.forEach(p => {
      let m;
      while ((m = p.exec(analysis)) !== null) {
        const text = m[1].trim();
        if (text.length >= 2 && !quotes.includes(text)) quotes.push(text);
      }
    });

    // Also look for common button keywords
    const keywords = ['创建', '继续', '下一步', '保存', '提交', '确认', '更换',
      '设置', '添加', '编辑', '删除', '完成', '取消', '返回',
      'Create', 'Continue', 'Next', 'Save', 'Submit', 'Confirm',
      'Change', 'Settings', 'Add', 'Edit', 'Delete', 'Done', 'Cancel'];
    keywords.forEach(kw => {
      if (analysis.includes(kw) && !quotes.includes(kw)) quotes.push(kw);
    });

    const highlighted = [];
    quotes.forEach(text => {
      const el = findElement({ text: [text] });
      if (el) {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const r = Math.max(rect.width, rect.height) / 2 + 10;
        drawCircle(cx, cy, r);
        drawHighlightBox(rect.left, rect.top, rect.width, rect.height);
        highlighted.push(text);
      }
    });

    if (highlighted.length > 0) {
      showToast(`已标注 ${highlighted.length} 个重点位置`, 3000);
    }
    return highlighted;
  }

  // ── URL detection banner ───────────────────────────
  function showUrlBanner(guideId, title, text) {
    if (document.getElementById('sg-url-banner')) return;
    const banner = document.createElement('div');
    banner.id = 'sg-url-banner';
    banner.style.cssText = `
      position: fixed; top: 0; left: 0; right: 0;
      background: #1e40af; color: white;
      padding: 12px 20px; font-family: sans-serif;
      font-size: 13px; z-index: 2147483647;
      display: flex; align-items: center;
      justify-content: center; gap: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.2);
      animation: sgBannerSlide 0.3s ease-out;
    `;
    banner.innerHTML = `
      <span style="font-weight:600;">&#127919; ScreenGuide</span>
      <span style="opacity:0.9;">${text}</span>
      <button id="sg-banner-start" style="
        background:white;color:#1e40af;border:none;
        padding:6px 14px;border-radius:6px;
        font-size:12px;font-weight:600;cursor:pointer;
        margin-left:8px;
      ">开始引导</button>
      <button id="sg-banner-close" style="
        background:transparent;color:white;border:1px solid rgba(255,255,255,0.3);
        padding:6px 12px;border-radius:6px;font-size:12px;cursor:pointer;
      ">关闭</button>
    `;
    document.body.appendChild(banner);

    banner.querySelector('#sg-banner-start').addEventListener('click', () => {
      banner.remove();
      chrome.runtime.sendMessage({ type: "START_GUIDE", guideId });
      chrome.runtime.sendMessage({ type: "OPEN_POPUP_WINDOW" });
    });
    banner.querySelector('#sg-banner-close').addEventListener('click', () => banner.remove());
    setTimeout(() => { if (banner.parentNode) banner.remove(); }, 15000);
  }

  // ── Free annotation click handler ──────────────────
  document.addEventListener('click', (e) => {
    if (!currentTool) return;
    if (e.target.closest && e.target.closest('#sg-overlay, #sg-step-tip, #sg-url-banner')) return;
    const x = e.clientX, y = e.clientY;
    switch (currentTool) {
      case 'spotlight': drawSpotlight(x, y, 120); break;
      case 'highlight': drawHighlightBox(x - 60, y - 20, 120, 40); break;
      case 'circle': drawCircle(x, y, 35); break;
      case 'arrow': drawArrow(x, y, 'down'); break;
    }
  }, true);

  // ── Resize handler ─────────────────────────────────
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (overlayEl) {
        overlayEl.style.width = window.innerWidth + 'px';
        overlayEl.style.height = window.innerHeight + 'px';
      }
    }, 200);
  });

})();
