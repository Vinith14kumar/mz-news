/* ============================================================
   MZ NEWS & ARTICLE — script.js
   Interactions: search toggle, language tabs, category filter,
   mobile menu, pagination, copy link, sticky navbar
   ============================================================ */

(function () {
  'use strict';

  /* ── Helpers ─────────────────────────────────────────────── */
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.from((ctx || document).querySelectorAll(sel)); }

  /* ══════════════════════════════════════════════════════════
     1. SEARCH TOGGLE
  ══════════════════════════════════════════════════════════ */
  var searchToggle = $('#searchToggle');
  var searchBar    = $('#searchBar');
  var searchInput  = $('#searchInput');

  if (searchToggle && searchBar) {
    searchToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      var isOpen = searchBar.classList.toggle('open');
      if (isOpen && searchInput) {
        searchInput.focus();
      }
    });

    /* Close on outside click */
    document.addEventListener('click', function (e) {
      if (searchBar.classList.contains('open') &&
          !searchBar.contains(e.target) &&
          e.target !== searchToggle) {
        searchBar.classList.remove('open');
      }
    });

    /* Close on Escape */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        searchBar.classList.remove('open');
      }
    });

    /* Submit on Enter */
    if (searchInput) {
      searchInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
          var q = searchInput.value.trim();
          if (q) {
            window.location.href = 'news-list.html?q=' + encodeURIComponent(q);
          }
        }
      });
    }

    var searchSubmit = searchBar.querySelector('.search-submit');
    if (searchSubmit) {
      searchSubmit.addEventListener('click', function () {
        var q = searchInput ? searchInput.value.trim() : '';
        if (q) {
          window.location.href = 'news-list.html?q=' + encodeURIComponent(q);
        }
      });
    }
  }

  /* ══════════════════════════════════════════════════════════
     2. MOBILE HAMBURGER MENU
  ══════════════════════════════════════════════════════════ */
  var hamburger      = $('#hamburger');
  var navbarNav      = $('#navbarNav');
  var navbarActions  = $('#navbarActions');

  if (hamburger) {
    hamburger.addEventListener('click', function (e) {
      e.stopPropagation();
      var navOpen = navbarNav && navbarNav.classList.toggle('mobile-open');
      if (navbarActions) {
        navbarActions.classList.toggle('mobile-open', !!navOpen);
      }
      /* Animate hamburger → X */
      hamburger.classList.toggle('active');
    });

    /* Close when a nav link is clicked on mobile */
    if (navbarNav) {
      navbarNav.addEventListener('click', function (e) {
        if (e.target.closest('.nav-link')) {
          navbarNav.classList.remove('mobile-open');
          if (navbarActions) navbarActions.classList.remove('mobile-open');
          hamburger.classList.remove('active');
        }
      });
    }

    /* Close on outside click */
    document.addEventListener('click', function (e) {
      if (navbarNav && navbarNav.classList.contains('mobile-open') &&
          !navbarNav.contains(e.target) &&
          e.target !== hamburger) {
        navbarNav.classList.remove('mobile-open');
        if (navbarActions) navbarActions.classList.remove('mobile-open');
        hamburger.classList.remove('active');
      }
    });
  }

  /* ══════════════════════════════════════════════════════════
     3. HOMEPAGE — LANGUAGE TABS + SHOW 4 / VIEW ALL
  ══════════════════════════════════════════════════════════ */
  var languageTabs      = $('#languageTabs');
  var newsListContainer = $('#newsListContainer');
  var lnsViewAllBtn     = $('#lnsViewAllBtn');
  var lnsViewAllWrap    = $('#lnsViewAllWrap');

  var SHOW_LIMIT = 4;
  var currentLang = 'all';
  var expanded = false;
  var SAVED_NEWS_KEY = 'mzNewsSavedArticles';
  var savedNewsCount = $('#savedNewsCount');
  var savedNewsEmpty = $('#savedNewsEmpty');

  function readSavedNews() {
    try {
      var saved = JSON.parse(localStorage.getItem(SAVED_NEWS_KEY) || '[]');
      return Array.isArray(saved) ? saved : [];
    } catch (error) {
      return [];
    }
  }

  var savedNews = readSavedNews();

  function getAllItems() {
    return $$('.news-item', newsListContainer);
  }

  function getNewsItemId(item) {
    var title = $('.news-item-title', item);
    return item.dataset.lang + '|' + (title ? title.textContent.trim() : '');
  }

  function isNewsSaved(item) {
    var id = getNewsItemId(item);
    return savedNews.some(function (saved) { return saved.id === id; });
  }

  function getVisibleItems(lang) {
    return getAllItems().filter(function(item) {
      if (lang === 'saved') return isNewsSaved(item);
      return lang === 'all' || item.dataset.lang === lang;
    });
  }

  function applyFilter(lang) {
    currentLang = lang;
    expanded = false;
    var all = getAllItems();

    // Hide everything first
    all.forEach(function(item) { item.style.display = 'none'; });

    var matching;

    if (lang === 'saved') {
      matching = all.filter(isNewsSaved);
    } else if (lang === 'all') {
      // Interleave: take items round-robin from each language
      // so all 5 languages appear mixed in the "All News" view
      var langOrder = ['tamil', 'english', 'hindi', 'telugu', 'malayalam'];
      var buckets = {};
      langOrder.forEach(function(l) { buckets[l] = []; });

      all.forEach(function(item) {
        var l = item.dataset.lang;
        if (buckets[l]) buckets[l].push(item);
      });

      // Round-robin interleave
      matching = [];
      var maxLen = 0;
      langOrder.forEach(function(l) {
        if (buckets[l].length > maxLen) maxLen = buckets[l].length;
      });
      for (var i = 0; i < maxLen; i++) {
        langOrder.forEach(function(l) {
          if (buckets[l][i]) matching.push(buckets[l][i]);
        });
      }
    } else {
      matching = all.filter(function(item) {
        return item.dataset.lang === lang;
      });
    }

    // Show only first SHOW_LIMIT
    matching.forEach(function(item, idx) {
      item.style.display = idx < SHOW_LIMIT ? 'flex' : 'none';
    });
    if (savedNewsEmpty) {
      savedNewsEmpty.hidden = lang !== 'saved' || matching.length > 0;
    }

    // Store interleaved order for "View All"
    newsListContainer._matching = matching;

    // Show/hide "View All" button
    if (lnsViewAllWrap) {
      lnsViewAllWrap.style.display = matching.length > SHOW_LIMIT ? 'flex' : 'none';
    }
    if (lnsViewAllBtn) {
      lnsViewAllBtn.innerHTML = [
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2z"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/></svg>',
        'View All ' + (lang === 'all' ? 'News' : lang === 'saved' ? 'Saved Stories' : lang.charAt(0).toUpperCase() + lang.slice(1) + ' News'),
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>'
      ].join('');
    }
  }

  function updateSavedControls() {
    var savedIds = savedNews.map(function (saved) { return saved.id; });
    getAllItems().forEach(function (item) {
      var meta = $('.news-item-meta', item);
      var button = $('.news-save-btn', item);
      if (!meta) return;

      if (!button) {
        button = document.createElement('button');
        button.type = 'button';
        button.className = 'news-save-btn';
        button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 4.75A1.75 1.75 0 0 1 7.75 3h8.5A1.75 1.75 0 0 1 18 4.75V21l-6-3.75L6 21z"/></svg>';
        meta.appendChild(button);
      }

      var isSaved = savedIds.indexOf(getNewsItemId(item)) !== -1;
      button.classList.toggle('is-saved', isSaved);
      button.setAttribute('aria-pressed', String(isSaved));
      button.setAttribute('aria-label', isSaved ? 'Remove from saved stories' : 'Save for later');
      button.title = isSaved ? 'Remove from saved stories' : 'Save for later';
    });

    if (savedNewsCount) savedNewsCount.textContent = String(savedNews.length);
  }

  updateSavedControls();

  if (languageTabs && newsListContainer) {
    // Init: show first 4 of "all"
    applyFilter('all');

    languageTabs.addEventListener('click', function(e) {
      var btn = e.target.closest('.tab-btn');
      if (!btn) return;

      $$('.tab-btn', languageTabs).forEach(function(t) {
        t.classList.remove('active');
      });
      btn.classList.add('active');
      applyFilter(btn.dataset.tab);
    });
  }

  if (newsListContainer) {
    newsListContainer.addEventListener('click', function (e) {
      var button = e.target.closest('.news-save-btn');
      if (!button) return;

      e.preventDefault();
      e.stopPropagation();
      var item = button.closest('.news-item');
      var id = getNewsItemId(item);
      var savedIndex = savedNews.findIndex(function (saved) { return saved.id === id; });

      if (savedIndex === -1) {
        var title = $('.news-item-title', item);
        savedNews.push({
          id: id,
          title: title ? title.textContent.trim() : '',
          href: title ? title.getAttribute('href') : 'news-list.html'
        });
      } else {
        savedNews.splice(savedIndex, 1);
      }

      try {
        localStorage.setItem(SAVED_NEWS_KEY, JSON.stringify(savedNews));
      } catch (error) {
        // Keep the current page usable when browser storage is unavailable.
      }

      updateSavedControls();
      if (currentLang === 'saved') applyFilter('saved');
    });
  }

  // View All click — show remaining items
  if (lnsViewAllBtn) {
    lnsViewAllBtn.addEventListener('click', function() {
      if (!expanded) {
        // Show all matching (use stored interleaved order)
        var matching = newsListContainer._matching || getVisibleItems(currentLang);
        matching.forEach(function(item) { item.style.display = 'flex'; });
        expanded = true;
        lnsViewAllBtn.innerHTML = [
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><polyline points="18 15 12 9 6 15"/></svg>',
          'Show Less',
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><polyline points="18 15 12 9 6 15"/></svg>'
        ].join('');
      } else {
        // Collapse back to 4
        applyFilter(currentLang);
        $$('.tab-btn', languageTabs).forEach(function(t) {
          t.classList.toggle('active', t.dataset.tab === currentLang);
        });
      }
    });
  }

  /* ══════════════════════════════════════════════════════════
     4. NEWS LIST PAGE — CATEGORY FILTER
  ══════════════════════════════════════════════════════════ */
  var categoryFilter    = $('#categoryFilter');
  var newsCardsContainer = $('#newsCardsContainer');

  if (categoryFilter && newsCardsContainer) {
    var allCards = $$('.news-card', newsCardsContainer);

    /* Pre-select from URL param */
    var urlParams = new URLSearchParams(window.location.search);
    var presetCat = urlParams.get('cat') || urlParams.get('lang') || 'all';

    function activateCatBtn(val) {
      $$('.cat-btn', categoryFilter).forEach(function (b) {
        b.classList.toggle('active', b.dataset.cat === val);
      });
    }

    function filterCards(cat) {
      allCards.forEach(function (card) {
        if (cat === 'all' || card.dataset.cat === cat) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    }

    /* Apply preset on load */
    activateCatBtn(presetCat);
    filterCards(presetCat);

    categoryFilter.addEventListener('click', function (e) {
      var btn = e.target.closest('.cat-btn');
      if (!btn) return;
      var cat = btn.dataset.cat;
      activateCatBtn(cat);
      filterCards(cat);
    });
  }

  /* ══════════════════════════════════════════════════════════
     5. PAGINATION (visual only — demo)
  ══════════════════════════════════════════════════════════ */
  var pagination = document.querySelector('.pagination');
  if (pagination) {
    pagination.addEventListener('click', function (e) {
      var btn = e.target.closest('.page-btn');
      if (!btn) return;
      $$('.page-btn', pagination).forEach(function (b) {
        b.classList.remove('active');
      });
      /* Only set active on number buttons (not arrow) */
      if (!btn.querySelector('svg')) {
        btn.classList.add('active');
      }
      /* Scroll back to top of news list */
      var listTop = document.querySelector('.news-list-page') ||
                    document.querySelector('.category-filter');
      if (listTop) {
        listTop.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  /* ══════════════════════════════════════════════════════════
     6. COPY LINK BUTTON (article page)
  ══════════════════════════════════════════════════════════ */
  var copyBtn = $('#copyLinkBtn');
  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      navigator.clipboard.writeText(window.location.href).then(function () {
        var span = copyBtn.querySelector('span');
        var original = span ? span.textContent : '';
        if (span) span.textContent = 'Copied!';
        copyBtn.style.background = '#059669';
        setTimeout(function () {
          if (span) span.textContent = original;
          copyBtn.style.background = '';
        }, 2000);
      }).catch(function () {
        /* Fallback for older browsers */
        var ta = document.createElement('textarea');
        ta.value = window.location.href;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        var span = copyBtn.querySelector('span');
        if (span) {
          var orig = span.textContent;
          span.textContent = 'Copied!';
          setTimeout(function () { span.textContent = orig; }, 2000);
        }
      });
    });
  }

  /* ══════════════════════════════════════════════════════════
     7. STICKY NAVBAR — add shadow on scroll
  ══════════════════════════════════════════════════════════ */
  var navbar = $('#navbar');
  if (navbar) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 10) {
        navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
      } else {
        navbar.style.boxShadow = '0 2px 12px rgba(0,0,0,0.25)';
      }
    }, { passive: true });
  }

  /* ══════════════════════════════════════════════════════════
     8. HAMBURGER ANIMATION CSS (injected once)
  ══════════════════════════════════════════════════════════ */
  var style = document.createElement('style');
  style.textContent = [
    '.hamburger.active span:nth-child(1){transform:translateY(6px) rotate(45deg);}',
    '.hamburger.active span:nth-child(2){opacity:0;}',
    '.hamburger.active span:nth-child(3){transform:translateY(-6px) rotate(-45deg);}'
  ].join('');
  document.head.appendChild(style);

  /* ══════════════════════════════════════════════════════════
     9. URL PARAM — pre-select language tab on homepage
  ══════════════════════════════════════════════════════════ */
  if (languageTabs) {
    var urlP = new URLSearchParams(window.location.search);
    var langParam = urlP.get('lang');
    if (langParam) {
      var matchTab = languageTabs.querySelector('[data-tab="' + langParam + '"]');
      if (matchTab) {
        matchTab.click();
      }
    }
  }

  /* ══════════════════════════════════════════════════════════
     10. SMOOTH HOVER on trending items (accessibility)
  ══════════════════════════════════════════════════════════ */
  $$('.trending-item, .news-item, .related-card').forEach(function (el) {
    el.setAttribute('tabindex', '0');
    el.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        var link = el.querySelector('a') || (el.tagName === 'A' ? el : null);
        if (link) link.click();
      }
    });
  });

})();

  /* ══════════════════════════════════════════════════════════
     BREAKING NEWS TICKER — seamless infinite loop
  ══════════════════════════════════════════════════════════ */
  (function () {
    var ticker = document.getElementById('breakingTicker');
    if (!ticker) return;

    /* Duplicate content so the scroll loops seamlessly */
    ticker.innerHTML = ticker.innerHTML + ticker.innerHTML;
  })();

  (function () {
    document.querySelectorAll('.news-short-video[data-preview-end]').forEach(function (video) {
      var previewEnd = Number(video.dataset.previewEnd);
      video.addEventListener('timeupdate', function () {
        if (previewEnd > 0 && video.currentTime >= previewEnd) {
          video.pause();
          video.currentTime = 0;
        }
      });
    });
  })();

