var rows = 3;
var columns = 3;
var currenttile;
var othertile;

var imgorder = ["4", "2", "8", "5", "1", "6", "7", "9", "3"];

window.onload = function puzzle() {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      let tile = document.createElement("img");
      tile.id = r.toString() + "-" + c.toString();
      tile.src = imgorder.shift() + ".jpg";
      tile.classList.add("tile");

      // Desktop drag events
      tile.addEventListener("dragstart", dragStart);
      tile.addEventListener("dragover", dragOver);
      tile.addEventListener("dragentert", dragEnter);
      tile.addEventListener("dragleave", dragLeave);
      tile.addEventListener("drop", dragDrop);
      tile.addEventListener("dragend", dragEnd);

      // Mobile touch events
      tile.addEventListener("touchstart", touchStart, { passive: false });
      tile.addEventListener("touchmove", touchMove, { passive: false });
      tile.addEventListener("touchend", touchEnd);

      document.getElementById("board").append(tile);
    }
  }
};

// ===== Desktop Drag Functions =====
function dragStart() {
  currenttile = this;
}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();
}

function dragLeave() {}

function dragDrop() {
  othertile = this;
}

function dragEnd() {
  swapTiles();
}

// ===== Mobile Touch Functions =====
function touchStart(e) {
  e.preventDefault();
  currenttile = e.target;
}

function touchMove(e) {
  e.preventDefault();
  const touch = e.touches[0];
  const target = document.elementFromPoint(touch.clientX, touch.clientY);
  if (target && target.classList.contains("tile")) {
    othertile = target;
  }
}

function touchEnd(e) {
  swapTiles();
}

// ===== Swap Logic for Both Desktop & Mobile =====
function swapTiles() {
  if (!currenttile || !othertile || currenttile === othertile) return;

  let currCoords = currenttile.id.split("-");
  let r = parseInt(currCoords[0]);
  let c = parseInt(currCoords[1]);

  let otherCoords = othertile.id.split("-");
  let r2 = parseInt(otherCoords[0]);
  let c2 = parseInt(otherCoords[1]);

  let moveLeft = r == r2 && c2 == c - 1;
  let moveRight = r == r2 && c2 == c + 1;
  let moveUp = c == c2 && r2 == r - 1;
  let moveDown = c == c2 && r2 == r + 1;

  let isAdj = moveLeft || moveRight || moveUp || moveDown;
  if (isAdj) {
    let currImg = currenttile.src;
    let otherImg = othertile.src;

    currenttile.src = otherImg;
    othertile.src = currImg;
  }
  checkWin();

  currenttile = null;
  othertile = null;
}

// ===== Win Check =====
function checkWin() {
  let tiles = document.querySelectorAll("#board img");
  let correct = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

  let isCorrect = true;
  for (let i = 0; i < tiles.length; i++) {
    if (!tiles[i].src.includes(correct[i])) {
      isCorrect = false;
      break;
    }
  }

  if (isCorrect) {
    launchConfetti();
  }
}

function launchConfetti() {
  confetti({
    particleCount: 5000,
    spread: 70,
    origin: { y: 0.6 },
  });
}