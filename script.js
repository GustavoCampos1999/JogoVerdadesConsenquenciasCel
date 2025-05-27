let nivelSelecionado = "";
let jogadores = [];
let jogadorAtual = 0;
let pontos = [0, 0];
let penalidades = [0, 0];
let desafiosNaoCumpridos = [0, 0];
let ultimaEscolha = "";
let emojiNivel = "";
let aguardandoPrenda = false;



const canvas = document.getElementById("roleta-canvas");
const ctx = canvas.getContext("2d");
const btnGirar = document.getElementById("btn-roleta");
const mensagem = document.getElementById("mensagem");
const resultado = document.getElementById("resultado");
const avaliacao = document.getElementById("avaliacao");
const vezDoJogador = document.getElementById("vez-do-jogador");
const nivelEscolhidoDisplay = document.getElementById("nivel-escolhido");
const placar = document.getElementById("placar");

const limitesPontuacao = {
  facil: 5,
  medio: 5,
  dificil: 5
};

let tamanho = 300;
canvas.width = tamanho;
canvas.height = tamanho;

const segmentos = [
  { texto: "Verdade", cor: "#4caf50" },
  { texto: "Consequência", cor: "#e91e63" }
];

let anguloAtual = 0;
let girando = false;

function iniciar() {
  const j1 = document.getElementById("jogador1").value.trim();
  const j2 = document.getElementById("jogador2").value.trim();
  if (!j1 || !j2) {
    alert("Digite o nome dos dois jogadores.");
    return;
  }
  jogadores = [j1, j2];
  pontos = [0, 0];
  penalidades = [0, 0];
  jogadorAtual = 0;
  document.getElementById("cadastro-section").style.display = "none";
  document.getElementById("nivel-section").style.display = "block";
}

function selecionarNivel(nivel) {
  if (nivel === "😄") {
    nivelSelecionado = "facil";
    emojiNivel = "😄";
  } else if (nivel === "😏") {
    nivelSelecionado = "medio";
    emojiNivel = "🔥";
  } else {
    nivelSelecionado = "dificil";
    emojiNivel = "😈";
  }

  nivelEscolhidoDisplay.textContent = emojiNivel;

  document.getElementById("nivel-section").style.display = "none";
  document.getElementById("jogo-section").style.display = "block";
  document.getElementById("roleta-container").style.display = "block";
  atualizarVez();
  desenharRoleta();
  atualizarPlacar();
  btnGirar.style.display = "inline-block";
  document.getElementById("btn-voltar-discreto").style.display = "inline-block";
}

function ajustarTamanhoCanvas() {
  tamanho = Math.min(window.innerWidth * 0.6, 220);
  canvas.width = tamanho;
  canvas.height = tamanho;
}

window.addEventListener('resize', ajustarTamanhoCanvas);
ajustarTamanhoCanvas();

function atualizarVez() {
  document.getElementById("vez-do-jogador").textContent = `É a vez de: ${jogadores[jogadorAtual]}`;
  
  document.getElementById("roleta-container").classList.remove("hidden");
  mensagem.textContent = `Vez de ${jogadores[jogadorAtual]}!`;
  resultado.textContent = "";
  avaliacao.style.display = "none";
  btnGirar.style.display = "none"; 
  girando = false;
  anguloAtual = 0;
  desenharRoleta();
}

function repetirPergunta() {
  let novaPergunta = "";
  const tipo = ultimaEscolha;

  if (tipo === "verdade") {
    const perguntasNivel = perguntas[nivelSelecionado].verdade;
    const perguntasFiltradas = perguntasNivel.filter(p => p !== resultado.textContent);
    novaPergunta = perguntasFiltradas.length
      ? perguntasFiltradas[Math.floor(Math.random() * perguntasFiltradas.length)]
      : perguntasNivel[Math.floor(Math.random() * perguntasNivel.length)];
  } else {
    const consequenciasNivel = perguntas[nivelSelecionado].consequencia;
    const consequenciasFiltradas = consequenciasNivel.filter(p => p !== resultado.textContent);
    novaPergunta = consequenciasFiltradas.length
      ? consequenciasFiltradas[Math.floor(Math.random() * consequenciasFiltradas.length)]
      : consequenciasNivel[Math.floor(Math.random() * consequenciasNivel.length)];
  }

  resultado.textContent = novaPergunta;
}

function atualizarPlacar() {
  placar.textContent = `${jogadores[0]}: ${pontos[0]} pts — ${jogadores[1]}: ${pontos[1]} pts`;
}

