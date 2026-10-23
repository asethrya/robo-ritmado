# Robô Ritmado — versão 0.6 · Vamos brincar com Pixel!

Abra `index.html` no Chrome ou Edge. No Windows, `Abrir-jogo.cmd` também abre o jogo no navegador padrão. Não é necessário instalar pacotes nem ter internet. Ao compartilhar, extraia o ZIP e mantenha a pasta completa.

## Novidades da versão 0.6

Interface revisada para crianças de **5 a 11 anos**: botões maiores com cores de brinquedo, acabamentos arredondados, instruções mais curtas, balões de conversa, estrelas no tutorial e pequenas comemorações. O botão **Oi, Pixel!** faz o personagem responder ao jogador. As abas de configuração e os painéis das fases também ganharam o novo acabamento.

O prólogo tem **dez cenas animadas**: apresentação em OrbitHop, acorde, portal instável, sucção de Pixel, túnel interdimensional, portal nos Doces, queda e aterrissagem, levantar e limpar a roupa, pegar a guitarra e descoberta do caminho de casa. Os balões exibem falas de Pixel e respostas musicais da guitarra; uma faixa separada descreve as ações.

A fase 1 usa uma nova folha de dança em células isoladas. O carregamento aguarda a decodificação da imagem e a preparação da área de desenho, valida os recortes e reinicia a pose antes de mostrar Pixel. A saída da cutscene começa com a pose completa, sem reutilizar um quadro antigo da dança.

O restante do planejamento continua pausado. Esta versão refina as interfaces existentes e a abertura, sem acrescentar outra fase.

## Menu e introdução

A primeira tela é o **Aviso de Fotossensibilidade e Epilepsia**, sem animação nem som. Ela oferece acesso direto à aba Acessibilidade e um botão para fechar o aviso. O aviso reaparece ao abrir/recarregar o jogo; suas preferências permanecem salvas.

O menu se passa em **OrbitHop**, planeta natal de Pixel, com o outfit padrão, guitarra estrela, notas e guitarras virtuais, trilhas orbitais e movimento lento do personagem. A música original do menu, **Órbita de Casa**, usa sintetizadores em 78 BPM e composição diferente das duas fases. O áudio começa após uma interação, conforme permitido pelo navegador.

- **Jogar:** prólogo animado em dez cenas. Pixel usa a guitarra para abrir um portal, é sugado, chega ao Reino dos Doces, cai, se levanta e recupera a guitarra. A aventura começa com contagem inicial. A cena pode ser pausada, avançada ou pulada; as falas estão sempre visíveis.
- **Tutorial:** seis etapas com Pixel, demonstração e prática. O jogador experimenta as quatro direções, observa uma nota, acerta uma nota e toca uma pequena sequência. As tentativas se repetem até aprender; os pontos do ensaio não entram na campanha. Ao concluir, o botão Jogar a aventura inicia a história.
- **Opções:** quatro barras para música das fases, efeitos sonoros, música do menu e velocidade visual das setas.
- **Acessibilidade:** ajustes descritos abaixo, disponíveis também pelo botão ◎ durante a partida.
- **Sobre Nós:** exibe “Estamos Trabalhando Nisso por enquanto!!”.

Os botões principais têm respostas visuais e sons próprios ao receber foco/hover e ao clicar. Use **Tab**, **Shift+Tab** e **Enter** para navegar. Nos diálogos, **Esc** fecha as configurações. Na cutscene, Esc pausa/continua.

Durante a música, **Menu** pausa a partida e volta ao menu principal. **Continuar partida** retoma do mesmo ponto. Jogar outra aventura ou abrir o tutorial inicia uma nova sessão.

## Opções de áudio e velocidade

| Controle | Função |
| --- | --- |
| Volume da Música | Música das fases, de 0 a 100%. |
| Sons do Jogo | Botões, acertos, tutorial e portais, de 0 a 100%. |
| Volume Principal | Música do menu, de 0 a 100%, conforme o nome solicitado para esse controle. |
| Velocidade das Setas | Aproximação visual de 55 a 160%; não altera o tempo da música. Valores menores dão mais antecedência visual. |

