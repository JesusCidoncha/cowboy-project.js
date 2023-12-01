class Player {
  constructor(gameScreen) {
    this.gameScreen = gameScreen;
    this.left = 100;
    this.top = 65;
    this.height = 280;
    this.width = 230;
    this.directionX = 0;

    this.element = document.createElement("img");
    this.element.src = "../images/sheriff.avif";
    this.element.style.position = "absolute";

    this.element.style.height = `${this.height}px`;
    this.element.style.width = `${this.width}px`;

    this.element.style.left = `${this.left}vw`;
    this.element.style.top = `${this.top}vh`;

    this.gameScreen.appendChild(this.element);
  }

  move() {
    if (this.left >= 60) {
      this.left += this.directionX;
    } else {
      this.left = 60;
    }
    if (this.left <= 440 - this.width) {
      this.left += this.directionX;
    } else {
      this.left = 440 - this.width;
    }

    this.updatePosition();
  }
  updatePosition() {
    this.element.style.left = `${this.left}px`;
  }
  didCollide(enemy) {
    const playerRect = this.element.getBoundingClientRect();
    const enemyReact = enemy.element.getBoundingClientRect();

    if (
      playerRect.left < enemyReact.right &&
      playerRect.right > enemyReact.left &&
      playerRect.top < enemyReact.bottom &&
      playerRect.bottom > enemyReact.top
    ) {
      return true;
    } else {
      return false;
    }
  }
}
