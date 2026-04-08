# Catálogo de Impacto Ambiental por Categoria Alimentar

> **Fonte:** POF 2017-2018 (IBGE) — Gerado em 08/04/2026 11:33

---

## 1. Origem dos Dados

Os dados utilizados neste catálogo foram extraídos do documento oficial **"Atualização POF 2017-2018 — Pegadas Ambientais dos Alimentos no Brasil"**, disponibilizado pelo IBGE. A aba utilizada é `Base_Pegadas_2018`, que contém valores de pegadas ambientais para alimentos consumidos pela população brasileira, medidos por quilograma de alimento (kg).

Os três indicadores ambientais avaliados são:

| Indicador | Sigla | Unidade | Descrição |
|-----------|-------|---------|-----------|
| Pegada de Carbono | CF | gCO₂eq/kg | Emissão de gases de efeito estufa |
| Pegada Hídrica | WF | L/kg | Consumo de água doce |
| Pegada de Terra | EF | g·m²/kg | Uso de área de solo |

---

## 2. Metodologia de Categorização

Cada alimento foi vinculado ao seu grupo alimentar usando os dois primeiros dígitos do campo `Ingredientes_cod`, conforme a classificação da POF/IBGE:

| Código POF | Categoria |
|------------|-----------|
| 63 | Cereais e Leguminosas |
| 64 | Hortaliças |
| 65 | Frutas |
| 66 | Açúcares e Doces |
| 67 | Sais e Condimentos |
| 68 | Laticínios |
| 69 | Carnes |
| 70 | Pescados |
| 71 | Ovos |
| 72 | Bebidas |
| 74 | Óleos e Gorduras |
| 81 | Embutidos |
| 84 | Panificados |


Para cada grupo × indicador, foram calculadas as seguintes estatísticas com base nos valores válidos de todos os alimentos do grupo:

- **Média aritmética**: valor esperado para um alimento típico da categoria;
- **Mediana**: valor central do grupo;
- **Percentil 33 (Limiar Baixo)**: valor abaixo do qual se encontra ⅓ dos alimentos;
- **Percentil 66 (Limiar Alto)**: valor abaixo do qual se encontra ⅔ dos alimentos.

> Grupos com menos de 3 alimentos válidos foram marcados como **"Dados insuficientes"**.

---

## 3. Por Que Escolhemos os Percentis 33 e 66?

A escolha dos **tercis (33% e 66%)** foi deliberada para garantir uma distribuição **estatisticamente equilibrada** entre as faixas de impacto. Com esse método, cada faixa (Baixo, Médio, Alto) representa aproximadamente **⅓ dos alimentos** do grupo.

A classificação é **relativa ao contexto de cada categoria**: um alimento é classificado como "Alto Impacto" dentro das carnes em comparação com outras carnes, não com hortaliças. Isso garante justiça comparativa entre grupos com escalas de impacto muito diferentes.

**Vantagens desta abordagem em relação a limiares absolutos:**

1. Respeita a diversidade de escala entre categorias distintas;
2. Garante que sempre existam alimentos nas três faixas;
3. Facilita a comunicação com o consumidor com uma referência relativa e comparável.

---

## 4. Tabela de Referência

A tabela abaixo apresenta os limiares calculados para cada combinação de Categoria × Indicador. Os valores são baseados nas estatísticas dos alimentos classificados naquele grupo segundo a POF 2017-2018.

### Açúcares e Doces

| Indicador | Unidade | Nº | Média | Mediana | Faixa BAIXO | Faixa MÉDIO | Faixa ALTO |
|-----------|---------|----:|------:|--------:|-------------|-------------|------------|
| Carbono (CF) | gCO₂eq/kg | 11 | 2170.1 | 2133.3 | ≤ 1772.0 gCO₂eq/kg | 1772.0 – 2394.1 gCO₂eq/kg | > 2394.1 gCO₂eq/kg |
| Hídrica (WF) | L/kg | 6 | 9660.3 | 4375.2 | ≤ 1143.7 L/kg | 1143.7 – 9508.9 L/kg | > 9508.9 L/kg |
| Terra (EF) | g·m²/kg | 1 | — | — | Dados insuficientes | — | — |

### Bebidas

| Indicador | Unidade | Nº | Média | Mediana | Faixa BAIXO | Faixa MÉDIO | Faixa ALTO |
|-----------|---------|----:|------:|--------:|-------------|-------------|------------|
| Carbono (CF) | gCO₂eq/kg | 80 | 5594.1 | 3490.0 | ≤ 2402.5 gCO₂eq/kg | 2402.5 – 6259.8 gCO₂eq/kg | > 6259.8 gCO₂eq/kg |
| Hídrica (WF) | L/kg | 0 | — | — | Dados insuficientes | — | — |
| Terra (EF) | g·m²/kg | 1 | — | — | Dados insuficientes | — | — |

### Carnes

