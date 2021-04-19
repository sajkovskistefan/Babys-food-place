import React, { useState } from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import ROUTES from '../../../constants/routes';
import { getToken, removeUserStorage} from '../../../services/helpers/StorageFunctions';
import {logOut} from '../../../services/redux/ducks/auth';
import logo_color from '../../../assets/img/logo_color.svg'
import './NavBar.css';

const NavBar = () => {
    const [count, setCount] = useState(0)
    const history = useHistory();
    const dispatch = useDispatch();
    const logingOut = () => {
        logOut()(dispatch)
        setCount(count => count + 1)
       
    };
    return(
    <div className="navigation">
                <Link to={ROUTES.ALL} > <img src={logo_color} alt="logo" className="logo" /> </Link>
        <div className="navbar">
            <ul className="nav-link" >
                <li>
                    <NavLink to={ROUTES.BREAKFAST} className="link-item" >Breakfast</NavLink>
                </li>
                <li className="circle" ></li>
                <li>
                    <NavLink to={ROUTES.BRUNCH} className="link-item"  >Brunch</NavLink>
                </li>
                <li className="circle"></li>
                <li>
                    <NavLink to={ROUTES.LUNCH} className="link-item"  >Lunch</NavLink>
                </li>
                <li className="circle" ></li>
                <li>
                    <NavLink to={ROUTES.DINNER} className="link-item"  >Dinner</NavLink>
                </li>
            </ul>
            {!getToken()  ? 
            <div className="btn-group">
                <Link to={ROUTES.LOGIN} >
                    <button className="btn-login">LOG IN</button>
                </Link>
                <p className="spacer" >or</p>
                <Link to={ROUTES.CREATE_ACC} >
                    <button className="btn-singup" >CREATE ACCOUNT</button>
                </Link>
            </div>
            :
            <div className='btn-group'>              
            <ul className='profileNav'>
                <li className='toggle-li'><Link className='link-one' to={ROUTES.MY_RECIPES}>my recipes</Link></li>
                <li className='toggle-li'><Link className='link-two' to={ROUTES.MY_PROFILE}>my profile</Link></li>
                <li className='toggle-li'><Link className='link-three' to={ROUTES.LOGIN} onClick={logingOut}>log out</Link></li>
            </ul>
            
        </div> 
            }
        </div>
    </div>
    )
}

export default NavBar