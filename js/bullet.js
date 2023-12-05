class Bullet {
  constructor(left, top, speed) {
    this.left = left; // Keep the left position same as the player
    this.top = top; // Keep the top position same as the player
    this.speed = speed;

    this.width = 20;
    this.height = 8;
    this.color = "red";

    this.element = document.createElement("div");
    this.element.style.position = "absolute";
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.backgroundColor = this.color;

    // Set initial position based on the player's position
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top + 95}px`;
  }
  isBulletOffScreen() {
    return this.top <= -this.height;
  }
  move() {
    // Update the bullet's left position based on its speed (horizontal movement)
    this.left += this.speed;

    // Update the bullet's HTML element position
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
      console.log("Bullet collided with enemy");

      // Hide the bullet visually
      this.element.style.display = "none";

      return true; // Indicate collision to the caller
    }

    // Check if the bullet is off-screen
    if (this.isBulletOffScreen()) {
      // Hide the bullet visually
      this.element.style.display = "none";

      return true; // Indicate off-screen to the caller
    }

    return false; // No collision or off-screen
  }
}
