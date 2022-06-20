document.addEventListener("DOMContentLoaded", () => {
  const cat = document.querySelector(".cat");
  const grid = document.querySelector(".grid");
  const body = document.querySelector("body");
  const alert = document.getElementById("alert");
  const alertInfo = document.getElementById("alert-info");
  let isJumping = false;
  let gravity = 0.9;
  let isGameOver = false;

  function control(e) {
    if (e.keyCode === 32) {
      if (!isJumping) {
        isJumping = true;
        jump();
      }
    }
  }
  document.addEventListener("keyup", control);

  let position = 0;
  function jump() {
    let count = 0;
    let timerId = setInterval(function () {
      // move down
      if (count === 15) {
        clearInterval(timerId);
        let downTimerId = setInterval(function () {
          if (count === 0) {
            clearInterval(downTimerId);
            isJumping = false;
          }
          position -= 5;
          count--;
          position = position * gravity;
          cat.style.bottom = position + "px";
        }, 20);
      }

      // move up
      position += 30;
      count++;
      position = position * gravity;
      cat.style.bottom = position + "px";
    }, 20);
  }

  function generateObstacles() {
    let randomTime = Math.random() * 4000;
    let obstactlePosition = 1000;
    const obstacle = document.createElement("div");
    if (!isGameOver) obstacle.classList.add("obstacle");
    grid.appendChild(obstacle);
    obstacle.style.left = obstactlePosition + "px";

    let timerId = setInterval(function () {
      if (obstactlePosition > 0 && obstactlePosition < 60 && position < 60) {
        clearInterval(timerId);
        alert.innerHTML = "Game Over";
        alertInfo.innerHTML = "Refresh to start over";
        document.querySelector(".game-title").classList.add("game-over");
        isGameOver = true;

        // remove all children
        while (grid.firstChild) {
          grid.removeChild(grid.lastChild);
        }
      }

      obstactlePosition -= 10;
      obstacle.style.left = obstactlePosition + "px";
    }, 20);
    if (!isGameOver) setTimeout(generateObstacles, randomTime);
  }
  generateObstacles();
});
