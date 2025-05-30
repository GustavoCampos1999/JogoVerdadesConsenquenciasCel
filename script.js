let nivelSelecionado = "";
let jogadores = [];
let jogadorAtual = 0;
let pontos = []; 
let penalidades = []; 
let desafiosNaoCumpridos = []; 
let ultimaEscolha = "";
let emojiNivel = "";
let aguardandoPrenda = false;
let modoJogo = "";
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

const segmentos = [
  { texto: "verdade" },
  { texto: "consequencia" }
];

let girando = false;

function iniciar() {
  jogadores = [];
  const nomesInputTemp = [];

  if (modoJogo === "dupla") {
    const j1 = document.getElementById("jogador1").value.trim();
    const j2 = document.getElementById("jogador2").value.trim();
    if (!j1 || !j2) {
      alert("Digite o nome dos dois jogadores.");
      return;
    }
    nomesInputTemp.push(j1, j2);
  } else if (modoJogo === "grupo") {
    const j1 = document.getElementById("jogador1").value.trim();
    const j2 = document.getElementById("jogador2").value.trim();
    const j3Input = document.getElementById("jogador3");
    const j3Container = document.getElementById("campo-jogador3-container");

    if (!j1 || !j2) {
        alert("Os nomes dos Jogadores 1 e 2 são obrigatórios.");
        return;
    }
    nomesInputTemp.push(j1, j2);

    if (j3Container && j3Container.style.display !== 'none' && j3Input) {
        const j3 = j3Input.value.trim();
        if (!j3) {
            alert("O nome do Jogador 3 é obrigatório quando o campo está visível.");
            return;
        }
        nomesInputTemp.push(j3);
    } else if (j3Container && j3Container.style.display !== 'none' && !j3Input) {
        alert("Erro: Campo do Jogador 3 não encontrado.");
        return;
    }


    for (let i = 4; i <= 5; i++) {
      const container = document.getElementById(`campo-jogador${i}-container`);
      const input = document.getElementById(`jogador${i}`);
      if (container && container.style.display !== 'none' && input) {
        const nome = input.value.trim();
        if (nome) {
          nomesInputTemp.push(nome);
        } else {
        }
      }
    }

    if (nomesInputTemp.length < 3) {
      alert("Para o modo grupo, preencha os nomes de pelo menos 3 jogadores.");
      return;
    }
  } else {
    alert("Modo de jogo não selecionado!");
    return;
  }

  jogadores = nomesInputTemp;
  pontos = new Array(jogadores.length).fill(0);
  penalidades = new Array(jogadores.length).fill(0);
  desafiosNaoCumpridos = new Array(jogadores.length).fill(0);
  jogadorAtual = 0;

  document.getElementById("cadastro-section").style.display = "none";
  document.getElementById("nivel-section").style.display = "block";
}


function selecionarNivel(nivel) {
  if (nivel === "facil") {
    nivelSelecionado = "facil";
    emojiNivel = "😄";
  } else if (nivel === "medio") {
    nivelSelecionado = "medio";
    emojiNivel = "🔥";
  } else { 
    nivelSelecionado = "dificil";
    emojiNivel = "😈";
  }
  nivelEscolhidoDisplay.textContent = `Nível: ${emojiNivel}`; 
  document.getElementById("nivel-section").style.display = "none";
  document.getElementById("jogo-section").style.display = "block";
  if (jogadorAtual >= jogadores.length) {
      jogadorAtual = 0;
  }
  vezDoJogador.textContent = `É a vez de: ${jogadores[jogadorAtual]}`;
  resultado.textContent = "";
  avaliacao.style.display = "none";
  btnGirar.style.display = "none"; 
  document.getElementById("escolha-container").style.display = "flex"; 
  girando = false;
  atualizarPlacar();
  document.getElementById("btn-voltar-discreto").style.display = "inline-block";
  girarRoleta(); 
}

