# Robô Ritmado — versão 0.7 · Quatro mundos no seu ritmo!

Uma aventura musical com Pixel para crianças de 5 a 11 anos. Abra **Abrir-jogo.cmd** ou **index.html** no Chrome/Edge. Não há instalação, servidor obrigatório ou dependência de internet. Ao compartilhar o ZIP, extraia a pasta completa antes de abrir.

## O que mudou

Todos os layouts receberam uma nova direção: cores de brinquedo na paleta rosa, lilás, violeta, azul e ciano de Pixel; títulos arredondados, botões em relevo, balões e retornos sonoros próprios. A pista ocupa **65% da área de jogo no computador**, com setas maiores, fundo translúcido e decoração por mundo. Pixel ocupa o espaço separado à direita.

Os cinco cenários foram refeitos: OrbitHop e os quatro mundos. Formas grandes e detalhes concentrados à esquerda mantêm a identidade dos locais; atrás de Pixel há áreas tranquilas, com contraste para destacar cabelo, visor e roupa. Os trajes também foram simplificados, com grandes blocos de cor, um emblema temático e menos acessórios. Os arquivos antigos estão preservados.

**Castelo Invernal e Paraíso são fases jogáveis novas**, com mapas de notas, metas, trajes, trilhas e coreografias próprios.

## Quatro viagens

| Ordem | Mundo | Música / atmosfera | Dança | Ritmo | Notas | Meta |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | Reino dos Doces | Doce Travessia · pop, sinos e marimba | Passinho de açúcar · balanço e step-touch | 90 BPM · 4 tempos · 43 s | 46 | 2.600 |
| 2 | Brinquedolândia | Desfile dos Brinquedos · caixa de música e madeira | Marcha e robô de mola | 104 BPM · 4 tempos · 37 s | 53 | 3.000 |
| 3 | Castelo Invernal | Valsa dos Cristais · piano de gelo e cordas | Ballet estilizado · plié, tendu, arabesque e reverência | 84 BPM · 3 tempos · 52 s | 59 | 3.300 |
| 4 | Paraíso | Órbita das Nuvens · harpa e sinos aéreos | Contemporâneo · ondas e extensões | 96 BPM · 4 tempos · 40 s | 49 | 2.700 |

Tempos aproximados em velocidade normal, sem a contagem inicial. Cada trilha tem melodia, harmonia e arranjo próprios, sintetizados no navegador. O menu mantém **Órbita de Casa**, composição separada em 78 BPM.

## Como jogar

1. No menu, **Jogar** abre a história de Pixel em OrbitHop. A abertura pode ser pausada, avançada ou pulada.
2. Aperte **← ↓ ↑ →** quando a seta em queda encontrar o alvo da mesma direção. As telas pequenas oferecem botões de toque.
3. Complete a música e alcance a meta da fase. O resultado oferece o portal do próximo mundo. Os pontos da viagem seguem com você.
4. Na próxima parada, clique em **Vamos tocar**. A pontuação trazida não preenche a meta da nova fase: ela precisa ser conquistada nessa música.
5. **Esc**, o botão de pausa ou mudar de aba pausam música e dança. **Menu** permite voltar e depois continuar do mesmo ponto.

Sem vidas ou eliminação. Se faltar energia, você pode tentar outra vez. Repetir uma música substitui os pontos daquela tentativa, preservando os pontos trazidos, sem duplicar o total. Mundos desbloqueados podem ser escolhidos no topo em um novo ensaio; trocar de mundo durante a música fica bloqueado. Recorde e desbloqueios são salvos neste navegador; recarregar encerra a tentativa atual.

## Dança contínua

A dança das fases usa **um personagem 2D articulado**, com cabeça, torso, braços, pernas, guitarra e caudas independentes. A posição das articulações é interpolada continuamente, com controle do contato dos pés, inclinação do tronco e movimento secundário das roupas. Cada mundo tem uma sequência própria, em ordem fixa, com novos gestos e maior amplitude ao longo da música. Os acertos produzem efeitos na guitarra e nos alvos, sem interromper a coreografia nem forçar poses aleatórias.

