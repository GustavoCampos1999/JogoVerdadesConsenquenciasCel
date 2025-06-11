let nivelSelecionado = "";
let jogadores = [];
let jogadoresIniciais = []; 
let jogadorAtual = 0;
let pontos = [];
let penalidades = [];
let desafiosNaoCumpridos = [];
let ultimaEscolha = "";
let emojiNivel = "";
let aguardandoPrenda = false;
let modoJogo = "";
let girando = false;
let falhouAlgumaVez = [];

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

function selecionarModoDeJogo(modo) {
    modoJogo = modo;
    document.getElementById("modo-jogo-section").style.display = "none";
    document.getElementById("cadastro-section").style.display = "block";

    for (let i = 1; i <= 5; i++) {
        const inputEl = document.getElementById(`jogador${i}`);
        if (inputEl) inputEl.value = "";
        if (i >= 3) {
            const containerEl = document.getElementById(`campo-jogador${i}-container`);
            if (containerEl) containerEl.style.display = "none";
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
        for (let i = 1; i <= 5; i++) {
            const input = document.getElementById(`jogador${i}`);
            const container = document.getElementById(`campo-jogador${i}-container`);
            const isVisible = i <= 2 || (container && container.style.display !== 'none');

            if (isVisible) {
                const nome = input.value.trim();
                if (!nome) {
                    alert(`O nome do Jogador ${i} é obrigatório.`);
                    return;
                }
                nomesInputTemp.push(nome);
            }
        }
        if (nomesInputTemp.length < 3) {
            alert("São necessários pelo menos 3 jogadores para o modo em grupo.");
            return;
        }
    } else {
        alert("Modo de jogo não selecionado!");
        return;
    }

    jogadores = nomesInputTemp;
    jogadoresIniciais = [...jogadores]; 
    pontos = new Array(jogadores.length).fill(0);
    penalidades = new Array(jogadores.length).fill(0);
    desafiosNaoCumpridos = new Array(jogadores.length).fill(0);
    falhouAlgumaVez = new Array(jogadores.length).fill(false);
    jogadorAtual = 0;

    document.getElementById("cadastro-section").style.display = "none";
    document.getElementById("nivel-section").style.display = "block";
}

function selecionarNivel(nivel) {
    nivelSelecionado = nivel;
    emojiNivel = nivel.charAt(0).toUpperCase() + nivel.slice(1);

    nivelEscolhidoDisplay.textContent = `Nível: ${emojiNivel}`;
    document.getElementById("nivel-section").style.display = "none";
    document.getElementById("jogo-section").style.display = "block";

    if (!jogadores || jogadores.length === 0) {
        alert("Erro: Jogadores não definidos. Reiniciando o cadastro.");
        reiniciarJogo();
        return;
    }
    
    prepararParaNovaRodada(false);
    atualizarPlacar();

    const btnVoltar = document.getElementById("btn-voltar-discreto");
    btnVoltar.style.display = "inline-block";
    btnVoltar.disabled = false;
}

function girarRoleta() {
    if (girando) return;
    girando = true;
    
    resultado.style.display = "none";
    resultado.textContent = "";
    avaliacao.style.display = "none";

    document.getElementById("btn-voltar-discreto").disabled = true;
    mensagem.textContent = "Sorteando...";
    btnGirar.style.display = "none";

    const chanceDesafio = 0.03;
    if ((nivelSelecionado === 'facil' || nivelSelecionado === 'medio') && Math.random() < chanceDesafio) {
        iniciarDesafioDeNivel();
        return;
    }

    document.getElementById("escolha-container").style.display = "flex";

    const opcoes = [
        document.getElementById("opcao-verdade"),
        document.getElementById("opcao-consequencia"),
    ];

    if (!opcoes[0] || !opcoes[1]) {
        console.error("ERRO CRÍTICO: Elementos de Verdade/Consequência não encontrados no HTML.");
        alert("Erro no jogo! Verifique o console (F12).");
        girando = false;
        return;
    }

    let piscadas = 0;
    const totalPiscadas = 10;
    let indexAtual = 0;

    function animarPiscada() {
        opcoes.forEach(opt => opt.classList.remove('piscar'));
        if (opcoes[indexAtual]) {
            opcoes[indexAtual].classList.add('piscar');
        }
        indexAtual = 1 - indexAtual;
        piscadas++;
        if (piscadas < totalPiscadas) {
            setTimeout(animarPiscada, 150);
        } else {
            finalizarSorteio();
        }
    }

    function finalizarSorteio() {
        const selecionadoIndex = Math.floor(Math.random() * 2);
        opcoes.forEach(opt => opt.classList.remove('piscar'));
        if (opcoes[selecionadoIndex]) {
            opcoes[selecionadoIndex].classList.add('piscar');
        }
        setTimeout(() => {
            if (opcoes[selecionadoIndex]) {
                opcoes[selecionadoIndex].classList.remove('piscar');
            }
            mostrarResultado(selecionadoIndex);
            girando = false;
        }, 800);
    }
    animarPiscada();
}

function mostrarResultado(indice) {
    const tipo = segmentos[indice].texto.toLowerCase();
    ultimaEscolha = tipo;
    mensagem.textContent = `${segmentos[indice].texto}!`;
    
    resultado.style.display = "block";
    resultado.textContent = "";

    btnGirar.style.display = "none";
    document.getElementById("escolha-container").style.display = "none";

    const animacao = document.getElementById("animacao-resultado");
    const spanAnimacao = animacao.querySelector('span');
    
    animacao.className = "animacao-resultado";
    spanAnimacao.className = 'animacao-botao';

    spanAnimacao.textContent = tipo === "verdade" ? "Verdade" : "Consequência";
    void animacao.offsetWidth; 

    animacao.classList.add(
        tipo === "verdade" ? "animacao-verdade" : "animacao-consequencia"
    );
    spanAnimacao.classList.add(tipo === "verdade" ? "animacao-verdade-btn" : "animacao-consequencia-btn");

    setTimeout(() => {
        animacao.className = "animacao-resultado hidden";
        spanAnimacao.textContent = "";

        let fraseSorteada = "";
        const tipoDesafio = tipo;
        let arrayCandidato = [];
        const isArrayValido = (arr) => Array.isArray(arr) && arr.length > 0 && arr.some((item) => typeof item === "string" && item.trim() !== "");

        if (perguntas[modoJogo]?.[nivelSelecionado]?.[tipoDesafio]) {
            const especifico = perguntas[modoJogo][nivelSelecionado][tipoDesafio];
            if (isArrayValido(especifico)) {
                arrayCandidato = especifico;
            }
        }

        if (arrayCandidato.length === 0 && perguntas.dupla?.[nivelSelecionado]?.[tipoDesafio]) {
            const fallbackDuplaNivel = perguntas.dupla[nivelSelecionado][tipoDesafio];
            if (isArrayValido(fallbackDuplaNivel)) {
                arrayCandidato = fallbackDuplaNivel;
            }
        }

        if (arrayCandidato.length === 0) {
            fraseSorteada = `Ops! Nenhuma pergunta encontrada para este nível.`;
        } else {
            fraseSorteada = arrayCandidato[Math.floor(Math.random() * arrayCandidato.length)];
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
    const spanAnimacao = animacao.querySelector('span');
    spanAnimacao.className = 'animacao-botao';
    animacao.className = 'animacao-resultado';
    animacao.classList.remove("hidden");

    if (aguardandoPrenda) {
        if (cumpriu) {
            mensagem.textContent = "Você cumpriu a prenda! O jogo continua.";
            animacao.classList.add("animacao-verdade");
            spanAnimacao.classList.add("animacao-verdade-btn");
            spanAnimacao.textContent = "Prenda Cumprida!";
            aguardandoPrenda = false;
            desafiosNaoCumpridos[jogadorAtual] = 0;
        } else {
            mensagem.textContent = `${jogadores[jogadorAtual]} não cumpriu a prenda!`;
            animacao.classList.add("animacao-consequencia");
            spanAnimacao.classList.add("animacao-consequencia-btn");
            spanAnimacao.textContent = "❌";
            aguardandoPrenda = false;
            desafiosNaoCumpridos[jogadorAtual] = 0;
            setTimeout(() => {
                animacao.classList.add("hidden");
                spanAnimacao.textContent = "";
                anunciarPerdedor(jogadores[jogadorAtual]);
            }, 1500);
            atualizarPlacar();
            return;
        }
        setTimeout(() => {
            animacao.classList.add("hidden");
            spanAnimacao.textContent = "";
            if (!verificarFimDeJogo(true)) {
                prepararParaNovaRodada();
            }
        }, 1500);
        return;
    }

    if (cumpriu) {
        pontos[jogadorAtual]++;
        mensagem.textContent = "Você cumpriu! +1 ponto.";
        animacao.classList.add("animacao-verdade");
        spanAnimacao.classList.add("animacao-verdade-btn");
        spanAnimacao.textContent = "✔";
        desafiosNaoCumpridos[jogadorAtual] = 0;
    } else {
        penalidades[jogadorAtual]++;
        desafiosNaoCumpridos[jogadorAtual]++;
        falhouAlgumaVez[jogadorAtual] = true;
        if (pontos[jogadorAtual] > 0) {
            pontos[jogadorAtual]--;
        }
        mensagem.textContent = "Você não cumpriu! -1 ponto.";
        animacao.classList.add("animacao-consequencia");
        spanAnimacao.classList.add("animacao-consequencia-btn");
        spanAnimacao.textContent = "✖";

        if (desafiosNaoCumpridos[jogadorAtual] >= 2) {
            aguardandoPrenda = true;
            let prendaSorteadaParaPenalidade;
            const listaPrendas = modoJogo === 'dupla' ? prendas : prendasGrupo;
            if (listaPrendas && listaPrendas.length > 0) {
                prendaSorteadaParaPenalidade = listaPrendas[Math.floor(Math.random() * listaPrendas.length)];
                mensagem.textContent = "Prenda:";
                resultado.textContent = `${jogadores[jogadorAtual]}, ${prendaSorteadaParaPenalidade}`;

                animacao.classList.add("animacao-prenda");
                spanAnimacao.classList.add("animacao-prenda-btn");
                spanAnimacao.textContent = "PAGUE A PRENDA!";

                setTimeout(() => {
                    animacao.classList.add("hidden");
                    spanAnimacao.textContent = "";
                    avaliacao.style.display = "flex";
                    document.getElementById("btn-cumpriu").disabled = false;
                    document.getElementById("btn-nao-cumpriu").disabled = false;
                    document.querySelectorAll('.btn-voltar, #btn-voltar-discreto').forEach(btn => btn.disabled = false);
                }, 1800);
            } else {
                anunciarPerdedor(jogadores[jogadorAtual]);
            }
            atualizarPlacar();
            return;
        }
    }
    atualizarPlacar();
    setTimeout(() => {
        animacao.classList.add("hidden");
        spanAnimacao.textContent = "";
        if (!verificarFimDeJogo(false)) {
            prepararParaNovaRodada();
        }
    }, 1800);
}

function verificarVotos() {
    const containersVotos = document.querySelectorAll('#desafio-nivel-section .container-voto-jogador');
    let todosVotaram = true;
    for (const container of containersVotos) {
        const voto = container.getAttribute('data-voto');
        if (!voto || voto === '') {
            todosVotaram = false;
            break;
        }
    }

    const btnConfirmar = document.getElementById("btn-confirmar-votos-desafio");
    if (todosVotaram) {
        btnConfirmar.style.display = 'inline-block';
    } else {
        btnConfirmar.style.display = 'none';
    }
}

function iniciarDesafioDeNivel() {
    document.body.classList.add('desafio-ativo');
    document.getElementById("escolha-container").style.display = "none";

    const animacao = document.getElementById("animacao-resultado");
    const spanAnimacao = animacao.querySelector('span');
    animacao.className = "animacao-resultado animacao-desafio";
    spanAnimacao.className = "animacao-botao animacao-desafio-btn";

    spanAnimacao.textContent = "DESAFIO!";
    animacao.classList.remove("hidden");

    setTimeout(() => {
        animacao.classList.add("hidden");

        const desafioSection = document.getElementById("desafio-nivel-section");
        const desafioTexto = document.getElementById("desafio-nivel-texto");
        const respostasContainer = document.getElementById("respostas-jogadores-desafio");
        const btnConfirmar = document.getElementById("btn-confirmar-votos-desafio");

        const proximoNivel = nivelSelecionado === 'facil' ? 'medio' : 'dificil';
        desafioTexto.textContent = `Todos os jogadores concordam em passar para o nível ${proximoNivel}? Se um recusar, todos devem pagar uma prenda!`;

        respostasContainer.innerHTML = '';
        
        jogadores.forEach(jogador => {
            const divJogador = document.createElement('div');
            divJogador.className = 'container-voto-jogador';
            divJogador.setAttribute('data-jogador', jogador);
            divJogador.setAttribute('data-voto', '');
            
            divJogador.innerHTML = `
            <span class="nome-jogador-voto">${jogador}</span>
            <div class="botoes-voto">
                <button class="voto-btn sim">Sim</button>
                <button class="voto-btn nao">Não</button>
            </div>`;
            
            respostasContainer.appendChild(divJogador);
            
            const btnSim = divJogador.querySelector('.voto-btn.sim');
            const btnNao = divJogador.querySelector('.voto-btn.nao');

            btnSim.onclick = () => {
                btnSim.classList.add('active');
                btnNao.classList.remove('active');
                divJogador.setAttribute('data-voto', 'sim');
                verificarVotos();
            };
            btnNao.onclick = () => {
                btnNao.classList.add('active');
                btnSim.classList.remove('active');
                divJogador.setAttribute('data-voto', 'nao');
                verificarVotos();
            };
        });

        btnConfirmar.onclick = processarVotosDesafio;
        desafioSection.style.display = 'flex';
    }, 1800);
}

function processarVotosDesafio() {
    const containersVotos = document.querySelectorAll('#desafio-nivel-section .container-voto-jogador');
    let todosAceitaram = true;

    for (const container of containersVotos) {
        const voto = container.getAttribute('data-voto');
        if (voto === 'nao') {
            todosAceitaram = false;
        }
    }
    
    document.body.classList.remove('desafio-ativo');
    document.getElementById('desafio-nivel-section').style.display = 'none';
    document.getElementById('btn-confirmar-votos-desafio').style.display = 'none';
    vezDoJogador.style.display = 'block';

    if (todosAceitaram) {
        nivelSelecionado = nivelSelecionado === 'facil' ? 'medio' : 'dificil';
        emojiNivel = nivelSelecionado.charAt(0).toUpperCase() + nivelSelecionado.slice(1);
        nivelEscolhidoDisplay.textContent = `Nível: ${emojiNivel}`;
        mensagem.textContent = 'Desafio Aceito!';
        resultado.style.display = "block";
        resultado.textContent = `O jogo continua no nível ${emojiNivel}!`;
    } else {
        mensagem.textContent = 'Desafio Recusado!';
        let prendaSorteada = "beba um gole da sua bebida.";
        const listaPrendas = modoJogo === 'dupla' ? prendas : prendasGrupo;
        if (listaPrendas && listaPrendas.length > 0) {
            prendaSorteada = listaPrendas[Math.floor(Math.random() * listaPrendas.length)];
        }
        resultado.style.display = "block";
        resultado.textContent = `Como consequência, todos devem: ${prendaSorteada}`;
    }
    
    const btnContinuar = document.getElementById("btn-continuar-jogo");
    btnContinuar.style.display = "inline-block";
    btnContinuar.onclick = () => {
        btnContinuar.style.display = "none";
        prepararParaNovaRodada(false);
    };

    const btnVoltar = document.getElementById("btn-voltar-discreto");
    btnVoltar.style.display = "inline-block";
    btnVoltar.disabled = false;
}

function prepararParaNovaRodadaVisual() {
    nivelEscolhidoDisplay.style.display = "block";
    vezDoJogador.style.display = "block";
    placar.style.display = "block";
    mensagem.style.display = "block";
}

function prepararParaNovaRodada(avancarJogador = true) {
    if (jogadores.length <= 1) {
        if (jogadores.length === 1) anunciarVencedor(jogadores[0], []);
        return;
    }

    if (avancarJogador) {
        jogadorAtual = (jogadorAtual + 1) % jogadores.length;
    }
    
    if (jogadorAtual >= jogadores.length) {
        jogadorAtual = 0;
    }
    
    prepararParaNovaRodadaVisual();
    
    atualizarVez();
    avaliacao.style.display = "none";
    resultado.style.display = "none";
    resultado.textContent = "";

    const btnContinuar = document.getElementById("btn-continuar-jogo");
    if (btnContinuar) btnContinuar.style.display = "none";

    document.getElementById("escolha-container").style.display = "none";
    btnGirar.textContent = "Sortear";
    btnGirar.style.display = "inline-block";
    btnGirar.disabled = false;
    girando = false;

    btnGirar.onclick = function() {
        if (girando) return;
        this.disabled = true;
        document.getElementById("btn-voltar-discreto").disabled = true;
        girarRoleta();
    };

    document.getElementById("btn-voltar-discreto").style.display = "inline-block";
    document.getElementById("btn-voltar-discreto").disabled = false;
    document.getElementById("btn-cumpriu").disabled = true;
    document.getElementById("btn-nao-cumpriu").disabled = true;
}

function anunciarPerdedor(jogadorPerdedor) {
    mensagem.classList.remove("mensagem-vitoria");
    mensagem.textContent = `${jogadorPerdedor} foi eliminado!`;
    
    const indicePerdedor = jogadores.indexOf(jogadorPerdedor);
    if (indicePerdedor > -1) {
        jogadores.splice(indicePerdedor, 1);
        pontos.splice(indicePerdedor, 1);
        penalidades.splice(indicePerdedor, 1);
        desafiosNaoCumpridos.splice(indicePerdedor, 1);
        falhouAlgumaVez.splice(indicePerdedor, 1);
        if (jogadorAtual >= indicePerdedor) {
            jogadorAtual--;
        }
        if (jogadorAtual < 0) jogadorAtual = 0;
    }

    if (verificarFimDeJogo(true)) return;

    const btnContinuar = document.getElementById("btn-continuar-jogo");
    btnContinuar.style.display = "inline-block";
    btnContinuar.onclick = () => {
        prepararParaNovaRodada();
        btnContinuar.style.display = "none";
    }
    atualizarPlacar();
}

function verificarFimDeJogo(checarApenasVencedorRestante) {
    if (jogadores.length === 1 && checarApenasVencedorRestante) {
        const vencedor = jogadores[0];
        const perdedores = jogadoresIniciais.filter(p => p !== vencedor);
        anunciarVencedor(vencedor, perdedores);
        return true;
    }

    const pontuacaoMaxima = Math.max(...pontos);
    if (pontuacaoMaxima >= 10) {
        const indicesEmpatados = [];
        pontos.forEach((p, i) => {
            if (p === pontuacaoMaxima) {
                indicesEmpatados.push(i);
            }
        });
        
        if (indicesEmpatados.length >= 2) {
            iniciarMorteSubita(indicesEmpatados);
            return true;
        }
    }

    const limite = limitesPontuacao[nivelSelecionado];
    if (!limite || !jogadores || jogadores.length < 1) {
        return false;
    }

    if (pontuacaoMaxima < limite) {
        return false;
    }

    const indicesLideres = [];
    pontos.forEach((p, i) => {
        if (p === pontuacaoMaxima) {
            indicesLideres.push(i);
        }
    });

    if (indicesLideres.length > 1) {
        return false;
    }

    const indiceVencedor = indicesLideres[0];
    const nomeVencedor = jogadores[indiceVencedor];
    const perdedores = jogadores.filter(j => j !== nomeVencedor);
    const outrasPontuacoes = pontos.filter((_, i) => i !== indiceVencedor);
    const segundoLugarPontos = outrasPontuacoes.length > 0 ? Math.max(...outrasPontuacoes) : -1;
    const diferenca = pontuacaoMaxima - segundoLugarPontos;

    if (diferenca >= 2) {
        anunciarVencedor(nomeVencedor, perdedores);
        return true;
    }

    if (diferenca === 1) {
        const indiceSegundoLugar = pontos.indexOf(segundoLugarPontos);
        if (indiceSegundoLugar !== -1 && falhouAlgumaVez[indiceSegundoLugar]) {
            anunciarVencedor(nomeVencedor, perdedores);
            return true;
        }
    }
    return false;
}

function iniciarMorteSubita(indicesEmpatados) {
    document.getElementById("jogo-section").style.display = "none";
    const animacao = document.getElementById("animacao-resultado");
    const spanAnimacao = animacao.querySelector('span');

    animacao.className = "animacao-resultado animacao-morte-subita";
    spanAnimacao.className = "animacao-botao animacao-morte-subita-btn";
    spanAnimacao.textContent = "MORTE SÚBITA!";
    animacao.classList.remove("hidden");

    setTimeout(() => {
        animacao.classList.add("hidden");
        document.getElementById("morte-subita-section").style.display = "flex";

        let desafiosDificil;
        const desafiosModoAtual = perguntas[modoJogo]?.dificil?.consequência;

        if (Array.isArray(desafiosModoAtual) && desafiosModoAtual.length > 0) {
            desafiosDificil = desafiosModoAtual;
        } else {
            desafiosDificil = perguntas.dupla?.dificil?.consequência;
        }

        if (!desafiosDificil || desafiosDificil.length === 0) {
            document.getElementById('morte-subita-desafio-texto').textContent = 'Erro: Não foi possível encontrar uma "Consequência" no nível Difícil.';
            document.getElementById('btn-confirmar-morte-subita').disabled = true;
            return;
        }

        const desafioSorteado = desafiosDificil[Math.floor(Math.random() * desafiosDificil.length)];
        document.getElementById('morte-subita-desafio-texto').textContent = `Desafio: ${desafioSorteado}`;

        const container = document.getElementById("morte-subita-jogadores-container");
        container.innerHTML = "";

        const duelistas = indicesEmpatados.slice(0, 2);

        duelistas.forEach(indice => {
            const nomeJogador = jogadores[indice];
            const divJogador = document.createElement('div');
            divJogador.className = 'container-voto-jogador';
            divJogador.setAttribute('data-jogador-nome', nomeJogador);
            divJogador.setAttribute('data-resultado', '');

            divJogador.innerHTML = `
                <span class="nome-jogador-voto">${nomeJogador}</span>
                <div class="botoes-voto">
                    <button class="voto-btn morte-subita-cumpriu">Cumpriu</button>
                    <button class="voto-btn morte-subita-nao-cumpriu">Não Cumpriu</button>
                </div>
            `;
            container.appendChild(divJogador);

            const btnCumpriu = divJogador.querySelector('.morte-subita-cumpriu');
            const btnNaoCumpriu = divJogador.querySelector('.morte-subita-nao-cumpriu');

            btnCumpriu.onclick = () => {
                btnCumpriu.classList.add('active');
                btnNaoCumpriu.classList.remove('active');
                divJogador.setAttribute('data-resultado', 'cumpriu');
            };
            btnNaoCumpriu.onclick = () => {
                btnNaoCumpriu.classList.add('active');
                btnCumpriu.classList.remove('active');
                divJogador.setAttribute('data-resultado', 'nao-cumpriu');
            };
        });

        const btnConfirmar = document.getElementById('btn-confirmar-morte-subita');
        btnConfirmar.disabled = false;
        btnConfirmar.classList.add('active');
        btnConfirmar.onclick = processarResultadoMorteSubita;

    }, 1800);
}

function processarResultadoMorteSubita() {
    const resultadosNode = document.querySelectorAll('#morte-subita-jogadores-container .container-voto-jogador');
    if (resultadosNode.length < 2) return;

    const resultadoJ1 = {
        nome: resultadosNode[0].getAttribute('data-jogador-nome'),
        resultado: resultadosNode[0].getAttribute('data-resultado')
    };
    const resultadoJ2 = {
        nome: resultadosNode[1].getAttribute('data-jogador-nome'),
        resultado: resultadosNode[1].getAttribute('data-resultado')
    };

    if (!resultadoJ1.resultado || !resultadoJ2.resultado) {
        alert('Por favor, marque se cada jogador cumpriu ou não o desafio.');
        return;
    }

    const cumpriu1 = resultadoJ1.resultado === 'cumpriu';
    const cumpriu2 = resultadoJ2.resultado === 'cumpriu';

    if (cumpriu1 && !cumpriu2) {
        anunciarVencedor(resultadoJ1.nome, [resultadoJ2.nome]);
    } else if (!cumpriu1 && cumpriu2) {
        anunciarVencedor(resultadoJ2.nome, [resultadoJ1.nome]);
    } else {
        anunciarEmpateMorteSubita([resultadoJ1.nome, resultadoJ2.nome]);
    }
}

function anunciarVencedor(vencedor, perdedoresArray) {
    document.getElementById("jogo-section").style.display = "none";
    document.getElementById("morte-subita-section").style.display = "none";

    const telaFinal = document.getElementById("tela-final-section");
    telaFinal.style.display = "flex";

    const tituloFinal = document.getElementById("tela-final-titulo");
    tituloFinal.textContent = `${vencedor} venceu!`;
    tituloFinal.classList.add("mensagem-vitoria");

    const prendaContainer = document.getElementById("tela-final-prenda-container");
    const prendaTexto = document.getElementById("tela-final-prenda-texto");
    
    if (perdedoresArray && perdedoresArray.length > 0) {
        let prendaSorteada = "Cumpra uma prenda final escolhida pelo vencedor!";
        const listaPrendas = modoJogo === 'dupla' ? prendas : prendasGrupo;
        if (listaPrendas && listaPrendas.length > 0) {
            prendaSorteada = listaPrendas[Math.floor(Math.random() * listaPrendas.length)];
        }
        prendaTexto.innerHTML = `<strong>${perdedoresArray.join(' e ')}</strong> deve pagar a prenda: <br><br><em>${prendaSorteada}</em>`;
        prendaContainer.style.display = "block";
    } else {
        prendaContainer.style.display = "none";
    }
}

function anunciarEmpateMorteSubita(nomesJogadores) {
    document.getElementById("jogo-section").style.display = "none";
    document.getElementById("morte-subita-section").style.display = "none";

    const telaFinal = document.getElementById("tela-final-section");
    telaFinal.style.display = "flex";

    const tituloFinal = document.getElementById("tela-final-titulo");
    tituloFinal.textContent = "EMPATE!";
    tituloFinal.classList.add("mensagem-vitoria");
    const prendaContainer = document.getElementById("tela-final-prenda-container");
    const prendaTexto = document.getElementById("tela-final-prenda-texto");

    let prendaSorteada = "bebam uma dose juntos.";
    const listaPrendas = modoJogo === 'dupla' ? prendas : prendasGrupo;
    if (listaPrendas && listaPrendas.length > 0) {
        prendaSorteada = listaPrendas[Math.floor(Math.random() * listaPrendas.length)];
    }
    
    prendaTexto.innerHTML = `<strong>${nomesJogadores.join(' e ')}</strong>, como resultado, vocês devem: <br><br><em>${prendaSorteada}</em>`;
    prendaContainer.style.display = "block";
    document.getElementById('btn-reiniciar').style.display = 'inline-block';
}

function reiniciarJogo() {
    jogadores = [...jogadoresIniciais]; 

    document.getElementById("tela-final-section").style.display = 'none';
    document.getElementById("jogo-section").style.display = "none";
    
    document.getElementById("tela-final-titulo").classList.remove("mensagem-vitoria");
    
    document.getElementById("nivel-section").style.display = "block";

    pontos = new Array(jogadores.length).fill(0);
    penalidades = new Array(jogadores.length).fill(0);
    desafiosNaoCumpridos = new Array(jogadores.length).fill(0);
    falhouAlgumaVez = new Array(jogadores.length).fill(false);
    jogadorAtual = 0;
    aguardandoPrenda = false;
    girando = false;

    atualizarPlacar();
}

function atualizarVez() {
    if (jogadores.length > 0) {
        if (jogadorAtual >= jogadores.length) jogadorAtual = 0;
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

function voltarParaSelecaoModo() {
    document.getElementById("modo-jogo-section").style.display = "block";
    document.getElementById("cadastro-section").style.display = "none";
    document.getElementById("nivel-section").style.display = "none";
    document.getElementById("jogo-section").style.display = "none";
}

function voltarParaCadastroJogadores() {
    document.getElementById("nivel-section").style.display = "none";
    document.getElementById("cadastro-section").style.display = "block";
}

function voltarParaSelecaoDeNivel() {
   document.body.classList.remove('desafio-ativo');
    document.getElementById("jogo-section").style.display = "none";
    document.getElementById("morte-subita-section").style.display = "none";
    document.getElementById("nivel-section").style.display = "block";

    pontos = new Array(jogadores.length).fill(0);
    penalidades = new Array(jogadores.length).fill(0);
    desafiosNaoCumpridos = new Array(jogadores.length).fill(0);
    jogadorAtual = 0;
    aguardandoPrenda = false;
    girando = false;
    falhouAlgumaVez = new Array(jogadores.length).fill(false);
    
    mensagem.textContent = "";
    resultado.textContent = "";
    avaliacao.style.display = "none";

    atualizarPlacar();
}

function adicionarCampoJogador() {
    for (let i = 3; i <= 5; i++) {
        const container = document.getElementById(`campo-jogador${i}-container`);
        if (container && container.style.display === "none") {
            container.style.display = "flex";
            break;
        }
    }
    atualizarVisibilidadeBotaoAddJogador();
}

function removerCampoJogador(numeroJogadorARemover) {
    const input4 = document.getElementById('jogador4');
    const container4 = document.getElementById('campo-jogador4-container');
    const input5 = document.getElementById('jogador5');
    const container5 = document.getElementById('campo-jogador5-container');

    if (numeroJogadorARemover === 4) {
        if (container5.style.display !== 'none') {
            input4.value = input5.value;
            input5.value = '';
            container5.style.display = 'none';
        } else {
            input4.value = '';
            container4.style.display = 'none';
        }
    } else if (numeroJogadorARemover === 5) {
        input5.value = '';
        container5.style.display = 'none';
    } else if (numeroJogadorARemover === 3) {
        const container3 = document.getElementById('campo-jogador3-container');
        const input3 = document.getElementById('jogador3');
        input3.value = '';
        container3.style.display = 'none';
    }

    atualizarVisibilidadeBotaoAddJogador();
}

function atualizarVisibilidadeBotaoAddJogador() {
    let ultimoVisivel = 2;
    for (let i = 3; i <= 5; i++) {
        const container = document.getElementById(`campo-jogador${i}-container`);
        if (container && container.style.display !== 'none') {
            ultimoVisivel = i;
        }
    }
    
    if (ultimoVisivel < 5) {
        document.getElementById("btn-add-jogador").style.display = 'inline-block';
    } else {
        document.getElementById("btn-add-jogador").style.display = 'none';
    }
}

function ativarModoSoVerdade() {
    if (!jogadores || jogadores.length === 0) {
        alert("Por favor, cadastre os jogadores primeiro!");
        return;
    }
    document.getElementById("nivel-section").style.display = "none";
    document.getElementById("modo-verdade-section").style.display = "flex";

    document.getElementById('animacao-lupa').classList.add('hidden');
    
    const vezSimplesDiv = document.getElementById('vez-simples');
    vezSimplesDiv.style.display = 'none';
    vezSimplesDiv.textContent = '';
    
    const perguntaSimplesDiv = document.getElementById('pergunta-simples');
    perguntaSimplesDiv.style.display = 'block';
    perguntaSimplesDiv.textContent = "Clique no botão abaixo para sortear uma pergunta.";
    
    jogadorAtual = 0;
}

function sortearVerdadeSimples() {
    if (jogadores.length === 0) return;

    const btnSortear = document.getElementById('btn-sortear-verdade');
    const btnVoltar = document.getElementById('btn-voltar');
    const animacaoLupa = document.getElementById('animacao-lupa');
    const vezSimplesDiv = document.getElementById('vez-simples');
    const perguntaSimplesDiv = document.getElementById('pergunta-simples');
    
    btnSortear.disabled = true;
    btnVoltar.disabled = true;
    
    vezSimplesDiv.style.display = 'none';
    perguntaSimplesDiv.style.display = 'none';
    animacaoLupa.classList.remove('hidden');

    setTimeout(() => {
        animacaoLupa.classList.add('hidden');
        perguntaSimplesDiv.style.display = 'block';

        const verdadesNivel = perguntas[modoJogo]?.facil?.verdade || perguntas.dupla.facil.verdade;
        if (!verdadesNivel || verdadesNivel.length === 0) {
            perguntaSimplesDiv.textContent = 'Nenhuma verdade encontrada.';
            btnSortear.disabled = false;
            btnVoltar.disabled = false;
            return;
        }

        const jogadorDaVez = jogadores[jogadorAtual];
        let perguntaSorteada = verdadesNivel[Math.floor(Math.random() * verdadesNivel.length)];
        
        vezSimplesDiv.style.display = 'none';
        
        perguntaSimplesDiv.textContent = `${jogadorDaVez}, ${perguntaSorteada}`;

        jogadorAtual = (jogadorAtual + 1) % jogadores.length;
        
        btnSortear.disabled = false;
        btnVoltar.disabled = false;

    }, 1500);
}


function voltarParaNiveis() {
    document.getElementById("modo-verdade-section").style.display = "none";
    document.getElementById("nivel-section").style.display = "block";
}

function abrirPixPopup() {
    document.getElementById('pix-popup').classList.remove('hidden');
}

function fecharPixPopup() {
    document.getElementById('pix-popup').classList.add('hidden');
}

function copiarChavePix() {
    const chavePixInput = document.getElementById('pix-key');
    chavePixInput.select();
    chavePixInput.setSelectionRange(0, 99999);
    try {
        document.execCommand('copy');
        document.getElementById('copy-feedback').textContent = 'Chave copiada!';
    } catch (err) {
        document.getElementById('copy-feedback').textContent = 'Erro ao copiar.';
    }
    setTimeout(() => {
        document.getElementById('copy-feedback').textContent = '';
    }, 2000);
}

window.onload = function() {
    document.getElementById("modo-jogo-section").style.display = "block";
};

document.getElementById("btn-cumpriu").addEventListener("click", () => avaliar(true));
document.getElementById("btn-nao-cumpriu").addEventListener("click", () => avaliar(false));