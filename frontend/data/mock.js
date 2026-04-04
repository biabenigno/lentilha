export const MOCK_DATA = {
    // ID 1: SANDUÍCHE DE QUEIJO E PRESUNTO (Referência: 8500336) - Base para a estrutura
    '1': {
        title: "Sanduíche de Queijo e Presunto",
        nome: "Sanduíche de Queijo e Presunto",
        descricao: "Sanduíche, pão francês, c/ presunto e queijo prato",
        imagem: "/alimentos/pao-queijo-presunto.png",

        // Pegada Geral: Média (Laticínios e Suínos)
        impactLevel: 'média',
        impactIcon: '/labels/pegada-media.svg',
        co2Icon: "/labels/custo-co2-medio.svg",
        aguaIcon: "/labels/custo-agua-medio.svg",
        terraIcon: "/labels/custo-terra-bom.svg",

        alternativa: [{
            title: "Sanduíche de Homus e Abobrinha Grelhada",
            description: "A substituição do presunto e do queijo por homus (pasta de grão-de-bico) e abobrinha reduz a pegada de carbono em mais de 70% e o uso de água em 50%. Ideal para dietas de baixo impacto."
        }, {
            title: "Queijo de Cabra com Pão Integral",
            description: "O queijo de cabra geralmente tem uma pegada de carbono menor que o queijo muçarela bovino, oferecendo um impacto ligeiramente reduzido e mantendo o sabor lácteo."
        },],

        // CARD 1: Emissão de CO₂ (Média)
        co2Card: {
            title: "Emissão de CO₂",
            impactLevel: 'média',
            iconSrc: "/labels/custo-co2-medio.svg",
            mainValue: "~ 523.79 gCO₂e/100g",
            mainDescription: "Quantidade de carbono emitido durante a produção do alimento até seu estado atual.",
            details: [
                {
                    subtitle: "Composição",
                    text: "As emissões são primariamente impulsionadas pela produção do queijo e do presunto. Este valor representa um impacto médio."
                },
                { subtitle: "Transporte", text: "Essa emissão de 523 gCO₂e é o equivalente a cerca de **2,8 quilômetros percorridos por um carro a gasolina**, o que é moderado para uma única refeição." },
            ]
        },
        // CARD 2: Gasto de Água (Média)
        aguaCard: {
            title: "Gasto de água",
            impactLevel: 'média',
            iconSrc: "/labels/custo-agua-medio.svg",
            mainValue: "~ 439.02 litros/100g",
            mainDescription: "Quantidade de água utilizada durante a produção do alimento até seu estado atual.",
            details: [
                {
                    subtitle: "WF Total",
                    text: "Desde a produção desse produto até o momento do consumo, são utilizados aproximadamente 439.02 litros de água para cada 100g."
                },
                { subtitle: "Equivalência", text: "O uso de 439 litros de água equivale a quase **15 minutos de um banho** com chuveiro de alto fluxo, ou o preenchimento de mais de 20 garrafões de 20 litros. " },
            ]
        },
        // CARD 3: Ocupação de Terra (Baixa)
        terraCard: {
            title: "Ocupação de terra",
            impactLevel: 'baixa',
            iconSrc: "/labels/custo-terra-bom.svg",
            mainValue: "~ 2.00 m²/100g", // Valor ajustado para uma estimativa baixa e arredondada
            mainDescription: "Quantidade de terra ocupada para a produção do alimento.",
            details: [
                {
                    subtitle: "EF Total",
                    text: "O consumo de terra é considerado baixo neste produto, principalmente para o cultivo de ração."
                },
                { subtitle: "Equivalência", text: "A área de terra (2.0 m²) é similar à área ocupada por uma **cadeira de escritório padrão** ou por um micro-ondas na bancada da cozinha." },
            ]
        },
    },

    // ID 2: SANDUÍCHE DE ATUM (Referência: 8500338) - DADOS CORRIGIDOS
    '2': {
        title: "Sanduíche de Atum",
        nome: "Sanduíche de Atum",
        descricao: "Sanduíche, baguete, c/ queijo muçarela, alface, tomate, atum em conserva e maionese",
        imagem: "/alimentos/sanduiche-atum.jpeg",

        // Pegada Geral: Baixa (Carbono, Água e Terra são baixos)
        impactLevel: 'baixa',
        impactIcon: '/labels/pegada-baixa.svg',
        co2Icon: "/labels/custo-co2-bom.svg",
        aguaIcon: "/labels/custo-agua-bom.svg",
        terraIcon: "/labels/custo-terra-bom.svg",

        alternativa: [{
            title: "Salada de Grão-de-Bico",
            description: "Alternativa vegetal com pegada de carbono e água significativamente menores. Elimina o impacto do atum e do queijo."
        }],

        // CARD 1: Emissão de CO₂ (Baixa)
        co2Card: {
            title: "Emissão de CO₂",
            impactLevel: 'baixa',
            iconSrc: "/labels/custo-co2-bom.svg",
            mainValue: "~ 278.37 gCO₂e/100g",
            mainDescription: "Quantidade de carbono emitido durante a produção do alimento até seu estado atual.",
            details: [
                {
                    subtitle: "Pegada Específica",
                    text: "A pegada de carbono é impulsionada pela captura e conservação do atum, mas ainda é baixa comparada a proteínas terrestres."
                },
                {
                    subtitle: "Transporte",
                    text: "Essa emissão é semelhante à de um carro a gasolina percorrendo apenas **1,5 quilômetros**."
                }
            ]
        },
        // CARD 2: Gasto de Água (Baixa)
        aguaCard: {
            title: "Gasto de água",
            impactLevel: 'baixa',
            iconSrc: "/labels/custo-agua-bom.svg",
            mainValue: "~ 186.91 litros/100g",
            mainDescription: "Quantidade de água utilizada durante a produção do alimento até seu estado atual.",
            details: [
                {
                    subtitle: "WF Total",
                    text: "O gasto de água é relativamente baixo, típico de preparações com vegetais e proteína do mar."
                },
                {
                    subtitle: "Equivalência",
                    text: "Esse volume de água é suficiente para tomar um **banho rápido de 3 minutos** em um chuveiro de baixo fluxo."
                }
            ]
        },
        // CARD 3: Ocupação de Terra (Baixa)
        terraCard: {
            title: "Ocupação de terra",
            impactLevel: 'baixa',
            iconSrc: "/labels/custo-terra-bom.svg",
            mainValue: "~ 1.78 m²/100g",
            mainDescription: "Quantidade de terra ocupada para a produção do alimento.",
            details: [
                {
                    subtitle: "Laticínios/Pão",
                    text: "O uso de terra se deve principalmente ao cultivo do trigo para o pão e a produção do queijo muçarela."
                },
                {
                    subtitle: "Equivalência",
                    text: "A área de terra ocupada (1,78 m²) é aproximadamente do tamanho de uma **bandeja de teclado e mouse**, sendo pequena devido à origem marinha do atum."
                }
            ]
        },
    },

    // ID 3: SANDUÍCHE DE CARNE ASSADA (Referência: 8500340) - DADOS CORRIGIDOS
    '3': {
        title: "Sanduíche de Carne Assada",
        nome: "Sanduíche de Carne Assada",
        descricao: "Sanduíche, pão francês, c/ carne assada, alface, tomate, maionese, c/ sal",
        imagem: "/alimentos/sanduiche-carne.jpg",

        // Pegada Geral: Alta (Carbono e Água são Altas)
        impactLevel: 'alta',
        impactIcon: '/labels/pegada-alta.svg',
        co2Icon: "/labels/custo-co2-ruim.svg",
        aguaIcon: "/labels/custo-agua-ruim.svg",
        terraIcon: "/labels/custo-terra-ruim.svg", // Nível Alto

        alternativa: [{
            title: "Sanduíche de Frango Desfiado",
            description: "Substituir a carne bovina por frango reduz a pegada de carbono em mais de 60% e o gasto de água em mais de 50%, oferecendo uma alternativa de proteína animal com menor impacto."
        }],

        // CARD 1: Emissão de CO₂ (Alta)
        co2Card: {
            title: "Emissão de CO₂",
            impactLevel: 'alta',
            iconSrc: "/labels/custo-co2-ruim.svg",
            mainValue: "~ 1288.09 gCO₂e/100g",
            mainDescription: "Quantidade de carbono emitido durante a produção do alimento até seu estado atual.",
            details: [
                {
                    subtitle: "Composição",
                    text: "O principal contribuinte são as emissões de metano e óxido nitroso da pecuária bovina, tornando esta uma das maiores pegadas da categoria."
                },
                {
                    subtitle: "Transporte",
                    text: "Consumir 100g desse sanduíche equivale a emitir o mesmo que um carro a gasolina percorrendo cerca de **7 quilômetros**."
                }
            ]
        },
        // CARD 2: Gasto de Água (Alta)
        aguaCard: {
            title: "Gasto de água",
            impactLevel: 'alta',
            iconSrc: "/labels/custo-agua-ruim.svg",
            mainValue: "~ 888.15 litros/100g",
            mainDescription: "Quantidade de água utilizada durante a produção do alimento até seu estado atual.",
            details: [
                {
                    subtitle: "WF Total",
                    text: "A pegada hídrica é extremamente alta, primariamente devido à água necessária para a alimentação do gado."
                },
                {
                    subtitle: "Equivalência",
                    text: "Esse volume de água (quase 900 litros) é o suficiente para **30 minutos de chuveiro** ou descarregar a descarga do banheiro mais de 100 vezes."
                }
            ]
        },
        // CARD 3: Ocupação de Terra (Alta)
        terraCard: {
            title: "Ocupação de terra",
            impactLevel: 'alta',
            iconSrc: "/labels/custo-terra-ruim.svg",
            mainValue: "~ 5.48 m²/100g",
            mainDescription: "Quantidade de terra ocupada para a produção do alimento.",
            details: [
                {
                    subtitle: "EF Total",
                    text: "A produção de carne bovina tem uma alta demanda por pastagens e terras para cultivo de ração."
                },
                {
                    subtitle: "Equivalência",
                    text: "A área de terra (5.48 m²) é aproximadamente do tamanho de um **tapete de porta de entrada** ou de uma pequena área de pastagem."
                }
            ]
        },
    },

    // ID 4: SANDUÍCHE NATURAL (Referência: 8500323) - DADOS CORRIGIDOS
    '4': {
        title: "Sanduíche Natural",
        nome: "Sanduíche Natural",
        descricao: "Sanduíche, pão forma integral, c/ queijo minas frescal, alface americana, cenoura crua, tomate e maionese",
        imagem: "/alimentos/sanduiche-natural.jpeg",

        // Pegada Geral: Baixa (Todos os indicadores são baixos)
        impactLevel: 'baixa',
        impactIcon: '/labels/pegada-baixa.svg',
        co2Icon: "/labels/custo-co2-bom.svg",
        aguaIcon: "/labels/custo-agua-bom.svg",
        terraIcon: "/labels/custo-terra-bom.svg",

        alternativa: [{
            title: "Pão Integral com Pasta de Amendoim",
            description: "Substituir o queijo por pasta de amendoim ou tofu cremoso é uma alternativa vegana que reduz ainda mais a pegada de carbono e hídrica, eliminando o impacto do laticínio."
        }],

        // CARD 1: Emissão de CO₂ (Baixa)
        co2Card: {
            title: "Emissão de CO₂",
            impactLevel: 'baixa',
            iconSrc: "/labels/custo-co2-bom.svg",
            mainValue: "~ 285.56 gCO₂e/100g",
            mainDescription: "Quantidade de carbono emitido durante a produção do alimento até seu estado atual.",
            details: [
                {
                    subtitle: "Composição",
                    text: "O queijo minas frescal (laticínio) é o maior vetor de impacto, sendo a maioria dos outros ingredientes de baixa pegada."
                },
                {
                    subtitle: "Transporte",
                    text: "A emissão de carbono é muito baixa, equivalente a apenas **1,6 quilômetros** de carro a gasolina, um impacto insignificante."
                }
            ]
        },
        // CARD 2: Gasto de Água (Baixa)
        aguaCard: {
            title: "Gasto de água",
            impactLevel: 'baixa',
            iconSrc: "/labels/custo-agua-bom.svg",
            mainValue: "~ 142.59 litros/100g",
            mainDescription: "Quantidade de água utilizada durante a produção do alimento até seu estado atual.",
            details: [
                {
                    subtitle: "WF Total",
                    text: "O consumo de água é baixo, típico de preparações à base de vegetais e pães integrais."
                },
                {
                    subtitle: "Equivalência",
                    text: "O consumo de água é similar ao que é gasto ao lavar a louça de uma refeição por **3 minutos** sob água corrente."
                }
            ]
        },
        // CARD 3: Ocupação de Terra (Baixa)
        terraCard: {
            title: "Ocupação de terra",
            impactLevel: 'baixa',
            iconSrc: "/labels/custo-terra-bom.svg",
            mainValue: "~ 1.96 m²/100g",
            mainDescription: "Quantidade de terra ocupada para a produção do alimento.",
            details: [
                {
                    subtitle: "EF Total",
                    text: "Mesmo com a presença de laticínios, a ocupação de terra é mínima devido à maior parte dos ingredientes ser de origem vegetal."
                },
                {
                    subtitle: "Equivalência",
                    text: "A área de terra é um pouco maior que a área de um **micro-ondas** na bancada da cozinha, indicando baixo impacto em uso de solo."
                }
            ]
        },
    },

    // ID 5: SANDUÍCHE DE SALAME (Referência: 8500316) - DADOS CORRIGIDOS
    '5': {
        title: "Sanduíche de Salame",
        nome: "Sanduíche de Salame",
        descricao: "Sanduíche, pão francês c/ salame",
        imagem: "/alimentos/sanduiche-salame.png",

        // Pegada Geral: Média (Carbono e Água são Médios)
        impactLevel: 'média',
        impactIcon: '/labels/pegada-media.svg',
        co2Icon: "/labels/custo-co2-medio.svg",
        aguaIcon: "/labels/custo-agua-medio.svg",
        terraIcon: "/labels/custo-terra-bom.svg",

        alternativa: [{
            title: "Pão com Mortadela Vegetal",
            description: "A mortadela vegetal (ou fatias de 'frios' veganos) reduz a pegada de carbono em mais de 90%, mantendo a textura e o sabor, mas eliminando o impacto da carne processada e da suinocultura."
        }],

        // CARD 1: Emissão de CO₂ (Média)
        co2Card: {
            title: "Emissão de CO₂",
            impactLevel: 'média',
            iconSrc: "/labels/custo-co2-medio.svg",
            mainValue: "~ 457.94 gCO₂e/100g",
            mainDescription: "Quantidade de carbono emitido durante a produção do alimento até seu estado atual.",
            details: [
                {
                    subtitle: "Composição",
                    text: "O processamento do salame e a origem da carne suína contribuem significativamente para a pegada de carbono média."
                },
                {
                    subtitle: "Transporte",
                    text: "Essa pegada de carbono está na faixa média, equivalente a dirigir um carro a gasolina por cerca de **2,5 quilômetros**."
                }
            ]
        },
        // CARD 2: Gasto de Água (Média)
        aguaCard: {
            title: "Gasto de água",
            impactLevel: 'média',
            iconSrc: "/labels/custo-agua-medio.svg",
            mainValue: "~ 491.88 litros/100g",
            mainDescription: "Quantidade de água utilizada durante a produção do alimento até seu estado atual.",
            details: [
                {
                    subtitle: "WF Total",
                    text: "O gasto de água é comparável ao de outros produtos à base de carne suína."
                },
                {
                    subtitle: "Equivalência",
                    text: "O gasto de água é comparável ao necessário para lavar uma **máquina de lavar roupa cheia** (cerca de 500 litros por ciclo)."
                }
            ]
        },
        // CARD 3: Ocupação de Terra (Baixa)
        terraCard: {
            title: "Ocupação de terra",
            impactLevel: 'baixa', // Embora o mock original dissesse média, o valor 2.26 é baixo na nossa métrica
            iconSrc: "/labels/custo-terra-bom.svg",
            mainValue: "~ 2.26 m²/100g",
            mainDescription: "Quantidade de terra ocupada para a produção do alimento.",
            details: [
                {
                    subtitle: "EF Total",
                    text: "A ocupação de terra é baixa para carne suína processada, sendo o impacto principal diluído no ciclo de vida."
                },
                {
                    subtitle: "Equivalência",
                    text: "A área de terra é similar a de uma **porta de banheiro padrão**, mostrando um baixo uso de solo."
                }
            ]
        },
    },

    // ID 6: HAMBÚRGUER (SANDUÍCHE) (Referência: 8500303) - DADOS CORRIGIDOS
    '6': {
        title: "Hambúrguer (Sanduíche)",
        nome: "Hambúrguer (Sanduíche)",
        descricao: "Sanduíche, hambúrguer bovino grelhado (c/ pão hambúrguer), c/ catchup, mostarda e maionese",
        imagem: "/alimentos/hamburger.jpg",

        // Pegada Geral: Alta (Puxado pelo Carbono da carne bovina)
        impactLevel: 'alta',
        impactIcon: '/labels/pegada-alta.svg',
        co2Icon: "/labels/custo-co2-ruim.svg",
        aguaIcon: "/labels/custo-agua-medio.svg",
        terraIcon: "/labels/custo-terra-medio.svg",

        alternativa: [{
            title: "Hambúrguer de Frango ou Vegetariano",
            description: "Substituir a carne bovina por frango ou, idealmente, um hambúrguer de leguminosas (grão-de-bico ou lentilha) reduz drasticamente todos os impactos ambientais."
        }],

        // CARD 1: Emissão de CO₂ (Alta)
        co2Card: {
            title: "Emissão de CO₂",
            impactLevel: 'alta',
            iconSrc: "/labels/custo-co2-ruim.svg",
            mainValue: "~ 750.02 gCO₂e/100g",
            mainDescription: "Quantidade de carbono emitido durante a produção do alimento até seu estado atual.",
            details: [
                {
                    subtitle: "Composição",
                    text: "O alto impacto é devido à produção de carne bovina, a maior contribuinte para a emissão de gases de efeito estufa."
                },
                {
                    subtitle: "Transporte",
                    text: "Com 750 gCO₂e, a emissão é alta, equivalente a dirigir um carro a gasolina por cerca de **4 quilômetros**."
                }
            ]
        },
        // CARD 2: Gasto de Água (Média)
        aguaCard: {
            title: "Gasto de água",
            impactLevel: 'média',
            iconSrc: "/labels/custo-agua-medio.svg",
            mainValue: "~ 444.56 litros/100g",
            mainDescription: "Quantidade de água utilizada durante a produção do alimento até seu estado atual.",
            details: [
                {
                    subtitle: "WF Total",
                    text: "O volume de água é significativo, grande parte sendo água verde (chuva) usada na alimentação do gado."
                },
                {
                    subtitle: "Equivalência",
                    text: "O volume de água é equivalente a quase **22 garrafões de 20 litros** de água potável."
                }
            ]
        },
        // CARD 3: Ocupação de Terra (Média)
        terraCard: {
            title: "Ocupação de terra",
            impactLevel: 'média',
            iconSrc: "/labels/custo-terra-medio.svg",
            mainValue: "~ 3.65 m²/100g",
            mainDescription: "Quantidade de terra ocupada para a produção do alimento.",
            details: [
                {
                    subtitle: "EF Total",
                    text: "A pegada ecológica reflete a demanda de terra para pastagem e cultivo de ração da pecuária bovina."
                },
                {
                    subtitle: "Equivalência",
                    text: "A área de terra (3.65 m²) é comparável à área ocupada por uma **pequena mesa de jantar**, refletindo a demanda de terra."
                }
            ]
        },
    },
};