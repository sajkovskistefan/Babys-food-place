import React from 'react';
import { useEffect, useState } from 'react';
import Card from './Card/Card';
import {useDispatch, useSelector} from 'react-redux';
import {getAllRecipes} from '../../services/rest/recipes';


// import {getRecipes} from '../../services/redux/ducks/recipes';

import '../../assets/css/card_list.css'


export const FreshAndNew = () => {
    const [newRecipes, setnewRecipes] = useState([])

    useEffect(() => {
        fetchFreshRecipes()
    },[]);

    const fetchFreshRecipes = () => {
        getAllRecipes()
        .then(newRecipes => {
            setnewRecipes(newRecipes);
        })
        .catch (err => {
            console.log(err)
        })
    }

    return(
        <div className="getByPubDate">
            <div className="div-title" >
                 <h2 className="title-fresh" >Fresh & New </h2>
            </div>
            <div className="date-div">
                <div className="recipes-date">
                    <Card data={newRecipes} />
                </div>
            </div>
        </div>
    )


}

export default FreshAndNew