function girarRoleta() {
  if (girando) return;
  document.getElementById("btn-voltar-discreto").disabled = true; // Bloqueia o botão
  girando = true;
  mensagem.textContent = "Sorteando...";
  btnGirar.style.display = "none";
  document.getElementById("escolha-container").style.display = "flex";
  const opcoes = [document.getElementById("opcao-verdade"), document.getElementById("opcao-consequencia")];
  opcoes[0].classList.remove("piscar");
  opcoes[1].classList.remove("piscar");

  let selecionadoIndex = Math.floor(Math.random() * 2);
  let ciclos = 6 + Math.floor(Math.random() * 8);
  let atual = 0;
  const intervalo = setInterval(() => {
    opcoes.forEach(opt => opt.classList.remove("piscar"));
    opcoes[atual % 2].classList.add("piscar");
    atual++;
    if (atual >= ciclos) {
      clearInterval(intervalo);
      opcoes.forEach(opt => opt.classList.remove("piscar"));
      opcoes[selecionadoIndex].classList.add("piscar");
      setTimeout(() => {
        opcoes[selecionadoIndex].classList.remove("piscar");
        mostrarResultado(selecionadoIndex);
        girando = false;
        // A LINHA ABAIXO FOI REMOVIDA DAQUI:
        // document.getElementById("btn-voltar-discreto").disabled = false;
      }, 700);
    }
  }, 200);
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
  animacao.classList.remove("hidden");

  setTimeout(() => {
    animacao.className = "animacao-resultado hidden";
    animacao.textContent = "";

    let fraseSorteada = "";
    const tipoDesafio = tipo; // "verdade" ou "consequencia"
    let arrayCandidato = [];

    const isArrayValido = (arr) => Array.isArray(arr) && arr.length > 0 && arr.some(item => typeof item === 'string' && item.trim() !== "");

    // Tentativa 1: Específico do modo e nível
    if (perguntas[modoJogo] && perguntas[modoJogo][nivelSelecionado]) {
      const especifico = perguntas[modoJogo][nivelSelecionado][tipoDesafio];
      if (isArrayValido(especifico)) {
        arrayCandidato = especifico;
      }
    }

    // Fallback 1: Modo 'dupla' para o nível atual (só se o arrayCandidato ainda estiver vazio)
    if (arrayCandidato.length === 0 && perguntas.dupla && perguntas.dupla[nivelSelecionado]) {
      const fallbackDuplaNivel = perguntas.dupla[nivelSelecionado][tipoDesafio];
      if (isArrayValido(fallbackDuplaNivel)) {
        arrayCandidato = fallbackDuplaNivel;
      }
    }
    
    // Fallback 2: Todos os níveis do modo atual (se ainda vazio)
    if (arrayCandidato.length === 0 && perguntas[modoJogo]) {
        const pFacil = perguntas[modoJogo].facil?.[tipoDesafio] || [];
        const pMedio = perguntas[modoJogo].medio?.[tipoDesafio] || [];
        const pDificil = perguntas[modoJogo].dificil?.[tipoDesafio] || [];
        const combinadasModo = [...pFacil, ...pMedio, ...pDificil].filter(item => typeof item === 'string' && item.trim() !== "");
        if (combinadasModo.length > 0) arrayCandidato = combinadasModo;
    }

    // Fallback 3: Todos os níveis do modo 'dupla' (se ainda vazio)
    if (arrayCandidato.length === 0 && perguntas.dupla) {
        const pFacilDupla = perguntas.dupla.facil?.[tipoDesafio] || [];
        const pMedioDupla = perguntas.dupla.medio?.[tipoDesafio] || [];
        const pDificilDupla = perguntas.dupla.dificil?.[tipoDesafio] || [];
        const combinadasDupla = [...pFacilDupla, ...pMedioDupla, ...pDificilDupla].filter(item => typeof item === 'string' && item.trim() !== "");
        if (combinadasDupla.length > 0) arrayCandidato = combinadasDupla;
    }

    if (arrayCandidato.length > 0) {
      fraseSorteada = arrayCandidato[Math.floor(Math.random() * arrayCandidato.length)];
    } else {
      console.error(`Nenhuma ${tipoDesafio} válida encontrada para modo '${modoJogo}', nível '${nivelSelecionado}'. Verifique o arquivo dados-perguntas.js.`);
      fraseSorteada = `Ops! Nenhuma ${tipoDesafio} para (m:${modoJogo}, n:${nivelSelecionado}).`;
    }
    
    if (jogadorAtual >= jogadores.length) jogadorAtual = 0;
    resultado.innerHTML = `${jogadores[jogadorAtual]}, ${fraseSorteada}`;
    avaliacao.style.display = "flex";
    
    // A LINHA ABAIXO PERMANECE AQUI (ou foi movida para cá e confirmada):
    // Libera o botão voltar APENAS QUANDO A PERGUNTA APARECE.
    document.getElementById("btn-voltar-discreto").disabled = false; 
  }, 1500);
}

