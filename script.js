var rows = 3;
var columns = 3;
var currenttile;
var othertile;

/*var imgorder = [
  "pic 1",
  "pic 2",
  "pic 3",
  "pic 4",
  "pic 5",
  "pic 6",
  "pic 7",
  "pic 8",
  "pic 9",
];*/
var imgorder = ["4", "2", "8", "5", "1", "6", "7", "9", "3"];

window.onload = function puzzle() {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      let tile = document.createElement("img");
      tile.id = r.toString() + "-" + c.toString();
      tile.src = imgorder.shift() + ".jpg";

      //DRAG
      tile.addEventListener("dragstart", dragStart); //click an image to drag
      tile.addEventListener("dragover", dragOver); //moving clicked image around
      tile.addEventListener("dragentert", dragEnter); //draggimg clicked image ontop another image
      tile.addEventListener("dragleave", dragLeave); //dragged image leaving its position
      tile.addEventListener("drop", dragDrop); //dropping clicked image
      tile.addEventListener("dragend", dragEnd); //tiles are swapped

      document.getElementById("board").append(tile);
    }
  }
};

function dragStart() {
  currenttile = this; //image being clicked
}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();
}

function dragLeave() {}

function dragEnd() {
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
}

function dragDrop() {
  othertile = this; //image being exchanged with
}

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
    particleCount: 150,
    spread: 70,
    origin: { y: 0.6 },
  });
}
