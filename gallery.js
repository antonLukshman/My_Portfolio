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

  if (!cube) {
    console.warn("Gallery cube element not found");
    return;
  }

  let cubeImageClass = "initial-position";
  let isAutoRotating = false;
  let autoRotateInterval;
  let currentFace = 1; // Track the current face (1-6)

  // Add cursor pointer to cube to indicate it's clickable
  cube.style.cursor = "pointer";

  // Start auto rotation immediately
  startAutoRotate();

  // Add click event to toggle rotation
  cube.addEventListener("click", toggleRotation);

  /**
   * Toggle rotation on click
   */
  function toggleRotation() {
    if (isAutoRotating) {
      stopAutoRotate();
    } else {
      // Resume from current state
      startAutoRotate();
    }
  }

  /**
   * Stop auto rotation functionality and preserve current state
   */
  function stopAutoRotate() {
    if (!isAutoRotating) return;

    isAutoRotating = false;

    // Important: Get the current visible face before stopping
    // Check which classes are currently applied
    const classes = Array.from(cube.classList);
    for (let i = 1; i <= 6; i++) {
      if (classes.includes(`show-image-${i}`)) {
        currentFace = i;
        break;
      }
    }

    // Remove auto-rotate class to stop animation
    cube.classList.remove("auto-rotate");

    if (autoRotateInterval) {
      clearInterval(autoRotateInterval);
      autoRotateInterval = null;
    }

    // Update instructions text
    const instructionsText = document.querySelector(".instructions-text");
    if (instructionsText) {
      instructionsText.textContent = "Click the cube to resume rotation";
    }
  }

  /**
   * Start auto rotation functionality
   */
  function startAutoRotate() {
    if (isAutoRotating) return;

    isAutoRotating = true;

    // Make sure cube has the correct face showing before starting animation
    updateVisibleFace();

    // Add auto-rotate class to start animation
    cube.classList.add("auto-rotate");

    // Cycle through images every 3 seconds
    autoRotateInterval = setInterval(() => {
      // Move to next face
      currentFace = currentFace >= 6 ? 1 : currentFace + 1;
      updateVisibleFace();
    }, 3000); // 3 seconds for better viewing

    // Update instructions text
    const instructionsText = document.querySelector(".instructions-text");
    if (instructionsText) {
      instructionsText.textContent = "Click the cube to pause rotation";
    }
  }

  /**
   * Update the visible face of the cube
   */
  function updateVisibleFace() {
    // Remove any previous image class
    for (let i = 1; i <= 6; i++) {
      cube.classList.remove(`show-image-${i}`);
    }
    cube.classList.remove("initial-position");

    // Add the current face class
    const targetClass = `show-image-${currentFace}`;
    cube.classList.add(targetClass);
    cubeImageClass = targetClass;
  }

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
          }, 1000);

          cubeObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    cubeObserver.observe(cube);
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

  // Initialize all needed functionality
  initScrollAnimation();
  handleResponsiveAdjustments();
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

    // Remove any previous image classes
    for (let i = 1; i <= 6; i++) {
      cube.classList.remove(`show-image-${i}`);
    }
    cube.classList.remove("initial-position");

    // Add the target class
    cube.classList.add(targetClass);
  },
};