function avaliar(cumpriu) {
  document.querySelectorAll('.btn-voltar, #btn-voltar-discreto').forEach(btn => btn.disabled = true);
  document.getElementById("btn-cumpriu").disabled = true;
  document.getElementById("btn-nao-cumpriu").disabled = true;
  const animacao = document.getElementById("animacao-resultado");
  animacao.className = "animacao-resultado"; 
  animacao.style.color = ""; 
  animacao.classList.remove("hidden");


  if (aguardandoPrenda) {
    if (cumpriu) {
      mensagem.textContent = "Você cumpriu a prenda! O jogo continua.";
      animacao.textContent = "Prenda Cumprida!";
      animacao.classList.add("animacao-verdade");
      aguardandoPrenda = false;
      desafiosNaoCumpridos[jogadorAtual] = 0; 
    } else {
      mensagem.textContent = `${jogadores[jogadorAtual]} não cumpriu a prenda! Penalidade...`;
      animacao.textContent = "Prenda NÃO Cumprida!";
      animacao.classList.add("animacao-consequencia");
      if (pontos[jogadorAtual] > 0) {
        pontos[jogadorAtual]--; 
      }
      penalidades[jogadorAtual]++;
      aguardandoPrenda = false; 
    }
    atualizarPlacar();
    setTimeout(() => {
      animacao.className = "animacao-resultado hidden";
      animacao.textContent = "";
      if (!verificarFimDeJogo()) {
        proximoTurno();
      } else {
        avaliacao.style.display = "none";
        btnGirar.style.display = "none";
        document.getElementById("btn-reiniciar").style.display = "inline-block";
         document.querySelectorAll('.btn-voltar, #btn-voltar-discreto').forEach(btn => btn.style.display = "none");
      }
    }, 1500);
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
    mensagem.textContent = "Você não cumpriu! -1 ponto.";
    animacao.textContent = "❌";
    animacao.classList.add("animacao-consequencia");
    if (desafiosNaoCumpridos[jogadorAtual] >= 2) { 
      aguardandoPrenda = true;
      if (typeof prendas !== 'undefined' && prendas.length > 0) {
        const prendaSorteada = prendas[Math.floor(Math.random() * prendas.length)];
        mensagem.textContent = "Você acumulou penalidades! Deve pagar uma prenda:";
        resultado.textContent = `PRENDA: ${jogadores[jogadorAtual]}, ${prendaSorteada}`;
        animacao.textContent = "PAGUE A PRENDA!";
        animacao.classList.remove("animacao-consequencia"); 
        animacao.classList.add("animacao-prenda"); 
      } else {
        mensagem.textContent = "Você acumulou penalidades! (Sem prendas cadastradas)";
        aguardandoPrenda = false; 
      }
    }
  }
  atualizarPlacar();
  setTimeout(() => {
    animacao.className = "animacao-resultado hidden";
    animacao.textContent = "";
    if (aguardandoPrenda) { 
      avaliacao.style.display = "flex"; 
      document.getElementById("btn-cumpriu").disabled = false;
      document.getElementById("btn-nao-cumpriu").disabled = false;
      document.querySelectorAll('.btn-voltar, #btn-voltar-discreto').forEach(btn => btn.disabled = false);
    } else if (!verificarFimDeJogo()) {
      proximoTurno();
    } else {

      avaliacao.style.display = "none";
      btnGirar.style.display = "none";
      document.getElementById("btn-reiniciar").style.display = "inline-block";
      document.querySelectorAll('.btn-voltar, #btn-voltar-discreto').forEach(btn => btn.style.display = "none");
    }
  }, 1800);
}

