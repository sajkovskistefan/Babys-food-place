import { LATEST_RECIPES, RECIPES_BY_CAT, MOST_POPULAR_RECIPES, GET_POP_UP_RECIPE } from './index';

export const getAllRecipes = () => {
    return fetch(
        `${LATEST_RECIPES}`,
        {
            method: "GET"
        }
    ).then(res => {
        return res.json()
    })
};

export const fetchPopularRecipes = () => {
    return fetch (
        `${MOST_POPULAR_RECIPES}`,
        {
            method: "GET"
        }
    ).then(res => {
        return res.json()
    })
}

export const getRecipesByCat = (cat) => {
    console.log(cat);
    return fetch(
        `${RECIPES_BY_CAT}${cat}`,
        {
            method: "GET"
        }
    ).then(res => {
        return res.json();
    });
};

export const fetchPopUpRecipe = (id) => {
    return fetch(
        `${GET_POP_UP_RECIPE}${id}`,
        {
            method: "GET"
        }
    ).then(res => {
        return res.json()
    })
};