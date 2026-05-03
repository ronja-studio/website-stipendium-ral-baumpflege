/* Email obfuscation: assembles addresses at runtime so bots
   scraping the static HTML never see a literal "@" address.
   Mark elements with data-mail-user, data-mail-domain, data-mail-tld.
   Optional: data-mail-subject (for mailto), data-mail-show="true"
   (also sets the visible text to the email itself). */
(function () {
  document.querySelectorAll('[data-mail-user]').forEach(function (el) {
    var user = el.dataset.mailUser;
    var domain = el.dataset.mailDomain;
    var tld = el.dataset.mailTld;
    var subject = el.dataset.mailSubject;
    var email = user + '@' + domain + '.' + tld;

    if (el.tagName === 'A') {
      var mailto = 'mai' + 'lto:' + email;
      if (subject) mailto += '?subject=' + encodeURIComponent(subject);
      el.href = mailto;
      if (el.dataset.mailShow === 'true' && !el.textContent.trim()) {
        el.textContent = email;
      }
    } else {
      el.textContent = email;
    }
  });
})();
