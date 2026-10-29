# Validação da versão 0.10 — Robô Ritmado

29/10/2026. Implementação das etapas 7 a 11 solicitadas.

## Campanha e pontuação

Seis fases percorridas pelos mapas reais, usando comandos de teclado e as viagens normais do jogo. Sem autoplay ou alteração de placar no produto.

| Fase | Mundo | Meta | Pontos no teste | Máximo | Total acumulado |
| --- | --- | ---: | ---: | ---: | ---: |
| 01 | doces | 2.600 | 2.600 | 4.600 | 2.600 |
| 02 | brinquedos | 3.000 | 5.260 | 5.300 | 7.860 |
| 03 | gelo | 3.400 | 5.900 | 5.900 | 13.760 |
| 04 | ceu | 3.800 | 6.300 | 6.300 | 20.060 |
| 05 | deserto | 4.200 | 7.000 | 7.000 | 27.060 |
| 06 | pantano | 4.600 | 7.700 | 7.700 | 34.760 |

Na primeira fase, foram tocadas somente as notas necessárias para terminar exatamente com 2.600: a igualdade liberou a próxima fase. Antes disso, outra tentativa com 2.580 terminou sem liberar o portal; Pixel mostrou o incentivo, e Tentar de novo com Pixel reiniciou a mesma fase com pontuação, combo e estatísticas zerados. Em Brinquedolândia houve um acerto parcial durante a captura; o resultado real de 5.260 foi mantido no relatório.

Os cinco portais preservaram os pontos, cada fase cobrou sua própria meta maior e o jogo terminou o conteúdo disponível na fase 6. As fases 7–10 continuam desativadas e identificadas como Em breve. Suas metas estão definidas em campaign.js; os mapas musicais ainda serão implementados. PONTUACOES-010.md detalha a cobrança das dez fases.

Os máximos da tabela foram recalculados a partir dos mapas de notas. O Paraíso ganhou um mapa de 63 notas para sustentar sua nova meta. Sol em Movimento e Balanço das Raízes usam melodias, baixos, instrumentos e batidas diferentes. Foi medido sinal de áudio nas duas fases novas, assim como nas amostras das fases 1, 3 e 4; a trilha de brinquedos foi preservada. A barra de energia usa arredondamento para baixo e só chega a 100% quando a meta foi atingida.

## Apoio no palco e movimento

O canvas do palco agora compartilha a origem do canvas de Pixel. Foram corrigidos o piso e a referência das solas para evitar a sensação de corpo suspenso acima do tablado, sem mudar a escala de desenho das quatro fases anteriores.

As seis fases mantiveram o corpo conectado e o ponto de apoio alinhado ao piso, com duas luzes de cima e duas de baixo. Acertos levaram à expressão Radiante durante a dança. As posições são funções contínuas da batida e suas amplitudes acompanham a qualidade dos acertos; não há troca aleatória de quadros nem física de membros soltos. As seis coreografias possuem balanços e ritmos distintos.

Abertura direta pela pasta, por file://: passou com a nova malha Canvas de 16 faixas conectadas (32 triângulos), incluindo variação dos passos e inclinação. A alternativa anterior apenas inclinava a imagem. A malha WebGL continua usando uma passagem do corpo quando permitida. Essa é uma animação 2D de ilustrações, com movimentos limitados para preservar o desenho.

Comparação dos pixels dos olhos nas texturas original, triste e feliz: nenhuma mudança nas seis fases. Os outfits e cenários das quatro fases anteriores continuam nos arquivos originais da 0.9.

## Fluidez de Opções, Acessibilidade e Tutorial

Mudanças aplicadas:

- Retirada do desfoque em tempo real do diálogo e do fundo atrás dele; os painéis mantêm cores e acabamentos com superfícies sólidas.
- Animações da cena suspensas durante as configurações; sem redesenho do personagem enquanto o diálogo está aberto.
- Gravação das preferências agrupada após o movimento do controle e atualização apenas do indicador correspondente durante o arraste de um slider.
- Fundo da pista do tutorial armazenado e reutilizado; imagem padrão de Pixel preparada uma vez. A movimentação das notas e a avaliação dos comandos continuam no ciclo da tela.
- Cenário decorativo do tutorial estabilizado, menos trabalho nos efeitos e carregamento dos próximos mundos somente quando necessário.

Medição em Chromium, 1440 × 900, com CPU artificialmente limitada em 4×; 150 quadros por tela, incluindo ajustes e rolagem:

| Interface | Intervalo entre quadros, percentil 95 | Quadros acima de 34 ms na amostra |
| --- | ---: | ---: |
| Opções | 16,7 ms | 0 |
| Acessibilidade | 16,8 ms | 0 |
| Tutorial | 16,8 ms | 0 |

O relógio do personagem permaneceu parado durante as configurações e não houve erro de JavaScript. Esses intervalos correspondem a aproximadamente 60 quadros por segundo no ambiente medido. A versão 0.9 também atingiu intervalos semelhantes neste computador; a otimização remove custos identificados, mas o teste local não reproduz todos os possíveis travamentos em outros aparelhos.

Na partida aberta diretamente por file://, uma amostra de 120 quadros com a nova malha Canvas apresentou percentil 95 de 16,8 ms e nenhum quadro acima de 34 ms, sem limitação artificial de CPU. O desempenho continua dependente do aparelho e do navegador.

## Tutorial, escalas e conforto

- Tutorial concluído por teclado, com quatro direções, repetição após erro e sequência final: 500 pontos de treino.
- Três paletas de daltonismo distintas; alto contraste; interface em 140%, legendas em 180% e setas em 140%; jogo em 50% e dança em 25%.
- Sensibilidade Visual estabilizou o personagem, retirou partículas e manteve iluminação discreta. A abertura respeitou o ajuste de movimento.
- Menu conferido em 1440 × 900, 1366 × 768, 1024 × 768 e 390 × 844, sem rolagem horizontal. Os botões não se sobrepõem à barra de música. Escalonamento em 140% também conferido em desktop e celular; a tela pode rolar verticalmente para preservar a leitura.
- Em 390 × 844, personagem e pista permaneceram separados. A navegação dos dez mundos tem rolagem horizontal própria e os quatro mundos futuros não são clicáveis.

## Arte e integridade

Os dois backgrounds novos foram editados a partir dos cenários fornecidos, com menos detalhes atrás de Pixel. Os dois outfits seguem as referências oficiais de deserto e pântano. Os palcos são temáticos e as pistas têm bordas, cores e ornamentos próprios. O novo título do menu é texto HTML/CSS com contorno, textura, inclinação e brilhos, sem fonte ou serviço externo. Referências e prompts exatos: assets/GERACAO-10.md.

Sintaxe dos scripts, referências locais e git diff --check conferidos. O pacote final é verificado por integridade ZIP e comparação dos arquivos com a pasta do projeto.
