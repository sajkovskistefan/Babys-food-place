import React from 'react';
import { useEffect, useState } from 'react';
import Card from './Card/Card';
import {useDispatch, useSelector} from 'react-redux';


import {getPopularRecipes} from '../../services/redux/ducks/recipes';
import {fetchPopularRecipes} from '../../services/rest/recipes';

import '../../assets/css/card_list.css'



export const MostPopularRecipes = () => {
    const [popularRecipes, setpopularRecipes] = useState([])

    useEffect(() => {
        makePopularRecipes()
    },[]);

    const makePopularRecipes = () => {
        fetchPopularRecipes()
        .then(popularRecipes => {
            setpopularRecipes(popularRecipes)
        })
        .catch (err => {
            console.log(err)
        }) 
    }
    console.log(popularRecipes)

    return(
        <div className="most-stared">
            <div className="div-title" >
                <h2 className="title-popular" >Popular</h2>
            </div>
            <div className="date-div">
                <div className="recipes-date">
                    <Card data={popularRecipes} />
                </div>
            </div>
        </div>
    )


}

export default MostPopularRecipes