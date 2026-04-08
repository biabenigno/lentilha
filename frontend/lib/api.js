const API_BASE_URL = 'http://localhost:9000';

export async function searchFoods(query, page = 1, perPage = 10) {
  try {
    const response = await fetch(`${API_BASE_URL}/foods/search?query=${encodeURIComponent(query)}&page=${page}&per_page=${perPage}`);
    if (!response.ok) throw new Error(`HTTP Error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('ERRO DE REDE (PESQUISA): Verifique se o backend está rodando em http://localhost:9000', error);
    return { items: [], total: 0 };
  }
}

export async function getFoodDetail(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/foods/${id}`);
    if (!response.ok) throw new Error('Failed to fetch food detail');
    return await response.json();
  } catch (error) {
    console.error('API Error (getFoodDetail):', error);
    return null;
  }
}

export async function addFoodToMeal(foodId, name, userId = 1) {
  try {
    const response = await fetch(`${API_BASE_URL}/meals/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: Number(userId),
        food_id: Number(foodId),
        name: String(name),
        description: 'Adicionado via pesquisa'
      })
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Erro ${response.status}: ${JSON.stringify(errorData)}`);
    }
    return await response.json();
  } catch (error) {
    console.error('ERRO DE REDE (ADICIONAR MEAL): O backend respondeu?', error);
    return null;
  }
}

export async function getUserMeals(userId = 1) {
  try {
    const response = await fetch(`${API_BASE_URL}/meals/user/${userId}`);
    if (!response.ok) throw new Error('Failed to fetch user meals');
    return await response.json();
  } catch (error) {
    console.error('API Error (getUserMeals):', error);
    return { items: [], total: 0 };
  }
}

export async function clearUserMeals(userId = 1) {
  try {
    const response = await fetch(`${API_BASE_URL}/meals/user/${userId}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      const errorMsg = await response.text();
      console.error(`Falha ao limpar: Status ${response.status} - ${errorMsg}`);
      throw new Error(`Failed to clear user meals (Status ${response.status})`);
    }
    return await response.json();
  } catch (error) {
    console.error('ERRO CRÍTICO (clearUserMeals):', error);
    return null;
  }
}
