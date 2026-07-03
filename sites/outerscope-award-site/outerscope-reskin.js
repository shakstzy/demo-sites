(() => {
  const base = '/demo-sites/sites/outerscope-award-site/';
  const keepExternal = /^(https?:|mailto:|tel:|#)/i;
  function normalizePath(pathname) {
    if (!pathname || pathname === '/') return base;
    const cleaned = pathname.replace(/^\/+/, '');
    if (cleaned.startsWith(base.replace(/^\/+/, ''))) return '/' + cleaned;
    if (cleaned === 'about' || cleaned === 'about/') return base + 'about/';
    if (cleaned === 'projects' || cleaned === 'projects/') return base + 'projects/';
    if (cleaned.startsWith('projects/')) return base + cleaned.replace(/\/?$/, '/');
    return null;
  }
  function fixLinks() {
    document.querySelectorAll('a[href]').forEach((a) => {
      const href = a.getAttribute('href') || '';
      if (!href || keepExternal.test(href)) return;
      try {
        const url = new URL(href, window.location.origin);
        const next = normalizePath(url.pathname);
        if (next) a.setAttribute('href', next + url.search + url.hash);
      } catch (_) {}
    });
  }
  function wakeMedia() {
    document.querySelectorAll('img[data-src]').forEach((img) => {
      const dataSrc = img.getAttribute('data-src') || '';
      if (!dataSrc || img.getAttribute('src')) return;
      const still = dataSrc.replace('/loop-', '/still-').replace(/\.webm(?:[?#].*)?$/i, '.jpg');
      img.setAttribute('src', still);
      img.setAttribute('loading', 'eager');
      img.setAttribute('decoding', 'async');
    });
    document.querySelectorAll('video').forEach((video) => {
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      if (!video.getAttribute('preload')) video.setAttribute('preload', 'auto');
      const p = video.play();
      if (p && typeof p.catch === 'function') p.catch(() => {});
    });
  }
  function tick() { fixLinks(); wakeMedia(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', tick, { once: true });
  else tick();
  window.addEventListener('load', tick, { once: true });
  new MutationObserver(tick).observe(document.documentElement, { childList: true, subtree: true });
})();
