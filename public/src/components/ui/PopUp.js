import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import {GET_POP_UP_RECIPE} from '../../services/rest/index';
import icon_time from '../../assets/img/icon_time.svg';
import icon_plate from '../../assets/img/icon_plate.svg';
import icon_star from '../../assets/img/icon_star.svg';
import icon_close from '../../assets/img/icon_close.svg';

import '../../assets/css/pop.css'

const PopUp = () => {
    const [data, setData] = useState('');
    const history = useHistory();
    const location = useLocation();
    const id = location.state.details

    const fetchPopUpRecipe = (id) => {
        return fetch(
            `${GET_POP_UP_RECIPE}${id}`,
            {
                method: "GET"
            }
        ).then(res => {
            return res.json()
        })
        .then(data => [
            setData(data)
        ])
    };

    useEffect(() => {
        fetchPopUpRecipe(id)
    },[id])

    const goBack = () => {
       history.goBack();
    }
    return( 
        <div className='blur'>
        <div  className='popup'>
            <div className='popup-inner'>
                <div className='popup-title-div'>
                    <h3 className='popup-title'>{data.recipe_title}</h3>
                   <span onClick={goBack}> <img className='close' src={icon_close} alt="" /></span>
                </div>
                <div className='popup-container'>
                <div className='popup-left'>
                        <img className='popup-img' src={`http://localhost:10002/api/v1/storage/${data.img}`} />
                           
                    <div className='popup-cat'>
                        <h5 className='cat-title'>Best Served For</h5>
                        <div className='green-cat'><p className='cat-p'>{data.category}</p></div>
                    </div>
                    <div className='popup-desc'>
                        <p>{data.short_description}</p>
                    </div>
                    <div className='popup-icons'>
                    <span><img src={icon_time} alt="" /></span><span className="time">{data.prep_time}</span>
                            <span><img src={icon_plate} alt="" /></span><span className="plate">{data.no_people}</span>
                            <span><img src={icon_star} alt="" /></span><span className="star">{data.rating}</span>
                    </div>
                </div>
                <div className='popup-right'>
                    <h5 className='cat-title'>Recipe Details</h5>
                    <p className='full-recipe'> {data.recipe}</p>
                </div>
                </div>
            </div>
        </div>
        </div>
    ) 
}

export default PopUp