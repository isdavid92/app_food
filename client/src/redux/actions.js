import axios from 'axios';
import { ADD_NAME, ADD_PAGE, SET_LAST_ROUTE, ADD_DIET, SET_DIETS, GET_RECIPESDB, GET_RECIPES_TITLE, SET_RECIPES_FOUND, ADD_RECIPES, ADD_RECIPE, REMOVE_RECIPE, FILTER_DIETS, FILTER_ORIGIN, ORDER_AZ, ORDER_LM } from "./actions_types";

const URL = 'http://localhost:3001/';

export const addName = (name) => {
    try {
        return async (dispatch) => {
            return dispatch({
                type: ADD_NAME,
                payload: name
            })
        }
    } catch (error) {
        console.log(error);
    } 
};

export const addPage = (page) => {
    try {
        return async (dispatch) => {
            return dispatch({
                type: ADD_PAGE,
                payload: page
            })
        }
    } catch (error) {
        console.log(error);
    } 
};

export const setLastRoute = (route) => {
    try {
        return async (dispatch) => {
            return dispatch({
                type: SET_LAST_ROUTE,
                payload: route
            })
        }
    } catch (error) {
        console.log(error);
    } 
};

export const addDiet = (diet) => {
    try {
        return async (dispatch) => {
            return dispatch({
                type: ADD_DIET,
                payload: diet
            })
        }
    } catch (error) {
        console.log(error);
    } 
};

export const setDiets = () => {
    try {
        return async (dispatch) => {
            return dispatch({
                type: SET_DIETS
            })
        }
    } catch (error) {
        console.log(error);
    } 
};

export const getRecipesDB = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(`${URL}database`);
            return dispatch({
                type: GET_RECIPESDB,
                payload: data
            });
        } catch (error) {
            console.log(error);
        }
    };
};

export const getRecipesTitle = (title) => {
    try {
        return async (dispatch) => {
            const num = Number(title)
            if (!isNaN(num)) {
                const response = await axios.get(`${URL}recipes/${num}`);
                const data = [response.data]
                return dispatch({
                    type: GET_RECIPES_TITLE,
                    payload: data
                })
            } else {
                const { data } = await axios.get(`${URL}recipes/title/${title}`);
                const ids = data.map(recipe => recipe.id).join(',');
                if (data.length>0) {
                    const recipes = await axios.get(`${URL}recipes/bulk/${ids}`);
                    const dataFound = recipes.data;
                    return dispatch({
                        type: GET_RECIPES_TITLE,
                        payload: dataFound
                    })
                } else {
                    const recipeNoFound = ['There are no matches with the name and the recipe'];
                    return dispatch({
                        type: GET_RECIPES_TITLE,
                        payload: recipeNoFound
                    })
                }
            } 
        }
    } catch (error) {
        console.log(error);
    } 
};

export const setRecipesFound = () => {
    try {
        return async (dispatch) => {
            return dispatch({
                type: SET_RECIPES_FOUND,
            }) 
        }
    } catch (error) {
        console.log(error);
    } 
};

export const addRecipes = (recipes) => {
    try {
        return async (dispatch) => {
            return dispatch({
                        type: ADD_RECIPES,
                        payload: recipes
                    })
        };
    } catch (error) {
        console.log(error);
    }
};

export const addRecipe = (recipe) => {
    try {
        const dietToString = (dits) => {
            const ToStringdiets = dits.map(diet => {
                if (diet == 1) return "gluten free";
                if (diet == 2) return "dairy free";
                if (diet == 3) return "paleolithic";
                if (diet == 4) return "primal";
                if (diet == 5) return "fodmap friendly";
                if (diet == 6) return "whole 30";
                if (diet == 7) return "pescatarian";
                if (diet == 8) return "pescatarian";
                if (diet == 9) return "vegan";
                if (diet == 10) return "ketogenic";
            });
            return ToStringdiets 
        };
        return async (dispatch) => {
            const origin = 'data base'
            const steps = [{number:1, step:recipe.steps}];
            const diets = dietToString(recipe.diets)
            const recipeOrigin = {...recipe, origin, steps, diets };
            await axios.post(`${URL}recipes`, recipe);
            return dispatch({
                        type: ADD_RECIPE,
                        payload: recipeOrigin
                    })
        };
    } catch (error) {
        console.log(error);
    }
};

// export const removeRecipe = (id) => {
//     try {
//         return async (dispatch) => {
//             const { data } = await axios.delete(`${URL}recipes/${id}`);
//             return dispatch({
//                 type: REMOVE_RECIPE,
//                 payload: data
//             })
//         };
//     } catch (error) {
//         console.log(error);
//     }
// };

export const filterRecipesByDiets = (recipes) => {
    return {
        type: FILTER_DIETS,
        payload: recipes
    }
};

export const filterRecipesByOrigin = (gender) => {
    return {
        type: FILTER_ORIGIN,
        payload: gender
    }
};

export const orderRecipesAZ = (orden) => {
    return {
        type: ORDER_AZ,
        payload: orden
    }
};

export const orderRecipesLM = (orden) => {
    return {
        type: ORDER_LM,
        payload: orden
    }
};