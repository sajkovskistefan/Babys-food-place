// import axios from 'axios';
import React from 'react';
// import { Redirect } from 'react-router-dom';
// import { Redirect } from 'react-router-dom';
// import {Redirect, Route,Switch} from 'react-router-dom';
// import {MyProfile} from './MyProfile'
import {withRouter} from 'react-router-dom'

class Login extends React.Component {

    // constructor(props){
    //     super(props);

    //     this.state = {
    //         email:"",
    //         password:"",
    //         data: undefined
    //     }
    // }

    // onChange = (event) => {
    //     this.setState({
    //      [event.target.name]: event.target.value
    //     })
    // }

    // onClick = () => {
     
    //     axios.post("http://localhost:10000/api/v1/auth/login",this.state)
    //     .then(res => {
    //         console.log(res)
    //         this.setState({
    //             data: res.data.jwt
    //         })
    //     })
    //     .catch(err => {
    //         console.log(err)
    //     });
    //     console.log(this.state)
        
    //   if(this.state.data){
    //       return(
              
    //          <Redirect push to="/my_profile" />
    //       )
    //   }
    // }

    nextPath(path){
        this.props.history.push(path)
    }

    


    render(){
        console.log(this.props)
        return(
            <div>
                <h2>Log in</h2>
                <br/><br/><hr/><br/>
                <h2>Welcome to Baby's</h2> 
                <p> Minim mollit magna cupidatat commodo voluptate nisi magna labore irure. Exercitation amet aliquip aute incididunt dolor esse cupidatat. Enim est amet aute amet aute deserunt velit eu ad ex ea mollit. Laboris labore duis officia commodo laboris.
                </p>
                <label>Email</label>
                <input 
                    type = "email"
                    name = "email"
                    placeholder = "Enter your Email"
                    value = {this.props.email}
                    onChange = {this.props.onChange}
                />
                <input 
                type = "password"
                name = "password"
                placeholder = "Enter your password"
                value = {this.props.password}
                onChange = {this.props.onChange}
                />
            <button onClick = {this.props.onClick}>Login</button>
            </div>
        )
    }
}

export default withRouter(Login)