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
    this.left -= 1;
    this.updatePosition();
  }
  updatePosition() {
    this.element.style.left = `${this.left}px`;
  }
}
