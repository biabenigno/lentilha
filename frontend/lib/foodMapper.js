/**
 * CATEGORY_THRESHOLDS: Official reference thresholds based on category averages.
 * Values: [Low threshold, High threshold]. If null, data is insufficient.
 */
const CATEGORY_THRESHOLDS = {
  'AÇÚCARES': {
    co2: [1772.0, 2394.1],
    water: [1143.7, 9508.9],
    land: null
  },
  'BEBIDAS': {
    co2: [2402.5, 6259.8],
    water: null,
    land: null
  },
  'CARNES': {
    co2: [1012.4, 2924.0],
    water: [1164.5, 16617.1],
    land: [7.6, 18.6]
  },
  'CEREAIS/LEGUM.': {
    co2: [483.9, 1621.8],
    water: [1169.2, 2444.1],
    land: [5.4, 9.9]
  },
  'EMBUTIDOS': {
    co2: [4888.0, 10868.0],
    water: [7092.1, 9640.0],
    land: null
  },
  'FRUTAS': {
    co2: [870.0, 1417.9],
    water: [1549.2, 2147.6],
    land: [8.7, 10.9]
  },
  'HORTALIÇAS': {
    co2: [140.0, 247.0],
    water: [453.3, 502.0],
    land: [1.1, 2.4]
  },
  'LATICÍNIOS': {
    co2: [210.5, 514.4],
    water: [263.3, 929.1],
    land: [1.5, 2.9]
  },
  'OVOS': {
    co2: [5876.5, 19046.0],
    water: [7740.9, 13750.1],
    land: [70.6, 100.5]
  },
  'PANIFICADOS': {
    co2: [1381.6, 3186.0],
    water: [5396.4, 7007.7],
    land: null
  },
  'PESCADOS': {
    co2: [1195.9, 1536.0],
    water: [379.0, 1667.2],
    land: [5.2, 5.5]
  },
  'SAIS/CONDIM.': {
    co2: [257.0, 792.1],
    water: [165.0, 435.3],
    land: [1.2, 1.5]
  },
  'ÓLEOS/GORD.': {
    co2: [1904.9, 3863.3],
    water: null,
    land: null
  }
};

/**
 * Mapping of the first two digits of the POF code to official categories.
 * Updated based on database evidence (POF 2017-2018 scientific base).
 */
const POF_GROUP_MAPPING = {
  "63": "CEREAIS/LEGUM.",
  "64": "HORTALIÇAS",
  "65": "CEREAIS/LEGUM.",
  "66": "CEREAIS/LEGUM.",
  "67": "HORTALIÇAS",
  "68": "FRUTAS",
  "69": "AÇÚCARES",
  "70": "SAIS/CONDIM.",
  "71": "CARNES",
  "72": "PESCADOS",
  "74": "PESCADOS",
  "76": "PESCADOS",
  "77": "SAIS/CONDIM.",
  "78": "CARNES",
  "79": "LATICÍNIOS",
  "80": "PANIFICADOS",
  "81": "EMBUTIDOS",
  "82": "BEBIDAS",
  "83": "BEBIDAS",
  "84": "ÓLEOS/GORD.",
  "85": "PANIFICADOS",
  "88": "HORTALIÇAS"
};

/**
 * Derives category from the official POF code with sub-group logic for composite dishes.
 */
function getCategory(pofCode) {
  if (!pofCode) return "SAIS/CONDIM.";
  const s = String(pofCode);
  const prefix = s.substring(0, 2);

  // Special logic for Composite Dishes (Group 85 - Refeições prontas e misturas)
  if (prefix === "85") {
    const subGroup = s.substring(2, 4);
    // Sub-groups 71 (Beef), 78 (Poultry) and 79 (Mixed meals/Carne com legumes)
    if (subGroup === "71" || subGroup === "78" || subGroup === "79") return "CARNES";
    // Sub-groups 72, 74, 76 (Fish/Seafood)
    if (subGroup === "72" || subGroup === "74" || subGroup === "76") return "PESCADOS";
    return "PANIFICADOS"; // Fallback for snacks and other composite dishes
  }

  return POF_GROUP_MAPPING[prefix] || "SAIS/CONDIM.";
}

const getLevel = (value, category, metric) => {
  const config = CATEGORY_THRESHOLDS[category]?.[metric];
  if (!config || value === null || value === undefined) return 'insuficiente';
  if (value < config[0]) return 'baixa';
  if (value < config[1]) return 'média';
  return 'alta';
};

const METADATA = {
  'baixa': {
    impactIcon: '/labels/pegada-baixa.svg',
    co2Icon: '/labels/custo-co2-bom.svg',
    aguaIcon: '/labels/custo-agua-bom.svg',
    terraIcon: '/labels/custo-terra-bom.svg',
    label: 'baixa',
    colorClass: 'text-green-600'
  },
  'média': {
    impactIcon: '/labels/pegada-media.svg',
    co2Icon: '/labels/custo-co2-medio.svg',
    aguaIcon: '/labels/custo-agua-medio.svg',
    terraIcon: '/labels/custo-terra-medio.svg',
    label: 'média',
    colorClass: 'text-yellow-600'
  },
  'alta': {
    impactIcon: '/labels/pegada-alta.svg',
    co2Icon: '/labels/custo-co2-ruim.svg',
    aguaIcon: '/labels/custo-agua-ruim.svg',
    terraIcon: '/labels/custo-terra-ruim.svg',
    label: 'alta',
    colorClass: 'text-red-600'
  },
  'insuficiente': {
    impactIcon: '/labels/pegada-baixa.svg', // Fallback, will be grayed out in UI
    co2Icon: '/labels/custo-co2-bom.svg',
    aguaIcon: '/labels/custo-agua-bom.svg',
    terraIcon: '/labels/custo-terra-bom.svg',
    label: 'dados insuficientes',
    colorClass: 'text-gray-400 grayscale opacity-60'
  }
};

