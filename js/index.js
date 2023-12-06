window.addEventListener("load", () => {
  const startButton = document.getElementById("start-button");
  const restartButton = document.getElementById("restart-button");
  const game = new Game();
  this.mainTheme = new Audio("./audio/main-theme.mp3");
  this.introTheme = new Audio("./audio/intro-theme.mp3");
  this.deathTheme = new Audio("./audio/death-theme.mp3");
  this.introTheme.play();
  function startGame() {
    game.start();
    this.introTheme.pause();
    this.mainTheme.volume = 0.2;
    this.mainTheme.play();
  }
  startButton.addEventListener("click", () => {
    startGame();
  });
  restartButton.addEventListener("click", () => {
    restartGame();
  });

  // The function that reloads the page to start a new game
  function restartGame() {
    this.deathTheme.pause();
    location.reload();
  }

  document.addEventListener("keydown", (event) => {
    event.preventDefault();

    if (event.code === "ArrowLeft" || event.code === "KeyA") {
      game.player.directionX = -1;
      game.player.element.style.transform = "rotate(0deg)";
    }

    if (event.code === "ArrowRight" || event.code === "KeyD") {
      game.player.directionX = 1;
      game.player.element.style.transform = "scaleX(-1)";
    }

    if (event.code === "Space" && !game.bulletController.isSpacebarPressed) {
      game.player.shoot();
      game.bulletController.isSpacebarPressed = true;
    }
  });

  document.addEventListener("keyup", (event) => {
    if (
      event.code === "ArrowLeft" ||
      event.code === "KeyA" ||
      event.code === "ArrowRight" ||
      event.code === "KeyD"
    ) {
      game.player.directionX = 0;
    }

    if (event.code === "Space") {
      game.bulletController.isSpacebarPressed = false;
    }
  });
});
