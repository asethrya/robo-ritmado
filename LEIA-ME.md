# Robô Ritmado — versão 0.9 · O show é seu!

Jogo musical infantil com Pixel. Extraia a pasta completa e abra **Abrir-jogo.cmd** ou **index.html** no Chrome/Edge. Não é preciso instalar bibliotecas, usar servidor ou permanecer conectado à internet.

## As seis etapas desta entrega

1. **Rosto original.** Os olhos, visor, cabelo e proporções voltaram às ilustrações originais. As expressões modificam apenas uma pequena região da boca e acrescentam lágrimas nas bochechas: boca voltada para baixo quando triste, sorriso mais evidente quando feliz. Os olhos não são redesenhados em nenhum estado. As lágrimas têm pequenos pingos em movimento, abaixo dos olhos.
2. **Iluminação de show.** Cada fase tem dois holofotes inferiores e dois superiores, com feixes coloridos dirigidos a Pixel, manchas de luz no piso, brilhos e intensidade que responde aos acertos. Sensibilidade Visual mantém as luzes suaves e sem feixes animados.
3. **Pixel conversa.** Balões com cauda apontada ao personagem aparecem enquanto ele dança. Há falas variadas de acolhimento, recuperação e celebração. Erros recebem incentivo; acertos e combos recebem elogios. As falas permanecem tempo suficiente para leitura, sem ocupar as pistas.
4. **Palco de OrbitHop.** Um palco exclusivo do menu, mais elaborado que os das fases, com colunas, arco, cristais, degraus, notas, estrelas e iluminação. Pixel fica no centro do piso, mantendo o outfit padrão.
5. **Menu em painéis.** Estrutura de grandes cartões inclinados inspirada na referência fornecida, adaptada à paleta rosa, violeta, ciano e branco. Mantidos Jogar, Tutorial, Opções, Acessibilidade e Sobre Nós, além de Continuar partida quando há uma sessão pausada. Os botões preservam sons de hover/click e têm movimentos e brilhos próprios. OrbitHop continua ao fundo; Pixel permanece à direita.
6. **Renderização otimizada.** O corpo inteiro é desenhado em uma passagem WebGL, substituindo 192 recortes Canvas por quadro. Se WebGL não estiver disponível, uma alternativa Canvas leve mantém Pixel inteiro. Bases dos palcos e texturas são reaproveitadas; os limites de resolução dos efeitos foram ajustados; leituras contínuas de layout foram removidas; telas ocultas e pausadas deixam de redesenhar o que não mudou. O fundo suave da pista é uma camada de imagem estática, sem recalcular blur do cenário inteiro a cada quadro.

## A aventura continua com quatro mundos

| Fase | Música | Tema |
| --- | --- | --- |
| Reino dos Doces | Doce Travessia · 90 BPM | Pop suave, confeitos e cristais |
| Brinquedolândia | Desfile dos Brinquedos · 104 BPM | Caixa de música, blocos e estrelas |
| Castelo Invernal | Valsa dos Cristais · 84 BPM | Valsa em três tempos e gelo |
| Paraíso | Órbita das Nuvens · 96 BPM | Harpa, sinos e nuvens |

As músicas, mapas de notas, coreografias e outfits de cada mundo foram mantidos. O menu toca **Órbita de Casa**, 78 BPM. Complete a música e alcance a meta para abrir cada portal; os pontos são preservados na viagem.

## Como jogar

Use **← ↓ ↑ →** ou os botões de toque quando a nota alcançar o alvo correspondente. **Esc** pausa. **Menu** pausa a partida e volta ao início; **Continuar partida** retoma do mesmo ponto. “No ritmo!” vale 100 pontos; “Muito bem!”, 60; “Quase!”, 20. Há ajuste de atraso entre áudio e comando.

**Jogar** mantém a abertura em dez cenas, com o portal, chegada ao Reino dos Doces e recuperação da guitarra. **Tutorial** ensina as quatro direções e uma sequência de notas, com pontos de treino separados. **Sobre Nós** mantém a mensagem temporária de trabalho em andamento.

## Acessibilidade

O aviso de fotossensibilidade aparece antes das animações e da música, com acesso direto a Acessibilidade. Permanecem os três ajustes de daltonismo, alto contraste, tamanhos de interface/legendas/setas, dança mais lenta, velocidade reduzida de jogo, legendas descritivas e Sensibilidade Visual. As preferências ficam salvas no navegador. Os sons só começam após uma interação permitida pelo navegador.

## Arquivos e validação

- `gpu-dancer.js`: desenho acelerado do personagem, com saída alternativa segura.
- `performance.js`: movimentos, alterações localizadas da boca, lágrimas e palcos/luzes.
- `encore.css`: novos painéis do menu, palco e balões.
- `game.js`: música, notas, pontuação, progressão e falas por desempenho.
- `assets/palco-orbithop-v09.png`: palco transparente do menu.
- `assets/GERACAO-09.md`: referências e prompt da arte gerada.
- `VALIDACAO-09.md`: verificações e medições desta versão.

Os arquivos de imagem dos personagens e dos cenários anteriores foram preservados. A animação continua sendo 2D, com corpo conectado e movimentos limitados para manter a aparência de Pixel.
