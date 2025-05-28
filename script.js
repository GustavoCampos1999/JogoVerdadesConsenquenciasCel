  let nivelSelecionado = "";
  let jogadores = [];
  let jogadorAtual = 0;
  let pontos = [0, 0];
  let penalidades = [0, 0];
  let desafiosNaoCumpridos = [0, 0];
  let ultimaEscolha = "";
  let emojiNivel = "";
  let aguardandoPrenda = false;
  window.perguntasCurtidas = window.perguntasCurtidas || [];
  window.perguntasNaoCurtidas = window.perguntasNaoCurtidas || [];


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
    document.getElementById("feedback-container").style.display = "none";
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

    setTimeout(() => girarRoleta());

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

    resultado.innerHTML = `${jogadores[jogadorAtual]}, ${frase}`;
    avaliacao.style.display = "block";
    btnGirar.disabled = false;
    document.getElementById("btn-voltar-discreto").disabled = false;

    prepararFeedbackParaPergunta(frase);

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
        mostrarAnimacaoFeedback("✅", "green");
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
  const perdedor = jogadores[jogadorAtual];
  const vencedor = jogadores[(jogadorAtual + 1) % 2];
  mensagem.classList.add("mensagem-vitoria");
  mensagem.textContent = `${vencedor} venceu o jogo!`;
  resultado.textContent = `${perdedor}, vire um copo (ou meio se o copo for grande) o mais rápido possível.`;

  mostrarAnimacaoFeedback("❌", "red");
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

document.getElementById("feedback-container").style.display = "none";
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
  mensagem.classList.remove("mensagem-vitoria");
    document.getElementById("nivel-section").style.display = "block";
    document.getElementById("jogo-section").style.display = "none";
    document.getElementById("btn-reiniciar").style.display = "none";
    document.getElementById("feedback-container").style.display = "none";

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
    mensagem.classList.remove("mensagem-vitoria");
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

  function ativarModoSoVerdade() {

    nivelSelecionado = "modo-verdade";
    jogadores = [document.getElementById("jogador1").value.trim(), document.getElementById("jogador2").value.trim()];
    jogadorAtual = 0;

  setTimeout(() => {
    sortearVerdadeSimples();
  }, 100);

    if (!jogadores[0] || !jogadores[1]) {
      alert("Preencha o nome dos dois jogadores!");
      return;
    }

    document.getElementById("cadastro-section").style.display = "none";
    document.getElementById("nivel-section").style.display = "none";

    document.body.classList.add("modo-verdade");
    mostrarTelaModoVerdade();
  }

  function mostrarTelaModoVerdade() {
    document.getElementById("modo-verdade-section").style.display = "block";
    document.getElementById("vez-simples").textContent = `Vez de: ${jogadores[jogadorAtual]}`;
    document.getElementById("pergunta-simples").textContent = "";
  }

function sortearVerdadeSimples() {
  const todasVerdades = [
    ...perguntas.facil.verdade,
    ...perguntas.medio.verdade,
    ...perguntas.dificil.verdade
  ];
  const pergunta = todasVerdades[Math.floor(Math.random() * todasVerdades.length)];

  document.getElementById("pergunta-simples").innerHTML = "<span class='buscando'>🔎 Buscando...</span>";

  setTimeout(() => {
    document.getElementById("pergunta-simples").textContent = `${jogadores[jogadorAtual]}, ${pergunta}`;
    document.getElementById("vez-simples").textContent = `Vez de: ${jogadores[jogadorAtual]}`;
    jogadorAtual = (jogadorAtual + 1) % jogadores.length;
    prepararFeedbackParaPergunta(pergunta);
  }, 1000);
}

  function voltarParaNiveis() {
    document.getElementById("modo-verdade-section").style.display = "none";
    document.getElementById("nivel-section").style.display = "block";
    document.body.classList.remove("modo-verdade");
    document.getElementById("feedback-container").style.display = "none";
  }

  function verificarFimDeJogo() {
    const limite = limitesPontuacao[nivelSelecionado];
    const diff = Math.abs(pontos[0] - pontos[1]);

    for (let i = 0; i < jogadores.length; i++) {
      if (pontos[i] >= limite && diff >= 2) {
        const vencedor = jogadores[i];
        const perdedor = jogadores[(i + 1) % 2];

        mensagem.classList.add("mensagem-vitoria");
        mensagem.textContent = `${vencedor} venceu o jogo!`;
        resultado.textContent = `${perdedor}, vire um copo (ou meio se o copo for grande) o mais rápido possível.`;

        btnGirar.style.display = "none";
        avaliacao.style.display = "none";
        document.getElementById("btn-reiniciar").style.display = "inline-block";
        document.getElementById("btn-voltar-discreto").style.display = "none";

        return true;
      }
    }

    return false;
  }

