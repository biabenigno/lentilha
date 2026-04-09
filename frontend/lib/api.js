const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '/api';
/**
 * Resolves the default userId based on the current test mode stored in localStorage.
 * Test A = User 1
 * Test B = User 2
 */
export function getUserId() {
  if (typeof window === 'undefined') return 1;
  const mode = localStorage.getItem("lentilha-test-mode");
  return mode === "B" ? 2 : 1;
}

export async function searchFoods(query, page = 1, perPage = 10) {
  try {
    const response = await fetch(`${API_BASE_URL}/foods/search?query=${encodeURIComponent(query)}&page=${page}&per_page=${perPage}`);
    if (!response.ok) throw new Error(`HTTP Error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error(`ERRO DE REDE (PESQUISA): Verifique se o backend está rodando em ${API_BASE_URL}`, error);
    return { items: [], total: 0 };
  }
}

export async function getFoodDetail(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/foods/${id}`);
    if (!response.ok) {
      if (response.status !== 404) {
        console.error(`API Error (getFoodDetail): status ${response.status}`);
      }
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error('API Error (getFoodDetail):', error);
    return null;
  }
}

export async function addFoodToMeal(foodId, name, userId = getUserId()) {
  try {
    const response = await fetch(`${API_BASE_URL}/meals`, {
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

export async function getUserMeals(userId = getUserId()) {
  try {
    const response = await fetch(`${API_BASE_URL}/meals/user/${userId}`);
    if (!response.ok) throw new Error('Failed to fetch user meals');
    return await response.json();
  } catch (error) {
    console.error('API Error (getUserMeals):', error);
    return { items: [], total: 0 };
  }
}

export async function clearUserMeals(userId = getUserId()) {
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

export async function deleteUserMeal(mealId) {
  try {
    const response = await fetch(`${API_BASE_URL}/meals/${mealId}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error(`Failed to delete meal ${mealId}`);
    }
    return await response.json();
  } catch (error) {
    console.error('API Error (deleteUserMeal):', error);
    return null;
  }
}
