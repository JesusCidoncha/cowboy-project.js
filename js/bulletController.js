class BulletController {
  constructor(gameScreen) {
    this.gameScreen = gameScreen;
  }

  bullets = [];
  timerTillNextBullet = 0;

  moveBullets(enemies) {
    this.bullets.forEach((bullet, bulletIndex) => {
      bullet.move();
      console.log("Checking collision for bullet", bulletIndex);

      const collidedEnemy = enemies.find((enemy) => bullet.didCollide(enemy));

      if (collidedEnemy) {
        // Remove the bullet visually
        this.gameScreen.removeChild(bullet.element);

        // Remove the collided enemy visually
        this.gameScreen.removeChild(collidedEnemy.element);
      }
    });

    // Filter out bullets that went off-screen
    this.bullets = this.bullets.filter(
      (bullet) =>
        !bullet.isBulletOffScreen() && bullet.element.style.display !== "none"
    );
  }

  shoot(player, speed, delay) {
    if (this.timerTillNextBullet <= 0) {
      const bullet = new Bullet(
        player.left + player.width / 2,
        player.top,
        speed
      );

      this.gameScreen.appendChild(bullet.element);
      this.bullets.push(bullet);
      this.timerTillNextBullet = delay;
    }

    this.timerTillNextBullet--;
  }
  isBulletOffScreen(bullet) {
    return bullet.top <= -bullet.height;
  }

  didCollide(enemy) {
    console.log("Checking collisions in didCollide method");
    return this.bullets.some((bullet) => {
      if (bullet.didCollide(enemy)) {
        console.log("Bullet collided with enemy");

        // Log additional information for debugging
        console.log("Bullet Rect:", bullet.element.getBoundingClientRect());
        console.log("Enemy Rect:", enemy.element.getBoundingClientRect());

        this.bullets.splice(this.bullets.indexOf(bullet), 1);
        return true;
      }
      return false;
    });
  }
}
