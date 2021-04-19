import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useHistory} from 'react-router-dom';
import {register} from '../../../services/redux/ducks/auth';
import './CreateAccount.css';

export const CreateAccount = (props) => {
    const dispatch = useDispatch();
    let history = useHistory();
    const [registrationData, setRegistrationData] = useState({
        firstName:"",
        lastName:"",
        email:"",
        birthday:"",
        password:"",
        repeatPassword:""
    })
    
    const { firstName, lastName, email, birthday, password, repeatPassword} = registrationData;

    const handleSubmit = (e) => {
        e.preventDefault()
        if(password === repeatPassword){
            register( firstName, lastName, email, birthday, password, repeatPassword)(dispatch)
            props.history.push("/login")
        }else{
            alert('Password and Repeat Password do not match!')
        }
        
        
    }
    return(
        <div className='wraper'>
            <div className="container">
                <div className="header-reg">
                    <div className="reg-row">
                        <h1 className="reg-title">Create Account</h1>
                    </div>
                </div>

    <span className="span-flex">
                <div className="col-span-1-of-3">
                    <div className="page-info">                    
                        <h2><span className="orange">Create your</span><span className="grey"><br />Account</span></h2>
                            <p className="reg-txt">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid nisi, quia
                                eaque,
                                dolore ipsum
                                omnis esse fugiat distinctio id aspernatur numquam nam exercitationem minima maiores. Provident
                                accusamus impedit quos a erit, placeat perferendis, nesciunt consectetur
                                ducimus eligendi facilis id quo voluptatibus sunt, harum odio adipisci ipsa totam!
                            </p>                    
                    </div>
                </div>


            

            <form onSubmit={handleSubmit}>

            <div className="reg-form">

            <div className="col-span-2-of-3">   

            

                <label>First Name</label>
                <input 
                type="text"
                id='firstName' 
                className='form-control' 
                placeholder='John' 
                value={firstName} 
                onChange={(e) => setRegistrationData({ ...registrationData, firstName: e.target.value })}>
                </input>
                

                <label className="label-reg">Email</label>
                <input 
                type="email" 
                id='email' 
                className='form-control' 
                placeholder='john@smith.com'  
                value={email} 
                onChange={(e) => setRegistrationData({ ...registrationData, email: e.target.value })}>
                </input>
                

                <label className="label-reg">Password</label>
                <input 
                type="password" 
                id='password' 
                className='form-control' 
                placeholder='******'  
                value={password} 
                onChange={(e) => setRegistrationData({ ...registrationData, password: e.target.value })}>
                </input>  
                 
            </div>

            <div className="col-span-2-of-3">
        
                <label>Last Name</label>
                <input 
                type="text" 
                id='lastName' 
                className='form-control' 
                placeholder='Smith'  
                value={lastName} 
                onChange={(e) => setRegistrationData({ ...registrationData, lastName: e.target.value })}>
                </input>
                
                

                <label className="label-reg" >Birthday</label>
                <input 
                type="date" 
                id='birthday' 
                className='form-control' 
                placeholder='22-12-1999'  
                value={birthday} 
                onChange={(e) => setRegistrationData({ ...registrationData, birthday: e.target.value })}>
                </input>     
                

                <label className="label-reg" >Repeat Password</label>
                <input 
                type="password" 
                id='repeatPassword' 
                className='form-control' 
                placeholder='******'  
                value={repeatPassword} 
                onChange={(e) => setRegistrationData({ ...registrationData, repeatPassword: e.target.value })}>
                </input>
                
            </div>    

            </div>
                
                <button className="btn-reg"  type="submit">Create Account</button>
            </form>

            </span>
            </div>
            </div>
        
    )
};

export default CreateAccount;