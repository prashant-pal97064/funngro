// =============================
//   FUNNGRO - Main JavaScript
//   Author: Student project
// =============================

document.addEventListener('DOMContentLoaded', function () {

  // ---- 1. Initialize AOS (Animate on Scroll) ----
  AOS.init({
    duration: 700,
    easing: 'ease-in-out',
    once: true,
    offset: 80,
  });


  // ---- 2. Navbar: hamburger toggle ----
  var hamburger = document.getElementById('hamburger');
  var navLinks  = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      navLinks.classList.toggle('open');

      // Switch icon between bars and X
      var icon = hamburger.querySelector('i');
      if (navLinks.classList.contains('open')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        var icon = hamburger.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      });
    });
  }


  // ---- 3. Navbar: add shadow on scroll ----
  var navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }


  // ---- 4. Animated counters (count up when visible) ----
  var counters = document.querySelectorAll('.counter');

  if (counters.length > 0) {
    var counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          startCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });

    counters.forEach(function (counter) {
      counterObserver.observe(counter);
    });
  }

  function startCounter(el) {
    var target   = parseInt(el.getAttribute('data-target'), 10);
    var suffix   = el.getAttribute('data-suffix') || '';
    var prefix   = el.getAttribute('data-prefix') || '';
    var duration = 2000; // ms
    var stepTime = 20;   // ms per tick
    var steps    = duration / stepTime;
    var increment = target / steps;
    var current  = 0;

    var timer = setInterval(function () {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = prefix + formatNumber(Math.floor(current)) + suffix;
    }, stepTime);
  }

  // Add commas to numbers: 50000 → 50,000
  function formatNumber(n) {
    return n.toLocaleString('en-IN');
  }


  // ---- 5. FAQ Accordion ----
  var faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(function (item) {
    var question = item.querySelector('.faq-question');
    if (!question) return;

    question.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');

      // Close all open items first
      faqItems.forEach(function (other) {
        other.classList.remove('open');
      });

      // If this one wasn't open, open it
      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });


  // ---- 6. Smooth scrolling for anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;

      var targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        var offset = 80; // height of fixed navbar
        var top = targetEl.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });


  // ---- 7. Highlight active nav link based on current page ----
  var currentPage = window.location.pathname;
  var allNavLinks = document.querySelectorAll('.nav-links a');

  allNavLinks.forEach(function (link) {
    link.classList.remove('active');
    var linkPath = new URL(link.href).pathname;

    if (linkPath === currentPage) {
      link.classList.add('active');
    }
    // Special case: mark '/' as active only on index
    if (currentPage === '/' && linkPath === '/') {
      link.classList.add('active');
    }
  });

}); // end DOMContentLoaded
