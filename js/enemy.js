class Enemy {
  constructor(gameScreen, spawnFromLeft) {
    this.gameScreen = gameScreen;
    this.spawnFromLeft = spawnFromLeft;

    // Initialize other properties
    this.top = 550;
    this.height = 280;
    this.width = 230;
    this.left = this.spawnFromLeft ? -this.width : this.gameScreen.offsetWidth;

    // Create the HTML element
    this.element = document.createElement("div");
    this.element.style.position = "absolute";
    this.element.style.height = `${this.height}px`;
    this.element.style.width = `${this.width}px`;
    this.element.style.top = `${this.top}px`;
    this.element.style.backgroundColor = "blue";

    this.element.style.left = `${this.left}px`;

    this.gameScreen.appendChild(this.element);
  }

  move() {
    if (this.spawnFromLeft) {
      // Move to the right if spawned from the left
      this.left += 1;
    } else {
      // Move to the left if spawned from the right
      this.left -= 1;
    }

    this.element.style.left = `${this.left}px`;
    console.log("Left:", this.left);
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
      this.element.style.display = "none";

      return true;
    }

    return false;
  }
}
