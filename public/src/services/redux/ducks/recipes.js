import { getAllRecipes, getRecipesByCat, fetchPopularRecipes } from '../../rest/recipes';
import {getToken} from '../../helpers/StorageFunctions';
import axios from 'axios';

const RECIPES_DATA = 'RECIPES_DATA';
const RECIPES_BY_CAT = 'RECIPES_BY_CAT';
const POPULAR_RECIPES = 'POPULAR_RECIPES';
const SAVE_RECIPE = 'SAVE_RECIPE';

const initState = {
    data: [],
    dataPopular: []
}

export const recipesReducer = (state = initState, action) => {
    switch(action.type){
        case RECIPES_DATA:
            return {
                ...state,
                data: action.payload
            };
        case RECIPES_BY_CAT:
            return {
                ...state,
                data: action.payload
            }
        case POPULAR_RECIPES: 
            return {
            ...state,
            dataPopular: action.payload
            }
        case SAVE_RECIPE:
            return{
                ...state,
                data:action.payload
            }
            default:
                return state
    };
};

const setRecipes = (data) => {
    return {
        type: RECIPES_DATA,
        payload: data
    };
};

const setDataByCategory = (data) => {
    return {
        type: RECIPES_BY_CAT,
        payload: data
    }
}

const setPopularRecipes = (dataPopular) => {
    return {
        type: POPULAR_RECIPES,
        payload: dataPopular
    }
}

export const getRecipes = () => {
    return (dispatch) => {
        getAllRecipes()
        .then(data => {
            dispatch(setRecipes(data))
        })
        .catch(err => {
            console.log(err)
        });
    };
};

export const getPopularRecipes = () => {
    return (dispatch) => {
        fetchPopularRecipes()
        .then(dataPopular => {
            dispatch(setPopularRecipes(dataPopular))
        })
        .catch(err => {
            console.log(err)
        })
    }
}

export const getRecipesByData = (cat) => {
    return (dispatch) => {
        getRecipesByCat(cat)
        .then(data => {
            dispatch(setDataByCategory(data))
        })
    }
};




const token = getToken()

export const saveRecipe = (recipe_title, category, prep_time, no_people, short_description, recipe, img) =>async(dispatch) => {
    const config = {
        headers:{
            'Content-Type':'application/json',
            'Authorization': `Bearer ${token}`
        }
    }
    const body = {recipe_title, category, prep_time, no_people, short_description, recipe, img}
    console.log(body)
   try {
       const response = await axios.post('http://localhost:10004/api/v1/recipes', body, config)

       dispatch({
           type:SAVE_RECIPE,
           payload:response
       })
    } catch (error) {
       console.log(error);
   }
}