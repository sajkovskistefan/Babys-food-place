import React from 'react';

export class Lunch extends React.Component {
    
    render(){
        return(
            <div>
                <h2>Lunch</h2>
                {this.props.recepies && this.props.recepies.filter(recipe => recipe.category === "Lunch").map((recept,i)=>{
                   return(
                       <div key={recept._id}>
                           <img src="" alt="" />
                           <h4>{recept.recipe_title}</h4>
                           <p> {recept.short_description} </p>
                           <p> {recept.prep_time}mins  {recept.no_people} people </p>
                       </div>
                   )
               }) }
            </div>
        )
    }
}