import axios from 'axios';

export const getRecipeList = async (limit, offset)  => {
    try {
      const response = await axios.get('/', { 
        params: {
          limit: limit,
          offset: offset
        }
      });
      return response.data;
    } catch (error) {
      console.error("Get recipe list error: " + error);
    }  
}

export const getRecipe = async (id)  => {
  try {
    const response = await axios.get(`/${id}`);
    return response.data;
  } catch (error) {
    console.error("Get recipe error: " + error);
  }  
}

export const deleteRecipe = async (id)  => {
  try {
    const response = await axios.post(`/${id}`);
    return response.data;
  } catch (error) {
    console.error("Get recipe error: " + error);
  }  
}