function proximoTurno() {
  document.querySelectorAll('.btn-voltar, #btn-voltar-discreto').forEach(btn => btn.disabled = false);
  jogadorAtual = (jogadorAtual + 1) % jogadores.length; 
  atualizarVez(); 
  avaliacao.style.display = "none"; 
  resultado.textContent = ""; 
  mensagem.textContent = ""; 
  document.getElementById("escolha-container").style.display = "flex"; 
  document.getElementById("btn-cumpriu").disabled = false;
  document.getElementById("btn-nao-cumpriu").disabled = false;
  girarRoleta(); 
}

function atualizarVez() {
  if (jogadorAtual >= jogadores.length) jogadorAtual = 0;
  vezDoJogador.textContent = `É a vez de: ${jogadores[jogadorAtual]}`;
}

function atualizarPlacar() {
  let placarTexto = "";
  if (jogadores.length > 0) {
    jogadores.forEach((jogador, index) => {
      placarTexto += `${jogador}: ${pontos[index]} pts`;
      if (penalidades[index] > 0) {
        placarTexto += ` (${penalidades[index]}P)`; 
      }
      if (index < jogadores.length - 1) {
        placarTexto += " — ";
      }
    });
  }
  placar.textContent = placarTexto;
}

function sortearVerdadeSimples() {
    if (!jogadores || jogadores.length === 0) {
        console.error("Nenhum jogador definido para sortear verdade.");
        document.getElementById("pergunta-simples").textContent = "Cadastre jogadores primeiro.";
        document.getElementById("btn-sortear-verdade").disabled = true;
        return;
    }
    document.getElementById("btn-sortear-verdade").disabled = true; 
    let todasVerdades = [];
    const niveis = ["facil", "medio", "dificil"];
    const tipoDesafio = "verdade";
    if (perguntas[modoJogo]) {
        niveis.forEach(nivel => {
            if (perguntas[modoJogo][nivel] && perguntas[modoJogo][nivel][tipoDesafio]) {
                todasVerdades.push(...perguntas[modoJogo][nivel][tipoDesafio]);
            }
        });
    }
    if (todasVerdades.length === 0) {
        if (perguntas.dupla) {
            niveis.forEach(nivel => {
                if (perguntas.dupla[nivel] && perguntas.dupla[nivel][tipoDesafio]) {
                    todasVerdades.push(...perguntas.dupla[nivel][tipoDesafio]);
                }
            });
        }
    }
    todasVerdades = [...new Set(todasVerdades.filter(item => typeof item === 'string' && item.trim() !== ""))];
    if (todasVerdades.length === 0) {
        document.getElementById("pergunta-simples").textContent = "Nenhuma pergunta de verdade encontrada!";
        document.getElementById("btn-sortear-verdade").disabled = false; 
        return;
    }
    if (jogadorAtual >= jogadores.length) jogadorAtual = 0;
    const pergunta = todasVerdades[Math.floor(Math.random() * todasVerdades.length)];
    document.getElementById("vez-simples").textContent = `Vez de: ${jogadores[jogadorAtual]}`;
    document.getElementById("pergunta-simples").innerHTML = "<span class='buscando'>🔎 Buscando...</span>";
    setTimeout(() => {
        document.getElementById("pergunta-simples").textContent = `${jogadores[jogadorAtual]}, ${pergunta}`;
        jogadorAtual = (jogadorAtual + 1) % jogadores.length;
        document.getElementById("btn-sortear-verdade").disabled = false; 
    }, 1000);
}

