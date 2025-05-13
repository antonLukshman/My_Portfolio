// Theme toggle functionality
document.addEventListener("DOMContentLoaded", () => {
  // Set the initial theme based on user preference or default to dark
  const savedTheme = localStorage.getItem("theme") || "dark";
  document.documentElement.setAttribute("data-theme", savedTheme);

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

  // Certificate modal functionality
  const certificateItems = document.querySelectorAll(".view-certificate");
  const modal = document.querySelector(".certificate-modal");
  const closeModal = document.querySelector(".close-modal");
  const modalImage = document.getElementById("modal-image");
  const modalTitle = document.getElementById("modal-title");
  const modalIssuer = document.getElementById("modal-issuer");
  const modalDate = document.getElementById("modal-date");

  certificateItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const certificateItem = item.closest(".certificate-item");
      const img = certificateItem.querySelector("img").src;
      const title =
        certificateItem.querySelector(".certificate-title").textContent;
      const issuer = certificateItem.querySelector(
        ".certificate-issuer"
      ).textContent;
      const date =
        certificateItem.querySelector(".certificate-date").textContent;

      modalImage.src = img;
      modalTitle.textContent = title;
      modalIssuer.textContent = issuer;
      modalDate.textContent = date;

      modal.style.display = "flex";
    });
  });

  if (closeModal) {
    closeModal.addEventListener("click", () => {
      modal.style.display = "none";
    });
  }

  // Close modal when clicking outside
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });
  }

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });

  // Skill progress animation on scroll
  const progressBars = document.querySelectorAll(".progress-bar");
  const animateSkills = () => {
    progressBars.forEach((bar) => {
      const rect = bar.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;

      if (isVisible) {
        const width =
          bar.parentElement.parentElement.querySelector(
            ".skill-percentage"
          ).textContent;
        bar.style.width = width;
      }
    });
  };

  // First run to check if skills are already visible
  animateSkills();

  // Then run on scroll
  window.addEventListener("scroll", animateSkills);

  // Simple slider functionality
  const nextButton = document.querySelector(".next-button");
  const prevButton = document.querySelector(".prev-button");

  if (nextButton && prevButton) {
    let currentSlide = 0;
    const slides = document.querySelectorAll(".achievement-slide");

    // Hide all slides except the first one
    if (slides.length > 1) {
      for (let i = 1; i < slides.length; i++) {
        slides[i].style.display = "none";
      }
    }

    nextButton.addEventListener("click", () => {
      slides[currentSlide].style.display = "none";
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].style.display = "block";
    });

    prevButton.addEventListener("click", () => {
      slides[currentSlide].style.display = "none";
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      slides[currentSlide].style.display = "block";
    });
  }

  // Video play button functionality
  const playButton = document.querySelector(".play-button");
  if (playButton) {
    playButton.addEventListener("click", () => {
      alert("Video player would be implemented here with a real video source");
    });
  }

  // Section highlight on scroll
  const sections = document.querySelectorAll("section");
  const navItems = document.querySelectorAll(".nav-item");

  const highlightNavItem = () => {
    let scrollPosition = window.scrollY;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        navItems.forEach((item) => {
          item.classList.remove("active");
          if (item.getAttribute("href") === `#${sectionId}`) {
            item.classList.add("active");
          }
        });
      }
    });
  };

  window.addEventListener("scroll", highlightNavItem);

  // Initial call to highlight the current section
  highlightNavItem();

  // Typing animation effect for hero subtitle
  const heroSubtitle = document.querySelector(".hero-subtitle");
  if (heroSubtitle) {
    const text = heroSubtitle.textContent;
    heroSubtitle.textContent = "";

    let charIndex = 0;
    const typeWriter = () => {
      if (charIndex < text.length) {
        heroSubtitle.textContent += text.charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, 100);
      }
    };

    setTimeout(typeWriter, 1000);
  }

  // Reveal animations for sections
  const revealOnScroll = () => {
    const revealPoint = window.innerHeight * 0.75;

    sections.forEach((section) => {
      const sectionTop = section.getBoundingClientRect().top;

      if (sectionTop < revealPoint) {
        section.classList.add("active");
      }
    });
  };

  window.addEventListener("scroll", revealOnScroll);
  window.addEventListener("load", revealOnScroll);
});
