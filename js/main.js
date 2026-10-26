
/* ========================================
   1. AUTOMATIC COPYRIGHT YEAR
======================================== */

const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}


/* ========================================
   2. PROJECTS CAROUSEL
======================================== */

const projectsContainer = document.querySelector(".projects");

if (projectsContainer) {
  const projectCards = [
    ...projectsContainer.querySelectorAll(".project")
  ];

  let isDragging = false;
  let startX = 0;
  let scrollStart = 0;
  let moved = false;

  /* UPDATE ACTIVE CARD */

  function updateActiveProject() {
    const containerRect = projectsContainer.getBoundingClientRect();
    const center = containerRect.left + containerRect.width / 2;

    let closestCard = null;
    let minDistance = Infinity;

    projectCards.forEach(card => {
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.left + rect.width / 2;
      const distance = Math.abs(center - cardCenter);

      if (distance < minDistance) {
        minDistance = distance;
        closestCard = card;
      }
    });

    projectCards.forEach(card => {
      card.classList.toggle("active", card === closestCard);
    });
  }

  projectsContainer.addEventListener(
    "scroll",
    updateActiveProject,
    { passive: true }
  );

  window.addEventListener("resize", updateActiveProject);


  /* MOUSE WHEEL AND TRACKPAD */

  projectsContainer.addEventListener("wheel", event => {
    if (Math.abs(event.deltaY) >= Math.abs(event.deltaX)) {
      event.preventDefault();
      projectsContainer.scrollLeft += event.deltaY * 3;
    }
  }, { passive: false });


  /* DRAG WITH MOUSE */

  projectsContainer.addEventListener("pointerdown", event => {
    if (event.pointerType !== "mouse" || event.button !== 0) return;

    isDragging = true;
    moved = false;
    startX = event.clientX;
    scrollStart = projectsContainer.scrollLeft;

    projectsContainer.setPointerCapture(event.pointerId);
  });

  projectsContainer.addEventListener("pointermove", event => {
    if (!isDragging) return;

    const distance = event.clientX - startX;

    if (Math.abs(distance) > 5) {
      moved = true;
    }

    if (moved) {
      projectsContainer.scrollLeft = scrollStart - distance;
    }
  });

  function stopDragging() {
    isDragging = false;
  }

  projectsContainer.addEventListener("pointerup", stopDragging);
  projectsContainer.addEventListener("pointercancel", stopDragging);


  /* INITIALIZE */

  updateActiveProject();
}