| Indicador | Unidade | Nº | Média | Mediana | Faixa BAIXO | Faixa MÉDIO | Faixa ALTO |
|-----------|---------|----:|------:|--------:|-------------|-------------|------------|
| Carbono (CF) | gCO₂eq/kg | 20 | 4054.6 | 1950.0 | ≤ 1012.4 gCO₂eq/kg | 1012.4 – 2924.0 gCO₂eq/kg | > 2924.0 gCO₂eq/kg |
| Hídrica (WF) | L/kg | 10 | 9950.8 | 2245.9 | ≤ 1164.5 L/kg | 1164.5 – 16617.1 L/kg | > 16617.1 L/kg |
| Terra (EF) | g·m²/kg | 5 | 16.7 | 9.0 | ≤ 7.6 g·m²/kg | 7.6 – 18.6 g·m²/kg | > 18.6 g·m²/kg |

### Cereais e Leguminosas

| Indicador | Unidade | Nº | Média | Mediana | Faixa BAIXO | Faixa MÉDIO | Faixa ALTO |
|-----------|---------|----:|------:|--------:|-------------|-------------|------------|
| Carbono (CF) | gCO₂eq/kg | 42 | 1492.0 | 800.4 | ≤ 483.9 gCO₂eq/kg | 483.9 – 1621.8 gCO₂eq/kg | > 1621.8 gCO₂eq/kg |
| Hídrica (WF) | L/kg | 23 | 2069.0 | 1746.0 | ≤ 1169.2 L/kg | 1169.2 – 2444.1 L/kg | > 2444.1 L/kg |
| Terra (EF) | g·m²/kg | 4 | 11.2 | 7.7 | ≤ 5.4 g·m²/kg | 5.4 – 9.9 g·m²/kg | > 9.9 g·m²/kg |

### Embutidos

| Indicador | Unidade | Nº | Média | Mediana | Faixa BAIXO | Faixa MÉDIO | Faixa ALTO |
|-----------|---------|----:|------:|--------:|-------------|-------------|------------|
| Carbono (CF) | gCO₂eq/kg | 9 | 10287.6 | 10200.0 | ≤ 4888.0 gCO₂eq/kg | 4888.0 – 10868.0 gCO₂eq/kg | > 10868.0 gCO₂eq/kg |
| Hídrica (WF) | L/kg | 11 | 11632.3 | 7770.4 | ≤ 7092.1 L/kg | 7092.1 – 9640.0 L/kg | > 9640.0 L/kg |
| Terra (EF) | g·m²/kg | 2 | — | — | Dados insuficientes | — | — |

### Frutas

| Indicador | Unidade | Nº | Média | Mediana | Faixa BAIXO | Faixa MÉDIO | Faixa ALTO |
|-----------|---------|----:|------:|--------:|-------------|-------------|------------|
| Carbono (CF) | gCO₂eq/kg | 53 | 1592.6 | 1038.4 | ≤ 870.0 gCO₂eq/kg | 870.0 – 1417.9 gCO₂eq/kg | > 1417.9 gCO₂eq/kg |
| Hídrica (WF) | L/kg | 37 | 2085.9 | 1790.4 | ≤ 1549.2 L/kg | 1549.2 – 2147.6 L/kg | > 2147.6 L/kg |
| Terra (EF) | g·m²/kg | 20 | 10.4 | 10.0 | ≤ 8.7 g·m²/kg | 8.7 – 10.9 g·m²/kg | > 10.9 g·m²/kg |

### Hortaliças

| Indicador | Unidade | Nº | Média | Mediana | Faixa BAIXO | Faixa MÉDIO | Faixa ALTO |
|-----------|---------|----:|------:|--------:|-------------|-------------|------------|
| Carbono (CF) | gCO₂eq/kg | 29 | 235.0 | 170.0 | ≤ 140.0 gCO₂eq/kg | 140.0 – 247.0 gCO₂eq/kg | > 247.0 gCO₂eq/kg |
| Hídrica (WF) | L/kg | 6 | 501.6 | 470.1 | ≤ 453.3 L/kg | 453.3 – 502.0 L/kg | > 502.0 L/kg |
| Terra (EF) | g·m²/kg | 5 | 1.8 | 1.3 | ≤ 1.1 g·m²/kg | 1.1 – 2.4 g·m²/kg | > 2.4 g·m²/kg |

### Laticínios

| Indicador | Unidade | Nº | Média | Mediana | Faixa BAIXO | Faixa MÉDIO | Faixa ALTO |
|-----------|---------|----:|------:|--------:|-------------|-------------|------------|
| Carbono (CF) | gCO₂eq/kg | 93 | 580.4 | 330.0 | ≤ 210.5 gCO₂eq/kg | 210.5 – 514.4 gCO₂eq/kg | > 514.4 gCO₂eq/kg |
| Hídrica (WF) | L/kg | 32 | 1637.4 | 526.3 | ≤ 263.3 L/kg | 263.3 – 929.1 L/kg | > 929.1 L/kg |
| Terra (EF) | g·m²/kg | 19 | 3.1 | 1.9 | ≤ 1.5 g·m²/kg | 1.5 – 2.9 g·m²/kg | > 2.9 g·m²/kg |