O relógio da música conduz a dança; pausar congela as articulações. Redução de Movimento desacelera a coreografia; Sensibilidade Visual deixa Pixel estável. É animação 2D estilizada, sem captura de movimento ou modelo 3D. O menu preserva o outfit padrão e um movimento lento contínuo. O prólogo continua com dez cenas ilustradas, balões e efeitos em tempo real, sem dublagem.

## Menu e tutorial

- **Jogar:** aventura e prólogo em OrbitHop.
- **Tutorial:** seis etapas guiadas por Pixel, prática das quatro direções, demonstração, um acerto e uma sequência. As tentativas se repetem até aprender; as estrelas e os pontos do ensaio não contam na campanha.
- **Opções:** música das fases, sons do jogo, música do menu (Volume Principal) e velocidade visual das setas.
- **Acessibilidade:** ajustes de cores, interface, movimento, contraste, legendas e velocidade.
- **Sobre Nós:** mensagem “Estamos Trabalhando Nisso por enquanto!!”.
- **Oi, Pixel!:** respostas do personagem. Botões têm efeitos diferentes ao passar o cursor/focar e clicar.

Use **Tab / Shift+Tab / Enter** para navegar. As configurações abrem em diálogo com foco de teclado.

## Conforto e acessibilidade

A primeira tela é o **Aviso de Fotossensibilidade e Epilepsia**, estático e silencioso. O botão abre diretamente Acessibilidade; fechar leva ao menu. O aviso reaparece ao abrir/recarregar, enquanto as preferências permanecem salvas.

| Opção | Resultado |
| --- | --- |
| Daltonismo | Filtros Protanopia, Deuteranopia e Tritanopia e três paletas de setas; formas e rótulos continuam presentes. |
| Escalonamento | Interface/ícones 100–140%, legendas 100–180%, setas 100–140%, respeitando o espaço das pistas. |
| Redução de Movimento Visual | Menos animação decorativa; dança entre 15 e 60% da velocidade. Respeita também a preferência do sistema. |
| Alto Contraste | Painéis pretos, texto branco, contornos e setas sólidas. |
| Legendas Descritivas | Próxima direção, aproximação e indicação de “AGORA”; resultado e pontos em linha separada. Falas da história/tutorial sempre visíveis. |
| Velocidade do Jogo | 50–100%, desacelerando música e setas juntas e ampliando as janelas de reação. |
| Sensibilidade Visual | Remove partículas/rastros/flashes decorativos, reduz brilho/saturação e estabiliza Pixel. Tem prioridade sobre a decoração. |

As opções de velocidade entram no início/reinício da música. Volumes e ajustes visuais são imediatos. A velocidade visual das setas, em Opções, varia de 55 a 160% sem mudar a duração da música. Os ajustes são personalização de conforto, sem garantia clínica de prevenção de crises; o jogo ainda deve ser avaliado com os próprios jogadores.

## Pontuação

**No ritmo!** até 75 ms: +100; **Muito bem!** até 150 ms: +60; **Quase!** até 240 ms: +20; nota perdida/direção incorreta na janela: 0. As janelas se ampliam proporcionalmente quando a velocidade do jogo é reduzida. O ajuste de ritmo de −200 a +200 ms corrige atrasos entre dispositivo, som e comando.

## Arquivos principais

- `index.html`, `front.js`, `front.css`, `playful.css`, `wonder.css`: interfaces, tutorial, configurações e acabamento visual.
- `levels.js`: quatro mundos, músicas, mapas, materiais e decoração.
- `choreography.js`: animação articulada, trajetórias dos passos e sequências por fase.
- `game.js`: áudio, notas, julgamento, efeitos e progressão.
- `sprite-assets.js`, `cinematic.js`: carregamento decodificado e abertura animada.
- `settings.js`, `interface-audio.js`: preferências, música de menu e efeitos sonoros.
- `assets/*-v07.png`: novos cenários e peças dos trajes; `DIRECAO-ARTE-07.md`: referências e prompts da ferramenta integrada de imagens.

O fundo separado de OrbitHop está em `outputs/OrbitHop-background-0.7.png`. O ZIP da entrega e as capturas de tela ficam em `outputs/`, fora do controle de versão.
