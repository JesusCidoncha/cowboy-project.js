class Enemy {
  constructor(gameScreen) {
    this.gameScreen = gameScreen;
    this.top = 65;
    this.height = -25;
    this.width = 40;
    this.left = Math.floor(Math.random() * (440 - this.width - 60) + 60);

    this.element = document.createElement("img");
    this.element.src = "../images/enemy.jpg";
    this.element.style.position = "absolute";

    this.element.style.height = `${this.height}px`;
    this.element.style.width = `${this.width}px`;

    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}vh`;
    this.gameScreen.appendChild(this.element);
  }

  move() {
    this.right += 1;
    this.updatePosition();
  }
  updatePosition() {
    this.element.style.left = `${this.left}px`;
  }
}
