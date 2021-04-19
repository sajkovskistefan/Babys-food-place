import React from 'react';
import FreshAndNew from '../../ui/FreshAndNew';
import MostPopularRecipes from '../../ui/MostPopularRecipes';


export const HomePage = (props) => {
    
    return(
        <div className="home-page">
            <FreshAndNew/>
            <MostPopularRecipes/>
        </div>
    )


}