function verificarFimDeJogo() {
  const limite = limitesPontuacao[nivelSelecionado];
  if (limite === undefined || !jogadores || jogadores.length === 0) {
    return false; 
  }
  let candidatosAVitoria = [];
  for (let i = 0; i < jogadores.length; i++) {
    if (pontos[i] >= limite) {
      candidatosAVitoria.push({ nome: jogadores[i], pontuacao: pontos[i], indice: i });
    }
  }

  if (candidatosAVitoria.length === 0) {
    return false; 
  }
  candidatosAVitoria.sort((a, b) => b.pontuacao - a.pontuacao);
  const vencedorPotencial = candidatosAVitoria[0];
  if (jogadores.length === 1 || candidatosAVitoria.length === 1) {
    if (vencedorPotencial.pontuacao >= limite) {
      anunciarVencedor(vencedorPotencial.nome, jogadores.filter(j => j !== vencedorPotencial.nome));
      return true;
    }
    return false; 
  }
  const pontuacaoDoPrimeiro = vencedorPotencial.pontuacao;
  let pontuacaoDoSegundo = -1;
  const todasPontuacoesOrdenadas = [...pontos].sort((a,b) => b-a);
  if (todasPontuacoesOrdenadas.length > 1) {
      for(let i=0; i < todasPontuacoesOrdenadas.length; i++) {
          if (todasPontuacoesOrdenadas[i] < pontuacaoDoPrimeiro) {
              pontuacaoDoSegundo = todasPontuacoesOrdenadas[i];
              break;
          }
      }
      if (pontuacaoDoSegundo === -1 && todasPontuacoesOrdenadas.every(p => p === pontuacaoDoPrimeiro)) {
          if (jogadores.filter(j => pontos[jogadores.indexOf(j)] === pontuacaoDoPrimeiro).length > 1) {
            return false;
          }
      } else if (pontuacaoDoSegundo === -1) { 
        pontuacaoDoSegundo = 0;
      }
  } else { 
      pontuacaoDoSegundo = 0; 
  }
  if (pontuacaoDoPrimeiro >= limite && (pontuacaoDoPrimeiro - pontuacaoDoSegundo >= 2)) {
    const perdedores = jogadores.filter(j => j !== vencedorPotencial.nome);
    anunciarVencedor(vencedorPotencial.nome, perdedores);
    return true;
  }

  return false; 
}

function reiniciarJogo() {
  nivelSelecionado = "";
  jogadores = [];
  jogadorAtual = 0;
  pontos = [];
  penalidades = [];
  desafiosNaoCumpridos = [];
  ultimaEscolha = "";
  emojiNivel = "";
  aguardandoPrenda = false;
  modoJogo = "";
  numJogadoresGrupo = 0;
  girando = false;
  if (placar) placar.textContent = "";
  if (mensagem) {
    mensagem.textContent = "";
    mensagem.classList.remove("mensagem-vitoria");
  }
  if (resultado) resultado.textContent = "";
  if (avaliacao) avaliacao.style.display = "none";
  if (vezDoJogador) vezDoJogador.textContent = "";
  if (nivelEscolhidoDisplay) nivelEscolhidoDisplay.textContent = "";

  const animacao = document.getElementById("animacao-resultado");
  if (animacao) {
    animacao.className = "animacao-resultado hidden";
    animacao.textContent = "";
  }
  if (document.getElementById("escolha-container")) {
      document.getElementById("escolha-container").style.display = "none";
  }
  document.getElementById("jogo-section").style.display = "none";
  document.getElementById("nivel-section").style.display = "none";
  document.getElementById("cadastro-section").style.display = "none";
  document.getElementById("modo-verdade-section").style.display = "none";
  document.getElementById("btn-reiniciar").style.display = "none";
  document.getElementById("modo-jogo-section").style.display = "block"; 
  if (btnGirar) {
    btnGirar.style.display = "none"; 
    btnGirar.disabled = false;
  }
  const btnCumpriu = document.getElementById("btn-cumpriu");
  const btnNaoCumpriu = document.getElementById("btn-nao-cumpriu");
  if (btnCumpriu) btnCumpriu.disabled = false;
  if (btnNaoCumpriu) btnNaoCumpriu.disabled = false;

  const btnVoltarDiscreto = document.getElementById("btn-voltar-discreto");
  if (btnVoltarDiscreto) btnVoltarDiscreto.style.display = "none";
    for (let i = 1; i <= 5; i++) {
        const inputEl = document.getElementById(`jogador${i}`);
        if (inputEl) inputEl.value = "";
        if (i >= 3) {
            const containerEl = document.getElementById(`campo-jogador${i}-container`);
            if (containerEl) containerEl.style.display = "none";
        }
    }
    if(document.getElementById("btn-add-jogador")) {
        document.getElementById("btn-add-jogador").style.display = "none";
    }
}

