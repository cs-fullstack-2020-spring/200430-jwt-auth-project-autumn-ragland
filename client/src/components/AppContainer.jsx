import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom' // import for routing
// import child components
import Login from './Login';
import Register from './Register';
import CreateRating from './CreateRating';
import DisplayRatingByUser from './DisplayRatingByUser';
import DisplayAllRatings from './DisplayAllRatings';

// class based parent component to handle routing, manage state, and display title 
class AppContainer extends Component {
    constructor(props) {
        super(props);
        // encrypted and decrypted token
        this.state = {
            token: "",
            user: {}
        }
    }
    // method called in child to update state of tokens
    logInUser = async (token) => {
        // update encrypted token from log in component
        this.setState({ token: token });
        // fetch endpoint to return decrypted token 
        let response = await fetch('/api/token', {
            method: "POST",
            // send encrypted token in headers
            headers: {
                'authorization': token
            }
        });
        // pull out json from response
        let json = await response.json();
        // if the response has an error property
        if (json.error) {
            // alert the error in the window
            window.alert(json.error);
        }
        // if the response does not have an error property
        else {
            // set the state user property of state to the decrypted token
            this.setState({ user: json.user });
        }
    }
    // event handler to reset state
    logoutUser = () => {
        // set state of token to undefined
        this.setState({ token: "" });
        // set state of user to undefined
        this.setState({ user: {} });
    }

    // display title and navigation links based on if user is logged in
    render() {
        // if user is logged in
        if (this.state.token) {
            return (
                <div>
                    <h3>Welcome Back {this.state.user.name}</h3>
                    <Router>
                        <ul className="nav justify-content-center">
                            {/* <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li> */}
                            <li className="nav-item">
                                <Link className="nav-link" to="/allRatings" >All Ratings</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/yourRatings" >Your Ratings</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/addRating" >Add Rating</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" onClick={this.logoutUser} to="/allRatings">Logout</Link>
                            </li>
                        </ul>
                        <Route path="/login" component={() => <Login logInUser={this.logInUser} />} />
                        <Route path="/register" component={() => <Register />} />
                        <Route path="/allRatings" component={() => <DisplayAllRatings />} />
                        <Route path="/yourRatings" component={() => <DisplayRatingByUser token={this.state.token} />} />
                        <Route path="/addRating" component={() => <CreateRating token={this.state.token} user={this.state.user} />} />
                    </Router>
                </div>
            )
        }
        // if user is not logged in
        return (
            <div>
                <Router>
                    <ul className="nav justify-content-center">
                        {/* <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li> */}
                        <li className="nav-item">
                            <Link className="nav-link" to="/allRatings" >All Ratings</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login" >Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/register" >Register</Link>
                        </li>
                    </ul>
                    <Route path="/login" component={() => <Login logInUser={this.logInUser} />} />
                    <Route path="/register" component={() => <Register />} />
                    <Route path="/allRatings" component={() => <DisplayAllRatings />} />
                    <Route path="/yourRatings" component={() => <DisplayRatingByUser token={this.state.token} />} />
                    <Route path="/addRating" component={() => <CreateRating token={this.state.token} user={this.state.user} />} />
                </Router>
            </div>
        )
    }
}

export default AppContainer;