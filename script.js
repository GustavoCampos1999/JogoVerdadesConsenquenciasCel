let nivelSelecionado = "";
let jogadores = [];
let jogadorAtual = 0;
let pontos = [0, 0];
let penalidades = [0, 0];
let desafiosNaoCumpridos = [0, 0];
let ultimaEscolha = "";
let emojiNivel = "";
let aguardandoPrenda = false;

const prendas = [
  "Faça uma dança sensual para o parceiro.",
  "Faça um striptease completo e dance nu(a) por 2 minutos.",
"Deixe que alguém te amarre e te provoque sem piedade por 3 minutos.",
"Simule estar sendo penetrado(a) violentamente enquanto olha para quem escolher.",
"Beije e morda intensamente o pescoço de quem estiver mais perto.",
"Fique nu(a) e de quatro na frente de todos por 1 minuto.",
"Deixe que alguém passe um cubo de gelo pelo seu corpo até derreter.",
"Simule um orgasmo múltiplo, gemendo e se contorcendo até todos acreditarem.",
"De tapas e mordidas nas coxas ou nádegas do parceiro.",
"Deixe que alguém acaricie sua parte íntima por cima da roupa por 30 segundos.",
"Fique de olhos vendados e permita que te provoquem por 3 minutos.",
"Fique sentado(a) no colo de quem escolher e simule uma transa intensa.",
"Lamba a parte do corpo que mais te excita em alguém.",
"Encoste seu corpo nu no de alguém e simule sua posição sexual favorita.",
"Beije, morda ou lamba quem quiser, onde quiser.",
"Fique sem roupa até o final do jogo, só com as mãos cobrindo.",
"Deixe alguém puxar seu cabelo e te dar um tapa bem forte.",
"Deixe alguém lamber e morder sua orelha até você gemer.",
"Simule estar implorando por prazer e se contorça enquanto faz isso.",
"Deixe que te algemem ou amarrem e te provoquem até você não aguentar.",
"Escolha alguém para fazer carícias íntimas escondido dos outros.",
"Fique nu(a) e fique abraçado(a) com quem quiser por 2 minutos.",
"Simule que está realizando sexo oral em quem escolher.",
"Deixe alguém te provocar com um vibrador ou objeto qualquer.",
"Imite sons de prazer enquanto outra pessoa finge te penetrar.",
"Simule uma cena de dominação total, com ordens explícitas.",
"Beije intensamente quem escolher, com mordidas e gemidos.",
"Deixe que te provoquem com mordidas e beijos até você perder o controle.",
"Faça uma dança erótica completamente nu(a).",
"Deixe alguém te puxar pela cintura e te dominar como quiser.",
"Fique de quatro e deixe que alguém simule te penetrar.",
"Deixe alguém te provocar enquanto você tenta resistir sem gemer.",
"Simule estar tendo um orgasmo enquanto alguém sussurra no seu ouvido.",
"Escolha alguém para te provocar com palavras sujas bem de perto.",
"Fique totalmente nu(a) e deixe que alguém acaricie seu corpo.",
"Deixe que alguém passe as mãos pelo seu corpo como quiser.",
"Deixe alguém puxar seu cabelo e te provocar ao mesmo tempo.",
"Encoste sua boca no pescoço de quem quiser e diga: 'não aguento mais'.",
"Deixe alguém lamber sua barriga ou coxa até você arrepiar.",
"Fique sentado(a) no colo de quem escolher e se provoquem mutuamente.",
"Deixe que te vendem e te provoquem com carícias ousadas.",
"Deixe alguém simular estar te penetrando na frente de todos.",
"Encoste sua testa na de quem quiser e diga: 'me domina'.",
"Escolha alguém para te provocar escondido(a) dos outros.",
"Fique deitado(a) e deixe que alguém suba em cima de você.",
"Simule que está sendo dominado(a) e implore por mais.",
"Beije quem escolher por pelo menos 30 segundos sem parar.",
"Deixe alguém acariciar sua parte íntima sob a roupa por 1 minuto.",
"Fique de quatro e deixe que alguém te provoque como quiser.",
"Deixe alguém te dar um tapa na parte do corpo que quiser.",
"Fique completamente nu(a) e dance para quem escolher.",
"Simule estar realizando sexo oral até todos acreditarem.",
"Deixe alguém morder sua parte preferida do corpo.",
"Encoste-se ao corpo de alguém e provoquem-se mutuamente.",
"Deixe alguém te provocar com mordidas e lambidas pelo corpo.",
"Escolha alguém para simular uma cena sexual contigo.",
"Fique com os olhos fechados e deixe que alguém te provoque por 3 minutos.",
"Deixe que te provoquem enquanto você tenta resistir sem gemer.",
"Fique sem roupa e apenas de joelhos, olhando para quem quiser.",
"Escolha alguém para simular que está te penetrando violentamente.",
"Deixe alguém lamber e morder o seu abdômen ou coxa.",
"Fique nu(a) e deixe alguém te provocar com um objeto gelado.",
"Deixe que te amarrem e sussurrem coisas explícitas no seu ouvido.",
"Beije ou lamba quem quiser, na parte do corpo que mais te excita.",
"Fique completamente vulnerável e deixe que te provoquem sem piedade.",
"Deixe alguém te provocar com tapas e mordidas até você não aguentar mais.",
"Simule estar sendo penetrado(a) brutalmente enquanto olha para quem escolher.",
"Deixe alguém puxar seu cabelo e te beijar forte ao mesmo tempo.",
"Fique completamente nu(a) e escolha alguém para te provocar.",
"Simule estar sendo dominado(a) e diga 'eu sou todo(a) seu(a)'.",
"Deixe alguém lamber seu pescoço enquanto você geme.",
"Deixe alguém provocar sua parte mais sensível com mordidas.",
"Simule estar implorando por prazer enquanto se contorce.",
"Fique de olhos vendados e deixe alguém te provocar sem saber quem é.",
"Deixe alguém simular estar te amarrando e te dominando.",
"Beije, lamba ou morda quem escolher, da forma mais intensa possível.",
"Simule estar realizando sexo com quem quiser, até todos acreditarem.",
"Deixe que alguém te provoque com palavras sujas bem de perto.",
"Fique completamente nu(a) e deixe alguém escolher como te provocar.",
"Encoste seu corpo no de quem quiser e provoquem-se mutuamente.",
"Simule uma cena de submissão total e deixe que alguém te domine.",
"Deixe alguém lamber e morder o local mais sensível do seu corpo.",
"Fique completamente nu(a) e provoque quem quiser com uma dança erótica.",
"Escolha alguém para simular estar te penetrando na sua posição favorita.",
"Deixe que te vendem e te provoquem por todo o corpo sem saber quem é.",
"Deixe alguém lamber sua coxa ou barriga até você gemer.",
"Encoste sua boca na orelha de quem quiser e diga: 'me faz perder o controle'.",
  "Poste uma indireta provocante nos stories.",
  "Dê um beijo demorado no pescoço do parceiro.",
  "Conte ao parceiro uma fantasia que nunca revelou.",
  "Tire uma peça de roupa e entregue ao parceiro",
  "Envie uma mensagem provocante para o parceiro, mesmo estando juntos.",
  "Dance de forma provocante para o parceiro.",
  "Proponha uma nova posição ou fantasia para realizarem juntos.",
  "Deixe o parceiro dar um beijo onde quiser.",
  "Me dê um beijo de tirar o fôlego, como se fosse o último.",
"Sente no meu colo e me provoque por um minuto, sem dizer nada.",
"Me mande uma mensagem provocante agora, mesmo estando aqui.",
"Fique bem perto de mim, mas sem me beijar, até eu ceder.",
"Mostre qual parte do seu corpo quer que eu beije agora.",
"Faça um strip-tease de no mínimo 1 min",
"Me mande uma mensagem extremamente provocante para eu ler depois.",
"Me puxe e me beije onde quiser, com intensidade.",
"Tire uma peça de roupa, agora.",  
"Deixe eu te beijar onde eu quiser.",  
"Mande uma mensagem safada, como se fosse um convite para hoje à noite.",  
"Sente no meu colo e me beije de olhos fechados.",  
"Faça um strip tease de pelo menos 1 minuto.",  
"Fique só de roupa íntima por 5 minutos.",  
"Encoste seu corpo no meu e simule uma dança erótica.",  
"Deixe eu vendar seus olhos e explorar seu corpo.",  
"Fale, olhando nos meus olhos: 'Hoje eu sou seu/sua completamente'.",  
"Deixe eu amarrar suas mãos (ou simule como se fosse).",  
"Me beije como se fôssemos fazer amor agora.",  
"Faça um elogio erótico bem explícito sobre o meu corpo.",  
"Fique de joelhos na minha frente e me provoque só com o olhar.",  
"Me provoque mordendo ou lambendo os seus próprios lábios.",  
"Encoste sua boca na minha orelha e diga: 'Quero te fazer gozar'.",  
"Me deixe tocar em qualquer parte do seu corpo, sem restrições.",  
"Simule como me puxaria para a cama, sem cerimônia.",  
"Deixe eu sussurrar algo bem sujo no seu ouvido e você responde: 'Quero'.",  
"Morda ou beije suavemente uma parte íntima, discretamente.",  
"Me provoque ficando colado(a) em mim, sem falar nada.",  
"Me olhe fixamente e diga: 'Eu vou te enlouquecer'.",  
"Me mostre uma posição sexual que quer experimentar.",  
"Encoste sua boca na minha barriga e simule um beijo ou mordida.",  
"Me abrace e me aperte bem forte contra você.",  
"Passe a mão pelo seu corpo, como se fosse eu te tocando.",  
"Deixe eu escolher onde quero te provocar com um beijo.",  
"Sente-se no meu colo e provoque, rebolando suavemente.",  
"Encoste sua testa na minha e diga: 'Você não imagina o que eu quero fazer com você'.",  
"Me beije até perder o fôlego.",  
"Diga bem no meu ouvido: 'Hoje você é meu/minha, inteiro(a)'.",  
"Tire uma peça de roupa agora.",
"Simule um striptease completo.",
"Beije a parte do corpo de quem escolher.",
"Descreva sua fantasia mais obscura em voz alta.",
"Envie uma mensagem explícita para o(a) crush.",
"Fique de roupa íntima até a próxima rodada.",
"Simule um orgasmo até todos acreditarem.",
"Deixe alguém lamber ou morder qualquer parte do seu corpo.",
"Beije o pescoço de quem quiser de forma provocante.",
"Imite uma cena de sexo de filme pornô.",
"Deixe alguém te vendar e provocar por 1 minuto.",
"Escolha alguém para te abraçar por trás e te apertar.",
"Dance no colo de quem quiser.",
"Sente no colo de alguém até a próxima rodada.",
"Passe gelo na sua barriga e deixe alguém lamber.",
"Deixe alguém morder sua orelha agora.",
"Encoste o corpo no de alguém e simule uma dança bem sensual.",
"Deixe alguém escolher onde te beijar.",
"Beije quem quiser da forma mais quente que conseguir.",
"Escolha alguém para te dar um beijo de cinema.",
"Fique de quatro e deixe alguém te dar um tapa.",
"Beije o abdômen ou cintura de quem escolher.",
"Encoste o rosto na pessoa ao lado e sussurre: 'te desejo'.",
"Escolha alguém para fazer um carinho íntimo por cima da roupa.",
"Deixe alguém te provocar com palavras sujas.",
"Simule estar sendo dominado(a) por quem quiser.",
"Simule que está fazendo sexo com almofadas.",
"Escolha alguém para acariciar seu pescoço.",
"Deixe alguém amarrar suas mãos por uma rodada.",
"Encoste sua testa na de alguém e diga: 'te quero muito'.",
"Beije ou morda a clavícula de quem escolher.",
"Deixe alguém lamber sua nuca.",
"Sussurre no ouvido de alguém: 'te desejo agora'.",
"Encoste no corpo de alguém e provoque sem falar nada.",
"Deixe alguém te puxar pela cintura ou cabelo.",
"Beije ou acaricie a coxa de quem quiser.",
"Simule um gemido até alguém acreditar que é real.",
"Fique sem camisa até o final da rodada.",
"Deixe alguém te provocar com um tapa ou mordida.",
"Sente no colo de alguém e abrace apertado.",
"Deixe alguém lamber seu pescoço por 10 segundos.",
"Escolha alguém para acariciar sua cintura ou coxa.",
"Beije a parte do corpo que quiser da pessoa à sua esquerda.",
"Fique de olhos fechados e deixe alguém te provocar como quiser.",
"Simule estar dominando ou sendo dominado(a) por quem escolher.",
"Beije ou morda os lábios de quem quiser.",
"Passe a língua na orelha de quem quiser.",
"Deixe alguém te abraçar bem apertado.",
"Escolha alguém e fique abraçado até o fim do jogo.",
"Simule um beijo selvagem em quem quiser.",
"Escolha alguém para morder sua cintura.",
"Encoste seu corpo no de quem quiser por um minuto.",
"Beije ou acaricie suavemente as costas de quem escolher.",
"Escolha alguém para fazer um carinho íntimo por cima da roupa.",
"Deixe alguém lamber ou beijar sua barriga.",
"Sente no colo de alguém e dance sensualmente.",
"Deixe alguém te provocar com palavras sujas no ouvido.",
"Beije a nuca de quem quiser bem lentamente.",
"Encoste sua boca na orelha de quem quiser e sussurre 'me pega'.",
"Simule estar se despindo para alguém.",
"Deixe alguém escolher como te provocar por um minuto.",
"Simule estar tendo uma transa intensa agora.",
"Beije ou lamba o pescoço de quem quiser.",
"Escolha alguém para acariciar sua parte favorita do corpo.",
"Fique de roupa íntima até o final do jogo.",
"Escolha alguém para segurar sua cintura com força.",
"Beije ou morda o ombro de quem quiser.",
"Simule uma dança de pole dance.",
"Deixe alguém escolher uma peça de roupa sua para tirar.",
"Beije ou acaricie a coxa de quem está à sua frente.",
"Simule estar sendo puxado(a) para um beijo quente.",
"Escolha alguém para lamber sua nuca ou pescoço.",
"Encoste seu corpo inteiro no de quem quiser.",
"Beije o abdômen de quem quiser bem lentamente."
];

