/**
 * 3D Gallery Cube JavaScript
 * Handles all interactive functionality for the 3D cube gallery
 */

document.addEventListener("DOMContentLoaded", () => {
  // Initialize 3D Gallery Cube
  initGalleryCube();
});

/**
 * Initialize the 3D Gallery Cube functionality
 */
function initGalleryCube() {
  const cube = document.getElementById("gallery-cube");
  const imageButtons = document.getElementById("gallery-buttons");
  const autoRotateBtn = document.getElementById("auto-rotate-btn");

  if (!cube || !imageButtons || !autoRotateBtn) {
    console.warn("Gallery cube elements not found");
    return;
  }

  let cubeImageClass = "initial-position";
  let isAutoRotating = false;
  let autoRotateInterval;

  // Handle thumbnail clicks
  imageButtons.addEventListener("click", (e) => {
    if (e.target.classList.contains("gallery-thumb")) {
      const targetClass = e.target.className
        .split(" ")
        .find((cls) => cls.startsWith("show-image-"));

      if (targetClass && targetClass !== cubeImageClass) {
        // Stop auto rotation when user manually selects
        stopAutoRotate();

        // Update cube rotation
        cube.classList.remove(cubeImageClass);
        cube.classList.add(targetClass);
        cubeImageClass = targetClass;

        // Update active thumbnail
        updateActiveThumbnail(e.target);

        // Add click feedback
        addClickFeedback(e.target);

        // Log for debugging
        console.log(
          `Showing image: ${targetClass.charAt(targetClass.length - 1)}`
        );
      }
    }
  });

  /**
   * Update active thumbnail state
   */
  function updateActiveThumbnail(activeThumb) {
    document.querySelectorAll(".gallery-thumb").forEach((thumb) => {
      thumb.classList.remove("active");
    });
    activeThumb.classList.add("active");
  }

  /**
   * Add click feedback animation
   */
  function addClickFeedback(element) {
    element.style.transform = "translateY(-8px) scale(0.95)";
    setTimeout(() => {
      element.style.transform = "";
    }, 150);
  }

  /**
   * Start auto rotation functionality
   */
  function startAutoRotate() {
    if (isAutoRotating) return;

    isAutoRotating = true;
    cube.classList.add("auto-rotate");

    // Update button appearance
    const icon = autoRotateBtn.querySelector("i");
    const text = autoRotateBtn.querySelector("span");
    icon.className = "fa-solid fa-pause";
    text.textContent = "Stop Rotate";

    // Cycle through images every 2 seconds
    let currentIndex = 1;
    autoRotateInterval = setInterval(() => {
      const targetClass = `show-image-${currentIndex}`;

      // Update cube
      cube.classList.remove(cubeImageClass);
      cube.classList.add(targetClass);
      cubeImageClass = targetClass;

      // Update active thumbnail
      const activeThumb = document.querySelector(`.${targetClass}`);
      if (activeThumb) {
        updateActiveThumbnail(activeThumb);
      }

      currentIndex = currentIndex >= 6 ? 1 : currentIndex + 1;
    }, 2000);
  }

  /**
   * Stop auto rotation functionality
   */
  function stopAutoRotate() {
    if (!isAutoRotating) return;

    isAutoRotating = false;
    cube.classList.remove("auto-rotate");

    if (autoRotateInterval) {
      clearInterval(autoRotateInterval);
      autoRotateInterval = null;
    }

    // Update button appearance
    const icon = autoRotateBtn.querySelector("i");
    const text = autoRotateBtn.querySelector("span");
    icon.className = "fa-solid fa-play";
    text.textContent = "Auto Rotate";
  }

  // Auto rotate button click handler
  autoRotateBtn.addEventListener("click", () => {
    if (isAutoRotating) {
      stopAutoRotate();
    } else {
      startAutoRotate();
    }

    // Add button click feedback
    autoRotateBtn.style.transform = "translateY(-1px) scale(0.98)";
    setTimeout(() => {
      autoRotateBtn.style.transform = "";
    }, 150);
  });

  /**
   * Initialize cube animation on scroll
   */
  function initScrollAnimation() {
    const observerOptions = {
      threshold: 0.3,
      rootMargin: "0px 0px -50px 0px",
    };

    const cubeObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Add entrance animation
          setTimeout(() => {
            cube.style.opacity = "1";
            cube.style.transform =
              "translateZ(-12.5rem) translateY(-2rem) rotateX(-15deg) rotateY(18deg) rotateZ(2deg)";
          }, 200);

          // Auto-start rotation after a delay
          setTimeout(() => {
            if (!isAutoRotating) {
              startAutoRotate();
            }
          }, 3000);

          cubeObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    cubeObserver.observe(cube);
  }

  /**
   * Setup hover interactions
   */
  function setupHoverInteractions() {
    // Pause auto rotation when user hovers over cube
    cube.addEventListener("mouseenter", () => {
      if (isAutoRotating) {
        cube.style.animationPlayState = "paused";
      }
    });

    cube.addEventListener("mouseleave", () => {
      if (isAutoRotating) {
        cube.style.animationPlayState = "running";
      }
    });

    // Add hover effects to thumbnails
    document.querySelectorAll(".gallery-thumb").forEach((thumb) => {
      thumb.addEventListener("mouseenter", () => {
        if (!thumb.classList.contains("active")) {
          thumb.style.transform = "translateY(-5px) scale(1.05)";
          thumb.style.opacity = "1";
        }
      });

      thumb.addEventListener("mouseleave", () => {
        if (!thumb.classList.contains("active")) {
          thumb.style.transform = "";
          thumb.style.opacity = "0.7";
        }
      });
    });
  }

  /**
   * Setup keyboard navigation
   */
  function setupKeyboardNavigation() {
    document.addEventListener("keydown", (e) => {
      const gallerySection = document.getElementById("gallery");
      const rect = gallerySection.getBoundingClientRect();
      const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;

      if (!isInViewport) return;

      let targetIndex;
      const currentIndex =
        parseInt(cubeImageClass.charAt(cubeImageClass.length - 1)) || 1;

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        targetIndex = currentIndex > 1 ? currentIndex - 1 : 6;
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        targetIndex = currentIndex < 6 ? currentIndex + 1 : 1;
      } else if (e.key === " " || e.key === "Spacebar") {
        e.preventDefault();
        // Toggle auto-rotate with spacebar
        if (isAutoRotating) {
          stopAutoRotate();
        } else {
          startAutoRotate();
        }
        return;
      }

      if (targetIndex) {
        stopAutoRotate();
        const targetClass = `show-image-${targetIndex}`;

        cube.classList.remove(cubeImageClass);
        cube.classList.add(targetClass);
        cubeImageClass = targetClass;

        const activeThumb = document.querySelector(`.${targetClass}`);
        if (activeThumb) {
          updateActiveThumbnail(activeThumb);
          // Add visual feedback for keyboard navigation
          addClickFeedback(activeThumb);
        }
      }
    });
  }

  /**
   * Setup touch/swipe navigation for mobile
   */
  function setupTouchNavigation() {
    let touchStartX = 0;
    let touchEndX = 0;
    let touchStartY = 0;
    let touchEndY = 0;
    const minSwipeDistance = 50;

    cube.addEventListener(
      "touchstart",
      (e) => {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
      },
      { passive: true }
    );

    cube.addEventListener(
      "touchend",
      (e) => {
        touchEndX = e.changedTouches[0].screenX;
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
      },
      { passive: true }
    );

    function handleSwipe() {
      const swipeDistanceX = touchEndX - touchStartX;
      const swipeDistanceY = touchEndY - touchStartY;

      // Check if it's a horizontal swipe and significant enough
      if (
        Math.abs(swipeDistanceX) > Math.abs(swipeDistanceY) &&
        Math.abs(swipeDistanceX) > minSwipeDistance
      ) {
        const currentIndex =
          parseInt(cubeImageClass.charAt(cubeImageClass.length - 1)) || 1;
        let targetIndex;

        if (swipeDistanceX > 0) {
          // Swipe right - go to previous
          targetIndex = currentIndex > 1 ? currentIndex - 1 : 6;
        } else {
          // Swipe left - go to next
          targetIndex = currentIndex < 6 ? currentIndex + 1 : 1;
        }

        stopAutoRotate();
        const targetClass = `show-image-${targetIndex}`;

        cube.classList.remove(cubeImageClass);
        cube.classList.add(targetClass);
        cubeImageClass = targetClass;

        const activeThumb = document.querySelector(`.${targetClass}`);
        if (activeThumb) {
          updateActiveThumbnail(activeThumb);
        }
      }
    }
  }

  /**
   * Handle responsive cube size adjustments
   */
  function handleResponsiveAdjustments() {
    function adjustCubeSize() {
      const screenWidth = window.innerWidth;
      let cubeSize, translateZ;

      if (screenWidth <= 480) {
        cubeSize = "16rem";
        translateZ = "8rem";
      } else if (screenWidth <= 768) {
        cubeSize = "20rem";
        translateZ = "10rem";
      } else {
        cubeSize = "25rem";
        translateZ = "12.5rem";
      }

      // Update CSS custom properties if needed
      document.documentElement.style.setProperty("--cube-size", cubeSize);
      document.documentElement.style.setProperty(
        "--cube-translate",
        translateZ
      );
    }

    window.addEventListener("resize", adjustCubeSize);
    adjustCubeSize(); // Initial call
  }

  /**
   * Initialize error handling for missing images
   */
  function initImageErrorHandling() {
    const cubeImages = document.querySelectorAll(".cube-face-image");
    const thumbImages = document.querySelectorAll(".gallery-thumb");

    // Handle cube face image errors
    cubeImages.forEach((img, index) => {
      img.addEventListener("error", () => {
        console.warn(`Gallery cube image ${index + 1} failed to load`);
        // Set a placeholder or default image
        img.src =
          "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300' viewBox='0 0 300 300'%3E%3Crect width='300' height='300' fill='%23f0f0f0'/%3E%3Ctext x='150' y='150' font-family='Arial' font-size='16' fill='%23999' text-anchor='middle' dy='0.3em'%3EImage ${index + 1}%3C/text%3E%3C/svg%3E";
      });
    });

    // Handle thumbnail image errors
    thumbImages.forEach((img, index) => {
      img.addEventListener("error", () => {
        console.warn(`Gallery thumbnail ${index + 1} failed to load`);
        img.src =
          "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Crect width='80' height='80' fill='%23f0f0f0'/%3E%3Ctext x='40' y='40' font-family='Arial' font-size='10' fill='%23999' text-anchor='middle' dy='0.3em'%3E${index + 1}%3C/text%3E%3C/svg%3E";
      });
    });
  }

  /**
   * Add performance optimizations
   */
  function addPerformanceOptimizations() {
    // Preload images
    const imageUrls = [
      "assets/gallery/project1.jpg",
      "assets/gallery/workspace.jpg",
      "assets/gallery/team.jpg",
      "assets/gallery/presentation.jpg",
      "assets/gallery/coding.jpg",
      "assets/gallery/achievement.jpg",
    ];

    imageUrls.forEach((url) => {
      const img = new Image();
      img.src = url;
    });

    // Reduce animation frequency when page is not visible
    document.addEventListener("visibilitychange", () => {
      if (document.hidden && isAutoRotating) {
        cube.style.animationPlayState = "paused";
      } else if (!document.hidden && isAutoRotating) {
        cube.style.animationPlayState = "running";
      }
    });
  }

  // Initialize all functionality
  initScrollAnimation();
  setupHoverInteractions();
  setupKeyboardNavigation();
  setupTouchNavigation();
  handleResponsiveAdjustments();
  initImageErrorHandling();
  addPerformanceOptimizations();

  // Log successful initialization
  console.log("3D Gallery Cube initialized successfully");
}