function desenharRoleta() {
  const raio = canvas.width / 2;
  const total = segmentos.length;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < total; i++) {
    const anguloInicial = (2 * Math.PI * i) / total;
    const anguloFinal = (2 * Math.PI * (i + 1)) / total;

    const gradiente = ctx.createRadialGradient(raio, raio, 10, raio, raio, raio);
    gradiente.addColorStop(0, "#ffffff");
    gradiente.addColorStop(1, segmentos[i].cor);

    ctx.beginPath();
    ctx.moveTo(raio, raio);
    ctx.arc(raio, raio, raio, anguloInicial, anguloFinal);
    ctx.fillStyle = gradiente;
    ctx.fill();

    ctx.save();
    ctx.translate(raio, raio);
    ctx.rotate((anguloInicial + anguloFinal) / 2);
    ctx.textAlign = "right";
    ctx.fillStyle = "#222";
   ctx.font = "600 14px 'Quicksand', sans-serif";
    ctx.fillText(segmentos[i].texto, raio - 10, 5);
    ctx.restore();
  }

  ctx.save();
  ctx.translate(raio, raio);
  ctx.beginPath();
  ctx.moveTo(0, -raio);
  ctx.lineTo(-15, -raio - 20);
  ctx.lineTo(15, -raio - 20);
  ctx.closePath();
  ctx.fillStyle = "#fdd835";
  ctx.strokeStyle = "#000";
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.fill();
  ctx.restore();
}

function girarRoleta() {
  if (girando) return;
  document.querySelectorAll('.btn-voltar').forEach(btn => btn.disabled = true);
  document.getElementById("roleta-container").classList.remove("hidden");
  btnGirar.style.display = "none";
  girando = true;
  btnGirar.disabled = true;
  mensagem.textContent = "Girando...";

  const girosCompletos = Math.floor(Math.random() * 4) + 4;
  const duracao = 1000;

  const anguloParada = Math.random() * 2 * Math.PI;
  const anguloFinal = girosCompletos * 2 * Math.PI + anguloParada;

  let inicio = null;

  function animar(timestamp) {
    if (!inicio) inicio = timestamp;
    let tempoDecorrido = timestamp - inicio;
    if (tempoDecorrido > duracao) tempoDecorrido = duracao;

    const progresso = tempoDecorrido / duracao;
    const easeOutProgress = 1 - Math.pow(1 - progresso, 3);

    anguloAtual = anguloFinal * easeOutProgress;
    canvas.style.transform = `rotate(${anguloAtual}rad)`;

    if (tempoDecorrido < duracao) {
      requestAnimationFrame(animar);
    } else {
      girando = false;
      const anguloNormalized = anguloAtual % (2 * Math.PI);
      const anguloInverso = (2 * Math.PI - anguloNormalized) % (2 * Math.PI);
      let segmentoSelecionado = Math.floor(anguloInverso / Math.PI);
      mostrarResultado(segmentoSelecionado);
      btnGirar.disabled = false;
    }
  }

  requestAnimationFrame(animar);
}

function mostrarResultado(indice) {
  const tipo = segmentos[indice].texto.toLowerCase();
  ultimaEscolha = tipo;

  mensagem.textContent = `${segmentos[indice].texto}!`;
  resultado.textContent = "";
  avaliacao.style.display = "none";

  const animacao = document.getElementById("animacao-resultado");

  animacao.className = "animacao-resultado";
  animacao.textContent = tipo === "verdade" ? "Verdade" : "Consequência";

  void animacao.offsetWidth;
  animacao.classList.add(tipo === "verdade" ? "animacao-verdade" : "animacao-consequencia");

  setTimeout(() => {
    animacao.className = "animacao-resultado hidden";
    animacao.textContent = "";

    document.getElementById("roleta-container").classList.add("hidden");

    let frase = "";
    if (tipo === "verdade") {
      const perguntasNivel = perguntas[nivelSelecionado].verdade;
      frase = perguntasNivel[Math.floor(Math.random() * perguntasNivel.length)];
    } else {
      const consequenciasNivel = perguntas[nivelSelecionado].consequencia;
      frase = consequenciasNivel[Math.floor(Math.random() * consequenciasNivel.length)];
    }

    resultado.textContent = frase;
    avaliacao.style.display = "block";
    document.querySelectorAll('.btn-voltar').forEach(btn => btn.disabled = false);
  }, 1000);
}

