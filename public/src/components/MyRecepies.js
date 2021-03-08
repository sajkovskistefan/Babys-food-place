import React from 'react';
import axios from 'axios';
import {Route, Switch} from 'react-router-dom';
import { AddRecepie } from './AddRecepie';
import { BrowserRouter as Router } from 'react-router-dom';
import {withRouter} from 'react-router-dom'

class MyRecepies extends React.Component{

    constructor(props){
        super(props);
        
        this.state={
            recepies:"",
            token: this.props.data
        }
    }

  

    getRecepiesId = () => {
        axios({
            url:"http://localhost:10004/api/v1/blogposts",
            method: "get",headers:{
                Authorization: `Bearer ${this.state.token}`
            }
          })
          .then(res=>
            this.setState({
              recepies: res.data
            }))
            .catch(err =>
              alert(err))
    }

    componentDidMount(){
        this.getRecepiesId()
    }
    onClick= () => {
       <Router>
           <Switch>
               <Route path="/add_recepie" component={AddRecepie} />
           </Switch>
       </Router>
    }
    nextPath(path){
        this.props.history.push(path)
    }

    render(){
        console.log(this.state)
        // axios.interceptors.request.use(
        //     config => {
        //         config.headers.authorization = `Bearer ${this.state.token}`;
        //         return config
        //     },
        //     error => {
        //         return error
        //     }
        // )

        return(
            <div>
            <h2>My Recepies</h2>
            {/* {this.getRecepiesId()} */}
            {this.state.recepies?
            <label>
                Raboti
            </label>:
            <div>Ne raboti</div>}
            <button onClick={()=>{
                this.nextPath("/add_recepie")
            }} >nosi vo add recepies</button>

            </div>
        )
    }
}

export default withRouter(MyRecepies)