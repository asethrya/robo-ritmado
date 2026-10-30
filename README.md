# Robô Ritmado — versão 0.11

Uma aventura musical infantil com Pixel, um robô que transforma música em conexão. Esta versão tem **oito fases jogáveis**, em uma campanha planejada para dez mundos.

Extraia a pasta completa e abra **Abrir-jogo.cmd** ou **index.html** no Chrome/Edge. Não é preciso instalar dependências nem usar servidor. Mantenha a pasta `assets` junto dos arquivos do jogo.

## Novidades

- **OrbitHop recolorido** a partir do background aprovado, com a mesma composição e tons mais próximos do outfit padrão e do palco: violeta profundo, rosa, ciano e branco. Uma cópia independente acompanha a entrega em `outputs/OrbitHop-background-0.11.png`.
- **Nome maior no menu**, mantendo a fonte decorativa, textura e paleta aprovadas. Placas redesenhadas, botões com tipografia derivada e favicon de estrela cibernética. Corrigido o corte das últimas letras O.
- **Viagens voluntárias por portal** após concluir cada fase com a meta: Pixel canaliza a guitarra, abre o mesmo portal da introdução, entra com coragem e sai no cenário seguinte com o novo outfit. Há controles de pausa e de chegar direto ao destino. Sensibilidade Visual usa transições suaves, sem deslocamento ou rotação do personagem.
- **Aviso temático antes de cada fase**, com número, nome, descrição, duração, meta e ornamentos próprios. A música começa somente ao escolher Entrar no ritmo. Todos os avisos de partida usam fundo preto translúcido para destacar a mensagem.
- **Interface da partida reorganizada**: retirados o nome do jogo e o bloco descritivo sobre a pista; Pixel e palco maiores; placar reposicionado; música compacta com capa simbólica exclusiva; poder **Ressonância de Pixel** na parte inferior, ao lado da música.
- **Final musical sincronizado**: as notas continuam até o encerramento, com a janela da última seta terminando no fim da música. As metas anteriores permanecem iguais.
- **Dança sem deformação elástica**: os desenhos permanecem íntegros e apoiados no palco. As poses antigas de Doces e Brinquedos voltaram em ordem fixa, com transição gradual; os demais outfits têm balanços e deslocamentos contínuos próprios, sincronizados ao ritmo. A animação usa ilustrações 2D, sem física de membros ou ragdoll.
- **Boas-vindas de acessibilidade** com Pixel padrão em tamanho grande, orientação sobre cores, leitura, movimento, ritmo, legendas e tempo, mantendo o cuidado explícito com luzes, efeitos e fotossensibilidade. Acesso direto aos ajustes e opção de seguir ao menu. O recurso continua sempre no menu e em Opções.
- **Floresta Nebulosa e Atlanta**, com cenários lapidados, outfits das referências oficiais, palcos temáticos e músicas próprias.

## Os mundos

| Fase | Mundo | Música | Meta | Máximo |
| --- | --- | --- | ---: | ---: |
| 01 | Reino dos Doces | Doce Travessia · 90 BPM | 2.600 | 5.000 |
| 02 | Brinquedolândia | Desfile dos Brinquedos · 104 BPM | 3.000 | 5.700 |
| 03 | Castelo Invernal | Valsa dos Cristais · 84 BPM | 3.400 | 6.300 |
| 04 | Paraíso | Órbita das Nuvens · 96 BPM | 3.800 | 6.700 |
| 05 | Deserto Escaldante | Sol em Movimento · 108 BPM | 4.200 | 7.400 |
| 06 | Pântano Mágico | Balanço das Raízes · 100 BPM | 4.600 | 8.100 |
| 07 | Floresta Nebulosa | Vaga-lumes em Órbita · 110 BPM | 5.000 | 8.800 |
| 08 | Atlanta | Maré de Cristais · 106 BPM | 5.400 | 9.500 |

**Masmorra Ardente** e **Colina Escarlate** continuam em preparação, com metas planejadas de 5.800 e 6.200. Após Atlanta, o próximo sinal é apresentado em uma cena; os dois mundos finais permanecem Em breve.

## Como jogar

Use **← ↓ ↑ →** ou os controles de toque quando a seta alcançar o alvo. **No ritmo!** vale 100 pontos, **Muito bem!**, 60, **Quase!**, 20, e erro, zero. **Esc** pausa; outro Esc ou Continuar retoma. As janelas de pré-fase e resultado permanecem abertas até escolher uma ação.

Conclua a música e atinja a meta individual para viajar. Os pontos acumulados seguem pelo portal. Se faltar pontuação, Pixel oferece incentivo e uma nova tentativa na mesma fase. No aviso pré-fase, **Revisitar mundos liberados** permite ensaiar uma fase desbloqueada com novo placar. O progresso de desbloqueio é salvo no navegador quando disponível.

O menu mantém Tutorial guiado, Opções, Acessibilidade e Sobre Nós. Ajuste separadamente a música do menu, as músicas das fases, os sons dos efeitos e a velocidade visual das setas. Acessibilidade reúne daltonismo, alto contraste, escalas, legendas descritivas, dança mais lenta, velocidade do jogo e Sensibilidade Visual. Os ajustes de velocidade musical entram ao iniciar ou reiniciar uma fase.

## Documentação

- **PONTUACOES-011.md**: metas, máximos, desbloqueios e fases futuras.
- **VALIDACAO-011.md**: testes de campanha, portal, tutorial, acessibilidade, telas e desempenho.
- **assets/GERACAO-11.md**: referências e prompts exatos da arte nova.
- **campaign.js**: configuração única das metas e disponibilidade dos dez mundos.

Os relatórios e assets anteriores continuam preservados para consulta histórica. Esta entrega substitui o uso da malha elástica no personagem; `gpu-dancer.js` permanece como arquivo histórico e não é carregado pelo jogo.
