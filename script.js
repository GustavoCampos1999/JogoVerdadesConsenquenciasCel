let nivelSelecionado = "";
let jogadores = [];
let jogadorAtual = 0;
let pontos = [0, 0];
let penalidades = [0, 0];
let desafiosNaoCumpridos = [0, 0];
let ultimaEscolha = "";
let emojiNivel = "";
let aguardandoPrenda = false;




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
  atualizarVez();
  atualizarPlacar();
  btnGirar.style.display = "inline-block";
  document.getElementById("btn-voltar-discreto").style.display = "inline-block";
}

function atualizarVez() {
  document.getElementById("vez-do-jogador").textContent = `É a vez de: ${jogadores[jogadorAtual]}`;
  mensagem.textContent = `Vez de ${jogadores[jogadorAtual]}!`;
  resultado.textContent = "";
  avaliacao.style.display = "none";
  btnGirar.style.display = "none"; 
  girando = false;
  anguloAtual = 0;
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


function girarRoleta() {
  if (girando) return;
  document.getElementById("btn-voltar-discreto").disabled = true;
  girando = true;
  mensagem.textContent = "Sorteando...";
  btnGirar.style.display = "none";

  document.getElementById("escolha-container").style.display = "flex";

  const opcoes = [document.getElementById("opcao-verdade"), document.getElementById("opcao-consequencia")];
  let selecionadoIndex = Math.floor(Math.random() * 2);
  let ciclos = 4 + Math.floor(Math.random() * 5);
  let atual = 0;

  const intervalo = setInterval(() => {
    opcoes[0].classList.remove("piscar");
    opcoes[1].classList.remove("piscar");
    opcoes[atual % 2].classList.add("piscar");
    atual++;
    if (atual >= ciclos) {
      clearInterval(intervalo);
      opcoes[0].classList.remove("piscar");
      opcoes[1].classList.remove("piscar");
      mostrarResultado(selecionadoIndex);
      girando = false;
    }
  }, 250);
}

function mostrarResultado(indice) {
  const tipo = segmentos[indice].texto.toLowerCase();
  ultimaEscolha = tipo;

  mensagem.textContent = `${segmentos[indice].texto}!`;
  resultado.textContent = "";
  avaliacao.style.display = "none";

  document.getElementById("escolha-container").style.display = "none";

  const animacao = document.getElementById("animacao-resultado");
  animacao.className = "animacao-resultado";
  animacao.textContent = tipo === "verdade" ? "Verdade" : "Consequência";

  void animacao.offsetWidth;
  animacao.classList.add(tipo === "verdade" ? "animacao-verdade" : "animacao-consequencia");

  setTimeout(() => {
    animacao.className = "animacao-resultado hidden";
    animacao.textContent = "";

    let frase = "";
    if (tipo === "verdade") {
      const perguntasNivel = perguntas[nivelSelecionado].verdade;
      frase = perguntasNivel[Math.floor(Math.random() * perguntasNivel.length)];
    } else {
      const consequenciasNivel = perguntas[nivelSelecionado].consequencia;
      frase = consequenciasNivel[Math.floor(Math.random() * consequenciasNivel.length)];
    }

    resultado.textContent = `${jogadores[jogadorAtual]}, ${frase}`;
    avaliacao.style.display = "block";
    btnGirar.disabled = false;
    document.getElementById("btn-voltar-discreto").disabled = false;
  }, 1000);
}

function avaliar(cumpriu) {
  document.querySelectorAll('.btn-voltar').forEach(btn => btn.disabled = true);
  document.getElementById("btn-cumpriu").disabled = true;
  document.getElementById("btn-nao-cumpriu").disabled = true;
  btnGirar.disabled = true;

  const animacao = document.getElementById("animacao-resultado");
  animacao.classList.remove("hidden", "animacao-verdade", "animacao-consequencia", "animacao-prenda");
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
document.getElementById("escolha-container").style.display = "none";

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
      resultado.textContent = `Prenda: ${jogadores[jogadorAtual]}, ${prenda}`; 

     animacao.textContent = "Pague a prenda!";
    animacao.classList.add("animacao-prenda");
      setTimeout(() => {
        animacao.classList.add("hidden");
        document.getElementById("btn-cumpriu").disabled = false;
        document.getElementById("btn-nao-cumpriu").disabled = false;
      }, 1500);

      return;  
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
  document.getElementById("btn-voltar-discreto").style.display = "inline-block";
}

function voltarParaSelecaoDeNivel() {
 document.getElementById("jogo-section").style.display = "none";
document.getElementById("nivel-section").style.display = "block";
document.getElementById("btn-voltar-discreto").style.display = "none";

pontos = [0, 0];
penalidades = [0, 0];
desafiosNaoCumpridos = [0, 0];
jogadorAtual = 0;
ultimaEscolha = "";
aguardandoPrenda = false;

placar.textContent = "";
mensagem.textContent = "";
resultado.textContent = "";
avaliacao.style.display = "none";

const animacao = document.getElementById("animacao-resultado");
animacao.className = "animacao-resultado hidden";
animacao.textContent = "";

document.getElementById("escolha-container").style.display = "none";
btnGirar.disabled = false;
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
