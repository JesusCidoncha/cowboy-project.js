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
    this.bulletController = null;
  }

  start() {
    this.startScreen.style.display = "none";
    this.gameScreen.style.display = "block";
    this.gameScreen.style.height = `${this.height}vh`;
    this.gameScreen.style.width = `${this.width}vw`;

    this.bulletController = new BulletController(this.gameScreen);
    this.player = new Player(this.gameScreen, this.bulletController);

    this.gameLoop();
  }
  gameLoop() {
    this.player.move();
    this.bulletController.moveBullets(this.enemies);
    const nextEnemies = [];

    this.enemies.forEach((currentEnemy) => {
      currentEnemy.move();

      // Check if enemy is still on the screen
      if (
        currentEnemy.left > -currentEnemy.width &&
        currentEnemy.left < this.gameScreen.offsetWidth
      ) {
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
        currentEnemy.element.remove();
        this.score += 10;
        document.getElementById("score").innerText = `${this.score}`;
      }
    });

    this.enemies = nextEnemies;

    if (this.animateId % 130 === 0) {
      console.log("Spawning new enemy");
      const spawnFromLeft = Math.random() < 0.5;
      this.enemies.push(new Enemy(this.gameScreen, spawnFromLeft));
    }

    // Continue the game loop
    this.animateId = requestAnimationFrame(() => {
      this.gameLoop();
    });
  }
}
