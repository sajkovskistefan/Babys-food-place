import React from 'react';
import axios from 'axios'

export class MyProfile extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            fName:"",
            lName:"",
            email:"",
            birthday: "",
            password:"",
            password2:""
            // data: this.props.data
        }
    }

    onChange = (event) => {
        this.setState({
         [event.target.name]: event.target.value
        })
    }

    onClick = () => {
        axios.put("http://localhost:10000/api/v1/users/:id",this.state,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization':`Bearer ${this.props.data}`}
        })
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)

        })
    }

    render(){
        console.log(this.state)
        console.log(this.props)
        return(
            <div>
            <h2>My Profile</h2>
            <img src="" alt="" />
            <button>Change Avatar</button>
            <label>First name</label>
            <input
            type="text"
            name="fName"
            placeholder="John"
            value={this.state.fName}
            onChange={this.onChange}
            />
             <label>Last Name</label>
            <input
            type="text"
            name="lName"
            placeholder="Smith"
            value={this.state.lName}
            onChange={this.onChange}
            />
             <label>Email</label>
            <input
            type="text"
            name="email"
            placeholder="john@smith.com"
            value={this.state.email}
            onChange={this.onChange}
            />
             <label>Birthday</label>
            <input
            type= "text"
            name="birthday"
            placeholder="22-12-199"
            value={this.state.birthday}
            onChange={this.onChange}
            />
              <label>Password</label>
            <input
            type="password"
            name="password"
            placeholder="*****"
            value={this.state.password}
            onChange={this.onChange}
            />
            <label>Repeat Password</label>
            <input
            type="password"
            name="password2"
            placeholder="*****"
            value={this.state.password2}
            onChange={this.onChange}
            />

            <button onClick={this.onClick}>SAVE</button>
            

            </div>
        )
    }
}