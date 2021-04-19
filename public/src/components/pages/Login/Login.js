import React, { useState , useEffect} from 'react';
import { connect, useDispatch } from 'react-redux';
import {useHistory} from 'react-router-dom';
import {logIn} from '../../../services/redux/ducks/auth';
import './Login.css';

export const Login = (props) => {
    const dispatch = useDispatch();
    let history = useHistory();
    const [loginData, setLoginData] = useState({
        email:'',
        password:'',
        
    });

    const handleLogin = (e) => {
        e.preventDefault()
        logIn(email,password)(dispatch);
    }

    const {email, password} = loginData;

    return(
        <div className='wraper'>
            <div className="container">
            <div className="log-reg">
                    <div className="reg-row">
                        <h1 className="log-title">Log in</h1>
                    </div>
                </div>
    <span className="login-span">
                <div className="page-info-login">
                    <h2><span className="orange">Welcome to </span><span className="grey">Baby's</span></h2>
                    <p className="reg-txt-login">All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.
                        </p>
                </div> 
             
            <div className='login-form'>
            

                <form className='log-in' onSubmit={handleLogin}>

                <label>Email</label><br/>
                <input 
                type="email" 
                id='email' 
                className='form-control-login' 
                placeholder='user@domain.com' 
                value={email} 
                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}>
                </input>
                <br/>

                <label className='label'>Password</label><br/>
                <input 
                type="password" 
                id='password' 
                className='form-control-login' 
                placeholder='******' 
                value={password} 
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}>
                </input>  
                <br/>
                <button className="btn-lgn" type="submit">Login</button>                
                </form>
             </div>
 </span>
             </div>
        </div>
    )
}

export default Login;