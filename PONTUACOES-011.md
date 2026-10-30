# Pontuação e progressão — versão 0.11

São **oito fases disponíveis**, em uma campanha planejada para dez. A meta é individual por fase; o total acumulado não substitui a pontuação exigida no mundo atual. Para viajar, é necessário concluir a música e atingir ou superar a meta.

| Fase | Mundo | Meta de êxito | Abaixo da meta: tentar novamente | Máximo disponível | Situação |
| --- | --- | ---: | ---: | ---: | --- |
| 01 | Reino dos Doces | 2.600 | menos de 2.600 | 5.000 | Jogável |
| 02 | Brinquedolândia | 3.000 | menos de 3.000 | 5.700 | Jogável |
| 03 | Castelo Invernal | 3.400 | menos de 3.400 | 6.300 | Jogável |
| 04 | Paraíso | 3.800 | menos de 3.800 | 6.700 | Jogável |
| 05 | Deserto Escaldante | 4.200 | menos de 4.200 | 7.400 | Jogável |
| 06 | Pântano Mágico | 4.600 | menos de 4.600 | 8.100 | Jogável |
| 07 | Floresta Nebulosa | 5.000 | menos de 5.000 | 8.800 | Jogável |
| 08 | Atlanta | 5.400 | menos de 5.400 | 9.500 | Jogável |
| 09 | Masmorra Ardente | 5.800 | menos de 5.800 | — | Planejada |
| 10 | Colina Escarlate | 6.200 | menos de 6.200 | — | Planejada |

A meta cresce 400 pontos a cada fase. Cada comando vale 100 pontos em **No ritmo!**, 60 em **Muito bem!**, 20 em **Quase!** e zero em um erro. As pontuações possíveis são múltiplos de 20. As janelas de julgamento acompanham o ajuste de velocidade do jogo; os máximos e metas permanecem iguais.

Os máximos aumentaram em relação à versão 0.10 porque a sequência agora continua até perto do fim da música e inclui uma última nota cuja janela termina no encerramento. Não houve aumento das metas das fases anteriores.

Ao ficar abaixo da meta, Pixel incentiva uma nova tentativa, o botão reinicia a mesma fase e a próxima permanece bloqueada. Com êxito, o botão de viagem exibe Pixel canalizando a guitarra, entrando voluntariamente no portal e chegando ao mundo seguinte. Os pontos seguem acumulados durante a viagem. O aviso temático da próxima fase aparece antes do início da nova música.

Após Atlanta há uma cena com o sinal da Masmorra Ardente. As fases 9 e 10 continuam identificadas como **Em breve**; essa cena não libera conteúdo ainda não implementado. É possível revisitar os mundos já liberados pela opção no aviso de pré-fase, iniciando um novo placar naquela fase. O desbloqueio fica salvo neste navegador quando o armazenamento está disponível.

A configuração das metas e da disponibilidade está em `campaign.js`; as músicas e sequências estão em `levels.js` e `game.js`.