/**
 * Public API for external control (if needed)
 */
window.GalleryCube = {
  /**
   * Manually rotate to a specific face
   * @param {number} faceNumber - Face number (1-6)
   */
  rotateTo: function (faceNumber) {
    if (faceNumber < 1 || faceNumber > 6) {
      console.error("Face number must be between 1 and 6");
      return;
    }

    const cube = document.getElementById("gallery-cube");
    const targetClass = `show-image-${faceNumber}`;
    const currentClass = Array.from(cube.classList).find(
      (cls) => cls.startsWith("show-image-") || cls === "initial-position"
    );

    if (currentClass) {
      cube.classList.remove(currentClass);
    }
    cube.classList.add(targetClass);

    // Update thumbnail
    const activeThumb = document.querySelector(`.${targetClass}`);
    if (activeThumb) {
      document.querySelectorAll(".gallery-thumb").forEach((thumb) => {
        thumb.classList.remove("active");
      });
      activeThumb.classList.add("active");
    }
  },

  /**
   * Start auto rotation
   */
  startAutoRotate: function () {
    const btn = document.getElementById("auto-rotate-btn");
    if (btn) {
      btn.click();
    }
  },

  /**
   * Stop auto rotation
   */
  stopAutoRotate: function () {
    const btn = document.getElementById("auto-rotate-btn");
    if (btn && btn.querySelector("i").classList.contains("fa-pause")) {
      btn.click();
    }
  },
};
