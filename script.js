const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const player = {
  x: 175,
  y: 550,
  width: 50,
  height: 50,
  color: '#00ff99',
  speed: 5
};

let obstacles = [];
let gameOver = false;
let frame = 0;

function drawPlayer() {
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawObstacles() {
  ctx.fillStyle = '#ff0033';
  obstacles.forEach(obs => {
    ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
  });
}

function updateObstacles() {
  obstacles.forEach(obs => {
    obs.y += obs.speed;
    if (
      obs.x < player.x + player.width &&
      obs.x + obs.width > player.x &&
      obs.y < player.y + player.height &&
      obs.y + obs.height > player.y
    ) {
      document.getElementById('gameOver').style.display = 'block';
      gameOver = true;
    }
  });

  obstacles = obstacles.filter(obs => obs.y < canvas.height);

  if (frame % 50 === 0) {
    const obsWidth = Math.random() * 100 + 20;
    obstacles.push({
      x: Math.random() * (canvas.width - obsWidth),
      y: -30,
      width: obsWidth,
      height: 20,
      speed: 2 + frame / 1000
    });
  }
}

const keys = {};
document.addEventListener('keydown', e => keys[e.key] = true);
document.addEventListener('keyup', e => keys[e.key] = false);

function movePlayer() {
  if (keys['ArrowLeft'] && player.x > 0) player.x -= player.speed;
  if (keys['ArrowRight'] && player.x + player.width < canvas.width) player.x += player.speed;
}

function gameLoop() {
  if (gameOver) return;
  frame++;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  movePlayer();
  drawPlayer();
  updateObstacles();
  drawObstacles();
  requestAnimationFrame(gameLoop);
}

gameLoop();

