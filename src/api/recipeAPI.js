import axios from 'axios';

export async function getRecipeList(limit, offset) {
    try {
      const response = await axios.get('/', { 
        params: {
          limit: limit,
          offset: offset
        }
      });
      console.log("js methode")
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Get recipe list error: " + error);
    }  
}