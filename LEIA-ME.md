# Robô Ritmado — versão 0.10

A aventura musical de Pixel agora tem **seis fases jogáveis**, em uma campanha planejada para dez mundos. Extraia a pasta completa e abra **Abrir-jogo.cmd** ou **index.html** no Chrome/Edge; não é preciso instalar nada nem usar servidor.

## Novidades desta entrega

- **Deserto Escaldante** e **Pântano Mágico**, com cenários lapidados a partir das referências fornecidas, outfits próprios, palcos temáticos, coreografias contínuas e trilhas diferentes: Sol em Movimento (108 BPM) e Balanço das Raízes (100 BPM).
- **Opções, Acessibilidade e Tutorial mais leves**: sem desfoque de fundo em tempo real nos diálogos, animações de fundo suspensas durante ajustes, gravação de preferências agrupada e fundo da pista de treino reaproveitado. Os mundos seguintes carregam suas imagens quando necessários.
- **Pontuação crescente**: 2.600, 3.000, 3.400, 3.800, 4.200 e 4.600 nas seis fases atuais. As metas das fases 7–10 são 5.000, 5.400, 5.800 e 6.200; elas aparecem como Em breve.
- **Nova tentativa com Pixel**: se faltar pontuação, um quadro com Pixel incentiva o player e oferece reiniciar a mesma fase. O portal só abre ao completar a música e atingir sua meta.
- **Pés no palco e dança mais expressiva**: o palco usa a mesma origem do personagem, com apoio corrigido das botas. Balanços e passos são contínuos, ritmados e ganham amplitude conforme o desempenho. A versão aberta diretamente pela pasta também usa uma malha conectada; não se limita a inclinar a imagem.
- **Novo título do menu**: letras inclinadas com contornos, textura, relevo visual e brilho, reposicionadas acima dos botões, na paleta de Pixel. OrbitHop, o palco e os botões foram mantidos.

## Os mundos disponíveis

| Fase | Mundo | Música | Meta | Máximo |
| --- | --- | --- | ---: | ---: |
| 01 | Reino dos Doces | Doce Travessia · 90 BPM | 2.600 | 4.600 |
| 02 | Brinquedolândia | Desfile dos Brinquedos · 104 BPM | 3.000 | 5.300 |
| 03 | Castelo Invernal | Valsa dos Cristais · 84 BPM | 3.400 | 5.900 |
| 04 | Paraíso | Órbita das Nuvens · 96 BPM | 3.800 | 6.300 |
| 05 | Deserto Escaldante | Sol em Movimento · 108 BPM | 4.200 | 7.000 |
| 06 | Pântano Mágico | Balanço das Raízes · 100 BPM | 4.600 | 7.700 |

O mapa musical do Paraíso foi ampliado para sustentar sua nova meta crescente. As quatro fases futuras são Floresta Nebulosa, Atlanta, Masmorra Ardente e Colina Escarlate.

## Jogar

Use **← ↓ ↑ →** ou os controles de toque quando a seta alcançar o alvo. No ritmo vale 100 pontos; Muito bem, 60; Quase, 20. **Esc** pausa. **Menu** permite voltar ao início e **Continuar partida** retoma a sessão. A pontuação exigida é por fase, separada do total acumulado.

O menu mantém a música Órbita de Casa, a abertura animada, Tutorial, Opções, Acessibilidade e Sobre Nós. O aviso de fotossensibilidade vem antes das animações e da música. Permanecem os ajustes de daltonismo, escalas, alto contraste, dança mais lenta, legendas, velocidade do jogo e sensibilidade visual. Os olhos e outfits das quatro fases anteriores foram preservados.

A animação é uma ilustração 2D conectada, com movimentos limitados para preservar o desenho. Usa uma passagem WebGL quando permitida e uma malha Canvas com 16 faixas na abertura local ou sem WebGL. Não há partes soltas ou física de boneco.

## Documentação

- **PONTUACOES-010.md**: relatório das metas, faixas sem êxito, máximos e desbloqueios das dez fases.
- **VALIDACAO-010.md**: verificações de jogabilidade, desempenho e acessibilidade desta entrega.
- **assets/GERACAO-10.md**: referências, prompts exatos e arquivos da arte nova.
- **campaign.js**: configuração única das dez metas e situação das fases.

Os relatórios das versões anteriores continuam na pasta para consulta histórica.
