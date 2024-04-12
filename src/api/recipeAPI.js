import axios from 'axios';

export const getRecipeList = async ()  => {
    try {
      const response = await axios.get('/');
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
