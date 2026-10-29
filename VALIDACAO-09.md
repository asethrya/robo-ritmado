# Validação da versão 0.9 — Robô Ritmado

29/10/2026. Entrega das seis alterações solicitadas sobre a versão 0.8.

## Aparência e interação

- As imagens originais de Pixel, dos outfits das quatro fases e de OrbitHop continuam idênticas às da 0.8. Foram removidas as sobreposições que substituíam o visor e os olhos.
- Comparação dos pixels das regiões dos olhos, nas quatro fases, entre rosto original, triste e feliz: nenhuma diferença. As novas intervenções ficam na boca e nas bochechas. O rosto não é reduzido.
- Tristeza produz boca voltada para baixo e lágrimas; a recuperação até Radiante produz sorriso mais claro. Os olhos mantêm os desenhos originais em todos os estados.
- Dois holofotes superiores e dois inferiores por palco. Feixes acompanham Pixel; cores, brilhos e intensidade respondem ao desempenho. O menu recebeu um palco próprio, com colunas, arco, cristais e degraus, mantendo Pixel centralizado no piso.
- Balões durante a dança alternam falas de acolhimento, incentivo, recuperação e celebração. Foram observados erros seguidos, tristeza, recuperação com vinte acertos, alegria e falas variadas. Os textos não culpam nem desestimulam a criança.
- Menu reorganizado em cinco grandes painéis inclinados, seguindo a estrutura da referência fornecida, com a paleta do jogo. Os nomes, sons de interação e funções dos botões foram preservados. Continuar partida aparece quando necessário.

## Campanha e carregamento

Campanha completa jogada por comandos de teclado nas notas reais, sem alterar placar ou adicionar autoplay ao produto:

| Fase | Pontos | Meta | Total acumulado |
| --- | ---: | ---: | ---: |
| Reino dos Doces | 4.600 | 2.600 | 4.600 |
| Brinquedolândia | 5.300 | 3.000 | 9.900 |
| Castelo Invernal | 5.900 | 3.300 | 15.800 |
| Paraíso | 4.900 | 2.700 | 20.700 |

As quatro músicas tocaram com sinal de áudio, os três portais preservaram os pontos e a campanha terminou sem oferecer uma quinta fase. Nas quatro fases, Pixel permaneceu conectado e completo, com o renderizador WebGL ativo e uma passagem de desenho do corpo.

Dez chegadas consecutivas ao Reino dos Doces, incluindo atraso de 800 ms no carregamento da imagem: ilustração decodificada, quadro inicial correto, canvas visível e corpo completo em todas elas.

Tutorial concluído por teclado: quatro direções, exercício repetido após erro e sequência final; 500 pontos de treino. Botões acessíveis em 1366 × 768 e versão móvel em 390 × 844.

## Desempenho

Medição em Chromium, tela de 1440 × 900, amostras de 120 quadros. A contagem abaixo corresponde às chamadas Canvas 2D; a nova versão também realiza uma passagem WebGL para a malha conectada do personagem.

| Durante a partida | 0.8 | 0.9 |
| --- | ---: | ---: |
| Chamadas `drawImage` em 120 quadros | 23.160 | 240 |
| Leituras de layout na animação | 120 | 0 |

Redução de aproximadamente 99% nas chamadas de desenho 2D. Foram eliminados os 192 recortes triangulares Canvas por corpo/quadro, reaproveitadas as bases dos palcos e limitadas as resoluções das camadas de efeitos. O menu redesenha os efeitos a 30 Hz e preserva a animação do personagem no ciclo da tela; telas ocultas e pausadas evitam trabalho desnecessário. O fundo desfocado da pista usa uma imagem estática, evitando recalcular o cenário inteiro atrás do painel a cada quadro.

Com lentidão de CPU simulada em 4× e imagens já carregadas, o percentil 95 do intervalo entre quadros ficou em 16,8 ms no menu e 16,7 ms na partida, próximo de 60 quadros/s neste ambiente. O trabalho JavaScript medido por quadro foi de 0,73 ms e 3,47 ms, respectivamente. Esses resultados são medições locais, não uma garantia para todos os aparelhos.

WebGL desativado de propósito: a alternativa Canvas manteve a imagem completa e animada, em uma chamada de desenho do corpo, sem erro de JavaScript. Abertura direta por `file://` também passou: neste navegador, a restrição de textura local acionou essa alternativa automaticamente. Não é necessário instalar ou iniciar um servidor para jogar.

## Acessibilidade e integridade

- Três paletas de daltonismo distintas, alto contraste, interface em 140%, legendas em 180%, setas em 140%, jogo em 50% e dança em 25% conferidos.
- Sensibilidade Visual retira feixes e partículas animadas e mantém iluminação discreta e estática. A abertura também respeita esse ajuste.
- Menu e interface ampliada sem rolagem horizontal em 390 × 844; menu também conferido em 1024 × 768, 1366 × 768 e 1440 × 900. O menu ampliado pode rolar verticalmente para manter textos e controles legíveis.
- Sintaxe dos scripts, imagens referenciadas e `git diff --check` conferidos.
- ZIP conferido com verificação de integridade e comparação de cada arquivo com a pasta do projeto.

## Abrir e conferir

Extraia `Robo-Ritmado-0.9.zip` e abra `Abrir-jogo.cmd` ou `index.html` no Chrome/Edge. A animação continua sendo uma ilustração 2D com movimentos limitados e corpo conectado. A arte nova e seu prompt estão documentados em `assets/GERACAO-09.md`.
