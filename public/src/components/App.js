import React from 'react';
import {Route,Switch,Redirect} from 'react-router-dom';
import Login from './Login';
import CreateAcount from './CreateAcount';
import {Nav} from './Nav';
import {Breakfast} from './Breakfast';
import {Brunch} from './Brunch';
import { Lunch } from './Lunch';
import { Dinner } from './Dinner';
import {Home} from './Home';
import axios from "axios";
import {MyProfile} from '../components/MyProfile';
import MyRecepies from './MyRecepies';
import {AddRecepie} from './AddRecepie';
// import {NavLink} from 'react-router-dom';






export class App extends React.Component {

  constructor(props){
    super(props);

    this.state={
      recepies:"",
      email:"",
      password:"",
      data: undefined,
      id:""
    }
    
  }
  onChange = (event) => {
    this.setState({
     [event.target.name]: event.target.value
    })
}

onClick = () => {
     
  axios.post("http://localhost:10000/api/v1/auth/login",this.state)
  .then(res => {
      console.log(res)
      this.setState({
          data: res.data.jwt
      })
      if(this.state.data){
        return(
         <Redirect push to="/my_profile" component={MyProfile} />
        // <Route path="/my_profile" component={MyProfile} />
        // <NavLink to="/my_profile" component={MyProfile} ></NavLink>
        // <Link push to="/my_profile" component={MyProfile} />
  
        )
      }
  })
  .catch(err => {
      console.log(err)
  });
  console.log(this.state);
  
   
   

}


  componentDidMount(){
    this.getRecepies()
    // this.onClick()
    // this.redirect()
  }

  getRecepies = () => {
    axios({
      url:"http://localhost:10004/api/v1/blogposts/free",
      method: "get"
    })
    .then(res=>
      this.setState({
        recepies: res.data
      }))
      .catch(err =>
        alert(err))
  }

  // redirect = () => {
  //   if(this.state.data){
  //     return(
  //              <Redirect push path="/my_profile" component={MyProfile} />

  //     )
  //   }
  // }

  render(){
    
  return (
    <div >
      <Switch>
      <Nav path="*" data={this.state.data}/>
      </Switch>
      <Switch>
        <Route path="/" exact component={()=>{
          return <Home recepies={this.state.recepies} />
        }} />

        <Route path='/breakfast' component={()=>{
          return <Breakfast recepies={this.state.recepies} />
        }}/>
        <Route path='/brunch' component={()=> {
          return <Brunch recepies={this.state.recepies} />
        }}/>
        <Route path="/lunch" component={()=>{
          return <Lunch recepies={this.state.recepies} />
        }} />
        <Route path='/dinner' component={()=>{
          return <Dinner recepies={this.state.recepies} />
        }} />
        <Route path="/login" component={()=> {
          return <Login
          email={this.state.email}
          password={this.state.password}
          data={this.state.data}
          onChange={this.onChange}
          onClick={this.onClick}
          />
        }} />
        <Route path="/CreateAcount" component={CreateAcount} />
        <Route path="/my_profile" component={()=>{
          return <MyProfile
          data={this.state.data}
          />
        }} />
        <Route path="/my_recepies" component={()=>{
          return <MyRecepies
          data={this.state.data}
          />
        }} />
        <Route path="/add_recepie" component={AddRecepie} />
      </Switch>
    </div>
  );
  }
};

