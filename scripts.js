// ==========================
// Initialization & Debug Mode
// ==========================
document.addEventListener("DOMContentLoaded", () => {
  const instructions = document.querySelector(".instructions");
  const toggleHelp = document.getElementById("toggleHelp");
  const toggleHelpInline = document.getElementById("toggleHelpInline");

  if (!instructions || !toggleHelp || !toggleHelpInline) {
    return;
  }

  const setHelpVisibility = (isVisible) => {
    instructions.dataset.visible = isVisible ? "true" : "false";
    const label = isVisible ? "Hide tips" : "Show tips";
    toggleHelp.textContent = label;
    toggleHelpInline.textContent = label;
    toggleHelp.setAttribute("aria-expanded", String(isVisible));
    toggleHelpInline.setAttribute("aria-expanded", String(isVisible));
  };

  setHelpVisibility(false);

  const toggleHelpPanel = () => {
    const isVisible = instructions.dataset.visible !== "true";
    setHelpVisibility(isVisible);
  };

  toggleHelp.addEventListener("click", toggleHelpPanel);
  toggleHelpInline.addEventListener("click", toggleHelpPanel);

  document.addEventListener("keydown", (event) => {
    if (event.key.toLowerCase() === "i") {
      toggleHelpPanel();
    }
  });
});

// ==========================
// Cube Animation (Toy Block)
// ==========================
const cubeContainer = document.querySelector(".cube-container");

// Spin cube on click
cubeContainer?.addEventListener("click", function () {
  this.classList.toggle("clicked");
});

// Remove spin class after animation
cubeContainer?.addEventListener("animationend", function () {
  this.classList.remove("clicked");
});

// ==========================
// Letter Animation (Riddle)
// ==========================
document.querySelectorAll(".letter, .letter2").forEach((el) => {
  el.addEventListener("click", () => {
    document.body.classList.toggle("change");
  });
});

// ==========================
// Rose Frame Animation
// ==========================
const roseFrame = document.querySelector(".rose-frame");

// Rotate rose frame on click
roseFrame?.addEventListener("click", function () {
  this.classList.toggle("clicked");
});

// Remove rotate class after animation
roseFrame?.addEventListener("animationend", function () {
  this.classList.remove("clicked");
});

// ==========================
// Toy Box Animation
// ==========================
const toyBox = document.querySelector(".toy-box-left");

// Shrink toy box on click
toyBox?.addEventListener("click", function () {
  this.classList.toggle("clicked");
});

// ==========================
// Scene Movement Controls
// ==========================
let movement = null;
const scene = document.querySelector(".scene");
const movementClasses = ["moveForward", "moveBack", "turnLeft", "turnRight"];
const movementButtons = document.querySelectorAll("[data-move]");

// Start movement animation
function startMovement(type) {
  movement = type;
  if (!scene) return;
  scene.classList.remove(...movementClasses, "stop");
  scene.classList.add(type);
  updateActiveControl(type);
}

// Stop movement animation
function stopMovement() {
  movement = null;
  if (!scene) return;
  scene.classList.remove(...movementClasses);
  scene.classList.add("stop");
  updateActiveControl("stop");
}

// Button controls for movement
movementButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const moveType = btn.getAttribute("data-move");
    if (moveType === "stop") {
      stopMovement();
    } else {
      startMovement(moveType);
    }
  });
});

// ==========================
// Focus Handling
// ==========================
window.addEventListener("load", () => {
  window.focus();
});
window.addEventListener("click", () => {
  window.focus();
});

const updateActiveControl = (activeMove) => {
  movementButtons.forEach((btn) => {
    const isActive = btn.getAttribute("data-move") === activeMove;
    btn.setAttribute("aria-pressed", String(isActive));
  });
};

updateActiveControl("stop");

// ==========================
// Keyboard Controls
// ==========================
const movementKeyMap = {
  w: "moveForward",
  ArrowUp: "moveForward",
  a: "turnLeft",
  ArrowLeft: "turnLeft",
  s: "moveBack",
  ArrowDown: "moveBack",
  d: "turnRight",
  ArrowRight: "turnRight",
};

document.addEventListener("keydown", (e) => {
  const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
  if (movementKeyMap[key]) {
    startMovement(movementKeyMap[key]);
  }
  if (e.key === " " || e.key === "Escape") stopMovement();

  // Perspective controls
  if (e.key === "PageUp") {
    currentPx = Math.max(minPx, currentPx - 20);
    currentPercent = pxToPercent(currentPx);
    updateView();
  }
  if (e.key === "PageDown") {
    currentPx = Math.min(maxPx, currentPx + 20);
    currentPercent = pxToPercent(currentPx);
    updateView();
  }
});

// ==========================
// Perspective/View Controls
// ==========================
const body = document.body;

// Set your desired min/max for each property
const minPx = 200;
const maxPx = 1400;
const defaultPx = 700;
let currentPx = defaultPx;
let currentPercent = 7;

// Convert px to percent for perspective origin
function pxToPercent(px) {
  if (px <= defaultPx) {
    return ((px - minPx) / (defaultPx - minPx)) * 14;
  } else {
    return ((maxPx - px) / (maxPx - defaultPx)) * 14;
  }
}

// Update the view/perspective
function updateView() {
  body.style.perspectiveOrigin = `43% calc(${currentPercent}% - 3em)`;
  body.style.transform = `rotateX(0deg) translate(10px, ${currentPx}px)`;
}

// Look up/down buttons
const lookUpBtn = document.getElementById("lookUpBtn");
const lookDownBtn = document.getElementById("lookDownBtn");

lookUpBtn?.addEventListener("click", () => {
  currentPx = Math.max(minPx, currentPx - 20);
  currentPercent = pxToPercent(currentPx);
  updateView();
});

lookDownBtn?.addEventListener("click", () => {
  currentPx = Math.min(maxPx, currentPx + 20);
  currentPercent = pxToPercent(currentPx);
  updateView();
});

updateView();

// ==========================
// Television Channel Controls
// ==========================
const tvChannels = document.querySelector(".television__channels");
const tvScreen = document.querySelector(".television__screen iframe");

tvChannels?.addEventListener("click", (event) => {
  const link = event.target.closest("a");
  if (!link || !tvScreen) return;
  tvScreen.src = link.href;
  event.preventDefault();
});
