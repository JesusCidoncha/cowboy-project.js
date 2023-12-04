class BulletController {
  constructor(gameScreen) {
    this.gameScreen = gameScreen;
  }

  bullets = [];
  timerTillNextBullet = 0;
  moveBullets() {
    this.bullets.forEach((bullet) => {
      bullet.move();
      console.log("Checking collision for bullet");
      if (this.isBulletOffScreen(bullet)) {
        this.gameScreen.removeChild(bullet.element);

        const index = this.bullets.indexOf(bullet);
        if (index !== -1) {
          this.bullets.splice(index, 1);
        }
      }
    });
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
        // Log a message to check if didCollide is being called
        console.log("Bullet collided with enemy");

        this.bullets.splice(this.bullets.indexOf(bullet), 1);
        return true;
      }
      return false;
    });
  }
}
