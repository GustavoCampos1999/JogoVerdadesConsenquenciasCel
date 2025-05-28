let perguntaAtual = null;
let perguntaJaVotada = false;
window.perguntasCurtidas = window.perguntasCurtidas || [];
window.perguntasNaoCurtidas = window.perguntasNaoCurtidas || [];


const feedbackData = [];

function registrarFeedback(pergunta, tipo, gostou) {
  const novoFeedback = {
    pergunta,
    tipo,
    gostou,
    timestamp: new Date().toISOString()
  };


  const feedbackExistente = JSON.parse(localStorage.getItem("feedbackData")) || [];


  feedbackExistente.push(novoFeedback);

  localStorage.setItem("feedbackData", JSON.stringify(feedbackExistente));

  console.log("Feedback registrado:", novoFeedback);
}

function mostrarAnimacaoFeedback(emoji, cor = "") {
  const animacao = document.getElementById("animacao-resultado");
  animacao.classList.remove("hidden", "feedback-animado", "animacao-verdade", "animacao-consequencia", "animacao-prenda");
  animacao.style.color = cor;
  animacao.textContent = emoji;

  void animacao.offsetWidth;
  animacao.classList.add("feedback-animado");

  setTimeout(() => {
    animacao.classList.add("hidden");
    animacao.textContent = "";
  }, 800);
}

function mostrarPlanilhaFeedback() {
  const feedbacks = JSON.parse(localStorage.getItem("feedbackData")) || [];

  if (feedbacks.length === 0) {
    alert("Nenhum feedback registrado ainda.");
    return;
  }

  let tabela = "PERGUNTA\t|\tTIPO\t|\tGOSTOU?\t|\tDATA\n";
  tabela += "-".repeat(70) + "\n";

  feedbacks.forEach(item => {
    tabela += `${item.pergunta}\t|\t${item.tipo}\t|\t${item.gostou ? "👍" : "👎"}\t|\t${new Date(item.timestamp).toLocaleString()}\n`;
  });


  console.log("==== FEEDBACK REGISTRADO ====");
  console.log(tabela);
  alert("A planilha de feedbacks foi mostrada no console.");
}

function mostrarAnimacaoFeedback(emoji, cor = "") {
  const animacao = document.getElementById("animacao-resultado");
  animacao.classList.remove("hidden", "feedback-animado", "animacao-verdade", "animacao-consequencia", "animacao-prenda");
  animacao.style.color = cor;
  animacao.textContent = emoji;

  void animacao.offsetWidth;
  animacao.classList.add("feedback-animado");

  setTimeout(() => {
    animacao.classList.add("hidden");
    animacao.textContent = "";
  }, 800);
}

function exportarFeedbackParaExcel() {
  const feedbacks = JSON.parse(localStorage.getItem("feedbackData")) || [];

  if (feedbacks.length === 0) {
    alert("Nenhum feedback registrado para exportar.");
    return;
  }

  const ws = XLSX.utils.json_to_sheet(feedbacks);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Feedback");

  XLSX.writeFile(wb, "feedback_perguntas.xlsx");
}

function exibirPergunta(pergunta) {
  perguntaAtual = pergunta;
  perguntaJaVotada = false;

  document.getElementById("perguntaTexto").textContent = pergunta;
  document.getElementById("feedback-container").style.display = "block";

  document.getElementById("curtirBtn").disabled = false;
  document.getElementById("naoCurtirBtn").disabled = false;

  document.getElementById("feedback-animacao").textContent = "";
}

function votarFeedback(tipo) {
  if (perguntaJaVotada || !perguntaAtual) return;

  const gostou = tipo === "curtir";

  const feedback = {
    pergunta: perguntaAtual,
    tipo: ultimaEscolha || "verdade",
    gostou,
    timestamp: new Date().toISOString()
  };
  const feedbacks = JSON.parse(localStorage.getItem("feedbackData")) || [];
  feedbacks.push(feedback);
  localStorage.setItem("feedbackData", JSON.stringify(feedbacks));

  const animacao = document.getElementById("animacao-resultado");
  animacao.textContent = gostou ? "👍" : "👎";
  animacao.style.color = gostou ? "green" : "red";
  animacao.className = "animacao-resultado feedback-animado";
  animacao.classList.remove("hidden", "feedback-animado");

  void animacao.offsetWidth; 
  animacao.classList.add("feedback-animado");

  setTimeout(() => {
    animacao.classList.add("hidden");
  }, 800);

 perguntaJaVotada = true;
document.getElementById("curtirBtn").disabled = true;
document.getElementById("naoCurtirBtn").disabled = true;


mostrarAnimacaoFeedback(
  tipo === "curtir" ? "👍" : "👎",
  tipo === "curtir" ? "green" : "red"
);
}

function prepararFeedbackParaPergunta(pergunta) {
  perguntaAtual = pergunta;
  perguntaJaVotada = false;

  document.getElementById("feedback-container").style.display = "block";
  document.getElementById("curtirBtn").disabled = false;
  document.getElementById("naoCurtirBtn").disabled = false;
  document.getElementById("feedback-animacao").textContent = "";
}

document.getElementById("curtirBtn").addEventListener("click", () => votarFeedback("curtir"));
document.getElementById("naoCurtirBtn").addEventListener("click", () => votarFeedback("naoCurtir"));


document.addEventListener("keydown", function (event) {
  if (event.ctrlKey && event.altKey && (event.key === "d" || event.key === "D")) {
    event.preventDefault(); 
    exportarFeedbackParaExcel(); 
  }
});
