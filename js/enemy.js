class Enemy {
  constructor(gameScreen, spawnFromLeft) {
    this.gameScreen = gameScreen;
    this.spawnFromLeft = spawnFromLeft;
    // Initialize other properties
    this.top = 550;
    this.height = 280;
    this.width = 250;
    this.left = this.spawnFromLeft ? -this.width : this.gameScreen.offsetWidth;

    const possibleBackgrounds = ["zombie1.gif", "zombie2.gif", "zombie3.gif"];

    // Randomly select a background from the array

    this.zombieSoundLeft = new Audio("./audio/zombie-sound1.mp3");
    this.zombieSoundHit = new Audio("./audio/zombie-sound3.mp3");
    const randomIndex = Math.floor(Math.random() * possibleBackgrounds.length);
    const selectedBackground = possibleBackgrounds[randomIndex];
    // Create the HTML element
    this.element = document.createElement("div");
    this.element.style.position = "absolute";
    this.element.style.height = `${this.height}px`;
    this.element.style.width = `${this.width}px`;
    this.element.style.top = `${this.top}px`;
    this.element.style.backgroundImage = `url(./images/${selectedBackground})`;
    this.element.style.backgroundSize = "cover";
    this.element.style.backgroundRepeat = "no-repeat";
    this.element.style.backgroundPosition = "center";

    this.element.style.left = `${this.left}px`;

    this.gameScreen.appendChild(this.element);
  }

  move() {
    if (this.spawnFromLeft) {
      this.zombieSoundLeft.play();
      this.zombieSoundLeft.volume = 0.3;
      // Move to the right if spawned from the left
      this.left += 2.5;
    } else {
      // Move to the left if spawned from the right
      this.left -= 2.5;
      this.element.style.backgroundPositionX = "100%";
      this.element.style.transform = "scaleX(-1)";
      this.element.style.backgroundPosition = "center";
    }

    this.element.style.left = `${this.left}px`;
  }
  updatePosition() {
    this.element.style.left = `${this.left}px`;
  }

  didCollide(bullet) {
    const enemyRect = this.element.getBoundingClientRect();
    const bulletRect = bullet.element.getBoundingClientRect();

    const isColliding =
      bulletRect.left < enemyRect.right &&
      bulletRect.right > enemyRect.left &&
      bulletRect.top < enemyRect.bottom &&
      bulletRect.bottom > enemyRect.top;

    if (isColliding) {
      this.zombieSoundHit.play();
      this.zombieSoundHit.volume = 0.5;
      this.element.style.display = "none";

      return true;
    }

    return false;
  }
}