Mudanças nas duas velocidades entram no início/reinício da próxima música, preservando a sincronização de uma tentativa já iniciada. Os volumes e os ajustes visuais se aplicam imediatamente.

## Acessibilidade

| Opção | Comportamento |
| --- | --- |
| Modo para Daltonismo | Três ajustes de cor: Protanopia, Deuteranopia e Tritanopia. Filtros no cenário/personagem/efeitos e paletas próprias para setas. Direções e rótulos ajudam a identificar as ações sem depender apenas das cores. |
| Escalonamento da Interface | Textos/ícones de 100 a 140%, legendas de 100 a 180% e setas fixas/móveis de 100 a 140%, limitadas ao espaço de cada pista. |
| Redução de Movimento Visual | Diminui animações decorativas e permite dança de 15 a 60% da velocidade. Respeita também a preferência de movimento reduzido do sistema. |
| Alto Contraste | Painéis pretos, letras claras, contornos fortes, setas sólidas e maior separação visual de cenário/personagem. |
| Legendas Descritivas | Próxima direção e aproximação, indicação de “AGORA”, acerto, acerto parcial, quase acerto, erro e pontuação. Próxima ação e último resultado aparecem em linhas separadas. Falas da história e tutorial são sempre exibidas. |
| Ajuste de Velocidade do Jogo | De 50 a 100%. Desacelera música e notas juntas e amplia proporcionalmente as janelas de acerto. A 50%, a primeira música dura aproximadamente 85 segundos. |
| Sensibilidade Visual | Remove partículas, rastros e flashes decorativos, reduz brilho/saturação e deixa Pixel estável. Aplica-se também à abertura e ao tutorial. |

As preferências são salvas automaticamente neste navegador. Sensibilidade Visual tem prioridade sobre os efeitos decorativos e o brilho de Alto Contraste. Os ajustes são recursos de personalização, não garantia de prevenção de crises nem substituto de avaliação individual. A acessibilidade ainda precisa de avaliação com os próprios jogadores.

## Como jogar e viajar

1. No menu, clique em **Jogar**. Após o prólogo, ouça a contagem e aperte **← ↓ ↑ →** quando a nota encontrar o alvo da mesma direção. Nas repetições e na segunda fase, use **Vamos tocar**.
2. Faça pelo menos **2.600 pontos no Reino dos Doces** e conclua a música.
3. No resultado, clique em **Entrar em Brinquedolândia**. O portal abre; os pontos vão com você.
4. Em Brinquedolândia, clique em **Vamos tocar** para começar a segunda música. A meta da segunda fase é **3.000 pontos**.
5. **Esc** pausa e continua. O botão de pausa também funciona. Trocar de aba pausa a partida.

A música nunca é interrompida ao atingir a meta. Você conclui o show antes de viajar. Se não atingir a meta, pode tentar novamente, sem perder vidas. O portal fica disponível apenas quando a tentativa atual atinge a meta.

Depois de ganhar o desbloqueio, Brinquedolândia pode ser escolhida pelos botões dos mundos no topo. Isso inicia um treino com placar novo. Durante uma música, a troca de mundo fica bloqueada.

## As duas fases

| Fase | Música e tema | Ritmo | Notas | Meta |
| --- | --- | --- | --- | --- |
| Reino dos Doces | **Doce Travessia**: sinos, melodia suave, baixo redondo e acordes sustentados | 90 BPM; aproximadamente 43 segundos | 46 | 2.600 |
| Brinquedolândia | **Desfile dos Brinquedos**: caixa de música com sobretons de sino, blocos de madeira, percussão de brinquedo e acordes curtos | 104 BPM; aproximadamente 37 segundos | 53 | 3.000 |

Cada fase tem composição e mapa de notas próprios; a segunda música não é apenas uma mudança de velocidade da primeira. As trilhas são sintetizadas no navegador, sem áudio externo. A contagem inicial acrescenta cerca de três segundos.

