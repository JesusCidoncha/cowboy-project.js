class Player {
  constructor(gameScreen, bulletController) {
    this.gameScreen = gameScreen;
    this.left = 650;
    this.top = 550;
    this.bulletController = bulletController;
    this.height = 280;
    this.width = 230;
    this.directionX = 0;

    this.element = document.createElement("img");
    this.element.src = "../images/sheriff.avif";
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
    this.bulletController.shoot(this, speed, delay);
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
