# Validação da versão 0.11 — 30/10/2026

Verificações realizadas no Chromium com Playwright, usando o jogo por HTTP local e também diretamente por `file://`. Não há modo automático de pontuar no produto: o teste enviou as teclas das setas nas janelas reais de julgamento.

## Campanha completa

| Mundo | Pontos obtidos | Notas julgadas | Meta | Resultado |
| --- | ---: | ---: | ---: | --- |
| Reino dos Doces | 5.000 | 50 | 2.600 | Passou |
| Brinquedolândia | 5.700 | 57 | 3.000 | Passou |
| Castelo Invernal | 6.300 | 63 | 3.400 | Passou |
| Paraíso | 6.700 | 67 | 3.800 | Passou |
| Deserto Escaldante | 7.400 | 74 | 4.200 | Passou |
| Pântano Mágico | 8.100 | 81 | 4.600 | Passou |
| Floresta Nebulosa | 8.800 | 88 | 5.000 | Passou |
| Atlanta | 9.500 | 95 | 5.400 | Passou |

Todas as notas finais foram julgadas. O resultado apareceu entre aproximadamente 1 e 22 ms depois da duração nominal nas leituras automatizadas. A janela da última nota termina na duração da música, e as vozes são interrompidas ao finalizar. As assinaturas melódicas, instrumentos e BPM das oito fases são distintos.

Verificadas as sete transições entre mundos, a preservação dos pontos durante a viagem e o aviso temático do destino. A primeira transição foi observada nas etapas abrir, caminhar, entrar, sair e pousar. Na última fase, foi verificada a cena de continuidade e a indisponibilidade da fase 9.

Durante a revisão foram corrigidos o desenho do palco que apagava parte do cenário da viagem e uma referência indevida na decoração dos dois novos palcos. O trecho Pântano → Floresta → Atlanta foi repetido com sucesso após a correção.

## Personagem e acessibilidade

- Corpo desenhado com escala uniforme, ancoragem da sola e rotação limitada. Não há malha elástica, partes independentes ou física de ragdoll. Em cada fase, o diagnóstico confirmou corpo íntegro, deformação zero e mesma altura de contato entre sola e palco.
- As poses antigas disponíveis em Doces e Brinquedos são percorridas em ordem fixa, com mistura gradual entre quadros durante o bom desempenho. Os outros outfits recebem balanços e deslocamentos contínuos próprios. Trata-se de animação de ilustrações 2D, com limites de articulação; não é um personagem 3D com captura de dança.
- Testados os três modos de daltonismo com paletas distintas, alto contraste, legendas, escalas de interface/setas/legendas e jogo a 50% da velocidade.
- Redução de Movimento diminuiu o relógio da dança. Sensibilidade Visual estabilizou o corpo, zerou as partículas e manteve luz estática suave no palco.
- O componente de viagem foi observado por 24 amostras com Sensibilidade Visual: sem rotação, sem deslocamento horizontal, altura fixa no palco e chegada ao outfit de Atlanta.
- Os avisos de pré-fase, pausa e resultado usam diálogos modais e fundo preto translúcido. A pausa permanece ativa ao pressionar Esc; foi corrigido o conflito com o cancelamento nativo do diálogo.
- Abertura direta pela pasta: imagens prontas, personagem renderizado, partida iniciada, pausa funcional e ausência de transbordamento horizontal.

## Interface, tutorial e desempenho

Menu e aviso revisados em 1440×900, 1366×768, 1024×768 e 390×844. Nome completo, sem recorte dos últimos O, botões e ações acessíveis. Na partida móvel, o placar foi ajustado para 42 px de altura, sem sobrepor o balão de Pixel nem causar rolagem horizontal. As descrições das direções se adaptam à largura da pista.

Tutorial concluído com as teclas reais, 500 pontos, quatro estrelas e repetição de exercício ao errar. Testada a abertura reduzida em movimento e o retorno às configurações.

Medição de 150 quadros por tela, com CPU simulada quatro vezes mais lenta:

| Tela | Intervalo P95 entre quadros | Quadros acima de 34 ms |
| --- | ---: | ---: |
| Opções | 16,8 ms | 0 |
| Acessibilidade | 16,8 ms | 0 |
| Tutorial | 16,8 ms | 0 |

O personagem de fundo ficou suspenso ao ajustar as configurações. Não há desfoque de fundo em tempo real nos diálogos. Esses resultados descrevem o ambiente medido, sem garantir o mesmo desempenho em todos os dispositivos.

Falha e nova tentativa verificadas sem comandos: zero pontos, próximo portal oculto, mensagem encorajadora com Pixel e reinício na mesma fase. As versões históricas e os assets anteriores foram preservados.

As verificações de sintaxe JavaScript, referências locais e integridade do pacote acompanham a entrega. As capturas ficam em `outputs/`; scripts e logs de teste ficam em `work/`, fora do pacote de distribuição e do Git.
