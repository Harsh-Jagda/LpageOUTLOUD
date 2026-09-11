(function () {
  "use strict";

  document.documentElement.classList.remove("no-js");

  /* ---------- Mobile nav ---------- */
  var navToggle = document.getElementById("nav-toggle");
  var siteNav = document.getElementById("site-nav");

  function closeNav() {
    if (!siteNav || !navToggle) return;
    siteNav.classList.remove("is-open");
    navToggle.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  }

  if (navToggle && siteNav) {
    navToggle.addEventListener("click", function () {
      var open = siteNav.classList.toggle("is-open");
      navToggle.classList.toggle("is-open", open);
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    siteNav.addEventListener("click", function (e) {
      if (e.target.closest("a")) closeNav();
    });
  }

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- Event data ---------- */
  var applyLinks = document.querySelectorAll(".js-apply-link");
  var applyOpen = document.getElementById("apply-open");
  var applyClosed = document.getElementById("apply-closed");
  var deadlineWrap = document.getElementById("event-deadline-wrap");
  var deadlineEl = document.getElementById("event-deadline");

  var venueTbd = document.getElementById("venue-tbd");
  var venueDetails = document.getElementById("venue-details");
  var dateEl = document.getElementById("event-date");
  var timeEl = document.getElementById("event-time");
  var venueNameEl = document.getElementById("event-venue-name");
  var venueAddressEl = document.getElementById("event-venue-address");
  var directionsEl = document.getElementById("event-directions");

  fetch("data/next-event.json")
    .then(function (res) {
      if (!res.ok) throw new Error("event data HTTP " + res.status);
      return res.json();
    })
    .then(function (data) {
      var i;

      // Applications: show the open state only when a form URL exists
      if (data.applyUrl) {
        for (i = 0; i < applyLinks.length; i++) {
          applyLinks[i].setAttribute("href", data.applyUrl);
          applyLinks[i].setAttribute("target", "_blank");
          applyLinks[i].setAttribute("rel", "noopener");
        }
        if (applyOpen) applyOpen.hidden = false;
        if (applyClosed) applyClosed.hidden = true;
        if (deadlineEl && deadlineWrap && data.applyDeadline) {
          deadlineEl.textContent = data.applyDeadline;
          deadlineWrap.hidden = false;
        }
      }

      // Next meeting: show details only when a date is set
      if (data.date) {
        if (venueTbd) venueTbd.hidden = true;
        if (venueDetails) venueDetails.hidden = false;

        if (dateEl) dateEl.textContent = data.date;
        if (timeEl) {
          timeEl.textContent = (data.timeStart && data.timeEnd)
            ? data.timeStart + " \u2013 " + data.timeEnd
            : "Time to be announced";
        }

        if (data.venueTbd) {
          if (venueNameEl) venueNameEl.textContent = "Venue to be announced";
          if (venueAddressEl) venueAddressEl.textContent = "We're locking in the exact spot. Check back soon.";
          if (directionsEl) directionsEl.hidden = true;
        } else {
          if (venueNameEl) venueNameEl.textContent = data.venueName;
          if (venueAddressEl) venueAddressEl.textContent = data.venueAddress;
          if (directionsEl) {
            directionsEl.hidden = false;
            directionsEl.setAttribute(
              "href",
              "https://www.google.com/maps/search/?api=1&query=" +
                encodeURIComponent(data.venueName + ", " + data.venueAddress)
            );
          }
        }
      }
    })
    .catch(function (err) {
      console.error("OUTLOUD: could not load event data:", err);
    });
})();