Os visuais seguem as referências fornecidas pela equipe: traje rosa de doces com guitarra espiral na primeira fase; blocos vermelhos, azuis e amarelos, estrelas, ursinho e guitarra de brinquedo na segunda. Pixel aparece de corpo inteiro com transparência e oito poses por traje.

## Pontos e repetição

- **No ritmo!**: até 75 ms antes/depois do alvo, +100.
- **Muito bem!**: até 150 ms, +60.
- **Quase!**: até 240 ms, +20.
- Direção incorreta durante a janela ou nota perdida: 0.

O HUD mostra o **TOTAL** da viagem; a barra do portal mede apenas os pontos da fase atual. Assim, os pontos trazidos do Reino dos Doces não completam a meta de Brinquedolândia automaticamente. No resultado, o número grande é a pontuação da fase e o detalhe mostra o total acumulado.

Repetir a segunda fase zera somente a pontuação dessa tentativa, preservando os pontos trazidos da primeira. A tentativa anterior da segunda fase é substituída, evitando duplicação. Começar outro mundo pelo menu inicia um treino com placar novo.

Desbloqueio e recorde são guardados no navegador quando o armazenamento local está disponível. A viagem em andamento permanece na memória enquanto a página fica aberta; recarregar começa uma nova tentativa. O jogo funciona também se o navegador bloquear o armazenamento.

## Efeitos e dança

Pista de doces com detalhes listrados, luzes e gradientes; pista de brinquedos com blocos de cor e estrelas. As setas têm brilho, rastros, pequenos símbolos orbitando e animação leve na aproximação. Os alvos permanecem fixos.

Acertos criam explosões de estrelas, anéis de luz e partículas junto aos alvos e à guitarra. A dança fica mais intensa com combo e pontos. O cenário continua sendo o fundo da tela inteira. A opção **Efeitos suaves** reduz partículas, movimento e brilho; a preferência de movimento reduzido do sistema também é respeitada.

## Ajustar e testar

Comece com **Ajuste de ritmo: 0 ms**. Se seus comandos parecerem sempre atrasados em relação ao som, aumente em passos de 10–20 ms; se parecerem adiantados, diminua. O ajuste pode ser feito antes da tentativa e no resultado. Volume e tela cheia ficam disponíveis no jogo.

Confira especialmente:

- Se as músicas soam diferentes e combinam com doces/brinquedos.
- Se o portal libera após a meta e os pontos permanecem no total ao viajar.
- Se o traje realmente muda junto com o cenário.
- Se as setas e os alvos continuam legíveis com os efeitos mais intensos.
- Se a segunda fase tem uma progressão de dificuldade confortável.

O foco é o computador com teclado. Telas menores também têm botões de toque, com Pixel separado da pista.

## Arquivos

- `index.html`: tela e navegação.
- `front.js` e `front.css`: menu, prólogo, tutorial e configurações.
- `playful.css`: acabamento infantil, botões, balões e painéis da versão 0.6.
- `cinematic.js`: animação da viagem, portal, queda, recuperação e guitarra separada.
- `sprite-assets.js`: carregamento com decodificação, validação e recortes de poses.
- `settings.js`: preferências e persistência local.
- `interface-audio.js`: música do menu e efeitos sonoros.
- `levels.js`: cadastro dos mundos, músicas, mapas e trajes.
- `game.js`: áudio, sincronização, julgamento, viagem, dança e efeitos.
- `stage.css` e `worlds.css`: composição e ornamentação temática.
- `assets/`: cenários e sprites; os documentos `GERACAO-*.md` registram referências e prompts.

A animação usa oito poses por traje e balanço entre quadros. Ainda não há um esqueleto com articulações independentes. Esta entrega contém dois mundos, sem oferecer uma terceira fase inexistente.

O prólogo é uma animação 2D em tempo real com cenário, sprites, efeitos, câmera e legendas, sem vídeo externo. As falas são escritas; não há dublagem. Esta atualização implementa o pedido de menu e abertura, mantendo o restante do planejamento pausado.
