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
        this.gameScreen.removeChild(bullet.element);
        this.gameScreen.removeChild(collidedEnemy.element);
      }
    });

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
    return this.bullets.some((bullet) => {
      if (bullet.didCollide(enemy)) {
        this.bullets.splice(this.bullets.indexOf(bullet), 1);
        return true;
      }
      return false;
    });
  }
}
