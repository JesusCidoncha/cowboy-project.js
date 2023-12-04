class Game {
  constructor() {
    this.startScreen = document.getElementById("game-intro");
    this.gameScreen = document.getElementById("game-screen");
    this.gameEndScreen = document.getElementById("game-end");
    this.height = 100;
    this.width = 100;
    this.player = null;
    this.enemies = [];
    this.animateId = null;
    this.score = 0;
    this.lives = 3;
    this.isGameOver = false;
    this.bulletController = null; // Add this line
  }

  start() {
    this.startScreen.style.display = "none";
    this.gameScreen.style.display = "block";
    this.gameScreen.style.height = `${this.height}vh`;
    this.gameScreen.style.width = `${this.width}vw`;

    // Create the BulletController once and assign it to this.bulletController

    this.bulletController = new BulletController(this.gameScreen);

    // Pass the existing BulletController to the Player constructor
    this.player = new Player(this.gameScreen, this.bulletController);

    this.gameLoop();
  }
  gameLoop() {
    this.player.move();
    console.log("Checking bullet movement in game loop");

    this.bulletController.moveBullets();
    const nextEnemies = [];
    this.enemies.forEach((currentEnemy) => {
      currentEnemy.move();
      if (currentEnemy.top < 640) {
        if (this.player.didCollide(currentEnemy)) {
          this.lives -= 1;
          document.getElementById("lives").innerText = `${this.lives}`;
          currentEnemy.element.remove();

          if (this.lives === 0) {
            this.isGameOver = true;
            this.gameScreen.style.display = "none";
            this.gameEndScreen.style.display = "block";
          }
        } else {
          nextEnemies.push(currentEnemy);
        }
      } else {
        this.score += 10;
        document.getElementById("score").innerText = `${this.score}`;
        currentEnemy.element.remove();
      }
    });
    this.enemies = nextEnemies;

    if (this.animateId % 300 === 0) {
      this.enemies.push(new Enemy(this.gameScreen));
    }

    this.animateId = requestAnimationFrame(() => {
      this.gameLoop();
    });
  }
}
