# Robô Ritmado 0.15 · Relatório do Endgame

Este complemento reúne a batalha final, os controles e o catálogo de eventos de OrbitHop. As dez metas da campanha permanecem registradas no [guia do jogo](README.md). A vitória na Colina Escarlate libera OrbitHop. Depois de recordar a origem da viagem, Pixel atravessa um portal voluntário e enfrenta Galactus na cidade em ruínas.

## Regras do combate

| Parâmetro | Valor inicial |
| --- | --- |
| Vida de Pixel e Galactus | 100 e 150 |
| Andamento e duração | 120 BPM. Cerca de 2min45s com quatro anéis de primeira |
| Preparação | Quatro batidas antes de cada padrão |
| Execução | Quatro a oito batidas por evento |
| Intervalo | Oito batidas de música entre eventos |
| Janela de notas especiais | ±240 ms. Com Mais tempo para reagir, ±320 ms |
| Ataque entre eventos | Cada cinco acertos equivalentes causam 3 de dano. Um quase acerto conta pela metade |
| Cura por Afinação Vital | 5 ou 8 de vida, com 6 de energia. Limite de duas ativações |
| Entrada da Sinfonia | Galactus com 18 de vida ou menos ao encerrar a sequência principal |

As setas mantêm a paleta por direção. A moldura branca identifica uma nota especial e a cauda indica sustentação. As notas especiais substituem o trecho rítmico correspondente. A fumaça, o recuo e os efeitos dos golpes ficam atrás da pista. Cada evento resolve vida e cura uma vez. O Rebote encerra na primeira devolução perdida, sem cobrar as seguintes.

O catálogo contém 30 eventos. A primeira luta seleciona 17. Tentativas seguintes alternam parte do repertório, mantendo os sete eventos de base. As opções **Sequências mais curtas**, **Mais tempo para reagir**, **Redução de Movimento Visual** e **Sensibilidade Visual** permitem ajustar a experiência.

## Identidade elemental

| Elemento | Paleta | Símbolo e efeito |
| --- | --- | --- |
| Fogo | Laranja, vermelho e amarelo | Chama, labaredas e fênix |
| Água | Azul e ciano | Gota, anéis, ondas e bolhas |
| Terra | Marrom, âmbar e verde | Rocha, cristais e placas |
| Ar e celestial | Branco azulado e dourado suave | Espiral e correntes de vento |
| Gelo | Azul-gelo e lilás | Floco, cristais e prismas |
| Ressonância de Pixel | Turquesa e magenta | Estrela, anéis e ondas musicais |
| Galactus | Violeta e roxo escuro | Eclipse, partículas e fendas cósmicas |

## Catálogo de golpes

