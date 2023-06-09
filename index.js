var time = new Date();
var deltaTime = 0;

function Iniciar() {
  document.getElementById("iniciar").style.display = "none";
}

function Init() {
  time = new Date();
  Start();
  Loop();
}

function startGame() {
  if (
    document.readyState === "complete" ||
    document.readyState === "interactive"
  ) {
    Init();
}
}

const elemento = document.getElementById("miElemento");
elemento.addEventListener("keydown", function (evento) {
    if (evento.code === "Space") {
        startGame();
        Iniciar();
  }
});

function Loop() {
  deltaTime = (new Date() - time) / 1000;
  time = new Date();
  Update();
  requestAnimationFrame(Loop);
}

var sueloY = 22;
var vely = 0;
var impulso = 900;
var gravedad = 2500;

var dinoPosX = 42;
var dinoPosY = sueloY;

var sueloX = 0;
var valEscenario = 1280 / 3;
var ganeVel = 1;
var score = 0;
var finish = "Game Over";

var parado = false;
var saltando = false;

var tiempoHastaObstaculo = 2;
var tiempoObstaculoMin = 0.7;
var tiempoObstaculoMax = 1.8;
var obstaculoPosy = 16;
var obstaculos = [];

var contenedor;
var dino;
var textoScore;
var suelo;
var gameOver;

function Start() {
  gameOver = document.querySelector(".game-over");
  suelo = document.querySelector(".suelo");
  contenedor = document.querySelector(".contenedor");
  textoScore = document.querySelector(".score");
  dino = document.querySelector(".dino");
  document.addEventListener("keydown", HandleKeyDown);
}

function HandleKeyDown(ev) {
  if (ev.keyCode === 32) {
    Saltar();
  }
}
function Saltar() {
  if (dinoPosY === sueloY) {
    saltando = true;
    vely = impulso;
    dino.classList.remove("dino-corriendo");
  }
}

function Update() {
  if (parado) return;

  MoverSuelo();
  MoverDinosaurio();
  DecidirCrearObstaculos();
  MoverObstaculos();
  DetectarColision();
  vely -= gravedad * deltaTime;
}

function MoverSuelo() {
  sueloX += CalcularDesplazamiento();
  suelo.style.left = -(sueloX % contenedor.clientWidth) + "px";
}

function CalcularDesplazamiento() {
  return valEscenario * deltaTime * ganeVel;
}

function MoverDinosaurio() {
  dinoPosY += vely * deltaTime;
  if (dinoPosY < sueloY) {
    TocarSuelo();
  }
  dino.style.bottom = dinoPosY + "px";
}

function TocarSuelo() {
  dinoPosY = sueloY;
  vely = 0;
  if (saltando) {
    dino.classList.add("dino-corriendo");
  }
  saltando = false;
}

function DecidirCrearObstaculos() {
  tiempoHastaObstaculo -= deltaTime;
  if (tiempoHastaObstaculo <= 0) {
    CrearObstaculo();
  }
}

function CrearObstaculo() {
  var obstaculo = document.createElement("div");
  contenedor.appendChild(obstaculo);
  obstaculo.classList.add("cactus");
  obstaculo.posX = contenedor.clientWidth;
  obstaculo.style.left = contenedor.clientWidth + "px";

  obstaculos.push(obstaculo);
  tiempoHastaObstaculo =
    tiempoObstaculoMin +
    (Math.random() * (tiempoObstaculoMax - tiempoObstaculoMin)) / ganeVel;
}

function MoverObstaculos() {
  for (var i = obstaculos.length - 1; i >= 0; i--) {
    if (obstaculos[i].posX < -obstaculos[i].clientWidth) {
      obstaculos[i].parentNode.removeChild(obstaculos[i]);
      obstaculos.splice(i, 1);
      GanarPuntos();
    } else {
      obstaculos[i].posX -= CalcularDesplazamiento();
      obstaculos[i].style.left = obstaculos[i].posX + "px";
    }
  }
}

function GanarPuntos() {
  score++;
  textoScore.innerText = score;
}

function DetectarColision() {
  for (var i = 0; i < obstaculos.length; i++) {
    if (obstaculos[i].posX > dinoPosX + dino.clientWidth) {
      break;
    } else {
      if (IsCollision(dino, obstaculos[0], 10, 30, 15, 20)) {
        GameOver(final());
      }
    }
  }
}

function IsCollision(
  a,
  b,
  paddingTop,
  paddingRight,
  paddinBottom,
  paddingLeft
  
) {
    var aRect = a.getBoundingClientRect();
    var bRect = b.getBoundingClientRect();
    
    return !(
        aRect.top + aRect.height - paddinBottom < bRect.top ||
        aRect.top + paddingTop > bRect.top + bRect.height ||
        aRect.left + aRect.width - paddingRight < bRect.left ||
        aRect.left + paddingLeft > bRect.left + bRect.width
        );
    }
    
    function Estrellarse() {
        dino.classList.remove("dino-corriendo");
        dino - classList.add("dino-estrellado");
        parado = true;
    }
    
    
    function final() {
        document.getElementById("finish").style.display = "block";
    }
    function GameOver() {
        Estrellarse();
    }