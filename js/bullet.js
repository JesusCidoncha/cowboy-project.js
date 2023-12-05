class Bullet {
  constructor(left, top, speed) {
    this.left = left;
    this.top = top;
    this.speed = speed;

    this.width = 20;
    this.height = 8;
    this.color = "red";

    this.element = document.createElement("div");
    this.element.style.position = "absolute";
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.backgroundColor = this.color;

    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top + 95}px`;
  }
  isBulletOffScreen() {
    return this.top <= -this.height;
  }
  move() {
    this.left += this.speed;
    this.element.style.left = `${this.left}px`;
  }
  didCollide(enemy) {
    const bulletRect = this.element.getBoundingClientRect();
    const enemyRect = enemy.element.getBoundingClientRect();

    const isColliding =
      bulletRect.left < enemyRect.right &&
      bulletRect.right > enemyRect.left &&
      bulletRect.top < enemyRect.bottom &&
      bulletRect.bottom > enemyRect.top;

    if (isColliding) {
      this.element.style.display = "none";
      return true;
    }

    if (this.isBulletOffScreen()) {
      this.element.style.display = "none";

      return true;
    }

    return false;
  }
}
