# Robô Ritmado — versão 0.8 · Um palco em cada mundo

Jogo musical para crianças de 5 a 11 anos. Abra **Abrir-jogo.cmd** ou **index.html** no Chrome/Edge. Para compartilhar, extraia o ZIP completo antes de abrir. Funciona sem instalação, servidor ou internet.

## Esta atualização

A base é a versão 0.6. Os acabamentos de **menu, aviso, configurações, tutorial e pistas** foram recuperados da 0.7: paleta de Pixel, títulos arredondados, botões grandes em relevo, balões, respostas sonoras, pistas maiores e bordas por tema. O menu usa exatamente o cenário OrbitHop da 0.7 e o outfit padrão de Pixel.

A montagem do corpo em partes separadas da 0.7 foi retirada. Pixel permanece uma **ilustração completa e conectada**, com movimento 2D contínuo, pequenos passos alternados, balanço de torso e deslocamento lateral. Cada mundo tem uma sequência própria que cresce ao longo da música. Não há simulação física de ragdoll, membros soltos, troca aleatória de poses ou saltos de reação. A escala de referência do desenho foi mantida; o palco foi acrescentado atrás dos pés. São animações 2D ilustradas, sem captura de movimento ou modelo 3D.

Os arquivos dos outfits de doces e brinquedos da 0.6 foram preservados sem alterações. Os dois novos desenhos de corpo inteiro seguem os outfits originais fornecidos para gelo e Paraíso, incluindo guitarras e acessórios. O visor recebe expressões em LED; cabelo, roupas e contorno do rosto são preservados.

## Quatro mundos

| Mundo | Música | Estilo e dança | Palco |
| --- | --- | --- | --- |
| Reino dos Doces | Doce Travessia · 90 BPM | Pop de confeitaria; balanço e passos de nuvem | Cobertura, confeitos e luz rosa |
| Brinquedolândia | Desfile dos Brinquedos · 104 BPM | Caixa de música e madeira; desfile e deslizes | Blocos, estrelas e luz azul |
| Castelo Invernal | Valsa dos Cristais · 84 BPM | Valsa em **3 tempos**, piano/cordas sintetizados; pliés e passos inspirados em ballet | Cristal facetado e luz ciano |
| Paraíso | Órbita das Nuvens · 96 BPM | Harpa e sinos sintetizados; ondas e movimentos contemporâneos | Nuvens, dourado e órbitas |

As composições, harmonias, mapas de notas e arranjos são distintos. O menu tem uma quinta composição própria: **Órbita de Casa**, 78 BPM. O som começa após uma interação permitida pelo navegador.

Complete cada música e alcance a meta para abrir o portal. Os pontos viajam com Pixel; repetir um mundo começa um placar novo e não duplica pontos. Há três transições e nenhum destino inexistente após a quarta fase.

## Cenários e leitura

Os quatro fundos são edições das imagens originais: mesmos temas, marcos, portais e perspectiva. Foram removidos pequenos elementos repetidos e suavizados reflexos e detalhes, especialmente no lado de Pixel. Não há fundo liso substituindo o cenário. Uma camada atmosférica suave atrás do personagem e a base do palco reforçam a separação visual.

A pista ocupa 65% da largura útil no computador, com fundo translúcido, setas maiores, decoração e brilhos temáticos. Os efeitos não mudam a janela de acerto.

## Expressões e holofotes

Cinco expressões aparecem no próprio visor e em um retrato ampliado: **Tristinho, Concentrado, Animando, Feliz e Radiante**. A resposta considera os últimos dez julgamentos, a precisão da fase, o combo e a pontuação. Os erros deixam Pixel visivelmente triste; uma sequência de acertos recupera a expressão gradualmente. As mensagens continuam acolhedoras. A partida começa com expressão amigável, sem penalizar a falta de pontos antes da primeira nota.

Cada palco tem dois holofotes montados na base, apontados para a região do personagem e acompanhando seu deslocamento. As luzes ganham intensidade e mudam entre as cores do tema conforme pontos, precisão e combo crescem. O palco permanece fixo, e a sombra mantém contato com o chão.

## Menu e acessibilidade

- **Jogar:** prólogo em dez cenas com balões, portal, sucção, chegada, queda, recuperação da guitarra e começo da aventura. Mantém as ilustrações completas da abertura 0.6.
- **Tutorial:** seis etapas com demonstração e prática, quatro direções, notas e sequência final. Pontos do ensaio não entram na campanha.
- **Opções:** volumes da fase, efeitos e menu; velocidade das setas.
- **Acessibilidade:** protanopia, deuteranopia, tritanopia; escala de interface, legendas e setas; dança mais lenta; alto contraste; legendas descritivas; velocidade do jogo reduzida; Sensibilidade Visual.
- **Sobre Nós:** mensagem “Estamos Trabalhando Nisso por enquanto!!”.

O aviso de fotossensibilidade reaparece ao abrir/recarregar, antes das animações e do áudio, com acesso direto à Acessibilidade. Sensibilidade Visual estabiliza a dança e reduz partículas, flashes e holofotes; as expressões continuam comunicando o desempenho. Redução de Movimento diminui a dança sem alterar a velocidade da música. As preferências ficam salvas neste navegador.

## Controles

**← ↓ ↑ →** ou botões de toque para acertar as notas. **Esc** pausa. **Menu** pausa e volta ao menu; **Continuar partida** retoma. O ajuste de ritmo compensa atraso de áudio/comando. **No ritmo!** vale 100 pontos; **Muito bem!**, 60; **Quase!**, 20.

## Arquivos

`game.js` controla notas, áudio, progressão, desempenho e palco. `performance.js` desenha corpo completo, expressões, movimentos e luzes. `performance.css` contém os acréscimos de palco; `wonder.css` mantém os acabamentos recuperados da 0.7. `assets/GERACAO-08.md` registra referências, ferramentas, prompts e arquivos de arte. Os desenhos e cenários anteriores permanecem disponíveis no projeto e no histórico Git.