function voltarParaSelecaoModo() {
  document.getElementById("cadastro-section").style.display = "none";
  document.getElementById("modo-jogo-section").style.display = "block";

  for (let i = 1; i <= 5; i++) {
    const inputJogador = document.getElementById(`jogador${i}`);
    if (inputJogador) {
      inputJogador.value = "";
    }
    if (i >= 3) { 
      const containerJogador = document.getElementById(`campo-jogador${i}-container`);
      if (containerJogador) {
        containerJogador.style.display = "none";
      }
    }
  }
  document.getElementById("btn-add-jogador").style.display = "none";
  numJogadoresGrupo = 0; 
  modoJogo = ""; 
}

function voltarParaCadastroJogadores() {
  document.getElementById("nivel-section").style.display = "none";
  document.getElementById("cadastro-section").style.display = "block";
  if (modoJogo === 'grupo') {
    document.getElementById("cadastro-titulo").textContent = "Nomes do Grupo (3-5)";
    document.getElementById("campo-jogador3-container").style.display = "flex"; 
    let playerCount = 2; 
    if (document.getElementById("jogador3").value.trim()) playerCount++;
    if (document.getElementById("jogador4").value.trim()) {
        document.getElementById("campo-jogador4-container").style.display = "flex";
        playerCount++;
    }
    if (document.getElementById("jogador5").value.trim()) {
        document.getElementById("campo-jogador5-container").style.display = "flex";
        playerCount++;
    }
    numJogadoresGrupo = playerCount > 3 ? playerCount : 3; 
    if (numJogadoresGrupo < 5) {
      document.getElementById("btn-add-jogador").style.display = "inline-block";
    } else {
      document.getElementById("btn-add-jogador").style.display = "none";
    }
  } else if (modoJogo === 'dupla') {
    document.getElementById("cadastro-titulo").textContent = "Nomes da Dupla";
    document.getElementById("btn-add-jogador").style.display = "none";
    for(let i=3; i<=5; i++) { 
        if(document.getElementById(`campo-jogador${i}-container`)) {
            document.getElementById(`campo-jogador${i}-container`).style.display = "none";
        }
    }
  }
}

function voltarParaSelecaoDeNivel() {
  mensagem.classList.remove("mensagem-vitoria");
  document.getElementById("jogo-section").style.display = "none";
  document.getElementById("nivel-section").style.display = "block";
  if (document.getElementById("btn-voltar-discreto")) {
    document.getElementById("btn-voltar-discreto").style.display = "none";
  }
  pontos = new Array(jogadores.length).fill(0);
  penalidades = new Array(jogadores.length).fill(0);
  desafiosNaoCumpridos = new Array(jogadores.length).fill(0);
  jogadorAtual = 0;
  ultimaEscolha = "";
  aguardandoPrenda = false;

  if (placar) placar.textContent = "";
  if (mensagem) mensagem.textContent = "";
  if (resultado) resultado.textContent = "";
  if (avaliacao) avaliacao.style.display = "none";
  const animacao = document.getElementById("animacao-resultado");
  if (animacao) {
    animacao.className = "animacao-resultado hidden";
    animacao.textContent = "";
  }
  if (document.getElementById("escolha-container")) {
    document.getElementById("escolha-container").style.display = "none";
  }
  if (btnGirar) btnGirar.disabled = false; 
}

