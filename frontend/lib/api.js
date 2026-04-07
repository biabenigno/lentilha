const API_BASE_URL = 'http://127.0.0.1:9000';

export async function searchFoods(query, page = 1, perPage = 10) {
  try {
    const response = await fetch(`${API_BASE_URL}/foods/search?query=${encodeURIComponent(query)}&page=${page}&per_page=${perPage}`);
    if (!response.ok) throw new Error('Failed to fetch foods');
    return await response.ok ? await response.json() : { items: [], total: 0 };
  } catch (error) {
    console.error('API Error (searchFoods):', error);
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
        user_id: userId,
        food_id: foodId,
        name: name,
        description: 'Adicionado via pesquisa'
      })
    });
    if (!response.ok) throw new Error('Failed to add food to meal');
    return await response.json();
  } catch (error) {
    console.error('API Error (addFoodToMeal):', error);
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
