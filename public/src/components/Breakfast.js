import React from 'react';

export class Breakfast extends React.Component{
    render(){
        // console.log(this.props)
        return(
            <div>
                <h2>Breakfast</h2>
               {this.props.recepies && this.props.recepies.filter(recipe => recipe.category === "Breakfast").map((recept,i)=>{
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