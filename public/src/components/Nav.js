import React from 'react';
import {Link} from 'react-router-dom';

export class Nav extends React.Component {
        
    render(){
    return(
        <div>
            <ul>
                <li>
                    <Link to="/">Home / icon</Link>
                </li>
                <li>
                    <Link to="/breakfast">Breakfast</Link>
                </li>
                <li>
                    <Link to="/brunch">Brunch</Link>
                </li>
                <li>
                    <Link to="/lunch">Lunch</Link>
                </li>
                <li>
                    <Link to="/dinner">Dinner</Link>
                </li>
                <label>
                    {!this.props.data? 
                    <label>
                <li>
                    <Link to="/login">Login</Link>
                </li>
                <li>
                    <Link to="/createacount">Create acount</Link>
                </li></label>:
                <label>
                    <li>
                        <Link to="/my_profile">My Profile</Link>
                    </li>
                    <li>
                        <Link to="/my_recepies">My Recipes</Link>
                    </li>
                    <li>
                        <Link to="/add_recepie">Add Recipes</Link>
                    </li>
                </label>
                
                }
                </label>
            </ul>
        </div>
    )}
}