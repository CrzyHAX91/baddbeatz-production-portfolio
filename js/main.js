// UI interaction scripts for BaddBeatz Portfolio

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Animations on scroll using IntersectionObserver
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.classList.add('opacity-0');
    observer.observe(section);
});

// Generate track button animation and loading/success feedback
const generateTrackBtn = document.getElementById('generate-track-btn');
const generateTrackLoading = document.getElementById('generate-track-loading');
const generateTrackSuccess = document.getElementById('generate-track-success');

if (generateTrackBtn && generateTrackLoading && generateTrackSuccess) {
    generateTrackBtn.addEventListener('click', function () {
        this.setAttribute('aria-busy', 'true');
        generateTrackLoading.classList.remove('hidden');
        generateTrackSuccess.classList.add('hidden');
        this.classList.add('animate-pulse');

        // Simulate async track generation
        setTimeout(() => {
            this.classList.remove('animate-pulse');
            this.setAttribute('aria-busy', 'false');
            generateTrackLoading.classList.add('hidden');
            generateTrackSuccess.classList.remove('hidden');
        }, 3000);
    });
}

// Mobile menu functionality with aria-expanded toggle
const mobileMenuButton = document.querySelector('.mobile-menu-button');
const mobileMenuClose = document.querySelector('.mobile-menu-close');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

const toggleMobileMenu = () => {
    const isActive = mobileMenu.classList.toggle('active');
    document.body.classList.toggle('overflow-hidden');
    if (mobileMenuButton) {
        mobileMenuButton.setAttribute('aria-expanded', isActive);
    }
};

if (mobileMenu) {
    mobileMenu.classList.remove('hidden');

    // Prevent background scrolling when menu is open
    const preventScroll = (e) => {
        if (mobileMenu.classList.contains('active')) {
            e.preventDefault();
        }
    };

    document.addEventListener('touchmove', preventScroll, { passive: false });
    document.addEventListener('wheel', preventScroll, { passive: false });
}

if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', toggleMobileMenu);
    mobileMenuClose.addEventListener('click', toggleMobileMenu);

    // Close menu when clicking a link
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            toggleMobileMenu();
        });
    });

    // Close menu when pressing Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
    });

    // Close menu when clicking outside (but not on the menu button)
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.mobile-menu-content') &&
            !e.target.closest('.mobile-menu-button') &&
            mobileMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
    });

    // Prevent clicks inside menu from closing it
    mobileMenu.querySelector('.mobile-menu-content').addEventListener('click', (e) => {
        e.stopPropagation();
    });
}

// Post Now button confirmation message
const postNowBtn = document.getElementById('post-now-btn');
const postNowSuccess = document.getElementById('post-now-success');

const contentLoading = document.getElementById('content-loading');
const musicLoading = document.getElementById('music-loading');

if (postNowBtn && postNowSuccess) {
    postNowBtn.addEventListener('click', () => {
        postNowBtn.setAttribute('aria-busy', 'true');
        postNowSuccess.classList.add('hidden');

        // Simulate async post action
        setTimeout(() => {
            postNowBtn.setAttribute('aria-busy', 'false');
            postNowSuccess.classList.remove('hidden');
        }, 2000);
    });
}

// Simulate loading for content and music generation sections
if (contentLoading) {
    contentLoading.classList.remove('hidden');
    setTimeout(() => {
        contentLoading.classList.add('hidden');
    }, 3000);
}

if (musicLoading) {
    musicLoading.classList.remove('hidden');
    setTimeout(() => {
        musicLoading.classList.add('hidden');
    }, 3000);
}

// Add interactive animations for buttons and links
document.querySelectorAll('button, a').forEach(el => {
    el.addEventListener('mouseenter', () => {
        el.classList.add('scale-105', 'shadow-lg');
    });
    el.addEventListener('mouseleave', () => {
        el.classList.remove('scale-105', 'shadow-lg');
    });
});

// Lazy load images for performance optimization
document.addEventListener('DOMContentLoaded', () => {
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
    });
});

// Error handling and user notifications example
window.addEventListener('error', (event) => {
    console.error('Global error caught:', event.error);
    alert('An unexpected error occurred. Please try again later.');
});

// Example unit test for a utility function (using Jest syntax)
// This is a placeholder; actual tests should be in separate test files
function sum(a, b) {
    return a + b;
}

// Simple test
if (typeof test === 'function') {
    test('sum adds two numbers', () => {
        expect(sum(1, 2)).toBe(3);
    });
}

// Keyboard navigation improvements for mobile menu
{
  const mobileMenuButton = document.querySelector('.mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuClose = document.querySelector('.mobile-menu-close');

  if (mobileMenuButton && mobileMenu && mobileMenuClose) {
      mobileMenuButton.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              mobileMenu.classList.add('active');
              mobileMenuButton.setAttribute('aria-expanded', 'true');
              mobileMenuClose.focus();
          }
      });

      mobileMenuClose.addEventListener('keydown', (e) => {
          if (e.key === 'Escape') {
              mobileMenu.classList.remove('active');
              mobileMenuButton.setAttribute('aria-expanded', 'false');
              mobileMenuButton.focus();
          }
      });
  }
}