### Ovos

| Indicador | Unidade | Nº | Média | Mediana | Faixa BAIXO | Faixa MÉDIO | Faixa ALTO |
|-----------|---------|----:|------:|--------:|-------------|-------------|------------|
| Carbono (CF) | gCO₂eq/kg | 136 | 16592.3 | 14761.1 | ≤ 5876.5 gCO₂eq/kg | 5876.5 – 19046.0 gCO₂eq/kg | > 19046.0 gCO₂eq/kg |
| Hídrica (WF) | L/kg | 32 | 11069.2 | 9750.1 | ≤ 7740.9 L/kg | 7740.9 – 13750.1 L/kg | > 13750.1 L/kg |
| Terra (EF) | g·m²/kg | 15 | 102.0 | 93.5 | ≤ 70.6 g·m²/kg | 70.6 – 100.5 g·m²/kg | > 100.5 g·m²/kg |

### Panificados

| Indicador | Unidade | Nº | Média | Mediana | Faixa BAIXO | Faixa MÉDIO | Faixa ALTO |
|-----------|---------|----:|------:|--------:|-------------|-------------|------------|
| Carbono (CF) | gCO₂eq/kg | 39 | 2683.9 | 2098.0 | ≤ 1381.6 gCO₂eq/kg | 1381.6 – 3186.0 gCO₂eq/kg | > 3186.0 gCO₂eq/kg |
| Hídrica (WF) | L/kg | 21 | 8851.5 | 6738.0 | ≤ 5396.4 L/kg | 5396.4 – 7007.7 L/kg | > 7007.7 L/kg |
| Terra (EF) | g·m²/kg | 2 | — | — | Dados insuficientes | — | — |

### Pescados

| Indicador | Unidade | Nº | Média | Mediana | Faixa BAIXO | Faixa MÉDIO | Faixa ALTO |
|-----------|---------|----:|------:|--------:|-------------|-------------|------------|
| Carbono (CF) | gCO₂eq/kg | 11 | 2243.6 | 1438.0 | ≤ 1195.9 gCO₂eq/kg | 1195.9 – 1536.0 gCO₂eq/kg | > 1536.0 gCO₂eq/kg |
| Hídrica (WF) | L/kg | 15 | 1294.4 | 471.8 | ≤ 379.0 L/kg | 379.0 – 1667.2 L/kg | > 1667.2 L/kg |
| Terra (EF) | g·m²/kg | 4 | 5.9 | 5.4 | ≤ 5.2 g·m²/kg | 5.2 – 5.5 g·m²/kg | > 5.5 g·m²/kg |

### Sais e Condimentos

| Indicador | Unidade | Nº | Média | Mediana | Faixa BAIXO | Faixa MÉDIO | Faixa ALTO |
|-----------|---------|----:|------:|--------:|-------------|-------------|------------|
| Carbono (CF) | gCO₂eq/kg | 84 | 1024.9 | 395.5 | ≤ 257.0 gCO₂eq/kg | 257.0 – 792.1 gCO₂eq/kg | > 792.1 gCO₂eq/kg |
| Hídrica (WF) | L/kg | 21 | 519.0 | 368.5 | ≤ 165.0 L/kg | 165.0 – 435.3 L/kg | > 435.3 L/kg |
| Terra (EF) | g·m²/kg | 22 | 1.7 | 1.3 | ≤ 1.2 g·m²/kg | 1.2 – 1.5 g·m²/kg | > 1.5 g·m²/kg |

### Óleos e Gorduras

| Indicador | Unidade | Nº | Média | Mediana | Faixa BAIXO | Faixa MÉDIO | Faixa ALTO |
|-----------|---------|----:|------:|--------:|-------------|-------------|------------|
| Carbono (CF) | gCO₂eq/kg | 10 | 3719.8 | 3177.0 | ≤ 1904.9 gCO₂eq/kg | 1904.9 – 3863.3 gCO₂eq/kg | > 3863.3 gCO₂eq/kg |
| Hídrica (WF) | L/kg | 0 | — | — | Dados insuficientes | — | — |
| Terra (EF) | g·m²/kg | 2 | — | — | Dados insuficientes | — | — |

---

## 5. Como Interpretar

- **BAIXO**: O alimento está entre o terço com menor impacto ambiental na sua categoria;
- **MÉDIO**: O alimento tem impacto intermediário, representativo da maioria do grupo;
- **ALTO**: O alimento está entre o terço com maior impacto ambiental na sua categoria.

> Os limiares calculados são usados como referência de catalogação no sistema **Lentilha**. A aplicação consulta esses valores para classificar alimentos em tempo real, exibindo ao usuário indicação visual de impacto para cada dimensão ambiental.