export function mapBackendFoodToUI(backendFood) {
  if (!backendFood) return null;

  const category = getCategory(backendFood.pof_code);
  
  const co2Level = getLevel(backendFood.carbon_footprint, category, 'co2');
  const waterLevel = getLevel(backendFood.water_footprint, category, 'water');
  const landLevel = getLevel(backendFood.ecological_footprint, category, 'land');

  // Overall impact is the highest level of the three (ignoring 'insuficiente')
  const levels = [co2Level, waterLevel, landLevel].filter(l => l !== 'insuficiente');
  const overallLevel = levels.length === 0 ? 'insuficiente' : (levels.includes('alta') ? 'alta' : (levels.includes('média') ? 'média' : 'baixa'));

  const meta = METADATA[overallLevel];
  const co2Meta = METADATA[co2Level];
  const waterMeta = METADATA[waterLevel];
  const landMeta = METADATA[landLevel];

  return {
    id: backendFood.id,
    title: backendFood.name,
    nome: backendFood.name,
    categoria: category,
    descricao: backendFood.preparation_description || 'Descrição não disponível',
    imagem: '/placeholder.png', 
    impactLevel: overallLevel,
    impactIcon: meta.impactIcon,
    co2Icon: co2Meta.co2Icon,
    aguaIcon: waterMeta.aguaIcon,
    terraIcon: landMeta.terraIcon,
    
    // Impact classes for CSS
    co2Meta: co2Meta,
    aguaMeta: waterMeta,
    landMeta: landMeta,
    overallMeta: meta,

    // Raw footprints for dynamic calculations (equivalences)
    rawCarbon: backendFood.carbon_footprint || 0,
    rawWater: backendFood.water_footprint || 0,
    rawLand: backendFood.ecological_footprint || 0,
    
    alternativa: [], 

    co2Card: {
      title: "Emissão de CO₂",
      impactLevel: co2Level === 'insuficiente' ? 'baixa' : co2Level,
      badgeLabel: co2Meta.label,
      isInsufficient: co2Level === 'insuficiente',
      iconSrc: co2Meta.co2Icon,
      mainValue: co2Level === 'insuficiente' ? "Dados Insuficientes" : `~ ${backendFood.carbon_footprint?.toFixed(2) || 0} gCO₂e/100g`,
      mainDescription: "Quantidade de carbono emitido durante a produção do alimento.",
      details: [
        { subtitle: "Categoria", text: `Baseado na média para ${category}.` },
        { subtitle: "Resultado", text: co2Level === 'insuficiente' ? "Não há dados suficientes para classificar este item." : `Este valor representa um impacto ${co2Level}.` }
      ]
    },
    aguaCard: {
      title: "Gasto de água",
      impactLevel: waterLevel === 'insuficiente' ? 'baixa' : waterLevel,
      badgeLabel: waterMeta.label,
      isInsufficient: waterLevel === 'insuficiente',
      iconSrc: waterMeta.aguaIcon,
      mainValue: waterLevel === 'insuficiente' ? "Dados Insuficientes" : `~ ${backendFood.water_footprint?.toFixed(2) || 0} litros/100g`,
      mainDescription: "Água utilizada durante a produção do alimento.",
      details: [
        { subtitle: "WF Total", text: `Categoria: ${category}.` },
        { subtitle: "Resultado", text: waterLevel === 'insuficiente' ? "Não há dados suficientes." : `Consumo ${waterLevel}.` }
      ]
    },
    terraCard: {
      title: "Ocupação de terra",
      impactLevel: landLevel === 'insuficiente' ? 'baixa' : landLevel,
      badgeLabel: landMeta.label,
      isInsufficient: landLevel === 'insuficiente',
      iconSrc: landMeta.terraIcon,
      mainValue: landLevel === 'insuficiente' ? "Dados Insuficientes" : `~ ${backendFood.ecological_footprint?.toFixed(2) || 0} m²/100g`,
      mainDescription: "Terra ocupada para a produção do alimento.",
      details: [
        { subtitle: "EF Total", text: `Categoria: ${category}.` },
        { subtitle: "Resultado", text: landLevel === 'insuficiente' ? "Não há dados suficientes." : `Ocupação ${landLevel}.` }
      ]
    }
  };
}

export function mapBackendDetailToUI(backendDetail) {
  if (!backendDetail) return null;
  const uiFood = mapBackendFoodToUI(backendDetail.food);
  const uiSuggestion = backendDetail.lower_impact_suggestion ? mapBackendFoodToUI(backendDetail.lower_impact_suggestion) : null;
  if (uiSuggestion) {
    uiFood.alternativa = [{
      title: uiSuggestion.title,
      description: `Recomendamos a substituição por ${uiSuggestion.title}, que possui impacto reduzido na categoria ${uiSuggestion.categoria}.`
    }];
  }
  return uiFood;
}
