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

      enemies.forEach((enemy) => {
        if (bullet.didCollide(enemy)) {
          // Remove the bullet visually
          this.gameScreen.removeChild(bullet.element);

          // Remove the collided enemy visually
          this.gameScreen.removeChild(enemy.element);
        }
      });
    });

    // Filter out bullets that went off-screen
    this.bullets = this.bullets.filter(
      (bullet) =>
        !bullet.isBulletOffScreen() && bullet.element.style.display !== "none"
    );

    // Update the timer for the next bullet only when the spacebar is not pressed
    if (!this.isSpacebarPressed && this.timerTillNextBullet > 0) {
      this.timerTillNextBullet--;
    }
  }

  shoot(player, speed, delay) {
    if (this.timerTillNextBullet <= 0) {
      const bulletDirection = player.directionX !== 0 ? player.directionX : 1;

      const bullet = new Bullet(
        player.left + player.width / 2,
        player.top,
        speed * bulletDirection
      );

      this.gameScreen.appendChild(bullet.element);
      this.bullets.push(bullet);
      this.timerTillNextBullet = delay;
    }
  }

  isBulletOffScreen(bullet) {
    return bullet.top <= -bullet.height;
  }

  didCollide(enemy) {
    return this.bullets.some((bullet) => {
      if (bullet.didCollide(enemy)) {
        this.bullets.splice(this.bullets.indexOf(bullet), 1);
        return true;
      }
      return false;
    });
  }
}
