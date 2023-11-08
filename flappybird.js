// board
let board;
let boardWidth = 360;
let boardHeight = 640;
let context;

// bird
let birdWidth = 34; //For bird we need specify X & Y position and Height & width also
let birdHeight = 24;
let birdX = boardWidth / 8;
let birdY = boardHeight / 2;
let birdImg;

let bird = {
  x: birdX,
  y: birdY,
  width: birdWidth,
  height: birdHeight,
};

// pipes
let pipeArray = [];
let pipeWidth = 64;
let pipeHeight = 512;
let pipeX = boardWidth;
let pipeY = 0;

let topPipeImg;
let bottomPipeImg;

// physics
let velocityX = -2; // pipes moving speed
let velocityY = 0; // bird jump speed
let gravity = 0.4;

let gameOver = false;
let score = 0;

window.onload = () => {
  board = document.getElementById("board");
  board.height = boardHeight;
  board.width = boardWidth;
  context = board.getContext("2d"); //   used for drawing on the board

  // draw the flappy bird
  // context.fillStyle = "green";
  // context.fillRect(bird.x, bird.y, bird.width, bird.height);

  // load image
  birdImg = new Image();
  birdImg.src = "./flappybird.png";
  // For image loading
  birdImg.onload = () => {
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
  };

  topPipeImg = new Image();
  topPipeImg.src = "./toppipe.png";

  bottomPipeImg = new Image();
  bottomPipeImg.src = "./bottompipe.png";

  requestAnimationFrame(update);
  setInterval(placePipes, 1500); // every 1.5 s
  document.addEventListener("keydown", moveBird);
};

// For updating frames of canvas. This is the main game loop
function update() {
  requestAnimationFrame(update);

  if (gameOver) {
    return;
  }
  context.clearRect(0, 0, board.width, board.height);

  // bird
  velocityY += gravity;
  // bird.y += velocityY;
  bird.y = Math.max(bird.y + velocityY, 0); // Apply gravity to bird and it goes maximum upto top of canvas
  if (bird.y > board.height) {
    gameOver = true;
  }
  context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);

  // pipes
  for (let i = 0; i < pipeArray.length; i++) {
    let pipe = pipeArray[i];
    pipe.x += velocityX;
    context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);

    if (!pipe.passed && bird.x > pipe.x + pipe.width) {
      score += 0.5; // Because there is two pipe
      pipe.passed = true;
    }

    if (detectCollision(bird, pipe)) {
      gameOver = true;
    }
  }

  // clear pipes
  while (pipeArray.length > 0 && pipeArray[0].x < -pipeWidth) {
    pipeArray.shift();
  }

  // score
  context.fillStyles = "white";
  context.font = "45px sans-serif";
  context.fillText(score, 5, 45);

  if (gameOver) {
    context.fillText("Game Over", 5, 90);
  }
}

function placePipes() {
  if (gameOver) {
    return;
  }
  // (0-1)*pipeheight/2
  let randomPipeY = -pipeHeight / 4 - Math.random() * (pipeHeight / 2);
  let openingSpace = board.height / 4;
  let topPipe = {
    img: topPipeImg,
    x: pipeX,
    y: randomPipeY,
    width: pipeWidth,
    height: pipeHeight,
    passed: false, // To check if bird has passed this pipe
  };
  pipeArray.push(topPipe);

  let bottomPipe = {
    img: bottomPipeImg,
    x: pipeX,
    y: randomPipeY + pipeHeight + openingSpace,
    width: pipeWidth,
    height: pipeHeight,
    passed: false,
  };

  pipeArray.push(bottomPipe);
}
function moveBird(e) {
  if (e.code == "Space" || e.code === "ArrowUp") {
    velocityY = -6;
    if (gameOver) {
      bird.y = birdY;
      pipeArray = [];
      score = 0;
      gameOver = false;
    }
  }
}

function detectCollision(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}
