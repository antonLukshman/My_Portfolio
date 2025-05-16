/**
 * Modern Timeline Animation - Tree View
 * Displays all timeline instances side by side in a tree-like structure
 */

document.addEventListener("DOMContentLoaded", () => {
  // Initialize the tree timeline view
  initTreeTimeline();
});

/**
 * Initialize the tree timeline layout
 */
function initTreeTimeline() {
  const journeySection = document.getElementById("journey");
  if (!journeySection) return;

  // Create the tree timeline structure
  createTreeTimelineStructure(journeySection);

  // Animate timeline entrance
  animateTreeTimelineEntrance();

  // Setup year tab navigation
  setupYearTabNavigation();
}

/**
 * Create the tree timeline structure showing all entries simultaneously
 * @param {HTMLElement} container - The container element
 */
function createTreeTimelineStructure(container) {
  // Get the existing content if available
  const timelineData = extractExistingTimelineData();

  // Create timeline wrapper
  const timelineWrapper = document.createElement("div");
  timelineWrapper.className = "timeline-wrapper";

  // Create tree timeline HTML with all instances showing at once
  const treeTimelineHTML = `
    <div class="tree-timeline">
      <div class="timeline-header">
        <div class="timeline-title">My Journey Through The Years</div>
        <div class="timeline-tabs">
          <div class="timeline-tab tab-blue" data-year="2024">2024</div>
          <div class="timeline-tab tab-orange" data-year="2022">2022</div>
          <div class="timeline-tab tab-pink" data-year="2019">2019</div>
        </div>
      </div>

      <div class="timeline-tree-container">
        <!-- Timeline central stem -->
        <div class="timeline-stem"></div>

        <!-- Timeline entries -->
        <div class="timeline-entries">
          <!-- 2024 Entry -->
          <div class="timeline-entry entry-left entry-blue" data-year="2024" id="timeline-entry-2024">
            <div class="entry-connector">
              <div class="connector-line"></div>
              <div class="connector-dot"></div>
            </div>
            <div class="entry-content content-blue">
              <div class="entry-year">2024</div>
              <div class="timeline-icon">
                <img src="assets/logos/UOW.png" alt="Education icon" class="timeline-icon-img">
              </div>
              <div class="timeline-text">
                <h3 class="timeline-title">BSc(Hons) in Computer Science</h3>
                <li>University of Westminster(IIT, Sri Lanka)</li>
                <li>2024 - Present</li>
                <li>Full Time</li>
                <div class="timeline-details">
                  <p>BSc Computer Science undergraduate with a passion for Software Development, Web Development, and DevOps. I'm building intuitive apps, automating workflows, and securing systems — blending code, creativity, and cloud to craft scalable, high-impact solutions.</p>
                </div>
              </div>
            </div>
          </div>

          <!-- 2022 Entry -->
          <div class="timeline-entry entry-right entry-orange" data-year="2022" id="timeline-entry-2022">
            <div class="entry-connector">
              <div class="connector-line"></div>
              <div class="connector-dot"></div>
            </div>
            <div class="entry-content content-orange">
              <div class="entry-year">2022</div>
              <div class="timeline-icon">
                <img src="assets/logos/PSC.jpg" alt="Projects icon" class="timeline-icon-img">
              </div>
              <div class="timeline-text">
                <h3 class="timeline-title">G.C.E. Advanced Level</h3>
                <li>Presidents Science College Puttalam</li>
                <li>2020-2022</li>
                <li>Physical Science stream</li>
                <div class="timeline-details">
                  <p>I completed my G.C.E. Advanced Level examination in 2022 at President’s Science College, Puttalam in the Physical Science stream, studying Combined Mathematics, Physics, and Chemistry. Afterward, I enrolled at the University of Westminster, London, via the Informatics Institute of Technology (IIT), Sri Lanka.</p>
                </div>
              </div>
            </div>
          </div>

          <!-- 2023 Entry -->
          <div class="timeline-entry entry-left entry-pink" data-year="2019" id="timeline-entry-2019">
            <div class="entry-connector">
              <div class="connector-line"></div>
              <div class="connector-dot"></div>
            </div>
            <div class="entry-content content-pink">
              <div class="entry-year">2019</div>
              <div class="timeline-icon">
                <img src="assets/logos/SMC.png" alt="Achievements icon" class="timeline-icon-img">
              </div>
              <div class="timeline-text">
                <h3 class="timeline-title">GCE Ordinary Levels</h3>
                <li>St.Mary's College Chilaw</li>
                <li>2014-2019</li>
                <div class="timeline-details">
                  <p>Achieved excellent grades in core subjects</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Set the wrapper content
  timelineWrapper.innerHTML = treeTimelineHTML;

  // Clear and add the new timeline to the journey container
  const journeyContainer = container.querySelector(".journey-container");
  if (journeyContainer) {
    journeyContainer.innerHTML = "";
    journeyContainer.appendChild(timelineWrapper);
  } else {
    // If no journey container exists, create one
    const newJourneyContainer = document.createElement("div");
    newJourneyContainer.className = "journey-container";
    newJourneyContainer.appendChild(timelineWrapper);
    container.appendChild(newJourneyContainer);
  }
}

/**
 * Extract data from existing timeline elements if available
 * @returns {Object} The timeline data
 */
function extractExistingTimelineData() {
  const data = {
    items: [],
  };

  // Try to find existing timeline steps
  const existingSteps = document.querySelectorAll(".vt-step");
  if (existingSteps.length) {
    existingSteps.forEach((step) => {
      const year = step.querySelector(".vt-cat")?.textContent?.trim();
      const title = step.querySelector(".vt-title")?.textContent?.trim();
      const description = step.querySelector(".vt-body p")?.textContent?.trim();
      const iconSrc = step
        .querySelector(".vt-icon-wrap img")
        ?.getAttribute("src");
      const colorClass = step.classList.contains("vt-blue")
        ? "blue"
        : step.classList.contains("vt-orange")
        ? "orange"
        : step.classList.contains("vt-pink")
        ? "pink"
        : "";

      data.items.push({
        year,
        title,
        description,
        iconSrc,
        colorClass,
      });
    });
  }

  return data;
}

/**
 * Set up year tab navigation functionality
 */
function setupYearTabNavigation() {
  const tabs = document.querySelectorAll(".timeline-tab");
  if (!tabs.length) return;

  // Add active class to first tab by default
  tabs[0].classList.add("active");

  // Add click event to each tab
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      // Remove active class from all tabs
      tabs.forEach((t) => t.classList.remove("active"));

      // Add active class to clicked tab
      tab.classList.add("active");

      // Get the year from data attribute
      const year = tab.getAttribute("data-year");

      // Find the corresponding timeline entry
      const targetEntry = document.getElementById(`timeline-entry-${year}`);
      if (!targetEntry) return;

      // Highlight the selected entry
      highlightTimelineEntry(targetEntry, year);

      // Scroll to the entry with animation
      scrollToTimelineEntry(targetEntry);
    });
  });
}

/**
 * Highlight a specific timeline entry and dim others
 * @param {HTMLElement} targetEntry - The entry to highlight
 * @param {string} year - The year of the entry
 */
function highlightTimelineEntry(targetEntry, year) {
  // Get all timeline entries
  const allEntries = document.querySelectorAll(".timeline-entry");

  // Add dim class to all entries
  allEntries.forEach((entry) => {
    entry.classList.add("timeline-entry-dim");
  });

  // Remove dim class from the target entry
  targetEntry.classList.remove("timeline-entry-dim");

  // Add highlight class to target entry
  targetEntry.classList.add("timeline-entry-highlight");

  // Remove highlight class after animation completes
  setTimeout(() => {
    targetEntry.classList.remove("timeline-entry-highlight");
    allEntries.forEach((entry) => {
      entry.classList.remove("timeline-entry-dim");
    });
  }, 2000);
}

/**
 * Scroll to a specific timeline entry with smooth animation
 * @param {HTMLElement} targetEntry - The entry to scroll to
 */
function scrollToTimelineEntry(targetEntry) {
  // Calculate position
  const targetRect = targetEntry.getBoundingClientRect();
  const offset = window.pageYOffset + targetRect.top - 100; // 100px offset from top

  // Scroll to the entry
  window.scrollTo({
    top: offset,
    behavior: "smooth",
  });
}

/**
 * Animate tree timeline entrance when it comes into view
 */
function animateTreeTimelineEntrance() {
  // Get the timeline wrapper
  const timelineWrapper = document.querySelector(".timeline-wrapper");
  if (!timelineWrapper) return;

  // Create intersection observer to detect when timeline is in viewport
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");

          // Animate the stem growing
          const stem = document.querySelector(".timeline-stem");
          if (stem) {
            stem.classList.add("animate-stem");
          }

          // Animate each entry with a delay
          const entries = document.querySelectorAll(".timeline-entry");
          entries.forEach((entry, index) => {
            setTimeout(() => {
              entry.classList.add("animate-entry");

              // Animate the connector
              const connector = entry.querySelector(".entry-connector");
              if (connector) {
                connector.classList.add("animate-connector");
              }

              // Animate the content
              const content = entry.querySelector(".entry-content");
              if (content) {
                content.classList.add("animate-content");

                // Animate content elements sequentially
                animateEntryContent(content, index * 100);
              }
            }, 400 + index * 300);
          });

          // Only animate once
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  // Start observing
  observer.observe(timelineWrapper);
}

/**
 * Animate the content of a timeline entry
 * @param {HTMLElement} content - The content element
 * @param {number} baseDelay - Base delay before starting animations
 */
function animateEntryContent(content, baseDelay) {
  // Elements to animate
  const icon = content.querySelector(".timeline-icon");
  const year = content.querySelector(".entry-year");
  const title = content.querySelector(".timeline-title");
  const description = content.querySelector(".timeline-description");
  const details = content.querySelector(".timeline-details");

  // Animate each element with a delay
  if (year) {
    setTimeout(() => {
      year.style.opacity = "1";
      year.style.transform = "translateY(0)";
    }, baseDelay);
  }

  if (icon) {
    setTimeout(() => {
      icon.style.opacity = "1";
      icon.style.transform = "translateY(0)";
      icon.classList.add("pulse-animation");
    }, baseDelay + 100);
  }

  if (title) {
    setTimeout(() => {
      title.style.opacity = "1";
      title.style.transform = "translateY(0)";
    }, baseDelay + 200);
  }

  if (description) {
    setTimeout(() => {
      description.style.opacity = "1";
      description.style.transform = "translateY(0)";
    }, baseDelay + 300);
  }

  if (details) {
    setTimeout(() => {
      details.style.opacity = "1";
      details.style.transform = "translateY(0)";
    }, baseDelay + 400);
  }
}