const perguntas = {
  
  facil: {
    verdade: ["Qual parte do meu corpo você mais gosta?", 
      "Qual foi o melhor momento que passamos juntos?", 
      "Você já sonhou comigo de maneira “picante”?",
      "O que mais te atrai na minha personalidade?",
      "Qual a sua fantasia favorita comigo?",
      "Qual seria o presente perfeito que eu poderia te dar?",
      "Se pudesse escolher um lugar para uma viagem romântica comigo, qual seria?",
"Qual parte do meu corpo você gostaria de beijar agora?",
"Responda, se eu te chamasse agora para o quarto, o que você faria?",
"Qual foi a última vez que você pensou em mim de forma safada?",
"Já fantasiou em me beijar em público de forma ousada?",
"Prefere que eu tome a iniciativa ou você gosta de dominar?",
"Já se pegou imaginando uma cena quente comigo?",
"Qual a parte do meu corpo que você mais gosta?",  
"Prefere abraços apertados ou beijos?",  
"Você gosta mais de carinho ou de provocação?",  
"Qual foi a primeira coisa que te atraiu em mim?",  
"Qual seria o nosso encontro perfeito?",  
"O que mais gosta de fazer comigo?",  
"Qual é sua memória favorita nossa?",  
"O que você acha mais fofo em mim?",  
"Prefere beijos longos ou selinhos rápidos?",  
"Qual é sua música romântica favorita?",  
"Você gosta mais de conversar ou de ficar abraçado(a) em silêncio?",  
"O que você mais sente falta quando não estamos juntos(as)?",  
"Prefere um jantar romântico ou um dia de aventuras?",  
"Qual é o seu tipo de demonstração de amor favorita?",  
"Qual foi o momento mais marcante da nossa relação?",  
"O que você acha irresistível em mim?",  
"Qual seria uma viagem perfeita para fazermos juntos(as)?",  
"Qual foi a coisa mais fofa que já fizemos?",  
"Prefere passeios tranquilos ou aventuras radicais comigo?",  
"O que você mais gosta quando estamos sozinhos(as)?",  
"Qual comida te lembra de mim?",  
"O que você sente quando me abraça?",  
"Prefere assistir filmes juntinhos ou sair para dançar?",  
"Qual é o presente ideal que gostaria de receber de mim?",  
"O que você mais valoriza no nosso relacionamento?",  
"O que você sempre quis me dizer mas nunca teve coragem?",  
"Qual é a qualidade que mais admira em mim?",  
"O que te faz se sentir mais amado(a)?",  
"O que você acha que podemos fazer para melhorar ainda mais nosso relacionamento?",  
"Qual é o elogio mais sincero que você faria para mim agora?",  
"Qual foi o lugar mais inusitado que você já deu um beijo?",
      "Você já enviou uma mensagem mais ousada para alguém?",
      "Já sonhou com alguém que não deveria?",
      "Qual parte do seu corpo você mais gosta que toquem?",
      "Já usou uma fantasia sensual?",
      "Você gosta mais de provocar ou ser provocado?",
      "Você já beijou alguém sem conhecer?",
      "Já ficou com mais de uma pessoa na mesma festa?",
      "Qual é sua posição favorita?",
      "Você já pensou em alguém durante o banho?",
      "Prefere beijo intenso ou carícia demorada?",
      "Já mandou nudes?",
      "Você já stalkeou alguém que queria pegar?",
      "Você já deu em cima de alguém comprometido?",
      "Qual foi a sua última fantasia?",
      "Você gosta de beijo no pescoço?",
      "Já fez strip-tease?",
      "Você curte receber elogios picantes?",
      "Já beijou alguém mais de 10 anos mais velho?",
      "Você já foi pego se olhando no espelho sem roupa?",
      "Qual é sua parte do corpo mais sexy?",
      "Já foi a um motel?",
      "Já ficou sem roupa em local público (mesmo escondido)?",
      "Você prefere dominar ou ser dominado?",
      "Já ficou com alguém só pela atração física?",
      "Você gosta de falar ou ouvir coisas safadas?",
      "Já teve um crush que nunca confessou?",
      "Qual é o seu maior desejo secreto?",
      "Você já ficou com alguém na balada?",
      "Já flertou só por diversão?",
      "Você prefere beijo ou abraço apertado?",
      "Já provocou alguém só para ver a reação?",
      "Você gosta de jogos de sedução?",
      "Já mandou indiretas picantes em redes sociais?",
      "Qual foi sua experiência mais ousada até hoje?",
      "Você toparia um encontro às cegas?",
      "Já fingiu estar interessado só para ganhar um beijo?",
      "Você já desejou alguém comprometido?",
      "Qual a parte do seu corpo que mais gosta de mostrar?",
      "Já ficou com colega de trabalho ou escola?",
      "Você gosta de carícias no escuro?",
      "Você prefere beijo no pescoço ou mordidinha na orelha?",
      "Já usou alguma roupa íntima só para impressionar?",
      "Qual seria a sua fantasia a dois?",
      "Já fez um elogio safado pessoalmente?",
      "Você gosta de provocar com olhares?",
      "Já pensou em um ex durante um momento íntimo?",
      "Você gosta de ser surpreendido(a) ou surpreender?",
      "Já enviou uma mensagem ousada e se arrependeu?",
      "Qual foi a última vez que ficou com frio na barriga?",
      "Você toparia um encontro secreto hoje?",
      "Já ficou de mãos dadas só para provocar ciúmes?",
      "Você gosta de beijo escondido ou público?",
      "Já ficou com alguém sem nem saber o nome?",
      "Você prefere receber ou dar uma massagem sensual?",
      "Já beijou alguém do mesmo sexo por curiosidade?",
      "Você já teve um sonho erótico com alguém conhecido?",
      "Você curte provocar pela roupa que usa?",
      "Já teve vontade de ficar com alguém só pelo olhar?",
      "Você gosta de ser desafiado em um jogo de sedução?",
      "Já se sentiu extremamente atraído(a) só pelo cheiro de alguém?",
      "Qual a coisa mais louca que já fez por atração?",
      "Você já ficou com mais de uma pessoa no mesmo dia?",
      "Já provocou alguém só para se divertir?",
      "Você gosta de ser elogiado ou prefere elogiar?",
      "Qual foi o beijo mais inesquecível que já deu?",
      "Você já desejou estar em um filme romântico?",
      "Já ficou com alguém que não lembrava o nome no dia seguinte?",
      "Você gosta de seduzir só com palavras?",
      "Já se pegou imaginando uma situação mais quente com alguém?",
      "Você toparia um desafio de beijo agora?",
      "Qual sua melhor tática para seduzir alguém?",
      "Você curte jogos de olhares?",
      "Já fingiu ser mais inocente do que realmente é?",
      "Você gosta de provocação ou prefere ir direto ao ponto?",
      "Já se apaixonou por alguém só pelo jeito que olha?",
      "Você curte um beijo mais selvagem ou delicado?",
      "Você já usou acessórios para seduzir?",
      "Qual sua música perfeita para um momento a dois?",
      "Já ficou com alguém só para esquecer outra pessoa?",
      "Você já sentiu química com alguém só de conversar?",
      "Você curte momentos de tensão ou prefere leveza?",
      "Você gosta de surpreender ou prefere ser surpreendido(a)?",
      "Já pensou em mudar seu visual para atrair alguém?",
      "Qual seria seu cenário perfeito para um encontro picante?",
    ],

    consequencia: ["Me dê um abraço bem apertado.",  
"Fale um elogio sincero para mim.",  
"Segure minha mão e fique assim por 30 segundos.",  
"Me dê um selinho carinhoso.",  
"Encoste sua cabeça no meu ombro.",  
"Me abrace de lado e fique assim por um tempinho.",  
"Me olhe nos olhos por 10 segundos e sorria.",  
"Me faça um carinho no rosto.",  
"Me dê um beijo na bochecha.",  
"Fale: 'Eu adoro estar com você'.",  
"Simule como me puxaria para um abraço apertado.",  
"Fale no meu ouvido: 'Você é especial para mim'.",  
"Me abrace pelas costas, como quem quer proteger.",  
"Segure minha mão e não solte até eu mandar.",  
"Fale: 'Eu gosto muito de você' olhando nos meus olhos.",  
"Simule como me daria um beijo roubado.",  
"Fique bem pertinho de mim, sem falar nada.",  
"Fale: 'Você me faz muito feliz'.",  
"Me abrace e fique em silêncio por alguns segundos.",  
"Simule um abraço apertado, como quem está com saudade.",  
"Deixe eu encostar a cabeça no seu ombro.",  
"Fale: 'Você é muito importante para mim'.",  
"Me olhe nos olhos e diga: 'Adoro estar ao seu lado'.",  
"Fale uma coisa que gosta muito sobre mim.",  
"Segure minha mão e sorria.",  
"Deixe eu encostar minha testa na sua.",  
"Fale: 'Você me faz sorrir'.",  
"Me abrace como se não quisesse soltar nunca mais.",  
"Fale: 'Eu confio em você'.",  
"Me faça um carinho no cabelo.",  
"Dê um beijo no pescoço de quem está ao seu lado.",
      "Envie uma mensagem provocante para alguém.",
      "Faça um elogio bem ousado para quem você quiser.",
      "Provoque alguém só com o olhar por 20 segundos.",
      "Dê um abraço apertado e demorado em alguém.",
      "Fique de mãos dadas com quem escolher até sua próxima vez.",
      "Dê um beijo de cinema em quem escolher.",
      "Dance de maneira sensual por 30 segundos.",
      "Diga algo safado para quem está ao seu lado.",
      "Simule um pedido de beijo para alguém do grupo.",
      "Faça uma declaração picante para a pessoa que quiser.",
      "Provoque alguém falando no ouvido bem baixinho.",
      "Finja dar um selinho em quem escolher.",
      "Simule uma massagem sensual em quem você quiser.",
      "Faça um olhar sedutor para quem está ao seu lado.",
      "Sussurre uma frase bem quente para alguém.",
      "Escreva um bilhete provocante e entregue a quem escolher.",
      "Faça um elogio picante para quem estiver mais próximo.",
      "Dance colado(a) com alguém por 1 música.",
      "Dê um beijo de surpresa em alguém.",
      "Conte qual sua maior fantasia em voz alta.",
      "Simule um strip-tease (sem tirar a roupa).",
      "Olhe nos olhos de quem quiser e morda os lábios.",
      "Sente-se no colo de alguém por 1 rodada.",
      "Faça um carinho no cabelo de quem escolher.",
      "Acaricie o rosto de quem você acha mais atraente aqui.",
      "Provoque alguém apenas com gestos, sem falar nada.",
      "Descreva como seria seu encontro ideal com quem escolher.",
      "Fale uma cantada ousada para alguém aqui.",
      "Simule um beijo cinematográfico no ar.",
      "Dê um beijo na mão de quem quiser.",
      "Acaricie a nuca de quem escolher por 10 segundos.",
      "Imite alguém tentando ser sensual.",
      "Abrace alguém bem forte e sinta o perfume.",
      "Toque levemente na mão de quem quiser sem falar nada.",
      "Simule uma dança de casal com quem escolher.",
      "Fale uma frase de filme bem provocante.",
      "Olhe para alguém e diga: 'Hoje você está irresistível'.",
      "Desafie alguém para um olhar sedutor.",
      "Conte sua maior travessura amorosa.",
      "Faça um elogio exagerado e picante.",
      "Provoque alguém descrevendo um beijo de cinema.",
      "Acaricie a mão de quem escolher por 10 segundos.",
      "Faça uma pose bem sedutora e fique parado por 10 segundos.",
      "Escolha alguém e diga algo que sempre quis, mas nunca teve coragem.",
      "Sussurre algo bem atrevido no ouvido de quem quiser.",
      "Simule um beijo no pescoço de quem escolher.",
      "Desafie alguém a lhe dar um abraço apertado.",
      "Faça um elogio só com gestos.",
      "Toque suavemente o rosto de quem quiser.",
      "Simule uma cena romântica famosa com alguém.",
      "Finja que vai beijar e pare antes de encostar.",
      "Descreva como seria seu beijo ideal.",
      "Dance olhando fixamente para quem quiser.",
      "Beije a bochecha de quem estiver à sua direita.",
      "Diga para alguém 'Você me deixa sem ar' olhando nos olhos.",
      "Acaricie o braço de quem quiser.",
      "Descreva seu tipo de beijo preferido.",
      "Escolha alguém e diga o que te atrai nela.",
      "Finja que está convidando alguém para um encontro secreto.",
      "Provoque alguém com uma frase ousada.",
      "Beije levemente a mão de quem escolher.",
      "Simule que vai beijar e pare só quando estiver bem perto.",
      "Escolha alguém e dê um abraço apertado sem soltar por 10 segundos.",
      "Descreva como seria um encontro perfeito com quem quiser.",
      "Desafie alguém para um beijo cinematográfico (mesmo que no ar).",
      "Faça um elogio picante sem usar palavras explícitas.",
      "Escolha alguém e diga uma frase provocante.",
      "Provoque alguém só com um olhar.",
      "Simule que está seduzindo alguém só com o olhar.",
      "Escolha alguém e diga: 'Você é minha tentação'.",
      "Descreva sua cena romântica dos sonhos.",
      "Provoque alguém passando a mão no cabelo.",
      "Escolha alguém e diga: 'Você me deixa louco(a)'.",
      "Finja que está pedindo um beijo com um gesto.",
      "Escolha alguém e elogie a boca dela.",
      "Provoque alguém com uma cantada bem criativa.",
      "Desafie alguém a te dar um abraço sem palavras.",
      "Escolha alguém e diga: 'Você é irresistível'.",
      "Provoque alguém imitando uma cena de filme romântico.",
      "Desafie alguém a te olhar nos olhos por 10 segundos.",
       "Dance de forma sensual por 1 minuto.",
      "Dê um abraço apertado em quem quiser.",
      "Simule uma cena romântica com alguém.",
      "Provoque alguém só com o olhar.",
      "Sussurre algo bem picante no ouvido de alguém.",
      "Diga para alguém: 'Hoje você está irresistível'.",
      "Faça um elogio bem provocante.",
      "Desafie alguém para um beijo cinematográfico.",
      "Simule um strip-tease (sem tirar roupa).",
      "Toque suavemente no rosto de quem quiser.",
      "Provoque alguém apenas com gestos.",
      "Beije a mão de alguém do grupo.",
      "Dance colado(a) com quem quiser.",
      "Sente-se no colo de alguém por uma rodada.",
      "Escolha alguém e dê um abraço bem forte.",
      "Faça uma pose bem sedutora.",
      "Desafie alguém a te provocar só com um olhar.",
      "Provoque alguém com uma frase ousada.",
      "Dê um beijo na bochecha de quem escolher.",
      "Finja que vai beijar e pare antes de encostar.",
      "Escolha alguém e diga: 'Você é minha tentação'.",
      "Desafie alguém para um olhar sedutor.",
      "Provoque alguém com um elogio criativo.",
      "Beije levemente a mão de quem quiser.",
      "Desafie alguém a te dar um abraço sem palavras.",
      "Simule que está seduzindo alguém só com o olhar.",
      "Desafie alguém a te olhar nos olhos por 10 segundos.",
      "Escolha alguém e diga: 'Você me deixa louco(a)'.",
      "Finja que está pedindo um beijo com um gesto.",
      "Escolha alguém e elogie a boca dela.",
      "Desafie alguém para uma dança sensual.",
      "Provoque alguém com uma cantada bem criativa.",
      "Diga: 'Hoje eu só quero ser provocado(a)'.",
      "Beije alguém no rosto de surpresa.",
      "Desafie alguém a te elogiar com uma frase ousada.",
      "Finja que está convidando alguém para um encontro secreto.",
      "Escolha alguém e diga: 'Você é irresistível'.",
      "Dance olhando fixamente para quem quiser.",
      "Escolha alguém e diga: 'Você me deixa sem ar'.",
  ]
  },

  medio: {
      verdade: ["Qual parte do meu corpo você tem mais vontade de explorar agora?", 
        "Já pensou em me despir lentamente só com o olhar?", 
        "O que você mais quer fazer comigo quando estivermos sozinhos?",
      "Já se imaginou me provocando até eu perder o controle?",
      "Prefere que eu te amarre ou que você me amarre?",
      "Você gostaria que eu falasse coisas mais sujas no seu ouvido?",
      "Já se tocou pensando em mim?",
  "Qual foi o lugar mais estranho que já te deu vontade de transar?",  
  "Qual a parte do meu corpo que você mais gosta de tocar?",  
  "Prefere preliminares longas ou ir direto ao ponto?",  
  "Já pensou em me surpreender com uma noite especial?",  
  "Você gosta de ser mais dominante ou mais submisso(a)?",  
  "Já sonhou comigo de forma mais íntima?",  
  "Qual sua posição favorita na cama?",  
  "Prefere beijos intensos ou toques provocantes?",  
  "Qual foi a situação mais constrangedora que já passou na cama?",  
  "Você gosta de provocar ou ser provocado(a)?",  
  "Qual seria o clima perfeito para fazermos amor?",  
  "Você gosta mais de carinho ou de pegada?",  
  "Já mandou ou recebeu nudes? Como se sentiu?",  
  "Qual foi a fantasia mais inusitada que já teve?",  
  "Já se imaginou me surpreendendo na cama?",  
  "Prefere ser conduzido(a) ou conduzir?",  
  "Qual parte do meu corpo você acha mais sexy?",  
  "Já sentiu desejo por mim em um momento inusitado?",  
    "Você curte beijos demorados ou rápidos e intensos?",  
    "O que te deixa mais excitado(a): palavras, gestos ou toques?",  
    "Já se pegou fantasiando comigo em um local público?",  
    "Qual música te faria lembrar de um momento quente comigo?",  
    "Você gosta de quando eu tomo a iniciativa?",  
    "Já pensou em fazer amor em um lugar fora do comum?",  
    "O que você acha indispensável para uma noite perfeita comigo?",  
    "Você gosta mais de beijos no pescoço ou mordidas?",  
    "Qual foi a coisa mais ousada que já quis fazer comigo?",  
    "Você gosta mais de provocar ou ser provocado(a)?",  
    "Qual seria a sua noite de sexo perfeita comigo?",  
    "Tem alguma vontade secreta que nunca me contou?",
    "Você já enviou nudes? Para quem?",
"Qual a sua maior fantasia sexual?",
"Você já fingiu um orgasmo?",
"Qual foi a coisa mais louca que já fez na cama?",
"Você já ficou com mais de uma pessoa na mesma noite?",
"Já desejou alguém comprometido?",
"Qual parte do seu corpo você mais gosta que toquem?",
"Já se arrependeu de ter ficado com alguém?",
"Qual foi o local mais inusitado onde já transou?",
"Já experimentou brinquedos sexuais? Quais?",
"Você gosta de ser dominado(a) ou dominar?",
"Já se pegou pensando em outra pessoa durante o sexo?",
"Qual foi a maior loucura que já fez por atração?",
"Qual a sua posição sexual favorita?",
"Você tem vontade de fazer ménage? Com quem faria?",
"Já se apaixonou por alguém só por uma noite?",
"Você já foi a um motel? Com quem e como foi?",
"Qual foi a maior vergonha que já passou na cama?",
"Você curte sexo casual?",
"Você prefere sexo com amor ou sem compromisso?",
"Qual foi sua maior aventura sexual até hoje?",
"Você já foi pego no flagra?",
"Qual fetiche você tem, mas ainda não contou pra ninguém?",
"Você já mandou mensagem para a pessoa errada falando de sexo?",
"Você gosta de usar fantasias ou roupas íntimas provocantes?",
"Já traiu ou foi traído(a)?",
"Você gosta de fazer ou receber striptease?",
"Já flertou com alguém comprometido?",
"Você toparia fazer um vídeo íntimo?",
"Já fez sexo no carro? Como foi?",
"Você prefere transar no escuro ou com luz?",
"Qual o máximo de tempo que já ficou sem sexo?",
"Você gosta de sexo mais romântico ou mais selvagem?",
"Já fez ou recebeu massagem erótica?",
"Qual parte do corpo do parceiro(a) mais te excita?",
"Você toparia experimentar bondage?",
"Qual foi sua maior decepção na cama?",
"Você já fez sexting? Com quem?",
"Você gosta de provocar ou ser provocado(a)?",
"Já sentiu atração por alguém do mesmo sexo?",
"Você já enviou fotos provocantes hoje?",
"Já usou aplicativos de paquera para encontros íntimos?",
"Você gosta de beijos demorados ou rápidos?",
"Você gosta de sexo matinal ou noturno?",
"Já fez sexo na praia ou gostaria?",
"Você gosta de receber ou fazer sexo oral?",
"Qual é a sua maior insegurança na cama?",
"Você toparia um relacionamento aberto?",
"Qual a maior loucura que faria para realizar uma fantasia?",
"Já fez sexo em local público?",
"Você gosta de falar ou ouvir coisas picantes durante o sexo?",
"Você gosta de experimentar posições diferentes?",
"Você já ficou com alguém mais velho(a)?",
"Você gosta mais de preliminares ou vai direto ao ponto?",
"Você já pensou em transar em um local proibido?",
"Você toparia experimentar novas fantasias?",
"Você gosta de surpreender ou ser surpreendido(a) na cama?",
"Já ficou com alguém só por atração física?",
"Qual é a coisa mais ousada que gostaria de tentar?",
"Você já flertou só por diversão?",
"Já enviou áudio gemendo?",
"Você gosta de provocar com mensagens picantes?",
"Você já fez ou faria um striptease para alguém?",
"Você já fez sexo virtual?",
"Já fez ou aceitaria fazer sexo a três?",
"Você gosta de usar algemas ou vendas?",
"Você gosta de provocar com olhares ou palavras?",
"Qual foi a situação mais constrangedora que viveu na cama?",
"Já usou óleo ou lubrificante especial?",
"Qual a sua memória mais excitante?",
"Você gosta mais de dominar ou ser dominado(a)?",
"Você já teve um crush em alguém mais velho(a)?",
"Você já teve um amigo(a) com benefícios?",
"Qual foi a transa mais rápida que você já teve?",
"Você gosta de provocar com roupas ousadas?",
"Qual seu maior desejo reprimido?",
"Já ficou com alguém só por vingança?",
"Você gosta de beijos no pescoço ou mordidas?",
"Você toparia fazer um ensaio sensual?",
"Você já fez sexo na piscina ou quer fazer?",
"Você já mandou nudes de propósito para a pessoa errada?",
"Você já se arrependeu de ter mandado uma foto íntima?"
    ],

    consequencia: ["Fale no meu ouvido, com detalhes, o que quer que eu faça com você agora.", 
      "Simule como começaria a me despir se estivéssemos sozinhos", 
      "Passe a mão pela minha coxa, bem lentamente.",
      "Me beije como se não houvesse amanhã, mas sem usar as mãos.",
      "Diga uma frase bem safada olhando nos meus olhos.",
      "Simule um gemido no meu ouvido, sem vergonha.",
      "Me provoque com um olhar sedutor, como se quisesse me levar agora.",
      "Beije uma parte do meu corpo à sua escolha.",  
"Sussurre no meu ouvido o que quer que eu faça com você.",  
"Simule um beijo mais quente e demorado.",  
"Fale um elogio picante para mim.",  
"Olhe nos meus olhos e diga o que sente agora.",  
"Passe a mão no meu cabelo ou pescoço, com carinho.",  
"Beije minha mão de forma provocante.",  
"Encoste sua testa na minha e fique assim por alguns segundos.",  
"Sussurre no meu ouvido uma vontade escondida.",  
"Simule como me puxaria para um beijo inesperado.",  
"Faça um carinho bem gostoso na minha nuca.",  
"Me abrace bem forte, como se quisesse me proteger e provocar ao mesmo tempo.",  
"Segure minha mão e fale uma coisa fofa e uma coisa safada.",  
"Simule como me abraçaria por trás de surpresa.",  
"Fale no meu ouvido: 'Estou louco(a) para te beijar'.",  
"Me provoque com um olhar bem intenso, sem falar nada.",  
"Segure minha cintura e me puxe suavemente.",  
"Me dê um beijo no rosto, bem demorado.",  
"Segure na minha mão e encoste seu corpo no meu, sem dizer nada.",  
"Encoste sua boca na minha orelha e sussurre algo provocante.",  
"Simule uma carícia em meu rosto, como quem quer beijar.",  
"Deixe eu segurar na sua cintura por alguns segundos.",  
"Simule um beijo na minha barriga ou pescoço.",  
"Encoste sua perna na minha, como quem quer provocar.",  
"Fale: 'Você não imagina o que eu faria com você agora'.",  
"Beije minha bochecha e depois dê um selinho provocante.",  
"Segure minha mão e diga: 'Eu te quero'.",  
"Simule uma mordida provocante no meu pescoço.",  
"Sussurre: 'Hoje você não vai escapar de mim'.",  
"Me provoque com um olhar sedutor enquanto morde o lábio.",
"Dê um selinho bem demorado.",  
"Deixe eu escolher onde te dar um beijo agora.",  
"Encoste seu corpo no meu por 1 minuto.",  
"Me abrace e sussurre um elogio no meu ouvido.",  
"Sente no meu colo por alguns segundos.",  
"Deixe eu acariciar seu rosto suavemente.",  
"Fale no meu ouvido: 'Hoje você é meu/minha'.",  
"Simule como me puxaria para perto para um beijo.",  
"Me olhe nos olhos por 10 segundos sem rir.",  
"Beije minha mão de forma bem delicada.",  
"Passe a mão pelo meu cabelo ou rosto com carinho.",  
"Segure minha cintura e me aproxime de você.",  
"Simule um beijo no meu pescoço.",  
"Sente ao meu lado bem colado(a).",  
"Deixe eu sussurrar algo no seu ouvido.",  
"Encoste sua testa na minha e fique assim por alguns segundos.",  
"Beije minha bochecha e depois dê um selinho.",  
"Simule como me daria um beijo roubado.",  
"Fale no meu ouvido: 'Você me deixa louco(a)'.",  
"Me abrace de surpresa, bem forte.",  
"Deixe eu encostar a cabeça no seu ombro por um momento.",  
"Segure minha mão e não solte por 1 minuto.",  
"Encoste sua boca na minha orelha e diga: 'Quero você'.",  
"Simule um abraço por trás.",  
"Deixe eu te olhar bem de perto por alguns segundos.",  
"Encoste sua perna na minha de forma provocante.",  
"Deixe eu beijar sua bochecha.",  
"Fale: 'Hoje eu te quero só para mim'.",  
"Encoste sua testa na minha e respire fundo.",  
"Me abrace de lado, como quem quer proteger e seduzir.",  
"Dê um beijo de 10 segundos na pessoa à sua frente.",
"Envie uma mensagem picante para alguém agora.",
"Simule um striptease.",
"Lamba o pescoço do seu parceiro(a).",
"Dê uma mordida provocante em quem está ao lado.",
"Fique de olhos vendados por duas rodadas.",
"Deixe alguém escolher uma parte do seu corpo para beijar.",
"Simule sua posição sexual favorita.",
"Dê um beijo de cinema em quem escolher.",
"Sussurre no ouvido de alguém uma fantasia sua.",
"Mostre sua lingerie ou cueca.",
"Deixe alguém passar gelo pelo seu corpo.",
"Envie um emoji provocante para a última pessoa que falou com você.",
"Dance sensualmente por um minuto.",
"Fale ao pé do ouvido de alguém algo picante.",
"Lamba ou beije a orelha de quem você escolher.",
"Fique no colo de alguém até a próxima rodada.",
"Escreva 'me provoque' no status por 10 minutos.",
"Envie um áudio fingindo que está gemendo.",
"Passe a mão suavemente na perna de quem quiser.",
"Mostre sua parte do corpo favorita.",
"Descreva com detalhes uma fantasia sexual sua.",
"Imite gemidos por 15 segundos.",
"Beije o pescoço de quem você escolher.",
"Simule um orgasmo em público.",
"Faça um carinho provocante na pessoa ao lado.",
"Escolha alguém e dê um selinho sem hesitar.",
"Fique só de roupa íntima até o fim da rodada.",
"Dê uma palmada provocante em quem quiser.",
"Simule uma dança erótica para quem escolher.",
"Fique abraçado(a) com alguém por duas rodadas.",
"Beije a mão de quem quiser de forma sedutora.",
"Sente no colo de alguém e abrace apertado.",
"Escreva 'sou muito provocante' e poste nos stories.",
"Lamba os lábios de forma provocante.",
"Escolha alguém para lhe dar uma massagem.",
"Sopre no pescoço de alguém lentamente.",
"Passe a língua ou beije suavemente o ombro de quem quiser.",
"Escolha alguém para lhe fazer cócegas.",
"Simule fazer um carinho quente na pessoa ao lado.",
"Reproduza sua posição sexual preferida usando almofadas.",
"Descreva sua última fantasia sexual em voz alta.",
"Deixe alguém vendar seus olhos e tocar seu rosto.",
"Escreva uma mensagem provocante para seu crush.",
"Fique de mãos dadas com alguém até o final da rodada.",
"Dê uma mordida no lóbulo da orelha de alguém.",
"Escolha alguém e peça um beijo onde quiser.",
"Deixe alguém escolher onde você deve receber um beijo.",
"Descreva como seria sua noite perfeita de sexo.",
"Conte sobre um sonho erótico recente.",
"Reproduza uma cena sensual de filme.",
"Desafie alguém a fazer uma dança sensual para você.",
"Fique em posição de quatro por 10 segundos.",
"Faça uma expressão facial super provocante.",
"Simule que está recebendo um beijo no pescoço.",
"Deixe alguém te amarrar as mãos por uma rodada.",
"Escolha alguém para te vendar e te conduzir pela sala.",
"Fale três coisas que você faria com quem está ao seu lado na cama.",
"Faça um elogio bem picante para quem quiser.",
"Simule um beijo de tirar o fôlego em quem quiser.",
"Escolha alguém para dar um beijo surpresa.",
"Desafie alguém a te dar um selinho agora.",
"Toque suavemente na cintura de quem quiser.",
"Escolha alguém e dê um abraço bem apertado.",
"Deixe alguém escolher o que você deve tirar: sapato ou camiseta.",
"Passe a mão suavemente no rosto de quem quiser.",
"Fique olhando fixamente nos olhos de alguém por 30 segundos.",
"Sussurre algo provocante no ouvido de quem escolher.",
"Escolha alguém para encostar o rosto bem pertinho do seu.",
"Simule que está fazendo uma massagem sensual.",
"Deixe alguém escolher sua próxima prenda.",
"Encoste seu nariz no pescoço de quem escolher e inspire profundamente.",
"Diga para alguém: 'te desejo' olhando nos olhos.",
"Fique bem pertinho de alguém sem tocar, só provocando.",
"Escreva 'vem me provocar' para alguém no WhatsApp.",
"Fique de costas para alguém e deixe ele(a) te abraçar."
    ]

  },
  dificil: {
    verdade: ["Qual a sua maior fantasia sexual comigo que ainda não realizou?", 
      "Você gostaria que eu te provocasse em público sem ninguém perceber?", 
      "Já pensou em me surpreender, me pegando de surpresa de maneira bem quente?",
      "Tem vontade de fazer um vídeo íntimo comigo?",
      "Qual foi a situação mais excitante que já viveu comigo?",
      "Já se imaginou me dominando completamente? Ou sendo dominado?",
"Qual parte do meu corpo você quer explorar agora com a boca?",
"Qual a sua maior fantasia sexual comigo?",  
"Já se imaginou me fazendo gozar?",  
"Prefere transar de maneira selvagem ou lenta e intensa?",  
"Qual parte do meu corpo você mais deseja tocar agora?",  
"Já se masturbou pensando em mim?",  
"Qual a posição sexual que mais gosta?",  
"Qual foi o lugar mais inusitado onde já fez sexo — ou gostaria de fazer comigo?",  
"Gosta de sexo oral? Prefere dar ou receber?",  
"Qual o limite que você nunca ultrapassaria na cama?",  
"Já quis me pegar de jeito em público, sem se importar?",  
"Gosta mais de fazer amor olhando nos olhos ou de sexo bruto e selvagem?",  
"Tem alguma fantasia envolvendo dominação ou submissão?",  
"Já quis me amarrar ou ser amarrado(a)?",  
"O que te excita mais: palavras sujas ou gemidos?",  
"Prefere transar com as luzes acesas ou apagadas?",  
"Já se imaginou transando comigo em um lugar público?",  
"Você gosta de provocar ou de ser provocado(a) até implorar?",  
"Qual foi a última vez que você se excitou só de pensar em mim?",  
"Gosta de levar ou dar tapas na cama?",  
"Tem vontade de experimentar brinquedos eróticos comigo?",  
"Já fez ou faria sexo a três?",  
"Qual a coisa mais ousada que já fez na cama?",  
"Qual parte do meu corpo você teria vontade de lamber agora?",  
"O que você mais quer que eu faça com você na cama?",  
"Gosta que eu te domine ou que me deixe completamente entregue?",  
"Já pensou em gravar um vídeo nosso transando?",  
"O que você faria se estivéssemos completamente sozinhos agora?",  
"Tem alguma parte do seu corpo que quer que eu explore mais?",  
"Qual foi o melhor sexo que já teve? O que tornaria ele ainda melhor comigo?",  
"Você gosta de ouvir ou de falar besteiras durante o sexo?",
"Você já transou sem usar preservativo?",
"Já teve um caso com mais de uma pessoa ao mesmo tempo?",
"Qual foi a experiência sexual mais intensa da sua vida?",
"Você toparia fazer swing? Por quê?",
"Qual o maior tabu sexual que você já quebrou?",
"Você já fez sexo em local público? Onde?",
"Você toparia transar com alguém vendo?",
"Qual a sua maior fantasia que ainda não realizou?",
"Você já mandou um nude para um desconhecido?",
"Já experimentou sexo anal? Gostou?",
"Qual a coisa mais extrema que você já fez na cama?",
"Você toparia ser filmado(a) enquanto transa?",
"Já sentiu tesão por alguém proibido?",
"Qual a sua posição sexual mais ousada?",
"Você já usou brinquedos sexuais com outra pessoa?",
"Você já transou com alguém sem saber o nome?",
"Qual a maior loucura sexual que já fez sob efeito de bebida?",
"Você já fez ou aceitaria fazer sexo a três ou mais?",
"Qual o lugar mais inusitado onde você quer transar?",
"Você já fingiu gostar de uma prática só para agradar alguém?",
"Você toparia ser amarrado(a) durante o sexo?",
"Você curte práticas de dominação e submissão? Qual mais gosta?",
"Você já enviou um nude explícito hoje?",
"Você toparia realizar um fetiche do seu parceiro(a), mesmo achando estranho?",
"Já pensou em ter um relacionamento aberto ou poliamor?",
"Você já sentiu tesão ao ser observado(a)?",
"Qual foi a situação sexual mais constrangedora da sua vida?",
"Você já transou com alguém que mal conhecia?",
"Você já acordou excitado(a) e teve que se satisfazer?",
"Você toparia realizar sexo com venda nos olhos?",
"Você gosta de ouvir ou falar palavras sujas durante o sexo?",
"Você toparia usar algemas ou chicotes na cama?",
"Você já experimentou alguma prática mais hardcore, como spanking?",
"Você toparia fazer uma gravação íntima?",
"Qual sua opinião sobre swing ou festas privadas?",
"Você toparia fazer sexo com alguém fantasiado(a)?",
"Você já fez sexo oral em público?",
"Já ficou com alguém só por atração física e depois nem falou mais?",
"Qual foi a maior loucura sexual que já fez em um local público?",
"Você já transou na frente de um espelho para se ver?",
"Você já fez sexo com alguém comprometido(a)?",
"Você toparia realizar um fetiche de humilhação ou dominação?",
"Você já se filmou se masturbando?",
"Qual foi o maior risco que você correu por tesão?",
"Você gosta de puxões de cabelo ou tapas durante o sexo?",
"Você já se masturbou em um lugar público?",
"Você já desejou alguém que não podia ter?",
"Você já sentiu atração por um(a) amigo(a) comprometido(a)?",
"Você já mandou mensagens explícitas para alguém comprometido?",
"Você já ficou excitado(a) assistindo pornografia em público?",
"Você toparia ser assistido enquanto faz sexo?",
"Você já teve um caso com alguém muito mais velho(a)?",
"Você gosta de experimentar novas práticas ou prefere o tradicional?",
"Você já se relacionou com alguém apenas para sexo?",
"Você toparia fazer sexo com alguém só por curiosidade?",
"Você já fez sexo na mesma casa que amigos ou familiares?",
"Você já enviou nudes sem o rosto para evitar ser identificado(a)?",
"Você toparia ir a uma casa de swing?",
"Você já se pegou pensando em um(a) ex enquanto transava?",
"Você gosta de provocar com mensagens explícitas?",
"Você toparia experimentar práticas como bondage ou shibari?",
"Você já sentiu vontade de fazer sexo com alguém que acabou de conhecer?",
"Você toparia experimentar voyeurismo ou exibicionismo?",
"Você já ficou excitado(a) ao ser elogiado(a) por algo íntimo?",
"Você já teve um sonho molhado com alguém inusitado?",
"Você já provocou alguém só para testar o poder de sedução?",
"Você já fez sexo com alguém sem se importar com o nome?",
"Você toparia fazer sexo em grupo?",
"Você já transou em um banheiro público?",
"Você toparia transar em um elevador?",
"Você já gravou um vídeo íntimo e enviou?",
"Você gosta de receber ordens ou dar ordens na cama?",
"Você toparia realizar um roleplay sexual?",
"Você já foi exposto(a) sexualmente sem permissão?",
"Você gosta de ser puxado(a) ou empurrado(a) durante o sexo?",
"Você já transou em festa ou evento?",
"Você toparia transar em um local com risco real de ser pego?",
"Você já enviou um nude para alguém só por diversão?",
"Você gosta de falar palavras sujas no ouvido?",
"Você já provocou alguém em público só para ver a reação?",
"Você toparia praticar sexo em um local totalmente iluminado?",
"Você já fez sexo com alguém que mal conhecia e nunca mais viu?",
"Você gosta de carícias mais brutas ou mais delicadas?",
"Você já fez algo que jurou que nunca faria na cama?",
"Você já provocou alguém comprometido(a)?",
"Você já usou acessórios sexuais em um encontro casual?",
"Você já fez sexo sem sentir absolutamente nada pela pessoa?",
"Já se envolveu em orgias? Como foi?",
"Você já fez ou toparia fazer sexo em um clube liberal?",
"Qual a prática sexual mais extrema que você já realizou?",
"Você já transou sob efeito de drogas? Como foi?",
"Já sentiu prazer com dor na cama? Que tipo?",
"Você já foi amarrado(a), algemado(a) ou completamente submisso(a)?",
"Você já dominou alguém completamente na cama?",
"Qual o objeto mais inusitado que já usou para se satisfazer?",
"Você toparia transar com máscaras ou fantasias?",
"Já praticou ou toparia praticar BDSM real (com safe word)?",
"Você já se masturbou pensando em alguém proibido?",
"Qual foi o local mais público e arriscado que você já transou?",
"Você já foi flagrado(a) transando ou se masturbando?",
"Já fez sexo na frente de outras pessoas de propósito?",
"Você toparia fazer sexo em uma praia deserta ou nudista?",
"Qual foi o maior número de pessoas com quem já transou em uma mesma noite?",
"Você já usou plug anal ou outros brinquedos extremos?",
"Já fez ou toparia fazer pegging ou fisting?",
"Você já fez ou toparia fazer sexo com um(a) desconhecido(a) em viagem?",
"Já fez sexo usando vendas e completamente imobilizado(a)?",
"Você já se excitou ao ser humilhado(a) ou humilhar alguém?",
"Você toparia se envolver com práticas de voyeurismo e exibicionismo extremo?",
"Você já foi filmado(a) sem perceber? Como reagiu?",
"Você toparia entrar em um clube de BDSM real?",
"Você já fez ou toparia fazer inversão de papéis total na cama?",
"Qual a coisa mais selvagem que você já realizou sexualmente?",
"Você toparia ter um parceiro fixo para sexo casual, sem vínculo emocional?",
"Você toparia ser dominado(a) ao ponto de não ter controle algum?",
"Já aceitou ou toparia receber ordens humilhantes durante o sexo?",
"Você já transou ou toparia transar com uma câmera ligada e público assistindo?",
"Já teve tesão em ver seu parceiro ou parceira com outra pessoa?",
"Você toparia participar de uma dinâmica cuckold ou hotwife?",
"Já se envolveu com práticas de troca de casais?",
"Você já teve ou toparia ter sexo com alguém com idade muito diferente da sua?",
"Você toparia experimentar práticas mais fetichistas como látex, couro ou pés?",
"Você já praticou ou toparia praticar golden shower ou spit play?",
"Você toparia ser imobilizado(a) com cordas profissionais (shibari)?",
"Já sentiu prazer ao ser enforcado(a) ou enforcar alguém na cama?",
"Você já transou com alguém enquanto outra pessoa assistia e se masturbava?",
"Você toparia realizar um gangbang ou participar de uma orgia real?",
"Já foi exposto(a) intencionalmente em situações sexuais públicas?",
"Você toparia fazer sexo com um vibrador controlado remotamente em público?",
"Já participou de festas privadas com práticas sexuais liberadas?",
"Você toparia fazer sexo com uma venda e sem saber quem está te tocando?",
"Já fez sexo em um local perigoso (borda de prédio, carro em movimento)?",
"Você toparia receber ordens sexuais de alguém por áudio ou vídeo ao vivo?",
"Já foi abordado(a) por desconhecido(a) com proposta sexual e aceitou?",
"Você já usou drogas recreativas para intensificar o sexo?",
"Você toparia ser filmado(a) e ter o vídeo publicado anonimamente?",
"Já ficou excitado(a) com a ideia de ser exposto(a) publicamente?",
"Você já fez sexo em ambiente de trabalho?",
"Já transou com alguém e, logo em seguida, com outra pessoa?",
"Você toparia entrar em um relacionamento onde sexo é o foco principal?",
"Já fez sexo sem roupas e completamente exposto(a) em local aberto?",
"Você já transou ou toparia transar com alguém mais de 20 anos mais velho(a)?",
"Você já teve práticas envolvendo wax play ou eletroestimulação?",
"Você toparia passar um fim de semana inteiro sem sair da cama, só para sexo?",
"Já praticou sexo grupal com pessoas que acabou de conhecer?",
"Você toparia participar de um retiro sexual, com atividades intensas?",
"Você já provocou alguém em público até a pessoa perder o controle?",
"Já fez sexo com alguém enquanto outro(a) se masturbava assistindo?",
"Você toparia manter relações sexuais sem conhecer o rosto da pessoa?",
"Você já fez sexo em local com câmeras de segurança e sabia disso?",
"Você toparia enviar fotos explícitas para estranhos apenas por excitação?",
"Já fez sexo durante uma videochamada para um público?",
"Você toparia participar de uma cena sexual pública (evento temático)?",
"Você já transou com pessoas simultaneamente em duplas ou mais?",
"Já usou ou toparia usar vibradores simultâneos em si mesmo(a)?",
"Você toparia se envolver com práticas de pet play ou age play?",
"Você já teve fetiches que considerou inconfessáveis?",
"Você já se envolveu com práticas de spanking ou flagelação severa?",
"Você toparia ser totalmente controlado(a) sexualmente, por contrato?",
"Você já pensou ou realizou uma sessão de dominação 24/7?",
"Você já participou de sessões de spanking com objetos não convencionais?",
"Você já teve tesão com práticas de sufocamento ou bondage extremo?",
"Você toparia ser parte de uma apresentação sexual em festa?",
"Você já se masturbou assistindo outras pessoas transando ao vivo?",
"Você toparia passar 24 horas sem roupa, apenas realizando desafios sexuais?",
"Você já aceitou ordens explícitas enviadas por mensagens anônimas?",
"Você já fez sexo em um elevador com risco real de ser pego?",
"Você toparia receber ordens sexuais de um(a) desconhecido(a)?"
    ],
    consequencia: ["Me beije como se estivéssemos prestes a fazer amor.", 
      "Simule me despir, lentamente, começando por onde quiser.", 
      "Diga no meu ouvido, sem pudor, o que mais quer que eu faça na cama.",
    "Me morda em um lugar estratégico, sem me machucar, mas me deixando com vontade.",
    "Simule um movimento íntimo, como se estivéssemos sozinhos, só para me provocar.",
    "Me olhe nos olhos, segure minha mão e diga o que faria comigo se ninguém estivesse aqui.",
    "Me faça arrepiar: toque, beije ou fale algo extremamente excitante.",
    "Tire uma peça de roupa agora.",
    "Deixe eu escolher uma parte do seu corpo para beijar agora.",
    "Me conduza fisicamente até onde você quer ser beijado.",
    "Faça um gemido real no meu ouvido.",
    "Simule como seria se estivéssemos fazendo amor neste momento.",
    "Sussurre no meu ouvido a sua maior fantasia sexual.",  
"Simule um beijo molhado e selvagem no meu pescoço.",  
"Passe sua mão pela minha coxa, subindo até onde quiser.",  
"Segure minha cintura e simule como me colocaria contra a parede.",  
"Morde de leve a minha orelha enquanto me olha nos olhos.",  
"Beije uma parte do meu corpo que nunca beijou.",  
"Fale três coisas bem sujas que gostaria de fazer comigo.",  
"Me provoque fazendo um movimento de quadril bem insinuante.",  
"Sussurre com luxúria: 'Eu te quero agora'.",  
"Simule como me despiria, peça por peça.",  
"Deixe eu passar a mão pelo seu corpo à vontade.",  
"Tire todas as peças de roupa e fique totalmente nu(a) por 5 minutos.",
"Simule estar sendo amarrado(a) e dominado(a) até gemer.",
"Escreva 'estou completamente entregue' e envie para quem escolher.",
"Simule que está sendo penetrado(a) intensamente.",
"Deixe alguém te amarrar e te provocar por 3 minutos.",
"Simule um orgasmo múltiplo e grave um áudio.",
"Encoste-se no corpo de alguém e simule uma transa selvagem.",
"Escolha alguém para te dar tapas e mordidas onde quiser.",
"Deixe alguém passar gelo em suas partes íntimas por 1 minuto.",
"Simule estar realizando sexo oral em quem quiser.",
"Deixe alguém te puxar pelo cabelo e te dominar.",
"Fique completamente exposto(a) em frente a todos por 2 minutos.",
"Envie um áudio gemendo para a última pessoa que te mandou mensagem.",
"Simule uma cena de dominação completa com quem quiser.",
"Beije e morda o pescoço de quem quiser intensamente.",
"Deixe alguém te vendar e fazer o que quiser por 2 minutos.",
"Imite um orgasmo bem alto até todos acreditarem.",
"Fique de quatro e deixe alguém te dar um tapa.",
"Deixe alguém escolher como te provocar intensamente.",
"Faça um striptease completo para quem escolher.",
"Deixe alguém morder sua coxa ou cintura.",
"Beije e lamba o pescoço de quem quiser.",
"Simule estar realizando sexo com alguém na posição favorita.",
"Deixe alguém acariciar suas partes íntimas por cima da roupa.",
"Escolha alguém para te provocar com palavras bem sujas.",
"Simule que está sendo imobilizado(a) e humilhado(a).",
"Deixe alguém te provocar com mordidas e puxões.",
"Fique de joelhos e finja implorar por prazer.",
"Escolha alguém para segurar sua cintura e te puxar.",
"Simule uma cena de spanking até gemer.",
"Deixe alguém lamber seu abdômen ou coxa.",
"Simule estar sendo penetrado(a) profundamente.",
"Deixe alguém te provocar com carícias íntimas por 1 minuto.",
"Deixe alguém te amarrar e dar ordens explícitas.",
"Simule que está dominando completamente quem quiser.",
"Beije ou lamba qualquer parte do corpo de quem escolher.",
"Deixe alguém provocar sua parte mais sensível.",
"Encoste-se no corpo de quem quiser e simule uma dança sexual.",
"Deixe alguém escolher qualquer peça sua para tirar.",
"Fique apenas com roupa íntima até o final do jogo.",
"Deixe alguém simular estar te penetrando.",
"Fique de olhos vendados enquanto alguém te provoca por 3 minutos.",
"Escolha alguém para fazer carinho íntimo escondido.",
"Deixe alguém lamber seu pescoço até você arrepiar.",
"Imite sons de prazer até todos se excitarem.",
"Fique sem roupas por 3 minutos com alguém te provocando.",
"Deixe alguém puxar seu cabelo e te morder ao mesmo tempo.",
"Beije, morda ou lamba o corpo de quem escolher.",
"Simule sua posição sexual favorita com alguém.",
"Deixe alguém te prender ou imobilizar com o que tiver disponível.",
"Encoste sua boca na orelha de quem quiser e diga 'faça comigo agora'.",
"Deixe alguém acariciar sua parte íntima por cima da roupa por 30 segundos.",
"Simule estar tendo uma transa intensa até gemer alto.",
"Fique de quatro e deixe alguém te provocar da forma que quiser.",
"Deixe alguém te dar um tapa bem provocante.",
"Encoste seu corpo totalmente no de quem escolher.",
"Beije ou morda a cintura de quem quiser.",
"Deixe alguém morder sua orelha bem forte.",
"Deixe alguém te lamber onde quiser.",
"Fique abraçado(a) com quem quiser e se provoquem mutuamente.",
"Deixe alguém escolher como te provocar até você perder o controle.",
"Beije e lamba o abdômen de quem quiser.",
"Deixe alguém provocar sua parte íntima escondido dos demais.",
"Simule estar se despindo lentamente para quem quiser.",
"Deixe alguém amarrar suas mãos e te provocar por 1 minuto.",
"Simule estar dominando alguém da forma mais selvagem.",
"Deixe alguém te provocar com um tapa forte.",
"Beije ou morda quem quiser, da forma mais intensa.",
"Encoste sua testa na de alguém e diga: 'não vou aguentar'.",
"Escolha alguém para fazer carícias íntimas escondido.",
"Deixe alguém simular estar transando com você agora.",
"Fique nu(a) e deixe alguém te provocar com beijos ou mordidas.",
"Simule estar implorando por sexo até todos acreditarem.",
"Escolha alguém para te segurar pela cintura com força.",
"Beije e lamba a parte favorita do corpo de quem quiser.",
"Fique de olhos fechados enquanto alguém simula uma cena sexual contigo.",
"Deixe alguém te provocar usando qualquer objeto próximo.",
"Simule estar sendo penetrado(a) violentamente.",
"Deixe alguém acariciar e morder sua parte mais sensível.",
"Simule um orgasmo múltiplo até todos acreditarem.",
"Deixe alguém te provocar enquanto você está vendado(a).",
"Morda o seu lábio e me provoque com um olhar safado.",  
"Me dê um beijo forte, com pegada, sem medo.",  
"Me faça um elogio erótico, bem explícito.",  
"Encoste sua boca na minha orelha e sussurre um gemido.",  
"Simule um beijo ou uma lambida na minha barriga.",  
"Fale bem no meu ouvido: 'Hoje você vai ser meu/minha'.",  
"Me olhe intensamente e diga o que faria se estivéssemos a sós.",  
"Me puxe pela roupa como se fosse me beijar com força.",  
"Passe os dedos lentamente pelo meu pescoço, como quem quer provocar.",  
"Simule como me colocaria de quatro, ou me puxaria para o colo.",  
"Deixe eu escolher uma parte do seu corpo para beijar agora.",  
"Me provoque com um gemido discreto, como se não conseguisse se segurar.",  
"Mande uma mensagem super explícita pra mim: 'O que eu quero fazer com você agora é...'.",  
"Encoste sua perna entre as minhas, provocando sem vergonha.",  
"Me provoque mordendo de leve sua própria mão enquanto me encara.",  
"Segure minha nuca com força e me olhe com desejo.",  
"Fale no meu ouvido como me deixaria louco(a) na cama.",  
"Me beije de surpresa, como se não conseguisse mais se controlar.",  
"Sente no meu colo e fique assim, se movimentando lentamente.",
"Tire uma peça de roupa agora.",
"Simule um orgasmo o mais realista possível.",
"Deixe alguém escolher uma parte do seu corpo para beijar ou morder.",
"Envie uma mensagem explícita para alguém agora.",
"Mostre o que está vestindo por baixo da roupa.",
"Deixe alguém vendar seus olhos e te provocar por um minuto.",
"Dance de forma extremamente sensual para quem está ao lado.",
"Simule sua posição sexual favorita com alguém.",
"Beije quem escolher da maneira mais quente que conseguir.",
"Deixe alguém te dar uma mordida no pescoço.",
"Escolha alguém para te amarrar as mãos com um cinto ou corda.",
"Envie um áudio gemendo para a última pessoa que conversou.",
"Deixe alguém lamber ou beijar qualquer parte do seu corpo.",
"Simule um striptease até ficar de roupa íntima.",
"Beije o corpo de alguém até onde achar seguro.",
"Simule estar sendo dominado(a) por quem escolher.",
"Descreva em detalhes sua última transa.",
"Faça um elogio sexual explícito a quem quiser.",
"Deixe alguém escolher onde você deve receber um beijo ousado.",
"Fique de quatro por 15 segundos.",
"Imite uma cena de sexo de filme famoso.",
"Diga para alguém: 'eu te pegaria agora mesmo'.",
"Escolha alguém para lamber ou beijar seu pescoço.",
"Passe a língua nos lábios de alguém sem beijar.",
"Escolha alguém e simule sua fantasia sexual com ela.",
"Deixe alguém passar gelo em uma parte do seu corpo.",
"Encoste o corpo no de alguém e simule uma dança provocante.",
"Sussurre sua fantasia mais picante no ouvido de alguém.",
"Deixe alguém dar uma mordida no seu ombro ou pescoço.",
"Simule receber um tapa na bunda.",
"Deixe alguém te dar uma palmada na bunda.",
"Simule que está sendo amarrado(a).",
"Faça carinho na parte íntima de alguém por cima da roupa.",
"Escolha alguém para te provocar como quiser por 30 segundos.",
"Escreva 'quero ser dominado(a)' e envie para quem escolher.",
"Diga o que faria com quem está à sua frente se estivessem a sós.",
"Escolha alguém para segurar sua cintura por 1 minuto.",
"Simule um orgasmo fingindo que está sendo tocado(a).",
"Beije a barriga de quem está ao seu lado.",
"Deixe alguém simular que está te provocando na cama.",
"Escolha alguém para acariciar seu rosto.",
"Imite um gemido bem alto agora.",
"Deixe alguém acariciar sua coxa.",
"Simule que está tendo um orgasmo múltiplo.",
"Fique só de roupa íntima até a próxima rodada.",
"Fale de forma bem suja para quem está à sua direita.",
"Escolha alguém para dançar colado(a) contigo.",
"Deixe alguém tirar uma peça da sua roupa.",
"Escreva 'quero te pegar' e envie para quem escolher.",
"Escolha alguém para simular uma cena de dominação contigo.",
"Beije a parte do corpo de quem quiser.",
"Fique no colo de alguém e sussurre algo picante.",
"Deixe alguém te dar um tapa provocante.",
"Sente no colo de quem quiser até a próxima rodada.",
"Beije o pescoço de quem escolher de forma provocante.",
"Mostre sua posição sexual favorita para todos.",
"Deixe alguém escolher o que você deve tirar: sapato, camiseta ou calça.",
"Escreva 'sou totalmente entregue' e envie para alguém.",
"Deixe alguém morder sua orelha.",
"Encoste a testa na de alguém e diga: 'te desejo muito'.",
"Beije a mão de quem está mais próximo.",
"Encoste o corpo inteiro no de quem quiser e fique assim por 20 segundos.",
"Deixe alguém te abraçar por trás e te segurar pela cintura.",
"Deixe alguém sussurrar palavras sujas no seu ouvido.",
"Beije a clavícula de quem escolher.",
"Desafie alguém a te dar um beijo mais quente.",
"Deixe alguém escolher onde beijar você agora.",
"Fique de olhos fechados enquanto alguém te provoca.",
"Escreva 'não resisto a você' e envie para alguém.",
"Escolha alguém e fique abraçado(a) até o final do jogo.",
"Deixe alguém fazer carinho na sua nuca.",
"Simule estar tendo uma transa selvagem por 10 segundos.",
"Escolha alguém para ficar entre as suas pernas por uma rodada.",
"Beije suavemente os lábios de quem quiser.",
"Deixe alguém apertar sua cintura ou coxa.",
"Simule que está seduzindo alguém com um olhar penetrante."

    ]
  }
};

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
    emojiNivel = "😏";
  } else {
    nivelSelecionado = "dificil";
    emojiNivel = "🔥";
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
  tamanho = Math.min(window.innerWidth * 0.8, 300);
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
    ctx.font = "600 17px 'Quicksand', sans-serif";
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
  }, 1000);
}

