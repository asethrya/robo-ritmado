# Robô Ritmado 0.15

Ajude Pixel a tocar e atravessar os dez mundos da aventura musical. Abra **Abrir-jogo.cmd** ou **index.html** no Chrome ou Edge com a pasta `assets` ao lado.

Use **← ↓ ↑ →** ou os botões de toque quando a seta chegar ao alvo. **Esc** pausa a partida. O Tutorial do menu apresenta os controles e as janelas de acerto. O aviso de boas-vindas tem acesso direto aos ajustes de acessibilidade.

## A jornada de Pixel

Ao clicar em **Jogar**, acompanhe o fim de um show em OrbitHop, os bastidores e o camarim. Uma manifestação involuntária de energia leva Pixel ao Reino dos Doces. O prólogo tem 14 cenas e preserva as animações de chegada, queda, recuperação e reencontro com a guitarra.

Depois de vencer cada mundo, Pixel compartilha reflexões diferentes antes de abrir voluntariamente o próximo caminho. Apenas o portal inicial e sua saída no Reino dos Doces têm a aparência anômala. A décima vitória revela a lembrança do Devorador de Mundos e a razão da viagem; a batalha de **OrbitHop · Endgame**, fase 11, fecha a jornada.

As falas ficam visíveis por pelo menos sete segundos, com tempo adicional conforme o tamanho do texto. Use **Continuar diálogo**, **Pausar cena** ou **Pular cena** para acompanhar no seu ritmo. As cenas respeitam os ajustes de movimento, sensibilidade visual, legendas e som. O roteiro completo está em [narrative.js](narrative.js).

## Frenesi e metas

Cinco acertos **No ritmo!** seguidos ativam o Frenesi. Cada acerto perfeito a partir do sexto vale 200 pontos. Um acerto parcial, um quase acerto ou um erro encerra o efeito e reinicia a sequência. Fora do Frenesi, os valores são 100, 60 e 20 para os três níveis de acerto.

Ao atingir a meta, termine a música para viajar. Os pontos seguem pelo portal e cada fase tem a sua própria meta. A precisão usa os acertos antes do multiplicador. Os máximos abaixo consideram uma partida inteira de acertos perfeitos.

| Fase | Mundo | Música | Meta | Máximo com Frenesi |
| --- | --- | --- | ---: | ---: |
| 01 | Reino dos Doces | Doce Travessia | 3.000 | 9.500 |
| 02 | Brinquedolândia | Desfile dos Brinquedos | 3.500 | 10.900 |
| 03 | Castelo Invernal | Valsa dos Cristais | 4.000 | 12.100 |
| 04 | Paraíso | Órbita das Nuvens | 4.500 | 12.900 |
| 05 | Deserto Escaldante | Sol em Movimento | 5.000 | 14.300 |
| 06 | Pântano Mágico | Balanço das Raízes | 5.500 | 15.700 |
| 07 | Floresta Nebulosa | Vaga-lumes em Órbita | 6.000 | 17.100 |
| 08 | Atlanta | Maré de Cristais | 6.500 | 18.500 |
| 09 | Masmorra Ardente | Pulso de Magma | 7.000 | 20.900 |
| 10 | Colina Escarlate | Voo das Pétalas | 7.500 | 22.900 |

A vitória na Colina Escarlate libera a fase 11. Defenda OrbitHop com as quatro setas e segure as notas com cauda. Complete os quatro anéis da Sinfonia dos Mundos para assistir ao desfecho. Os golpes e parâmetros estão no [relatório do Endgame](RELATORIO-ENDGAME.md). Use **Revisitar mundos liberados** no aviso de pré-fase para tocar de novo em um mundo que já abriu.

## Visual e acessibilidade

Os símbolos de cada mundo aparecem na capa da música, no aviso de pré-fase e na animação de Frenesi. Pixel alterna poses no compasso e reage às sequências com movimentos e holofotes mais intensos. Os figurinos usam ilustrações 2D completas com pontos de apoio por pose. Sensibilidade Visual mantém a indicação do Frenesi em texto com efeitos de palco reduzidos.

Menu e Opções permitem rever o aviso e ajustar cores, escalas, legendas, movimento, velocidade e som. Em Preferências, escolha Modo Escuro e o perfil PC, Celular ou Tablet. Se o navegador bloquear o som automático, a música começa com o primeiro toque ou tecla. O placar continua disponível nos navegadores que permitem armazenamento local. Os relatórios das versões anteriores ficam no repositório para referência.
