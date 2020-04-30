import React, {Component} from 'react';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'
import Login from './Login';
import Register from './Register';
import CreateRating from './CreateRating';
import DisplayRatingByUser from './DisplayRatingByUser';
import DisplayAllRatings from './DisplayAllRatings';

class AppContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            token : "",
            user : { }
        }
    }

    logInUser = async (token) => {
        this.setState({token : token});
        let response = await fetch('/api/token', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization' : token
            }
        });
        // pull out json from response
        let json = await response.json();
        // log json response from server
        if(json.error){
            window.alert(json.error)
        } else {
            this.setState({user : json.message})
            // console.log(this.state)
            console.log(json);
        }
    }
    logoutUser = () => {
        this.setState({token : ""});
        this.setState({user : {}});
    }

    render(){
        return(
            <div>
                <h1>Movie Reviews</h1>
                <h3>{this.state.user.name}</h3>
                <Router>
                        <Link to="/">Home</Link> | 
                        <Link onClick={this.logoutUser} to="/">Logout</Link> | 
                        <Link to="/login" >Login</Link> | 
                        <Link to="/register" >Register</Link> | 
                        <Link to="/allRatings" >All Ratings</Link> | 
                        <Link to="/yourRatings" >Your Ratings</Link> | 
                        <Link to="/addRating" >Add Rating</Link> 

                        <Route path="/login" component = {() => <Login logInUser = {this.logInUser}/>}/>
                        <Route path="/register" component = {() => <Register/>} />
                        <Route path="/allRatings" component = {() => <DisplayAllRatings/>} />
                        <Route path="/yourRatings" component = {() => <DisplayRatingByUser token = {this.state.token}/>} />
                        <Route path="/addRating" component = {() => <CreateRating token = {this.state.token} user = {this.state.user}/>} />
                </Router>
            </div>
        )
    }
}

export default AppContainer;