function avaliar(cumpriu) {
  document.getElementById("btn-cumpriu").disabled = true;
  document.getElementById("btn-nao-cumpriu").disabled = true;
  btnGirar.disabled = true;

  const animacao = document.getElementById("animacao-resultado");
  animacao.classList.remove("hidden", "animacao-verdade", "animacao-consequencia");
  animacao.style.color = "";

  // ✅ Caso esteja pagando a prenda
  if (aguardandoPrenda) {
    if (cumpriu) {
      mensagem.textContent = "Você cumpriu a prenda! O jogo continua.";
      animacao.textContent = "✅";
      animacao.classList.add("animacao-verdade");
      aguardandoPrenda = false;  // ✅ Liberado pra continuar
      desafiosNaoCumpridos[jogadorAtual] = 0;  // ✅ Zera os não cumpridos

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

// ✅ Esconder os botões
avaliacao.style.display = "none";
document.getElementById("btn-voltar-discreto").style.display = "none";

// ✅ Mostrar botão de reiniciar
document.getElementById("btn-reiniciar").style.display = "inline-block";

// ✅ Ocultar a animação após alguns segundos
setTimeout(() => {
    animacao.classList.add("hidden");
    animacao.textContent = "";
}, 1500);
    }
    return;  // ✅ Não continua o fluxo se for prenda
  }

  // ✅ Caso seja desafio normal
  if (cumpriu) {
    pontos[jogadorAtual]++;
    mensagem.textContent = "Você cumpriu! +1 ponto.";
    animacao.textContent = "✅";
    animacao.classList.add("animacao-verdade");
    desafiosNaoCumpridos[jogadorAtual] = 0;  // ✅ Reset ao cumprir
  } else {
    penalidades[jogadorAtual]++;
    desafiosNaoCumpridos[jogadorAtual]++;

    if (pontos[jogadorAtual] > 0) {
      pontos[jogadorAtual]--;
    }

    if (desafiosNaoCumpridos[jogadorAtual] >= 2) {
      // ✅ ATIVA a prenda só após 2 falhas
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
