# Entrega 0.8 — Robô Ritmado

Versão de 28/10/2026 construída sobre a 0.6, recuperando a direção visual da 0.7 e substituindo sua montagem de personagem por uma superfície 2D de corpo inteiro.

## Entregue

- Menu, aviso, tutorial, configurações e pistas com os acabamentos da 0.7. OrbitHop e wonder.css foram recuperados exatamente daquela versão.
- Pixel completo e estável; animações contínuas, limitadas e próprias por mundo, sem partes separadas ou física de ragdoll. A escala de referência foi mantida.
- Outfits de doces, brinquedos e padrão da 0.6 preservados byte a byte. Gelo e Paraíso seguem os outfits originais fornecidos, com detalhes e guitarras temáticas.
- Quatro backgrounds editados a partir dos originais, mantendo seus cenários e reduzindo detalhes e reflexos atrás de Pixel.
- Palcos de doces, blocos, cristais e nuvens. Dois holofotes por palco acompanham o deslocamento e ganham brilho e cores conforme pontos, precisão e combo.
- Cinco expressões no visor e no retrato ampliado. Corações, estrelas, cristais de neve e brilhos celestiais distinguem as expressões radiantes de cada mundo.
- Castelo Invernal e Paraíso adicionados, com trilhas, passos, mapas de notas, metas e progressão por portais.

## Conferências no navegador

| Fase | Pontos no teste | Máximo | Total acumulado |
| --- | ---: | ---: | ---: |
| Reino dos Doces | 4.260 | 4.600 | 4.260 |
| Brinquedolândia | 5.300 | 5.300 | 9.560 |
| Castelo Invernal | 5.900 | 5.900 | 15.460 |
| Paraíso | 4.900 | 4.900 | 20.360 |

O teste usou comandos de teclado nas notas reais. Os erros iniciais no Reino dos Doces foram intencionais para observar tristeza e recuperação até Radiante. A intensidade dos holofotes aumentou com os acertos. As quatro músicas são diferentes, os três portais preservaram os pontos e não foi oferecida uma quinta fase inexistente. Não foram adicionados controles de autoplay ou alteração de placar ao jogo.

Também foram conferidos:

- Tutorial completo com repetição após erro, quatro direções e sequência final: 500 pontos de ensaio.
- Dez chegadas seguidas à fase 1, incluindo carregamento de imagem atrasado: corpo completo, quadro inicial correto e imagem decodificada antes de aparecer.
- Abertura automática em dez cenas e chegada à fase, executadas diretamente por file://, sem servidor. Nenhum erro de JavaScript.
- Três paletas de daltonismo distintas; alto contraste; interface em 140%, legendas em 180% e setas em 140%; jogo em 50%; dança em 25%.
- Sensibilidade Visual estabilizando Pixel, retirando partículas e mantendo iluminação suave e estática.
- Tela móvel em 390 × 844 sem rolagem horizontal nem personagem sobre a área útil das setas; ações do tutorial acessíveis em 1366 × 768.
- Sintaxe de todos os scripts e presença de todas as imagens referenciadas.

## Como abrir

Extraia Robo-Ritmado-0.8.zip e abra Abrir-jogo.cmd ou index.html. A animação é uma ilustração 2D em tempo real, sem modelo 3D ou captura de movimento. Os movimentos são deliberadamente limitados para preservar a anatomia e os outfits. A documentação de arte e os prompts estão em assets/GERACAO-08.md.
