import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getRecipesByData } from '../../services/redux/ducks/recipes';
import { getRecipesByCat } from '../../services/rest/recipes';
import Card from '../ui/Card/Card';

import '../../assets/css/card_list.css'


const Category = () => {

    const [data, setData] = useState([]);

    const { cat } = useParams();
    useEffect(() => {
        fetchRecipesByCat()
        
    },[cat])

    const fetchRecipesByCat = () => {
        getRecipesByCat(cat)
        .then(data => {
            setData(data)
        })
        .catch(err => {
            console.log(err)
        })
    }
    const [title, setTitle] = useState('');
    useEffect(()=>{
        pageTitle(cat);
    }, [cat])
  
    const pageTitle = (cat) => {
        switch(cat) {
            case "breakfast":
                setTitle("Breakfast");
                break;
            case "brunch":
                setTitle("Brunch");
                break;
            case "lunch":
                setTitle("Lunch");
                break;
            case "dinner":
                setTitle("Dinner");
                break;
        }
    }

    return (
        <div className="getByPubDate">
            <div className="div-title">
            <h2 className="title-fresh">{title}</h2>
            </div>
            <div className="" >
                <div className="recipes-date">
                <Card data={data} />
                </div>
            </div>
        </div>
    )
}

export default Category