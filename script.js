// variáveis
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

var bird = {
  x: 50,
  y: 200,
  speed: 0,
  gravity: 0.5
};

var pipes = [];
var score = 0;

// adicionar evento de clique para mover o pássaro
canvas.addEventListener("click", function () {
  bird.speed = -10;
});

// loop do jogo
function gameLoop() {
  update();
  render();
  requestAnimationFrame(gameLoop);
}

// atualizar estado do jogo
function update() {
  bird.speed += bird.gravity;
  bird.y += bird.speed;

  if (bird.y < 0 || bird.y > canvas.height) {
    gameOver();
  }

  if (pipes.length == 0 || pipes[pipes.length - 1].x < canvas.width - 300) {
    pipes.push({
      x: canvas.width,
      gap: Math.random() * 300 + 100
    });
  }

  for (var i = 0; i < pipes.length; i++) {
    pipes[i].x -= 5;
    if (pipes[i].x < -50) {
      pipes.splice(i, 1);
      i--;
      continue;
    }

    if (bird.x > pipes[i].x && bird.x < pipes[i].x + 50) {
      if (bird.y < pipes[i].gap - 50 || bird.y > pipes[i].gap + 50) {
        gameOver();
        break;
      }
    }

    if (bird.x == pipes[i].x + 50) {
      score++;
    }
  }
}

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // desenhar o pássaro
  ctx.fillStyle = "#fe0016";
  ctx.fillRect(bird.x, bird.y, 50, 50);

  // desenhar os canos
  ctx.fillStyle = "#90ee90"; 
  for (var i = 0; i < pipes.length; i++) {
    ctx.fillRect(pipes[i].x, 0, 50, pipes[i].gap - 50);
    ctx.fillRect(pipes[i].x, pipes[i].gap + 50, 50, canvas.height - (pipes[i].gap + 50));
  }

  // desenhar a pontuação
  ctx.fillStyle = "#000000";
  ctx.font = "40px Arial";
  ctx.fillText(score, 20, 50);
}
// finalizar o jogo
function gameOver() {
  if (window.confirm("Game Over! Play again?")) {
    bird.y = 10;
    bird.speed = 0;
    pipes = [];
    score = 0;
  } else {
    // aqui pode ser adicionado código para redirecionar o usuário para outra página do score ou algo assim
  }
}

// iniciar o jogo
gameLoop();
