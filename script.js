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
  dificil: 5,
};

const segmentos = [{ texto: "Verdade" }, { texto: "Consequência" }];

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
      alert("Os nomes dos Jogadores 1, 2 e 3 são obrigatórios.");
      return;
    }
    nomesInputTemp.push(j1, j2);

    if (j3Container && j3Container.style.display !== "none" && j3Input) {
      const j3 = j3Input.value.trim();
      if (!j3) {
        alert("Os nomes dos Jogadores 1, 2 e 3 são obrigatórios.");
        return;
      }
      nomesInputTemp.push(j3);
    } else if (j3Container && j3Container.style.display !== "none" && !j3Input) {
      alert("Erro: Campo do Jogador 3 não encontrado.");
      return;
    }

    for (let i = 4; i <= 5; i++) {
      const container = document.getElementById(`campo-jogador${i}-container`);
      const input = document.getElementById(`jogador${i}`);

      if (container && container.style.display !== "none") {
        if (input) {
          const nome = input.value.trim();
          if (!nome) {
            alert(`O nome do Jogador ${i} é obrigatório, pois o campo foi adicionado.`);
            return;
          }
          nomesInputTemp.push(nome);
        } else {
          alert(`Erro de configuração: Campo de input para Jogador ${i} não encontrado, mas o espaço está visível.`);
          return;
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
        emojiNivel = "facil";
    } else if (nivel === "medio") {
        nivelSelecionado = "medio";
        emojiNivel = "medio";
    } else {
        nivelSelecionado = "dificil";
        emojiNivel = "dificil";
    }
    nivelEscolhidoDisplay.textContent = `Nível: ${emojiNivel}`;
    document.getElementById("nivel-section").style.display = "none";
    document.getElementById("jogo-section").style.display = "block";

    if (!jogadores || jogadores.length === 0) {
        alert("Erro: Jogadores não definidos. Reiniciando o cadastro.");
        reiniciarJogo();
        return;
    }
    if (jogadorAtual >= jogadores.length || jogadorAtual < 0) {
        jogadorAtual = 0;
    }

    vezDoJogador.textContent = `É a vez de: ${jogadores[jogadorAtual]}`;
    resultado.textContent = "";
    mensagem.textContent = "";
    avaliacao.style.display = "none";
    btnGirar.style.display = "none"; 
    document.getElementById("escolha-container").style.display = "flex";
    girando = false;
    atualizarPlacar();

    const btnVoltar = document.getElementById("btn-voltar-discreto");
    btnVoltar.style.display = "inline-block";
    btnVoltar.disabled = true; 

    girarRoleta(); 
}

function girarRoleta() {
  if (girando) return;
  document.getElementById("btn-voltar-discreto").disabled = true;
  girando = true;
  mensagem.textContent = "Sorteando...";
  btnGirar.style.display = "none";
  document.getElementById("escolha-container").style.display = "flex";
  const opcoes = [
    document.getElementById("opcao-verdade"),
    document.getElementById("opcao-consequencia"),
  ];
  opcoes[0].classList.remove("piscar");
  opcoes[1].classList.remove("piscar");

  let selecionadoIndex = Math.floor(Math.random() * 2);
  let ciclos = 6 + Math.floor(Math.random() * 8);
  let atual = 0;
  const intervalo = setInterval(() => {
    opcoes.forEach((opt) => opt.classList.remove("piscar"));
    opcoes[atual % 2].classList.add("piscar");
    atual++;
    if (atual >= ciclos) {
      clearInterval(intervalo);
      opcoes.forEach((opt) => opt.classList.remove("piscar"));
      opcoes[selecionadoIndex].classList.add("piscar");
      setTimeout(() => {
        opcoes[selecionadoIndex].classList.remove("piscar");
        mostrarResultado(selecionadoIndex);
        girando = false;
      }, 700);
    }
  }, 200);
}

function mostrarResultado(indice) {
  const tipo = segmentos[indice].texto.toLowerCase();
  ultimaEscolha = tipo;
  mensagem.textContent = `${segmentos[indice].texto}!`;
  resultado.textContent = "";
  btnGirar.style.display = "none";
  document.getElementById("escolha-container").style.display = "none";

  const animacao = document.getElementById("animacao-resultado");
  animacao.className = "animacao-resultado";
  animacao.textContent = tipo === "verdade" ? "Verdade" : "Consequência";
  void animacao.offsetWidth;
  animacao.classList.add(
    tipo === "verdade" ? "animacao-verdade" : "animacao-consequencia"
  );
  animacao.classList.remove("hidden");

  setTimeout(() => {
    animacao.className = "animacao-resultado hidden";
    animacao.textContent = "";

    let fraseSorteada = "";
    const tipoDesafio = tipo;
    let arrayCandidato = [];

    const isArrayValido = (arr) =>
      Array.isArray(arr) &&
      arr.length > 0 &&
      arr.some((item) => typeof item === "string" && item.trim() !== "");
    if (perguntas[modoJogo] && perguntas[modoJogo][nivelSelecionado]) {
      const especifico = perguntas[modoJogo][nivelSelecionado][tipoDesafio];
      if (isArrayValido(especifico)) {
        arrayCandidato = especifico;
      }
    }

    if (
      arrayCandidato.length === 0 &&
      perguntas.dupla &&
      perguntas.dupla[nivelSelecionado]
    ) {
      const fallbackDuplaNivel =
        perguntas.dupla[nivelSelecionado][tipoDesafio];
      if (isArrayValido(fallbackDuplaNivel)) {
        arrayCandidato = fallbackDuplaNivel;
      }
    }

    if (arrayCandidato.length === 0 && perguntas[modoJogo]) {
      const pFacil = perguntas[modoJogo].facil?.[tipoDesafio] || [];
      const pMedio = perguntas[modoJogo].medio?.[tipoDesafio] || [];
      const pDificil = perguntas[modoJogo].dificil?.[tipoDesafio] || [];
      const combinadasModo = [...pFacil, ...pMedio, ...pDificil].filter(
        (item) => typeof item === "string" && item.trim() !== ""
      );
      if (combinadasModo.length > 0) arrayCandidato = combinadasModo;
    }

    if (arrayCandidato.length === 0 && perguntas.dupla) {
      const pFacilDupla = perguntas.dupla.facil?.[tipoDesafio] || [];
      const pMedioDupla = perguntas.dupla.medio?.[tipoDesafio] || [];
      const pDificilDupla = perguntas.dupla.dificil?.[tipoDesafio] || [];
      const combinadasDupla = [...pFacilDupla, ...pMedioDupla, ...pDificilDupla].filter(
        (item) => typeof item === "string" && item.trim() !== ""
      );
      if (combinadasDupla.length > 0) arrayCandidato = combinadasDupla;
    }

    if (arrayCandidato.length > 0) {
      fraseSorteada = arrayCandidato[Math.floor(Math.random() * arrayCandidato.length)];
    } else {
      console.error(
        `Nenhuma ${tipoDesafio} válida encontrada para modo '${modoJogo}', nível '${nivelSelecionado}'. Verifique o arquivo dados-perguntas.js.`
      );
      fraseSorteada = `Ops! Nenhuma ${tipoDesafio} para (m:${modoJogo}, n:${nivelSelecionado}).`;
    }

        if (jogadorAtual >= jogadores.length) jogadorAtual = 0;
        resultado.innerHTML = `${jogadores[jogadorAtual]}, ${fraseSorteada}`;
        
        btnGirar.style.display = "none"; 
        avaliacao.style.display = "flex"; 
        document.getElementById("btn-cumpriu").disabled = false;
        document.getElementById("btn-nao-cumpriu").disabled = false;
        document.getElementById("btn-voltar-discreto").disabled = false; 
    }, 1500);
}

function avaliar(cumpriu) {
    document.querySelectorAll(".btn-voltar, #btn-voltar-discreto").forEach((btn) => (btn.disabled = true));
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
            mensagem.textContent = `${jogadores[jogadorAtual]} não cumpriu a prenda!`;
            animacao.textContent = "❌";
            animacao.classList.add("animacao-consequencia");
            aguardandoPrenda = false;
            desafiosNaoCumpridos[jogadorAtual] = 0; 

            setTimeout(() => { 
                animacao.className = "animacao-resultado hidden";
                animacao.textContent = "";
                anunciarPerdedor(jogadores[jogadorAtual]); 
            }, 1500);
            atualizarPlacar();
            return; 
        }

        atualizarPlacar();
        setTimeout(() => { 
            animacao.className = "animacao-resultado hidden";
            animacao.textContent = "";
            if (!verificarFimDeJogo()) { 
                jogadorAtual = (jogadorAtual + 1) % jogadores.length; 
                prepararParaNovaRodada(); 
            } else {
                avaliacao.style.display = "none";
                btnGirar.style.display = "none";
                document.getElementById("btn-reiniciar").style.display = "inline-block";
                document.querySelectorAll(".btn-voltar, #btn-voltar-discreto").forEach((btn) => (btn.style.display = "none"));
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
            let prendaSorteadaParaPenalidade;

            if (modoJogo === "dupla") {
                prendaSorteadaParaPenalidade = prendas[Math.floor(Math.random() * prendas.length)];
            } else if (modoJogo === "grupo") {
                prendaSorteadaParaPenalidade = prendasGrupo[Math.floor(Math.random() * prendasGrupo.length)];
            } else {
                prendaSorteadaParaPenalidade = "Ops! Nenhuma prenda definida para este modo de jogo.";
            }

            if (prendaSorteadaParaPenalidade) {
                mensagem.textContent = "Prenda:";
                resultado.textContent = `${jogadores[jogadorAtual]}, ${prendaSorteadaParaPenalidade}`;
                animacao.textContent = "PAGUE A PRENDA!";
                animacao.classList.remove("animacao-consequencia");
                animacao.classList.add("animacao-prenda");

                setTimeout(() => { 
                    animacao.className = "animacao-resultado hidden";
                    animacao.textContent = "";
                    avaliacao.style.display = "flex"; 
                    document.getElementById("btn-cumpriu").disabled = false;
                    document.getElementById("btn-nao-cumpriu").disabled = false;
                    document.querySelectorAll('.btn-voltar, #btn-voltar-discreto').forEach(btn => btn.disabled = false); 
                }, 1800);
            } else { 
                mensagem.textContent = "Você acumulou penalidades! Sem prendas cadastradas. PERDEU O JOGO!";
                animacao.textContent = "❌ PERDEU!";
                animacao.classList.add("animacao-consequencia");
                aguardandoPrenda = false; 
                setTimeout(() => {
                    animacao.className = "animacao-resultado hidden";
                    animacao.textContent = "";
                    anunciarPerdedor(jogadores[jogadorAtual]);
                }, 1800);
            }
            atualizarPlacar();
            return; 
        }
    }
    atualizarPlacar();
    setTimeout(() => {
        animacao.className = "animacao-resultado hidden";
        animacao.textContent = "";

        if (!verificarFimDeJogo()) { 
            jogadorAtual = (jogadorAtual + 1) % jogadores.length; 
            prepararParaNovaRodada(); 
        } else {
            avaliacao.style.display = "none";
            btnGirar.style.display = "none";
            document.getElementById("btn-reiniciar").style.display = "inline-block";
            document.querySelectorAll(".btn-voltar, #btn-voltar-discreto").forEach((btn) => (btn.style.display = "none"));
        }
    }, 1800); 
}

function anunciarPerdedor(jogadorPerdedor) {
    mensagem.classList.remove("mensagem-vitoria");
    mensagem.textContent = `${jogadorPerdedor} perdeu o jogo!`;

    const indicePerdedor = jogadores.indexOf(jogadorPerdedor);
    if (indicePerdedor > -1) {
        jogadores.splice(indicePerdedor, 1);
        pontos.splice(indicePerdedor, 1);
        penalidades.splice(indicePerdedor, 1); 
        desafiosNaoCumpridos.splice(indicePerdedor, 1);
        if (jogadorAtual >= jogadores.length && jogadores.length > 0) {
            jogadorAtual = 0;
        } else if (indicePerdedor < jogadorAtual) {
            jogadorAtual--;
        }
    }

    let prendaFinalDoPerdedor;
    if (modoJogo === "dupla") {
        prendaFinalDoPerdedor = "vire um copo (ou meio se o copo for grande) o mais rápido possível!";
    } else if (modoJogo === "grupo") {
        prendaFinalDoPerdedor = prendasGrupo[Math.floor(Math.random() * prendasGrupo.length)];
    } else {
        prendaFinalDoPerdedor = "pague uma prenda por ter perdido!";
    }
    resultado.textContent = `${jogadorPerdedor}, sua prenda final: ${prendaFinalDoPerdedor}`;

    if (avaliacao) avaliacao.style.display = "none";
    if (btnGirar) btnGirar.style.display = "none";


    if (jogadores.length <= 1) { 
        if (jogadores.length === 1) {
            anunciarVencedor(jogadores[0], [jogadorPerdedor]);
        } else {
            mensagem.textContent = "Todos os jogadores foram eliminados! Fim de jogo!";
            resultado.textContent = "";
        }
        const btnContinuar = document.getElementById("btn-continuar-jogo");
        if (btnContinuar) btnContinuar.style.display = "none";

        const escolhaContainer = document.getElementById("escolha-container");
        if (escolhaContainer) escolhaContainer.style.display = "none";
        
        document.getElementById("btn-reiniciar").style.display = "inline-block";
        document.getElementById("btn-voltar-discreto").style.display = "none";

    } else { 
        document.querySelectorAll(".btn-voltar, #btn-voltar-discreto").forEach((btn) => (btn.disabled = false));

        if (modoJogo === "grupo") {
            const btnContinuar = document.getElementById("btn-continuar-jogo");
            if (btnContinuar) {
                btnContinuar.style.display = "inline-block";
                btnContinuar.onclick = function() {
                    this.style.display = "none"; 
                    prepararParaNovaRodada();
                };
            } else {
                console.error("Botão 'btn-continuar-jogo' não encontrado no HTML. Prosseguindo automaticamente.");
                setTimeout(() => {
                    prepararParaNovaRodada();
                }, 2000); 
            }
        } else { 
            setTimeout(() => {
                prepararParaNovaRodada();
            }, 2000); 
        }
    }
    atualizarPlacar();
}

function atualizarVez() {
  if (jogadorAtual >= jogadores.length && jogadores.length > 0 ) { 
      jogadorAtual = 0;
  }
  if (jogadores.length > 0) {
      vezDoJogador.textContent = `É a vez de: ${jogadores[jogadorAtual]}`;
  } else {
      vezDoJogador.textContent = ""; 
  }
}

function atualizarPlacar() {
    let placarTexto = "";
    if (jogadores.length > 0) {
        jogadores.forEach((jogador, index) => {
            placarTexto += `${jogador}: ${pontos[index]} pts`;
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
    niveis.forEach((nivel) => {
      if (perguntas[modoJogo][nivel] && perguntas[modoJogo][nivel][tipoDesafio]) {
        todasVerdades.push(...perguntas[modoJogo][nivel][tipoDesafio]);
      }
    });
  }
  if (todasVerdades.length === 0) {
    if (perguntas.dupla) {
      niveis.forEach((nivel) => {
        if (perguntas.dupla[nivel] && perguntas.dupla[nivel][tipoDesafio]) {
          todasVerdades.push(...perguntas.dupla[nivel][tipoDesafio]);
        }
      });
    }
  }
  todasVerdades = [
    ...new Set(
      todasVerdades.filter((item) => typeof item === "string" && item.trim() !== "")
    ),
  ];
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

  if (jogadores.length === 1 && vencedorPotencial.pontuacao >= limite ) { 
      anunciarVencedor(vencedorPotencial.nome, []);
      return true;
  }
  
  if (candidatosAVitoria.length === 1 && vencedorPotencial.pontuacao >= limite) {
      const outrosJogadores = jogadores.filter(j => j !== vencedorPotencial.nome);
      anunciarVencedor(vencedorPotencial.nome, outrosJogadores);
      return true;
  }


  if (candidatosAVitoria.length > 0 && vencedorPotencial.pontuacao >= limite) {
      const pontuacaoDoPrimeiro = vencedorPotencial.pontuacao;
      let pontuacaoDoSegundo = -1;

      const todasPontuacoesOrdenadas = [...new Set(pontos.filter(p => typeof p === 'number'))].sort((a, b) => b - a);


      if (todasPontuacoesOrdenadas.length > 1) {
          for(let i = 0; i < todasPontuacoesOrdenadas.length; i++) {
              if (todasPontuacoesOrdenadas[i] < pontuacaoDoPrimeiro) {
                  pontuacaoDoSegundo = todasPontuacoesOrdenadas[i];
                  break;
              }
          }
      } else if (todasPontuacoesOrdenadas.length === 1 && pontuacaoDoPrimeiro >= limite && jogadores.length > 1) {
        if (jogadores.filter(j => pontos[jogadores.indexOf(j)] === pontuacaoDoPrimeiro).length > 1) {
             return false; 
        }
        pontuacaoDoSegundo = 0; 
      }


      if (pontuacaoDoSegundo === -1 && jogadores.length > 1) { 
          if (jogadores.filter(j => pontos[jogadores.indexOf(j)] === pontuacaoDoPrimeiro).length > 1) {
            return false;  
          }
          pontuacaoDoSegundo = 0; 
      } else if (pontuacaoDoSegundo === -1 && jogadores.length === 1) { 
      }


      if (pontuacaoDoPrimeiro - pontuacaoDoSegundo >= 2) {
          const perdedores = jogadores.filter((j) => j !== vencedorPotencial.nome);
          anunciarVencedor(vencedorPotencial.nome, perdedores);
          return true;
      }
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

    const btnContinuar = document.getElementById("btn-continuar-jogo");
    if (btnContinuar) btnContinuar.style.display = "none";

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
  if (document.getElementById("btn-add-jogador")) {
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
  const btnAddJogador = document.getElementById("btn-add-jogador"); 
  if (btnAddJogador) btnAddJogador.style.display = "none";
  modoJogo = "";
}

function voltarParaCadastroJogadores() {
  document.getElementById("nivel-section").style.display = "none";
  document.getElementById("cadastro-section").style.display = "block";
  if (modoJogo === 'grupo') {
      document.getElementById("cadastro-titulo").textContent = "Nomes do Grupo (3-5)";
      document.getElementById("campo-jogador3-container").style.display = "flex";
      atualizarVisibilidadeBotaoAddJogador();
  } else if (modoJogo === 'dupla') {
      document.getElementById("cadastro-titulo").textContent = "Nomes da Dupla";
      document.getElementById("btn-add-jogador").style.display = "none";
      for (let i = 3; i <= 5; i++) {
          const containerEl = document.getElementById(`campo-jogador${i}-container`);
          if (containerEl) containerEl.style.display = "none";
      }
  }
}

function prepararParaNovaRodada() {
    if (jogadores.length === 0) { 
        vezDoJogador.textContent = "";
        mensagem.textContent = "Adicione jogadores para começar.";
        btnGirar.style.display = "none";
        return;
    }

    if (jogadorAtual >= jogadores.length ) { 
        jogadorAtual = 0;
    }
    atualizarVez(); 
    avaliacao.style.display = "none"; 
    resultado.textContent = "";     
    
    if (jogadores[jogadorAtual]) {
        mensagem.textContent = `${jogadores[jogadorAtual]}, clique em Sortear para o próximo desafio.`;
    } else {
        mensagem.textContent = "Clique em Sortear para o próximo desafio.";
    }

    const btnContinuar = document.getElementById("btn-continuar-jogo");
    if (btnContinuar) btnContinuar.style.display = "none"; 

    document.getElementById("escolha-container").style.display = "none"; 

    btnGirar.textContent = "Sortear";
    btnGirar.style.display = "inline-block"; 
    btnGirar.disabled = false; 

    btnGirar.onclick = function() {
        this.style.display = "none"; 
        this.disabled = true; 
        document.getElementById("btn-voltar-discreto").disabled = true;
        girarRoleta();
    };

    document.getElementById("btn-voltar-discreto").disabled = false;
    document.getElementById("btn-cumpriu").disabled = true; 
    document.getElementById("btn-nao-cumpriu").disabled = true;
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
  if (btnGirar) {
      btnGirar.style.display = "none"; 
      btnGirar.disabled = false; 
  }
  const btnContinuar = document.getElementById("btn-continuar-jogo");
  if (btnContinuar) btnContinuar.style.display = "none";
}
document.getElementById("btn-cumpriu").addEventListener("click", () => avaliar(true));
document.getElementById("btn-nao-cumpriu").addEventListener("click", () => avaliar(false));

function ativarModoSoVerdade() {
  if (!jogadores || jogadores.length === 0) {
    alert("Por favor, cadastre os jogadores primeiro!");
    reiniciarJogo();
    return;
  }
  if (jogadorAtual >= jogadores.length) jogadorAtual = 0;
  document.getElementById("nivel-section").style.display = "none";
  document.getElementById("jogo-section").style.display = "none"; 
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
    const elVezDoJogador = document.getElementById("vez-do-jogador");
    const elMensagem = document.getElementById("mensagem");
    const elResultado = document.getElementById("resultado");
    const elPlacar = document.getElementById("placar");

    if (elVezDoJogador) elVezDoJogador.textContent = "";
    if (elPlacar) elPlacar.innerHTML = "";

    elMensagem.classList.add("mensagem-vitoria");
    elMensagem.textContent = `${vencedor} venceu o jogo!`;

    let perdedorParaPrendaNome = "";
    let prendaSorteada = "";
    
    if (perdedoresArray && perdedoresArray.length > 0) {
        perdedorParaPrendaNome = perdedoresArray[0];

        if (perdedorParaPrendaNome) {
            if (modoJogo === "dupla") {
                prendaSorteada = prendas[Math.floor(Math.random() * prendas.length)];
            } else if (modoJogo === "grupo") {
                prendaSorteada = prendasGrupo[Math.floor(Math.random() * prendasGrupo.length)];
            } else {
                prendaSorteada = "cumpra uma prenda final escolhida pelo vencedor!";
            }
            elResultado.innerHTML = `${perdedorParaPrendaNome}: ${prendaSorteada}`;
        } else {
            elResultado.innerHTML = `Parabéns, ${vencedor}!`;
        }
    } else {
        elResultado.innerHTML = `Parabéns, ${vencedor}!`;
    }

    btnGirar.style.display = "none";
    const escolhaContainer = document.getElementById("escolha-container");
    if (escolhaContainer) {
        escolhaContainer.style.display = "none";
    }
    if (avaliacao) avaliacao.style.display = "none";

    document.getElementById("btn-reiniciar").style.display = "inline-block";
    const btnVoltarDiscreto = document.getElementById("btn-voltar-discreto");
    if (btnVoltarDiscreto) {
        btnVoltarDiscreto.style.display = "none";
    }
    const btnContinuar = document.getElementById("btn-continuar-jogo");
    if (btnContinuar) btnContinuar.style.display = "none";
}

function selecionarModoDeJogo(modo) {
  modoJogo = modo;
  document.getElementById("modo-jogo-section").style.display = "none";
  document.getElementById("cadastro-section").style.display = "block";
  for (let i = 1; i <= 5; i++) {
    const inputEl = document.getElementById(`jogador${i}`);
    if (inputEl) inputEl.value = ""; 
    if (i >= 3) { 
      const containerEl = document.getElementById(`campo-jogador${i}-container`);
      if (containerEl) {
        containerEl.style.display = "none";
      }
    }
  }
  if (modo === "dupla") {
    document.getElementById("cadastro-titulo").textContent = "Nomes da Dupla";
    document.getElementById("btn-add-jogador").style.display = "none";
  } else if (modo === "grupo") {
    document.getElementById("cadastro-titulo").textContent = "Nomes do Grupo (3-5)";
    document.getElementById("campo-jogador3-container").style.display = "flex"; 
    atualizarVisibilidadeBotaoAddJogador();
  }
}

function atualizarVisibilidadeBotaoAddJogador() {
  let camposVisiveisContaveis = 0; 
  for (let i = 3; i <= 5; i++) {
    const container = document.getElementById(`campo-jogador${i}-container`);
    if (container && container.style.display !== "none") {
      camposVisiveisContaveis++;
    }
  }
  if (2 + camposVisiveisContaveis < 5) {
    document.getElementById("btn-add-jogador").style.display = "inline-block";
  } else {
    document.getElementById("btn-add-jogador").style.display = "none";
  }
}

function adicionarCampoJogador() {
  for (let i = 4; i <= 5; i++) { 
    const container = document.getElementById(`campo-jogador${i}-container`);
    if (container && container.style.display === "none") {
      container.style.display = "flex";
      const inputField = document.getElementById(`jogador${i}`);
      if (inputField) inputField.value = ""; 
      break; 
    }
  }
  atualizarVisibilidadeBotaoAddJogador(); 
}

function removerCampoJogador(numeroJogadorARemover) {
  if (numeroJogadorARemover < 4 || numeroJogadorARemover > 5) return; 

  const containerARemover = document.getElementById(`campo-jogador${numeroJogadorARemover}-container`);
  const inputARemover = document.getElementById(`jogador${numeroJogadorARemover}`);
  
  if (inputARemover) inputARemover.value = "";
  if (containerARemover) containerARemover.style.display = "none"; 

  if (numeroJogadorARemover === 4) {
    const containerJ5 = document.getElementById("campo-jogador5-container");
    const inputJ5 = document.getElementById("jogador5");
    const inputJ4 = document.getElementById("jogador4");

    if (containerJ5 && inputJ5 && inputJ4 && containerJ5.style.display !== "none") {
      inputJ4.value = inputJ5.value; 
      inputJ5.value = "";
      containerJ5.style.display = "none";
    }
  }
  atualizarVisibilidadeBotaoAddJogador();
}

function voltarParaNiveis() {
  document.getElementById("modo-verdade-section").style.display = "none";
  document.getElementById("jogo-section").style.display = "block"; 
}

window.onload = function () {
  document.getElementById("modo-jogo-section").style.display = "block";
  document.getElementById("cadastro-section").style.display = "none";
  document.getElementById("nivel-section").style.display = "none";
  document.getElementById("jogo-section").style.display = "none";
  document.getElementById("modo-verdade-section").style.display = "none";
  if(btnGirar) btnGirar.style.display = "none"; 
};