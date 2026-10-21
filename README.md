# Robô Ritmado — protótipo 0.4

Abra `index.html` no Chrome ou Edge. No Windows, `Abrir-jogo.cmd` também abre o jogo no navegador padrão. Não é necessário instalar pacotes nem ter internet. Ao compartilhar, extraia o ZIP e mantenha a pasta completa.

## Como jogar e viajar

1. Clique em **Vamos tocar**. Ouça a contagem e aperte **← ↓ ↑ →** quando a nota encontrar o alvo da mesma direção.
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
- `levels.js`: cadastro dos mundos, músicas, mapas e trajes.
- `game.js`: áudio, sincronização, julgamento, viagem, dança e efeitos.
- `stage.css` e `worlds.css`: composição e ornamentação temática.
- `assets/`: cenários e sprites; os documentos `GERACAO-*.md` registram referências e prompts.

A animação usa oito poses por traje e balanço entre quadros. Ainda não há um esqueleto com articulações independentes. Esta entrega contém dois mundos, sem oferecer uma terceira fase inexistente.