document.getElementById("btn-cumpriu").addEventListener('click', () => avaliar(true));
document.getElementById("btn-nao-cumpriu").addEventListener('click', () => avaliar(false));

function ativarModoSoVerdade() {
  if (!jogadores || jogadores.length === 0) {
    alert("Por favor, cadastre os jogadores primeiro!");
    reiniciarJogo();
    return;
  }
  if (jogadorAtual >= jogadores.length) jogadorAtual = 0;

  document.getElementById("nivel-section").style.display = "none";
  mostrarTelaModoVerdade();
}

function mostrarTelaModoVerdade() {
  document.getElementById("modo-verdade-section").style.display = "block";
  document.getElementById("pergunta-simples").textContent = "Clique em 'Sortear Verdade' para começar!";
  if (jogadores.length > 0) {
      if (jogadorAtual >= jogadores.length) jogadorAtual = 0; 
      document.getElementById("vez-simples").textContent = `Vez de: ${jogadores[jogadorAtual]}`;
  } else {
      document.getElementById("vez-simples").textContent = "Cadastre jogadores.";
  }
  document.getElementById("btn-sortear-verdade").disabled = (jogadores.length === 0);
}

function anunciarVencedor(vencedor, perdedoresArray) {
  mensagem.classList.add("mensagem-vitoria");
  mensagem.textContent = `${vencedor} venceu o jogo!`;

  if (modoJogo === "dupla" && perdedoresArray.length === 1) {
    resultado.textContent = `${perdedoresArray[0]}, vire um copo (ou meio se o copo for grande) o mais rápido possível.`;
  } else if (modoJogo === "grupo") {
    resultado.textContent = `Parabéns, ${vencedor}! Os demais jogadores devem cumprir uma prenda final!`;
  } else {
    resultado.textContent = `Parabéns, ${vencedor}!`;
  }

  btnGirar.style.display = "none";
  if (document.getElementById("escolha-container")) {
      document.getElementById("escolha-container").style.display = "none";
  }
  avaliacao.style.display = "none";
  document.getElementById("btn-reiniciar").style.display = "inline-block";
  const btnVoltar = document.getElementById("btn-voltar-discreto");
  if (btnVoltar) {
    btnVoltar.style.display = "none";
  }
}

function selecionarModoDeJogo(modo) {
  modoJogo = modo;
  document.getElementById("modo-jogo-section").style.display = "none";
  document.getElementById("cadastro-section").style.display = "block";

  // Limpar e resetar todos os campos de jogador
  for (let i = 1; i <= 5; i++) {
    const inputEl = document.getElementById(`jogador${i}`);
    if (inputEl) inputEl.value = ""; // Limpa valor

    // Esconde containers de J3, J4, J5
    if (i >= 3) {
      const containerEl = document.getElementById(`campo-jogador${i}-container`);
      if (containerEl) {
        containerEl.style.display = "none";
      }
    }
  }
  // Garante que J1 e J2 (inputs diretos) estejam visíveis
  // O CSS deve cuidar da sua exibição padrão como 'block' ou 'inline-block'
  // dentro de #campos-jogadores quando #cadastro-section está visível.
  // Se eles são display:none por padrão, descomente:
  // document.getElementById("jogador1").style.display = "block";
  // document.getElementById("jogador2").style.display = "block";


  if (modo === "dupla") {
    document.getElementById("cadastro-titulo").textContent = "Nomes da Dupla";
    document.getElementById("btn-add-jogador").style.display = "none";
    // Garante que J3, J4, J5 fiquem escondidos
    for (let i = 3; i <= 5; i++) {
        const containerEl = document.getElementById(`campo-jogador${i}-container`);
        if (containerEl) containerEl.style.display = "none";
    }
  } else if (modo === "grupo") {
    document.getElementById("cadastro-titulo").textContent = "Nomes do Grupo (3-5)";
    // Mostra o campo do Jogador 3 por padrão no modo grupo
    document.getElementById("campo-jogador3-container").style.display = "flex";
    atualizarVisibilidadeBotaoAddJogador();
  }
}


