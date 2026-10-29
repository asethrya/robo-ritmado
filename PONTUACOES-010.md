# Robô Ritmado — relatório de pontuação das dez fases

Versão 0.10 · 29/10/2026

As metas crescem **400 pontos por fase**, de 2.600 a 6.200. A cobrança usa somente a pontuação obtida na fase atual. O placar TOTAL soma os mundos visitados, mas os pontos trazidos de outra fase não substituem a meta da próxima.

| Fase | Mundo | Êxito: mínimo necessário | Sem êxito: pontuação abaixo da meta | Máximo disponível | Situação |
| --- | --- | ---: | ---: | ---: | --- |
| 01 | Reino dos Doces | **2.600** | 0 a 2.599 | 4.600 | Jogável |
| 02 | Brinquedolândia | **3.000** | 0 a 2.999 | 5.300 | Jogável |
| 03 | Castelo Invernal | **3.400** | 0 a 3.399 | 5.900 | Jogável |
| 04 | Paraíso | **3.800** | 0 a 3.799 | 6.300 | Jogável |
| 05 | Deserto Escaldante | **4.200** | 0 a 4.199 | 7.000 | Nova fase jogável |
| 06 | Pântano Mágico | **4.600** | 0 a 4.599 | 7.700 | Nova fase jogável |
| 07 | Floresta Nebulosa | **5.000** | 0 a 4.999 | A definir com seu mapa musical | Planejada |
| 08 | Atlanta | **5.400** | 0 a 5.399 | A definir com seu mapa musical | Planejada |
| 09 | Masmorra Ardente | **5.800** | 0 a 5.799 | A definir com seu mapa musical | Planejada |
| 10 | Colina Escarlate | **6.200** | 0 a 6.199 | A definir com seu mapa musical | Planejada |

São seis fases implementadas nesta entrega. As metas das outras quatro já estão definidas na mesma configuração da campanha, e seus botões indicam **Em breve**. Seus cenários, músicas e mapas de notas ainda serão implementados. Concluir a fase 6 encerra o conteúdo disponível; não abre uma fase incompleta.

## Como ganhar pontos

- **No ritmo!**: 100 pontos por nota.
- **Muito bem!**: 60 pontos por nota.
- **Quase!**: 20 pontos por nota.
- Erro ou nota não tocada: 0 pontos; não são descontados pontos já conquistados.

Os valores possíveis são múltiplos de 20. Por isso, por exemplo, o último resultado possível abaixo de 2.600 é **2.580**, embora a regra geral seja qualquer pontuação menor que 2.600. Não há bônus de combo que altere os máximos da tabela.

## Quando o portal abre

É preciso **alcançar ou superar a meta e concluir a música**. Ao conseguir, o portal para a próxima fase implementada aparece. O total acumulado segue com o player, mas a pontuação da nova fase começa em zero. A barra de energia só mostra 100% quando a meta foi realmente atingida.

Se a meta não for atingida, o próximo portal permanece fechado. Pixel aparece com uma mensagem amigável — “Eu confio em você! Cada tentativa ajuda a aprender. Vamos tentar juntos mais uma vez?” — e o botão **Tentar de novo com Pixel** reinicia a mesma fase, a música, o combo e suas estatísticas. Os pontos trazidos dos mundos anteriores são preservados; os da tentativa que não alcançou a meta não são acumulados para burlar a cobrança.

Uma fase que já foi desbloqueada continua disponível para treino. Repetir uma fase com pontuação baixa não apaga as conquistas anteriores. O tutorial possui pontuação de ensaio separada e não desbloqueia fases.

## Ajustes de acessibilidade

Reduzir a velocidade do jogo amplia o tempo de reação e desacelera a música, mantendo as mesmas notas, os pontos por acerto e a meta. Alterar apenas a velocidade visual das setas não muda os critérios de pontuação. Sensibilidade Visual, filtros de cores e escalas da interface também não alteram a cobrança.

A configuração central está em `campaign.js`; os máximos das seis fases são calculados a partir dos mapas reais de `levels.js`. O jogo verifica que uma meta não exceda a pontuação máxima da música.
