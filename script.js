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
      setTimeout(adjustHeroLayout, 50); // Update layout after theme change
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

  // Back to top button functionality
  const backToTopBtn = document.querySelector(".back-to-top");
  if (backToTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 500) {
        backToTopBtn.classList.add("visible");
      } else {
        backToTopBtn.classList.remove("visible");
      }
    });

    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // Form validation
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      let hasError = false;

      // Reset previous errors
      const errorMessages = document.querySelectorAll(".form-error-message");
      errorMessages.forEach((msg) => msg.remove());
      const errorInputs = document.querySelectorAll(".form-control.error");
      errorInputs.forEach((input) => input.classList.remove("error"));

      // Validate name
      const nameInput = document.getElementById("name");
      if (!nameInput.value.trim()) {
        displayError(nameInput, "Please enter your name");
        hasError = true;
      }

      // Validate email
      const emailInput = document.getElementById("email");
      if (!validateEmail(emailInput.value)) {
        displayError(emailInput, "Please enter a valid email address");
        hasError = true;
      }

      // Validate message
      const messageInput = document.getElementById("message");
      if (!messageInput.value.trim()) {
        displayError(messageInput, "Please enter your message");
        hasError = true;
      }

      if (!hasError) {
        // Form is valid - would send data to server in real implementation
        alert("Form submitted successfully! (This is a demo alert)");
        contactForm.reset();
      }
    });

    function validateEmail(email) {
      const re =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }

    function displayError(input, message) {
      input.classList.add("error");
      const errorElement = document.createElement("div");
      errorElement.className = "form-error-message";
      errorElement.innerText = message;
      input.parentNode.appendChild(errorElement);
    }
  }

  // Mobile Hero layout adjustment
  function adjustHeroLayout() {
    const isMobile = window.innerWidth <= 767;
    const videoBackground = document.querySelector(".video-background");
    const heroContent = document.querySelector(".hero-content-mobile");
    const heroContentContainer = document.querySelector(
      ".hero-content-container"
    );
    const profileSection = document.querySelector(".profile-section");
    const statsSection = document.querySelector(".stats-section");

    if (isMobile) {
      // Mobile specific adjustments
      if (videoBackground) {
        videoBackground.style.height = "40vh";
        videoBackground.style.width = "100%";
        videoBackground.style.borderRadius = "0";
      }

      if (heroContent) {
        heroContent.style.position = "absolute";
        heroContent.style.top = "0";
        heroContent.style.left = "0";
        heroContent.style.height = "40vh";
        heroContent.style.width = "100%";
        heroContent.style.zIndex = "1";
        heroContent.style.textAlign = "center";
        heroContent.style.alignItems = "center";
      }

      if (profileSection) {
        profileSection.style.backgroundColor = "var(--secondary-bg)";
        profileSection.style.width = "100%";
        profileSection.style.maxWidth = "100%";
        profileSection.style.borderRadius = "0";
        profileSection.style.backdropFilter = "none";
        profileSection.style.border = "none";
      }

      if (statsSection) {
        statsSection.style.width = "100%";
        statsSection.style.margin = "0";
      }
    } else {
      // Desktop layout adjustments
      if (videoBackground) {
        videoBackground.style.width = "90%";
        videoBackground.style.height = "85vh";
        videoBackground.style.margin = "0 auto";
        videoBackground.style.borderRadius = "15px";
      }

      if (heroContentContainer) {
        heroContentContainer.style.display = "flex";
        heroContentContainer.style.height = "85vh";
      }

      if (heroContent) {
        heroContent.style.position = "relative";
        heroContent.style.top = "auto";
        heroContent.style.left = "auto";
        heroContent.style.flex = "3";
        heroContent.style.textAlign = "left";
        heroContent.style.alignItems = "flex-start";
      }

      if (profileSection) {
        profileSection.style.backgroundColor = "rgba(36, 21, 53, 0.85)";
        profileSection.style.backdropFilter = "blur(5px)";
        profileSection.style.border = "1px solid rgba(138, 79, 255, 0.2)";
        profileSection.style.flex = "2";
        profileSection.style.maxWidth = "350px";
        profileSection.style.margin = "3.5rem 0 0 0";
        profileSection.style.borderRadius = "15px";

        // Check theme for light mode adjustments
        const theme = document.documentElement.getAttribute("data-theme");
        if (theme === "light") {
          profileSection.style.backgroundColor = "rgba(245, 245, 247, 0.85)";
          profileSection.style.border = "1px solid rgba(100, 37, 208, 0.2)";
        }
      }

      if (statsSection) {
        statsSection.style.width = "90%";
        statsSection.style.margin = "1rem auto 2rem";
      }
    }
  }

  // Run on load and window resize
  window.addEventListener("resize", adjustHeroLayout);
  adjustHeroLayout();
});

// Run on load and window resize
window.addEventListener("resize", adjustHeroLayout);
adjustHeroLayout();
