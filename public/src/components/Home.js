import React from 'react';

export class Home extends React.Component{
    render(){
        if(this.props.recepies){
        var recepti = this.props.recepies.slice(-3);
        console.log(recepti)
        }
        console.log(this.props)
        return(
            <div>
                <div>
                    <h2>Fresh and new</h2>
                </div>
                    
                {recepti && recepti.map((recept,i)=>{
                    return(
                        <div key={recept._id}>
                            <img src="" alt="" />
                            <h3> {recept.recipe_title} </h3>
                            <p> {recept.short_description} </p>
                            <p> {recept.prep_time}mins  {recept.no_people} people </p>
                        </div>
                    )
                })}
                <br/><br/><hr/><br/>

                <div>
                    <h3>Most popular recipes</h3>
                    {this.props.recepies && this.props.recepies.map((recipe,i)=>{
                        return(
                            <div key={recipe._id}>
                                <h3> {recipe.recipe_title} </h3>
                                <p> {recipe.short_description} </p>
                                <p> {recipe.prep_time}mins {recipe.no_people} </p>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}