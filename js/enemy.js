class Enemy {
  constructor(gameScreen) {
    this.gameScreen = gameScreen;
    this.top = 550;
    this.height = 280;
    this.width = 230;
    this.left = 600;

    this.element = document.createElement("img");
    this.element.src = "../images/enemy.jpg";
    this.element.style.position = "absolute";

    this.element.style.height = `${this.height}px`;
    this.element.style.width = `${this.width}px`;

    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
    this.gameScreen.appendChild(this.element);
  }

  move() {
    console.log("Moving enemy");
    this.left -= 1;
    this.updatePosition();
  }
  updatePosition() {
    this.element.style.left = `${this.left}px`;
  }

  didCollide(bullet) {
    const enemyRect = this.element.getBoundingClientRect();
    const bulletRect = bullet.element.getBoundingClientRect();

    const isColliding =
      bulletRect.left < enemyRect.right &&
      bulletRect.right > enemyRect.left &&
      bulletRect.top < enemyRect.bottom &&
      bulletRect.bottom > enemyRect.top;

    if (isColliding) {
      console.log("Bullet collided with enemy");

      // Hide the enemy visually
      this.element.style.display = "none";

      return true; // Indicate collision to the caller
    }

    return false; // No collision
  }
}
