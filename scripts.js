// ==========================
// Initialization & Help Panel
// ==========================
const scene = document.querySelector(".scene");
const instructions = document.getElementById("instructions");
const toggleHelpButton = document.getElementById("toggleHelp");
const controlButtons = document.querySelectorAll("[data-move]");

document.addEventListener("DOMContentLoaded", function () {
  let isHelpVisible = true;

  const setHelpVisibility = (isVisible) => {
    if (!instructions || !toggleHelpButton) return;
    instructions.classList.toggle("is-hidden", !isVisible);
    toggleHelpButton.setAttribute("aria-expanded", String(isVisible));
    toggleHelpButton.textContent = isVisible ? "Hide Help" : "Show Help";
  };

  setHelpVisibility(isHelpVisible);

  if (toggleHelpButton) {
    toggleHelpButton.addEventListener("click", () => {
      isHelpVisible = !isHelpVisible;
      setHelpVisibility(isHelpVisible);
    });
  }

  document.addEventListener("keydown", function (event) {
    if (event.key.toLowerCase() === "i") {
      isHelpVisible = !isHelpVisible;
      setHelpVisibility(isHelpVisible);
    }
  });

  // Debug logs
  console.log("3D Room Scene initialized successfully!");
  console.log("Controls: WASD or Arrow Keys, Spacebar/Escape to stop");
  console.log("Touch: Swipe to navigate on mobile devices");
  console.log('Press "i" to toggle instructions visibility');
});

// ==========================
// Cube Animation (Toy Block)
// ==========================
const cubeContainer = document.querySelector(".cube-container");

// Spin cube on click
if (cubeContainer) {
  cubeContainer.addEventListener("click", function () {
    this.classList.toggle("clicked");
  });

  // Remove spin class after animation
  cubeContainer.addEventListener("animationend", function () {
    this.classList.remove("clicked");
  });
}

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
if (roseFrame) {
  roseFrame.addEventListener("click", function () {
    this.classList.toggle("clicked");
  });

  // Remove rotate class after animation
  roseFrame.addEventListener("animationend", function () {
    this.classList.remove("clicked");
  });
}

// ==========================
// Toy Box Animation
// ==========================
const toyBox = document.querySelector(".toy-box-left");

// Shrink toy box on click
if (toyBox) {
  toyBox.addEventListener("click", function () {
    this.classList.toggle("clicked");
  });
}

// ==========================
// Scene Movement Controls
// ==========================
let movement = null;
// let movementTimer = null;

const setActiveControl = (type) => {
  controlButtons.forEach((btn) => {
    const isActive = btn.getAttribute("data-move") === type;
    btn.classList.toggle("is-active", isActive);
  });
};

// Start movement animation
function startMovement(type) {
  // clearTimeout(movementTimer);
  movement = type;
  if (scene) {
    scene.className = "scene " + type;
  }
  setActiveControl(type);
  // movementTimer = setTimeout(stopMovement, 5000);
}

// Stop movement animation
function stopMovement() {
  movement = null;
  if (scene) {
    scene.className = "scene stop";
  }
  setActiveControl(null);
}

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

// ==========================
// Focus Handling
// ==========================
window.addEventListener("load", () => {
  window.focus();
});
window.addEventListener("click", () => {
  window.focus();
});

// ==========================
// Keyboard Controls
// ==========================
document.addEventListener("keydown", (e) => {
  if (e.key === "w" || e.key === "ArrowUp") startMovement("moveForward");
  if (e.key === "a" || e.key === "ArrowLeft") startMovement("turnLeft");
  if (e.key === "s" || e.key === "ArrowDown") startMovement("moveBack");
  if (e.key === "d" || e.key === "ArrowRight") startMovement("turnRight");
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
  }
  return ((maxPx - px) / (maxPx - defaultPx)) * 14;
}

// Update the view/perspective
function updateView() {
  body.style.perspectiveOrigin = `43% calc(${currentPercent}% - 3em)`;
  body.style.transform = `rotateX(0deg) translate(10px, ${currentPx}px)`;
}

// Look up/down buttons
const lookUpButton = document.getElementById("lookUpBtn");
const lookDownButton = document.getElementById("lookDownBtn");

if (lookUpButton) {
  lookUpButton.addEventListener("click", () => {
    currentPx = Math.max(minPx, currentPx - 20);
    currentPercent = pxToPercent(currentPx);
    updateView();
  });
}

if (lookDownButton) {
  lookDownButton.addEventListener("click", () => {
    currentPx = Math.min(maxPx, currentPx + 20);
    currentPercent = pxToPercent(currentPx);
    updateView();
  });
}

updateView();

// ==========================
// Television Channel Controls
// ==========================
const channelButtons = document.querySelectorAll(".television__channel a");
channelButtons.forEach((button) => {
  button.addEventListener("click", function (event) {
    const screen = document.querySelector(".television__screen iframe");
    if (screen) {
      screen.src = this.href;
    }
    event.preventDefault();
  });
});
