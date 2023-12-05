window.addEventListener("load", () => {
  const startButton = document.getElementById("start-button");
  const restartButton = document.getElementById("restart-button");
  const game = new Game();
  function startGame() {
    console.log("start game");
    game.start();
  }
  startButton.addEventListener("click", function () {
    startGame();
  });
  restartButton.addEventListener("click", function () {
    // Call the restartGame function when the button is clicked
    restartGame();
  });

  // The function that reloads the page to start a new game
  function restartGame() {
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