function avaliar(cumpriu) {
  document.querySelectorAll('.btn-voltar').forEach(btn => btn.disabled = true);
  document.getElementById("btn-cumpriu").disabled = true;
  document.getElementById("btn-nao-cumpriu").disabled = true;
  btnGirar.disabled = true;

  const animacao = document.getElementById("animacao-resultado");
  animacao.classList.remove("hidden", "animacao-verdade", "animacao-consequencia");
  animacao.style.color = "";

  if (aguardandoPrenda) {
    if (cumpriu) {
      mensagem.textContent = "Você cumpriu a prenda! O jogo continua.";
      animacao.textContent = "✅";
      animacao.classList.add("animacao-verdade");
      aguardandoPrenda = false;  
      desafiosNaoCumpridos[jogadorAtual] = 0;  

      setTimeout(() => {
        animacao.classList.add("hidden");
        atualizarPlacar();
        proximoTurno();
      }, 1500);
    } else {
     mensagem.textContent = `${jogadores[jogadorAtual]} não cumpriu a prenda! Fim de jogo!`;
resultado.textContent = `${jogadores[(jogadorAtual + 1) % jogadores.length]} venceu!`;
animacao.textContent = "❌";
animacao.classList.add("animacao-consequencia");

avaliacao.style.display = "none";
document.getElementById("btn-voltar-discreto").style.display = "none";

document.getElementById("btn-reiniciar").style.display = "inline-block";

setTimeout(() => {
    animacao.classList.add("hidden");
    animacao.textContent = "";
}, 1500);
    }
    return;  
  }

 
  if (cumpriu) {
    pontos[jogadorAtual]++;
    mensagem.textContent = "Você cumpriu! +1 ponto.";
    animacao.textContent = "✅";
    animacao.classList.add("animacao-verdade");
    desafiosNaoCumpridos[jogadorAtual] = 0;  
  } else {
    penalidades[jogadorAtual]++;
    desafiosNaoCumpridos[jogadorAtual]++;

    if (pontos[jogadorAtual] > 0) {
      pontos[jogadorAtual]--;
    }

    if (desafiosNaoCumpridos[jogadorAtual] >= 2) {
      aguardandoPrenda = true;
      const prenda = prendas[Math.floor(Math.random() * prendas.length)];

      mensagem.textContent = "Você deve pagar uma prenda!";
      resultado.textContent = `Prenda: ${prenda}`;

      animacao.textContent = "⚠️ Pague a prenda!";
      animacao.classList.add("animacao-consequencia");
      animacao.style.color = "yellow";

      setTimeout(() => {
        animacao.classList.add("hidden");
        document.getElementById("btn-cumpriu").disabled = false;
        document.getElementById("btn-nao-cumpriu").disabled = false;
      }, 1500);

      return;  // ✅ Espera resposta da prenda
    } else {
      mensagem.textContent = "Você não cumpriu!";
      animacao.textContent = "❌";
      animacao.classList.add("animacao-consequencia");
    }
  }

  atualizarPlacar();

  setTimeout(() => {
    animacao.classList.add("hidden");
    if (!verificarFimDeJogo()) {
      proximoTurno();
    } else {
      avaliacao.style.display = "none";
      resultado.textContent = "";
      btnGirar.style.display = "none";
      document.getElementById("btn-reiniciar").style.display = "inline-block";
    }
  }, 1500);
}

function proximoTurno() {
  document.querySelectorAll('.btn-voltar').forEach(btn => btn.disabled = false);
  jogadorAtual = (jogadorAtual + 1) % 2;
  atualizarVez();
  avaliacao.style.display = "none";
  resultado.textContent = "";
  btnGirar.style.display = "inline-block";

  document.getElementById("btn-cumpriu").disabled = false;
  document.getElementById("btn-nao-cumpriu").disabled = false;
  btnGirar.disabled = false;
}

function reiniciarJogo() {
  pontos = [0, 0];
  penalidades = [0, 0];
  desafiosNaoCumpridos = [0, 0];
  jogadorAtual = 0;
  ultimaEscolha = "";
  aguardandoPrenda = false;

  document.getElementById("nivel-section").style.display = "block";
  document.getElementById("jogo-section").style.display = "none";
  document.getElementById("roleta-container").style.display = "none";
  document.getElementById("btn-reiniciar").style.display = "none";

  placar.textContent = "";
  mensagem.textContent = "";
  resultado.textContent = "";
  avaliacao.style.display = "none";
  const animacao = document.getElementById("animacao-resultado");
  animacao.className = "";
  animacao.classList.add("hidden");
  animacao.textContent = "";

  btnGirar.style.display = "inline-block";
  btnGirar.disabled = false;

  document.getElementById("btn-cumpriu").disabled = false;
  document.getElementById("btn-nao-cumpriu").disabled = false;
}

function voltarParaSelecaoDeNivel() {
  document.getElementById("jogo-section").style.display = "none";
  document.getElementById("nivel-section").style.display = "block";
  
  mensagem.textContent = "";
  resultado.textContent = "";
  avaliacao.style.display = "none";
  document.getElementById("roleta-container").style.display = "none";
  document.getElementById("btn-voltar-discreto").style.display = "none";
}

document.getElementById("btn-cumpriu").addEventListener('click', () => avaliar(true));
document.getElementById("btn-nao-cumpriu").addEventListener('click', () => avaliar(false));
resultado.classList.add('prenda');
resultado.classList.remove('prenda');

function verificarFimDeJogo() {
  const limite = limitesPontuacao[nivelSelecionado];
  const diff = Math.abs(pontos[0] - pontos[1]);

  for (let i = 0; i < jogadores.length; i++) {
    if (pontos[i] >= limite && diff >= 2) {
      mensagem.textContent = `${jogadores[i]} venceu o jogo!`;
      btnGirar.style.display = "none";
      avaliacao.style.display = "none";
      resultado.textContent = "";
      document.getElementById("btn-reiniciar").style.display = "inline-block";
      document.getElementById("btn-voltar-discreto").style.display = "none";
      return true;
    }
  }

  return false;
}
