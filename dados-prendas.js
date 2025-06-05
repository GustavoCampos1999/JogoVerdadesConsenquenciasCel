const categorias = ["países", "animais", "objetos", "comidas", "cidades", "nomes"];
const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
const quantid = "123".split('');

function sortearItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

const categoriaSorteada = sortearItem(categorias);
const letraSorteada = sortearItem(letras);
const quantidSorteada = sortearItem(quantid);

const prendas = [
  "encha o copo (ou metade se o copo for grande) com uma bebida e beba de uma vez o mais rápido póssivel enquanto seu parceiro cronometra, se passar de 5 segundos repita!",
  "encha a boca com a bebida, e diga algo que admira no seu parceiro antes de engolir, se entornar, repita",
  "encha a boca com a bebida enquanto seu parceiro faz uma pergunta, só pode engolir e responder depois de um sinal combinado, se não responder repita",
  "encha a boca com a bebida e diga algo que admira em seu parceiro, se entornar repita",
  "encha o copo (ou metade se o copo for grande) com a bebida e tente engolir o mais rapido possível sem deixar escorrer enquanto seu parceiro cronometra,entornar e/ou nao conseguir em 5seg, repita",
  "beba um gole grande da bebida, e faça uma piada para seu parceiro, se não for engraçada repita",
  "beba um gole grande de bebida e cite uma curiosidade, se não for interessante repita",
  `encha o copo (ou metade se o copo for grande) com uma bebida e beba de uma vez o mais rápido possível enquanto seu parceiro fala ${quantidSorteada} ${categoriaSorteada} com a letra ${letraSorteada}, se ele terminar antes de você, repita`,
  "beba um gole grande de bebida e seu parceiro deve te contar uma mentira ou verdade sobre ele, você deverá adivinhar se é verdade ou mentira, se errar repita",
  "encha a boca com a bebida e seu parceiro deve imitar alguem famoso, se você não adivinhar, repita",
  "encha a boca com a bebida enquanto seu parceiro faz uma pergunta constrangedora sobre vocês dois, se não responder repita",
  "beba um gole grande de bebida sem fazer careta, se fizer careta, repita"
];

const prendasGrupo = [
  "encha o copo (ou metade se o copo for grande) com uma bebida e beba de uma vez o mais rápido possível enquanto algum jogador cronometra, se passar de 5 segundos repita!",
  "encha a boca com a bebida, e diga algo que admira na pessoa à sua esquerda antes de engolir, se entornar, repita",
  "encha a boca com a bebida enquanto o jogador à sua frente faz uma pergunta, só pode engolir e responder depois de um sinal combinado, se não responder repita",
  "encha a boca com a bebida e diga algo que admira na pessoa que está te olhando, se entornar repita",
  "encha o copo (ou metade se o copo for grande) com a bebida e tente engolir o mais rápido possível sem deixar escorrer enquanto algum jogadador cronometra, se entornar e/ou não conseguir em 5 segundos, repita",
  "beba um gole grande da bebida, e faça uma piada para o grupo, se não for engraçada repita",
  "beba um gole grande de bebida e cite uma curiosidade, se não for interessante para a maioria do grupo, repita",
  `encha o copo (ou metade se o copo for grande) com uma bebida e beba de uma vez o mais rápido possível enquanto o jogador à sua direita fala ${quantidSorteada} ${categoriaSorteada} com a letra ${letraSorteada}, se ele terminar antes de você, repita`,
  "beba um gole grande de bebida enquanto alguém do grupo te conta uma mentira ou verdade sobre ele, você deverá adivinhar se é verdade ou mentira, se errar repita",
  "encha a boca com a bebida e o jogador à sua esquerda deve imitar alguém famoso, se você não adivinhar, repita",
  "encha a boca com a bebida enquanto o jogador à sua esquerda faz uma pergunta constrangedora sobre você, só pode engolir e responder depois que a pergunta for feita, se não responder repita",
  "beba um gole grande de bebida sem fazer careta, se fizer careta, repita",
];