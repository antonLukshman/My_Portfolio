document.addEventListener("DOMContentLoaded", () => {
  // Set the initial theme based on user preference or default to dark
  const savedTheme = localStorage.getItem("theme") || "dark";
  document.documentElement.setAttribute("data-theme", savedTheme);

  // Typing animation for profile titles
  const typingText = document.querySelector(".typing-text");
  const cursor = document.querySelector(".cursor");
  const titles = ["FAST LEARNER", "BUG HUNTER", "CTF PLAYER", "WEB DEVELOPER"];

  let titleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function typeTitle() {
    const currentTitle = titles[titleIndex];

    if (isDeleting) {
      // Deleting text
      typingText.textContent = currentTitle.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50; // Faster deletion

      if (charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        typingSpeed = 300; // Pause before typing next title
      }
    } else {
      // Typing text
      typingText.textContent = currentTitle.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 150; // Slower typing

      if (charIndex === currentTitle.length) {
        isDeleting = true;
        typingSpeed = 1500; // Pause before deleting
      }
    }

    setTimeout(typeTitle, typingSpeed);
  }

  // Start typing animation
  if (typingText && cursor) {
    setTimeout(typeTitle, 1000);
  }

  // Theme toggle functionality
  const themeToggles = document.querySelectorAll(".theme-toggle");
  themeToggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const currentTheme = document.documentElement.getAttribute("data-theme");
      const newTheme = currentTheme === "dark" ? "light" : "dark";

      document.documentElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
    });
  });

  // Mobile menu popup toggle
  const menuToggle = document.querySelector(".menu-toggle");
  const popupMenu = document.querySelector(".mobile-menu-popup");
  const closeMobileMenu = document.querySelector(".close-mobile-menu");

  if (menuToggle && popupMenu) {
    menuToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      popupMenu.classList.add("active");
    });
  }

  if (closeMobileMenu && popupMenu) {
    closeMobileMenu.addEventListener("click", (e) => {
      e.stopPropagation();
      popupMenu.classList.remove("active");
    });
  }

  // Close popup menu when clicking anywhere else
  document.addEventListener("click", (e) => {
    if (
      popupMenu &&
      popupMenu.classList.contains("active") &&
      !popupMenu.contains(e.target) &&
      !menuToggle.contains(e.target)
    ) {
      popupMenu.classList.remove("active");
    }
  });

  // Close popup menu when clicking a menu item
  const popupItems = document.querySelectorAll(".popup-item");
  popupItems.forEach((item) => {
    item.addEventListener("click", () => {
      if (popupMenu) {
        popupMenu.classList.remove("active");
      }
    });
  });

  // Video controls
  const heroVideo = document.getElementById("hero-video");
  if (heroVideo) {
    // Ensure video plays and loops correctly
    heroVideo.play().catch((error) => {
      console.log("Video autoplay prevented:", error);
    });

    // Add play/pause functionality for mobile
    heroVideo.addEventListener("click", () => {
      if (heroVideo.paused) {
        heroVideo.play();
      } else {
        heroVideo.pause();
      }
    });
  }

  // Video resume button
  const videoResumeBtn = document.querySelector(".video-resume-btn");
  if (videoResumeBtn) {
    videoResumeBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const videoSection = document.getElementById("video-resume");
      if (videoSection) {
        videoSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  // Play button functionality
  const playButton = document.querySelector(".play-button");
  if (playButton) {
    playButton.addEventListener("click", () => {
      alert("Video player would be implemented here with a real video source");
    });
  }

  // Skill progress animation on scroll
  const progressBars = document.querySelectorAll(".progress-bar");
  const animateSkills = () => {
    progressBars.forEach((bar) => {
      const rect = bar.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;

      if (isVisible) {
        const progress = bar.getAttribute("data-progress");
        bar.style.width = progress;
      }
    });
  };

  // First run to check if skills are already visible
  animateSkills();

  // Then run on scroll
  window.addEventListener("scroll", animateSkills);

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetElement = document.querySelector(this.getAttribute("href"));
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });

  // Add animation classes on scroll
  const animateOnScroll = () => {
    const sections = document.querySelectorAll("section");
    sections.forEach((section) => {
      const sectionTop = section.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (sectionTop < windowHeight * 0.75) {
        section.classList.add("fade-in-up");
      }
    });
  };

  // Run animation check on page load and scroll
  animateOnScroll();
  window.addEventListener("scroll", animateOnScroll);

  // Active navigation highlight
  const highlightNav = () => {
    const sections = document.querySelectorAll("section");
    const navItems = document.querySelectorAll(".nav-item");

    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;

      if (
        window.scrollY >= sectionTop &&
        window.scrollY < sectionTop + sectionHeight
      ) {
        current = section.getAttribute("id");
      }
    });

    navItems.forEach((item) => {
      item.classList.remove("active");
      if (item.getAttribute("href") === `#${current}`) {
        item.classList.add("active");
      }
    });
  };

  window.addEventListener("scroll", highlightNav);
  highlightNav(); // Run once on page load

  // Scroll indicator button functionality
  const scrollDownBtn = document.getElementById("scroll-down-btn");
  if (scrollDownBtn) {
    scrollDownBtn.addEventListener("click", () => {
      // Find the next section after #hero
      const heroSection = document.getElementById("hero");
      let nextSection = heroSection && heroSection.nextElementSibling;
      while (nextSection && nextSection.tagName.toLowerCase() !== "section") {
        nextSection = nextSection.nextElementSibling;
      }
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  // Initialize Achievements Carousel
  initAchievementsCarousel();

  // Re-initialize on window resize to handle any layout changes
  window.addEventListener("resize", function () {
    clearTimeout(window.resizeTimeout);
    window.resizeTimeout = setTimeout(function () {
      initAchievementsCarousel();
    }, 250);
  });

  adjustHeroLayout();
});

window.addEventListener("resize", adjustHeroLayout);

function adjustHeroLayout() {
  const isMobile = window.innerWidth <= 767;
  const heroVideo = document.getElementById("hero-video");
  const heroContent = document.querySelector(".hero-content-mobile");

  if (isMobile) {
    // Ensure proper mobile layout when screen size changes
    if (heroVideo) {
      heroVideo.style.objectFit = "cover";
    }
    if (heroContent) {
      heroContent.style.height = "40vh";
    }
  } else {
    // Reset styles for desktop view
    if (heroContent) {
      heroContent.style.height = "auto";
    }
  }
}

/**
 * Initialize the achievements carousel
 */
function initAchievementsCarousel() {
  const carousel = document.querySelector(".achievements-carousel");
  if (!carousel) return;

  const slides = carousel.querySelectorAll(".carousel-slide");
  const dots = carousel.querySelectorAll(".carousel-dot");
  const prevBtn = carousel.querySelector(".prev-slide");
  const nextBtn = carousel.querySelector(".next-slide");

  if (!slides.length || !dots.length || !prevBtn || !nextBtn) return;

  let currentSlide = 0;
  const totalSlides = slides.length;
  let autoRotateInterval;
  let isAnimating = false;

  // Set up initial slide
  showSlide(0);

  // Start auto-rotation
  startAutoRotate();

  // Set up event listeners
  prevBtn.addEventListener("click", goToPrevSlide);
  nextBtn.addEventListener("click", goToNextSlide);

  // Set up dot navigation
  dots.forEach((dot) => {
    dot.addEventListener("click", function () {
      if (isAnimating) return;
      const slideIndex = parseInt(this.getAttribute("data-index"));
      showSlide(slideIndex);
    });
  });

  // Pause auto-rotate on hover
  carousel.addEventListener("mouseenter", stopAutoRotate);
  carousel.addEventListener("mouseleave", startAutoRotate);

  // Touch events for mobile swipe
  setupSwipeEvents(carousel);

  /**
   * Show a specific slide by index
   */
  function showSlide(index) {
    if (isAnimating) return;
    isAnimating = true;

    // Update current slide index
    currentSlide = index;

    // Reset all slides
    slides.forEach((slide) => {
      slide.classList.remove("active");
      resetSlideAnimations(slide);
    });

    // Reset all dots
    dots.forEach((dot) => {
      dot.classList.remove("active");
    });

    // Activate current slide and dot
    slides[currentSlide].classList.add("active");
    dots[currentSlide].classList.add("active");

    // Animate slide content
    animateSlide(slides[currentSlide]);

    // Allow next animation after current one completes
    setTimeout(() => {
      isAnimating = false;
    }, 800); // Match this with the longest animation duration
  }

  /**
   * Go to the previous slide
   */
  function goToPrevSlide() {
    if (isAnimating) return;

    let prevIndex = currentSlide - 1;
    if (prevIndex < 0) {
      prevIndex = totalSlides - 1;
    }

    showSlide(prevIndex);
  }

  /**
   * Go to the next slide
   */
  function goToNextSlide() {
    if (isAnimating) return;

    let nextIndex = currentSlide + 1;
    if (nextIndex >= totalSlides) {
      nextIndex = 0;
    }

    showSlide(nextIndex);
  }

  /**
   * Reset animations for a slide
   */
  function resetSlideAnimations(slide) {
    const elements = slide.querySelectorAll(
      ".certificate-image, .certificate-title, .certificate-organization, .certificate-description"
    );
    elements.forEach((el) => {
      el.style.opacity = 0;
      el.classList.remove("fade-in");
      el.classList.remove("slide-in-right");
    });
  }

  /**
   * Animate elements within a slide
   */
  function animateSlide(slide) {
    // First reset all animations
    resetSlideAnimations(slide);

    // Sequence the animations with delays
    setTimeout(() => {
      const img = slide.querySelector(".certificate-image");
      if (img) {
        img.style.opacity = 1;
        img.classList.add("fade-in");
      }
    }, 100);

    setTimeout(() => {
      const title = slide.querySelector(".certificate-title");
      if (title) {
        title.style.opacity = 1;
        title.classList.add("slide-in-right");
      }
    }, 300);

    setTimeout(() => {
      const org = slide.querySelector(".certificate-organization");
      if (org) {
        org.style.opacity = 1;
        org.classList.add("slide-in-right");
      }
    }, 400);

    setTimeout(() => {
      const desc = slide.querySelector(".certificate-description");
      if (desc) {
        desc.style.opacity = 1;
        desc.classList.add("fade-in");
      }
    }, 500);
  }

  /**
   * Start auto-rotation of slides
   */
  function startAutoRotate() {
    stopAutoRotate();
    autoRotateInterval = setInterval(() => {
      goToNextSlide();
    }, 5000); // Change slides every 5 seconds
  }

  /**
   * Stop auto-rotation of slides
   */
  function stopAutoRotate() {
    if (autoRotateInterval) {
      clearInterval(autoRotateInterval);
      autoRotateInterval = null;
    }
  }

  /**
   * Setup touch swipe events for mobile
   */
  function setupSwipeEvents(element) {
    let touchStartX = 0;
    let touchEndX = 0;
    const minSwipeDistance = 50; // Minimum distance required for a swipe

    element.addEventListener(
      "touchstart",
      function (e) {
        touchStartX = e.changedTouches[0].screenX;
      },
      { passive: true }
    );

    element.addEventListener(
      "touchend",
      function (e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
      },
      { passive: true }
    );

    function handleSwipe() {
      const swipeDistance = touchEndX - touchStartX;

      // Check if swipe is long enough to be considered a swipe
      if (Math.abs(swipeDistance) < minSwipeDistance) return;

      if (swipeDistance > 0) {
        // Swiped right, go to previous slide
        goToPrevSlide();
      } else {
        // Swiped left, go to next slide
        goToNextSlide();
      }
    }

    // Add keyboard navigation
    document.addEventListener("keydown", function (e) {
      // Only respond to keyboard if carousel is in viewport
      const rect = carousel.getBoundingClientRect();
      const isInViewport =
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <=
          (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <=
          (window.innerWidth || document.documentElement.clientWidth);

      if (!isInViewport) return;

      if (e.key === "ArrowLeft") {
        goToPrevSlide();
      } else if (e.key === "ArrowRight") {
        goToNextSlide();
      }
    });
  }
}
