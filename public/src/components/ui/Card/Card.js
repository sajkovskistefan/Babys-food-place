import React, { useState } from 'react';
import icon_time from '../../../assets/img/icon_time.svg';
import icon_plate from '../../../assets/img/icon_plate.svg';
import icon_star from '../../../assets/img/icon_star.svg';
import icon_arrows_white from '../../../assets/img/icon_arrows_white.svg';
import './Card.css'

import { useHistory, withRouter } from 'react-router-dom';
import ROUTES from '../../../constants/routes';

const Card = (props) => {
    const history = useHistory();
    const [recipe, setRecipe] = useState(props.data.data)
    const [recipes, setrecipes] = useState(props.data.data)
        console.log(props)
    const starOne = (_id) => {
        fetch(`http://localhost:10004/api/v1/recipes/${_id}/rate`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            }
        }).then(res=>res.json())
        .then(res => {
            const newRecipe = [...props.data];
            if(res){
                newRecipe.forEach(element => {
                    if(element._id === _id) element.rating ++;
                });
            }
            setRecipe(newRecipe)
        })
        .catch(err=>{
            console.log(err)
        })
    }
    return(
        <section className="div-card">
       { props.data && props.data ? props.data.map(d => {
            let isoDate = new Date(d.created);
            let localDate = isoDate.toLocaleDateString();
            const goToPopUp = () => {
                history.push({
                    pathname: ROUTES.POPUP,
                    search: "?query=abc",
                    state: {details: d._id}
                })
            }
            return(
                <div className="recipe-card" key={d._id} >
                    <div className="image-pos">
                    <p className="card-cat"> {d.category} </p>
                    <img className="card-img" src={`http://localhost:10002/api/v1/storage/${d.img}`} alt="recipe-photo" />
                    </div>
                    <div className="card-container">
                    <h3 className="card-title" > {d.recipe_title} </h3>
                    <p className="card-desc" > {d.short_description} </p>
                    <div className="card-icons">
                        <div className="icons-left">
                        <span> <img src={icon_time} alt=""/></span><span className="time">{d.prep_time} min</span>
                        <span> <img src={icon_plate} alt=""/></span><span className="plate" > {d.no_people} persons</span>
                        <span onClick={()=>{starOne(d._id)}} > <img src={icon_star} alt="" /></span><span className="star">{d.rating}</span>
                        </div>
                        <div className="icon-right">
                            <span onClick={goToPopUp}> <img src={icon_arrows_white} alt=""/> </span>
                        </div>
                    </div>
                    </div>
                </div>
            )
        })
        : "err"}
        </section>

)
}

export default withRouter(Card)