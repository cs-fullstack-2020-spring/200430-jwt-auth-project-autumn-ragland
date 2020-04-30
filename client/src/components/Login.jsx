import React, {Component, Fragment} from 'react';
import { Redirect } from "react-router-dom";
// class based component to validate user via controlled component form and create token
class Login extends Component {
    constructor(props){
        super(props);
        // set props of state for controlled component form
        this.state = {
            password: "",
            email: "",
        }
    }

    // controlled component form to update state based on user input
    handleChange = (event) => {
        if (event.target.name === "email") {
            this.setState({ email: event.target.value });
        } else if (event.target.name === "password") {
            this.setState({ password: event.target.value });
        }
    }

    // when form is submitted validate and create token
    handleSubmission = async (event) => {
        event.preventDefault(); // keep page from reloading

        // define object to send to post request
        let user = {
            email: this.state.email,
            password: this.state.password
        }
        // fetch server endpoint 
        let response = await fetch('/api/login', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        // pull out json from response
        let json = await response.json();
        // if the response has an error property
        if(json.error){
            // alert the error in the window
            window.alert(json.error)
        } 
        // if the response does not have an error property
        else {
            // update parent state
            this.props.logInUser(json.token);
            // alert the user that their login was successful
            window.alert(`Login Successful`);
            // redirect user to their ratings page
            // this.setState({ redirect: true });
        }
    }
    
    // render form, unless submitted
    render() {
        if (this.state.redirect) {
            return <Redirect to={"/yourRatings"} />
        }
        return (
            <Fragment>
                <h1>Login</h1>
                <form>

                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" id="email" value={this.state.email} onChange={this.handleChange} />
                    <br />

                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" value={this.state.password} onChange={this.handleChange} />
                    <br />

                    <button onClick={this.handleSubmission}>Login</button>
                </form>
            </Fragment>
        )
    }
}

export default Login;