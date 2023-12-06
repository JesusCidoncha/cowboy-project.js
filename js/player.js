class Player {
  constructor(gameScreen, bulletController) {
    this.gameScreen = gameScreen;
    this.left = 650;
    this.top = 700;
    this.bulletController = bulletController;
    this.height = 280;
    this.width = 230;
    this.directionX = 0;
    this.shootingSound = new Audio("./audio/shot-sound.mp3");
    this.damageSound = new Audio("./audio/damage-sound.mp3");
    this.element = document.createElement("img");
    this.element.src = "./images/sheriff.avif";
    this.element.style.position = "absolute";

    this.element.style.height = `${this.height}px`;
    this.element.style.width = `${this.width}px`;

    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;

    this.gameScreen.appendChild(this.element);
  }

  move() {
    this.left += this.directionX;
    this.updatePosition();
  }

  shoot() {
    const speed = 5;
    const delay = 7;
    this.shootingSound.volume = 0.2;
    this.shootingSound.currentTime = 0;
    this.shootingSound.play();
    // Determine the direction of the bullet based on the player's orientation
    const bulletDirection =
      this.element.style.transform === "scaleX(-1)"
        ? 1 // If facing right, shoot right
        : -1; // If facing left, shoot left

    const bullet = new Bullet(
      this.left + this.width / 2,
      this.top,
      speed * bulletDirection
    );

    this.gameScreen.appendChild(bullet.element);
    this.bulletController.bullets.push(bullet);
    this.timerTillNextBullet = delay;
  }
  updatePosition() {
    this.element.style.left = `${this.left}px`;
  }
  didCollide(enemy) {
    const playerRect = this.element.getBoundingClientRect();
    const enemyRect = enemy.element.getBoundingClientRect();
    this.damageSound.play();
    return (
      playerRect.left < enemyRect.right &&
      playerRect.right > enemyRect.left &&
      playerRect.top < enemyRect.bottom &&
      playerRect.bottom > enemyRect.top
    );
  }
}
