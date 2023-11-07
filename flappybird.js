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

//window.onload execute a script once a web page has completely loaded all content (including images, script files, CSS files, etc)
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
};