| Evento | Ação e efeito | Resolução inicial |
| --- | --- | --- |
| Riff de Fênix | Sequência de fogo. A ave nasce da guitarra e atravessa a arena | 3 de 4 causam 6. Completa causa 10 |
| Maré Harmônica | Sustente a nota enquanto os anéis de água formam uma onda | Parcial causa 4. Completa causa 8 |
| Acorde Tectônico | Três notas formam uma trilha de cristais | 3 de dano por acerto, até 9 |
| Solo dos Ventos | Use três notas para dispersar a onda e contra-atacar | 2 acertos causam 6. Falha custa 5 |
| Ponte de Cristal | O gelo percorre a arena até a mão do adversário | Completa cancela e causa 5. Falha total custa 5 |
| Escudo de Geodo | Duas notas formam a proteção de pedra | Sem acerto, 8 de dano. Com um, 4. Com dois, bloqueio |
| Bolha de Ressonância | Sustente a bolha e devolva o projétil com uma nota extra | Defesa e retorno causam 8. Falhar só no retorno preserva a defesa |
| Afinação Vital | Acorde de reparo com energia acumulada | Cura 5 ou 8, com limite por luta |
| Punho do Eclipse | A sombra antecipa o impacto | Uma defesa bloqueia. Falha custa 8 |
| Rugido de Meteoros | Três meteoros correspondem a três setas | 3 por meteoro perdido. Rebater todos causa 8 |
| Pisada de Ruptura | Rachaduras e duas colunas bloqueadas por oito batidas | O padrão usa apenas ↓ e ↑. A sequência defendida devolve 6. Uma defesa incompleta custa 4 e perder todas as notas custa 7 |
| Correntes do Silêncio | Elos violetas cercam Pixel. Repita o padrão | Três acertos rompem as correntes. Falha custa 6 |
| Sopro de Cinzas | Três notas fazem o vento atravessar a fumaça | Sucesso causa 6. Falha custa 5 |
| Ímã Cósmico | Fragmentos são atraídos para o punho | Três acertos escapam. Falha custa 7 |
| Mordida do Vazio | Uma fenda disputa o projétil com Pixel | A nota extra devolve 8. Falha perde a oportunidade |
| Constelação Aprisionadora | Quatro notas desfazem a gaiola de estrelas | Três acertos escapam. Falha custa 6 |
| Rebote Interdimensional | A esfera passa de um lado para outro em três rodadas | Completo causa 12. Primeira falha encerra com 6 |
| Duelo de Ondas | Dois feixes se encontram atrás da pista | 4 de 6 causam 10. Com 2 ou 3, anula. Com 0 ou 1, custa 6 |
| O Golpe que Volta | Duas notas redirecionam o golpe por um portal | Dois causam 10. Um desvia. Zero custa 6 |
| Roubo de Acorde | Repita o acorde atraído pela energia do vilão | Completo cura 5. Falha perde a oportunidade |
| Escalada no Braço | As notas marcam uma trilha ascendente junto à armadura | Completa causa 12. Parcial causa 5 |
| Disputa pelo Portal de OrbitHop | Estabilize a fenda antes que os destroços a alcancem | 4 de 6 causam 8. Falha custa 6 |
| Provocação e Resposta Musical | Copie os três pulsos da armadura | Sucesso causa 7. Falha perde a oportunidade |
| Proteção de OrbitHop | Erga o escudo diante da cidade | Sucesso causa 8. Falha custa 5 |

## Combinações e desfecho

| Combinação | Elementos | Resultado |
| --- | --- | --- |
| Vapor em Contratempo | Água e fogo | Nuvem e contra-ataque de 8 |
| Tempestade Harmônica | Água e ar | Espiral de 10 |
| Meteorito de Refrão | Terra e fogo | Impacto de 12 |
| Prisma Celestial | Gelo e ar | Bloqueio e devolução de 8 |
| Jardim de Frequências | Terra e água | Recupera 6 |
| Aurora de OrbitHop | Quatro elementos e portal | Acorde de até 12 na reta final |

Nas combinações de dois elementos, o primeiro par completo já rende um golpe simples de 4. Completar os dois pares libera a combinação. A **Sinfonia dos Mundos** exige quatro anéis de terra, água, fogo e ar. Cada anel pede dois acertos em três notas. Uma falha repete o mesmo anel, com o progresso preservado e a música seguindo.

O **Tempus Infinitum** entrelaça seis cores de energia e abre lembranças dos mundos visitados. Depois da vitória, Pixel volta ao camarim, atravessa o backstage e toca **Estrelas de Casa** na cidade reconstruída. Os créditos agradecem ao Professor Peterson Lobato e à equipe formada por Ísis Maria Teles de Oliveira, Fernanda da Silva Bispo e Luis Fabiano Moreira Teles.

As animações combinam poses ilustradas com movimentos do corpo inteiro, partículas e formas elementais. Os números são o ponto de partida do balanceamento. A batalha foi conferida no navegador com notas sustentadas, acertos parciais e repetição do primeiro anel, além de verificações de espaçamento e dano por evento.
