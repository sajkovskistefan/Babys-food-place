import React from 'react';
import axios from "axios";
import {withRouter} from 'react-router-dom'

class CreateAcount extends React.Component {
    constructor(props){
        super(props);

        this.state={
            fName:"",
            lName:"",
            email:"",
            birthday:"",
            password:"",
            password2:""
        }
    }

    onChange = (event) => {
        this.setState({
         [event.target.name]: event.target.value
        })
    }

    nextPath(path){
        this.props.history.push(path)
    }

    onClick = () => {
        axios.post("http://localhost:10000/api/v1/auth/create-account",this.state)
        .then(res => {
            console.log(res)
            this.nextPath("/login")
        })
        .catch(err => {
            console.log(err)
        })
    }
    render(){
        console.log(this.state)
        return(
            <div>
                <h2>Create Account</h2>
                <p> Minim mollit magna cupidatat commodo voluptate nisi magna labore irure. Exercitation amet aliquip aute incididunt dolor esse cupidatat. Enim est amet aute amet aute deserunt velit eu ad ex ea mollit. Laboris labore duis officia commodo laboris.
                </p>
                <label>First Name</label>
                <input 
                type="text"
                name="fName"
                placeholder="John"
                value = {this.state.fName}
                onChange= {this.onChange}
                />
                 <label>Last Name</label>
                <input 
                type="text"
                name="lName"
                placeholder="Smith"
                value = {this.state.lName}
                onChange= {this.onChange}
                />
                 <label>Email</label>
                <input 
                type="email"
                name="email"
                placeholder="john@smith.com"
                value = {this.state.email}
                onChange= {this.onChange}
                />
                <label>birthday</label>
                <input 
                type="number"
                name="birthday"
                placeholder="22-12-1999"
                value = {this.state.birthday}
                onChange= {this.onChange}
                />
                <label>Password</label>
                <input 
                type="password"
                name="password"
                placeholder="******"
                value = {this.state.password}
                onChange= {this.onChange}
                />
                <label>Password</label>
                <input 
                type="password"
                name="password2"
                placeholder="******"
                value = {this.state.password2}
                onChange= {this.onChange}
                />
            <button onClick={this.onClick} >Create Acount</button>
            </div>
        )
    }
}

export default withRouter(CreateAcount)