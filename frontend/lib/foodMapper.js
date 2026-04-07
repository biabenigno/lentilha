/**
 * foodMapper.js
 * Utility to map backend raw footprint data into the rich format expected by the Lentilha UI.
 */

const getLevel = (value, thresholds) => {
  if (value === null || value === undefined) return 'média';
  if (value < thresholds.low) return 'baixa';
  if (value < thresholds.high) return 'média';
  return 'alta';
};

const THRESHOLDS = {
  co2: { low: 300, high: 800 },
  water: { low: 200, high: 600 },
  land: { low: 2, high: 5 }
};

const METADATA = {
  baixa: {
    impactIcon: '/labels/pegada-baixa.svg',
    co2Icon: '/labels/custo-co2-bom.svg',
    aguaIcon: '/labels/custo-agua-bom.svg',
    terraIcon: '/labels/custo-terra-bom.svg',
    label: 'baixa'
  },
  média: {
    impactIcon: '/labels/pegada-media.svg',
    co2Icon: '/labels/custo-co2-medio.svg',
    aguaIcon: '/labels/custo-agua-medio.svg',
    terraIcon: '/labels/custo-terra-medio.svg',
    label: 'média'
  },
  alta: {
    impactIcon: '/labels/pegada-alta.svg',
    co2Icon: '/labels/custo-co2-ruim.svg',
    aguaIcon: '/labels/custo-agua-ruim.svg',
    terraIcon: '/labels/custo-terra-ruim.svg',
    label: 'alta'
  }
};

export function mapBackendFoodToUI(backendFood) {
  if (!backendFood) return null;

  const co2Level = getLevel(backendFood.carbon_footprint, THRESHOLDS.co2);
  const waterLevel = getLevel(backendFood.water_footprint, THRESHOLDS.water);
  const landLevel = getLevel(backendFood.ecological_footprint, THRESHOLDS.land);

  // Overall impact is the highest level of the three
  const levels = [co2Level, waterLevel, landLevel];
  const overallLevel = levels.includes('alta') ? 'alta' : (levels.includes('média') ? 'média' : 'baixa');

  const meta = METADATA[overallLevel];
  const co2Meta = METADATA[co2Level];
  const waterMeta = METADATA[waterLevel];
  const landMeta = METADATA[landLevel];

  // Equivalency logic (rough estimates)
  const carKm = (backendFood.carbon_footprint / 180).toFixed(1); // ~180g CO2 per km
  const showerMinutes = (backendFood.water_footprint / 15).toFixed(0); // ~15L per min
  const houseArea = (backendFood.ecological_footprint).toFixed(1);

  return {
    id: backendFood.id,
    title: backendFood.name,
    nome: backendFood.name,
    descricao: backendFood.preparation_description || 'Descrição não disponível',
    imagem: '/placeholder.png', // Generic placeholder for real DB items
    impactLevel: overallLevel,
    impactIcon: meta.impactIcon,
    co2Icon: co2Meta.co2Icon,
    aguaIcon: waterMeta.aguaIcon,
    terraIcon: landMeta.terraIcon,
    
    // Suggestion logic could be improved by backend suggestions
    alternativa: [], 

    co2Card: {
      title: "Emissão de CO₂",
      impactLevel: co2Level,
      iconSrc: co2Meta.co2Icon,
      mainValue: `~ ${backendFood.carbon_footprint?.toFixed(2) || 0} gCO₂e/100g`,
      mainDescription: "Quantidade de carbono emitido durante a produção do alimento.",
      details: [
        { subtitle: "Composição", text: `Este valor de ${backendFood.carbon_footprint?.toFixed(2)} gCO₂e representa um impacto ${co2Level} para o meio ambiente.` },
        { subtitle: "Equivalência", text: `Isso equivale a cerca de ${carKm} quilômetros percorridos por um carro a gasolina.` }
      ]
    },
    aguaCard: {
      title: "Gasto de água",
      impactLevel: waterLevel,
      iconSrc: waterMeta.aguaIcon,
      mainValue: `~ ${backendFood.water_footprint?.toFixed(2) || 0} litros/100g`,
      mainDescription: "Água utilizada durante a produção do alimento.",
      details: [
        { subtitle: "WF Total", text: `São utilizados aproximadamente ${backendFood.water_footprint?.toFixed(2)} litros de água para cada 100g.` },
        { subtitle: "Equivalência", text: `O uso de ${backendFood.water_footprint?.toFixed(0)} litros equivale a ${showerMinutes} minutos de banho.` }
      ]
    },
    terraCard: {
      title: "Ocupação de terra",
      impactLevel: landLevel,
      iconSrc: landMeta.terraIcon,
      mainValue: `~ ${backendFood.ecological_footprint?.toFixed(2) || 0} m²/100g`,
      mainDescription: "Terra ocupada para a produção do alimento.",
      details: [
        { subtitle: "EF Total", text: `A pegada ecológica é de ${backendFood.ecological_footprint?.toFixed(2)} m² por porção.` },
        { subtitle: "Equivalência", text: `A área ocupada (${houseArea} m²) é equivalente ao espaço de uma mesa de trabalho.` }
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
      description: `Recomendamos a substituição por ${uiSuggestion.title}, que possui um impacto ambiental consideravelmente menor em carbono e água.`
    }];
  }
  
  return uiFood;
}
