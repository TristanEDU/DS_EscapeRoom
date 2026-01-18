// ==========================
// Initialization & Debug Mode
// ==========================
document.addEventListener("DOMContentLoaded", function () {
  const body = document.body;
  const scene = document.querySelector(".scene");
  const instructions = document.querySelector(".instructions");
  const helpToggle = document.querySelector('[data-action="toggleHelp"]');
  const lookUpButton = document.getElementById("lookUpBtn");
  const lookDownButton = document.getElementById("lookDownBtn");
  const controlButtons = document.querySelectorAll("#controls [data-move]");
  const tvButtons = document.querySelectorAll(".television__channel a");

  let movement = null;
  let helpVisible = instructions?.classList.contains("is-visible");

  // Set your desired min/max for each property
  const minPx = 200;
  const maxPx = 1400;
  const defaultPx = 700;
  let currentPx = defaultPx;
  let currentPercent = 7;

  const setHelpVisibility = (visible) => {
    helpVisible = visible;
    if (instructions) {
      instructions.classList.toggle("is-visible", visible);
    }
  };

  const updateActiveButtons = (activeMove) => {
    controlButtons.forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.move === activeMove);
    });
  };

  const startMovement = (type) => {
    if (!scene) return;
    movement = type;
    scene.className = `scene ${type}`;
    updateActiveButtons(type);
  };

  const stopMovement = () => {
    if (!scene) return;
    movement = null;
    scene.className = "scene stop";
    updateActiveButtons(null);
  };

  const pxToPercent = (px) => {
    if (px <= defaultPx) {
      return ((px - minPx) / (defaultPx - minPx)) * 14;
    }
    return ((maxPx - px) / (maxPx - defaultPx)) * 14;
  };

  const updateView = () => {
    body.style.perspectiveOrigin = `43% calc(${currentPercent}% - 3em)`;
    body.style.transform = `rotateX(0deg) translate(10px, ${currentPx}px)`;
  };

  const adjustView = (delta) => {
    currentPx = Math.min(maxPx, Math.max(minPx, currentPx + delta));
    currentPercent = pxToPercent(currentPx);
    updateView();
  };

  // Toggle instructions with "i" key or button
  document.addEventListener("keydown", function (event) {
    const activeElement = document.activeElement;
    if (activeElement && ["INPUT", "TEXTAREA"].includes(activeElement.tagName)) {
      return;
    }

    if (event.key.toLowerCase() === "i") {
      setHelpVisibility(!helpVisible);
      return;
    }

    if (event.key === "w" || event.key === "ArrowUp") startMovement("moveForward");
    if (event.key === "a" || event.key === "ArrowLeft") startMovement("turnLeft");
    if (event.key === "s" || event.key === "ArrowDown") startMovement("moveBack");
    if (event.key === "d" || event.key === "ArrowRight") startMovement("turnRight");
    if (event.key === " " || event.key === "Escape") stopMovement();

    if (event.key === "PageUp") {
      adjustView(-20);
    }
    if (event.key === "PageDown") {
      adjustView(20);
    }
  });

  helpToggle?.addEventListener("click", () => {
    setHelpVisibility(!helpVisible);
  });

  // Button controls for movement
  controlButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const moveType = btn.getAttribute("data-move");
      if (moveType === "stop") {
        stopMovement();
      } else {
        startMovement(moveType);
      }
    });
  });

  lookUpButton?.addEventListener("click", () => adjustView(-20));
  lookDownButton?.addEventListener("click", () => adjustView(20));

  updateView();

  // Focus Handling
  window.addEventListener("load", () => {
    window.focus();
  });
  window.addEventListener("click", () => {
    window.focus();
  });

  // Cube Animation (Toy Block)
  const cubeContainer = document.querySelector(".cube-container");
  cubeContainer?.addEventListener("click", function () {
    this.classList.toggle("clicked");
  });
  cubeContainer?.addEventListener("animationend", function () {
    this.classList.remove("clicked");
  });

  // Letter Animation (Riddle)
  document.querySelectorAll(".letter, .letter2").forEach((el) => {
    el.addEventListener("click", () => {
      document.body.classList.toggle("change");
    });
  });

  // Rose Frame Animation
  const roseFrame = document.querySelector(".rose-frame");
  roseFrame?.addEventListener("click", function () {
    this.classList.toggle("clicked");
  });
  roseFrame?.addEventListener("animationend", function () {
    this.classList.remove("clicked");
  });

  // Toy Box Animation
  const toyBox = document.querySelector(".toy-box-left");
  toyBox?.addEventListener("click", function () {
    this.classList.toggle("clicked");
  });

  // Television Channel Controls
  tvButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
      const iframe = document.querySelector(".television__screen iframe");
      if (iframe) {
        iframe.src = this.href;
      }
      event.preventDefault();
    });
  });
});