function atualizarVisibilidadeBotaoAddJogador() {
  let camposVisiveisContaveis = 0; // Conta J3, J4, J5 que estão com display diferente de none
  for (let i = 3; i <= 5; i++) {
    const container = document.getElementById(`campo-jogador${i}-container`);
    if (container && container.style.display !== 'none') {
      camposVisiveisContaveis++;
    }
  }

  // Total de jogadores (J1, J2 + os opcionais visíveis)
  if ((2 + camposVisiveisContaveis) < 5) {
    document.getElementById("btn-add-jogador").style.display = "inline-block";
  } else {
    document.getElementById("btn-add-jogador").style.display = "none";
  }
}

function adicionarCampoJogador() {
  // Tenta mostrar J4, depois J5, se estiverem escondidos. J3 é padrão.
  for (let i = 4; i <= 5; i++) { // Começa a verificar a partir do jogador 4
    const container = document.getElementById(`campo-jogador${i}-container`);
    if (container && container.style.display === 'none') {
      container.style.display = "flex";
      const inputField = document.getElementById(`jogador${i}`);
      if (inputField) inputField.value = ""; // Limpa o campo ao reexibir
      break; // Adiciona apenas um por vez e sai
    }
  }
  atualizarVisibilidadeBotaoAddJogador();
}

function removerCampoJogador(numeroJogadorARemover) {
  // Permite remover J4 ou J5. Jogador 3 não tem botão de remover.
  if (numeroJogadorARemover < 4 || numeroJogadorARemover > 5) return;

  const containerARemover = document.getElementById(`campo-jogador${numeroJogadorARemover}-container`);
  const inputARemover = document.getElementById(`jogador${numeroJogadorARemover}`);

  if (inputARemover) inputARemover.value = ""; // Limpa o valor do campo que está sendo removido
  if (containerARemover) containerARemover.style.display = "none"; // Esconde o container do jogador removido

  // Lógica de deslocamento: Se J4 foi removido e J5 estava visível, J5 se torna J4
  if (numeroJogadorARemover === 4) {
    const containerJ5 = document.getElementById("campo-jogador5-container");
    const inputJ5 = document.getElementById("jogador5");
    const inputJ4 = document.getElementById("jogador4"); // O campo J4 que acabou de ser limpo

    // Verifica se J5 estava visível (style.display !== 'none')
    if (containerJ5 && inputJ5 && inputJ4 && containerJ5.style.display !== 'none') {
      // Move o valor de J5 para J4
      inputJ4.value = inputJ5.value;
      // Mostra o container do J4 (que agora tem o valor do J5)
      document.getElementById("campo-jogador4-container").style.display = "flex";

      // Limpa e esconde o campo J5 (pois seu valor foi movido)
      inputJ5.value = "";
      containerJ5.style.display = "none";
    }
  }
  // Se J5 foi removido (numeroJogadorARemover === 5), ele simplesmente é escondido. Não há J6 para deslocar.

  atualizarVisibilidadeBotaoAddJogador();
}

function voltarParaNiveis() {
  document.getElementById("modo-verdade-section").style.display = "none";
  document.getElementById("nivel-section").style.display = "block";
}

window.onload = function() {
  document.getElementById("modo-jogo-section").style.display = "block";
  document.getElementById("cadastro-section").style.display = "none";
  document.getElementById("nivel-section").style.display = "none";
  document.getElementById("jogo-section").style.display = "none";
  document.getElementById("modo-verdade-section").style.display = "none";
  btnGirar.style.display = "none"; 
};