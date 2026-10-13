(function () {
  var headerSlot = document.querySelector('.info-header');
  var footerSlot = document.querySelector('.info-footer');

  if (headerSlot) {
    headerSlot.outerHTML = `
      <nav class="navbar" id="navbar">
        <div class="container navbar-inner">
          <a href="index.html" class="navbar-logo">
            <img src="Logo.png" alt="MZ News Logo" />
            <div class="navbar-logo-text">
              <span class="brand-name">MZ NEWS &amp; ARTICLE</span>
              <span class="brand-tagline">Truth · Trust · Together | Your Trusted Global News Hub</span>
            </div>
          </a>
          <ul class="navbar-nav" id="navbarNav">
            <li><a href="index.html" class="nav-link"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>Home</a></li>
            <li><a href="news-list.html" class="nav-link"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2z"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>Latest News</a></li>
            <li><a href="news-list.html?cat=politics" class="nav-link"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24z"/></svg>Politics</a></li>
            <li><a href="news-list.html?cat=business" class="nav-link"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20V10M18 20V4M6 20v-4"/></svg>Business</a></li>
            <li><a href="news-list.html?cat=technology" class="nav-link"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/></svg>Technology</a></li>
            <li class="nav-more">
              <span style="display:flex;align-items:center;gap:5px;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="15" height="15"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>More<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="12" height="12"><polyline points="6 9 12 15 18 9"/></svg></span>
              <div class="nav-more-dropdown"><a href="news-list.html?cat=sports">Sports</a><a href="news-list.html?cat=entertainment">Entertainment</a><a href="news-list.html?cat=health">Health</a><a href="news-list.html?cat=world">World</a></div>
            </li>
          </ul>
          <div class="navbar-actions" id="navbarActions">
            <a href="login.html" class="btn-login"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>Login</a>
            <a href="signup.html" class="btn-register"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>Register / Sign Up</a>
            <button class="btn-search" id="searchToggle" aria-label="Search"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg></button>
          </div>
          <button class="hamburger" id="hamburger" aria-label="Menu"><span></span><span></span><span></span></button>
        </div>
        <div class="search-bar" id="searchBar"><div class="search-bar-inner"><input type="text" placeholder="Search news, articles, topics…" id="searchInput" /><button class="search-submit">Search</button></div></div>
      </nav>`;
  }

  if (footerSlot) {
    footerSlot.outerHTML = `
      <footer class="footer">
        <div class="footer-accent-bar"></div>
        <div class="footer-main"><div class="container"><div class="footer-grid">
          <div class="footer-brand-col">
            <div class="footer-logo-row"><img src="Logo.png" alt="MZ News Logo" class="footer-logo-img" /><div><div class="footer-brand-name">MZ NEWS &amp; ARTICLE</div><div class="footer-brand-tagline">Truth · Trust · Together</div></div></div>
            <p class="footer-about-text">Your trusted global news hub delivering breaking news, in-depth articles,<br>and exclusive stories across 5+ languages — keeping you informed, always.</p>
          </div>
          <div class="footer-links-right">
            <div class="footer-links-col"><div class="footer-col-header">Quick Links</div><ul class="footer-links-list"><li><a href="index.html">Home</a></li><li><a href="news-list.html">Latest News</a></li><li><a href="news-list.html?cat=politics">Politics</a></li><li><a href="news-list.html?cat=business">Business</a></li><li><a href="news-list.html?cat=technology">Technology</a></li><li><a href="news-list.html?cat=sports">Sports</a></li><li><a href="news-list.html?cat=entertainment">Entertainment</a></li><li><a href="news-list.html?cat=health">Health</a></li></ul></div>
            <div class="footer-links-col"><div class="footer-col-header">Languages</div><ul class="footer-links-list"><li><a href="news-list.html?lang=tamil">Tamil — தமிழ்</a></li><li><a href="news-list.html?lang=english">English</a></li><li><a href="news-list.html?lang=hindi">Hindi — हिंदी</a></li><li><a href="news-list.html?lang=telugu">Telugu — తెలుగు</a></li><li><a href="news-list.html?lang=malayalam">Malayalam — മലയാളം</a></li></ul></div>
            <div class="footer-links-col"><div class="footer-col-header">Company</div><ul class="footer-links-list"><li><a href="about.html">About MZ News</a></li><li><a href="team.html">Our Team</a></li><li><a href="editorial-policy.html">Editorial Policy</a></li><li><a href="advertise.html">Advertise With Us</a></li><li><a href="contact.html">Contact Us</a></li><li><a href="privacy-policy.html">Privacy Policy</a></li><li><a href="terms-of-use.html">Terms of Use</a></li></ul></div>
          </div>
        </div></div></div>
        <div class="footer-divider"></div>
        <div class="footer-bottom-bar"><div class="container footer-bottom-inner"><p class="footer-copy">&copy; 2026 MZ News &amp; Article. All rights reserved.</p><div class="footer-bottom-links"><a href="privacy-policy.html">Privacy Policy</a><span class="footer-dot">·</span><a href="terms-of-use.html">Terms of Use</a><span class="footer-dot">·</span><a href="index.html">Home</a></div></div></div>
      </footer>`;
  }
})();
