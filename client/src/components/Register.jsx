import React, {Component, Fragment} from 'react';
import { Redirect } from "react-router-dom";

// class based component to validate and create a new user
class Register extends Component {
    constructor(props){
        super(props);
        // set props of state for controlled component form
        this.state = {
            password: "",
            email: "",
            name: "",
        }
    }

    // controlled component form to update state based on user input
    handleChange = (event) => {
        if (event.target.name === "email") {
            this.setState({ email: event.target.value });
        } else if (event.target.name === "password") {
            this.setState({ password: event.target.value });
        }  else if (event.target.name === "name") {
            this.setState({ name: event.target.value });
        }
    }

    // when form is submitted validate and create user
    handleSubmission = async (event) => {
        event.preventDefault(); // keep page from reloading

        // define object to send to post request
        let newUser = {
            email: this.state.email,
            password: this.state.password,
            name: this.state.name,
        }
        // fetch server endpoint 
        let response = await fetch('/api/register', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
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
            // alert the user that they were successfully created
            // window.alert(`${this.props.user.name} account created`);
            // redirect user to login page
            this.setState({ redirect: true });
        }
    }

    // render form, unless submitted
    render() {
        if (this.state.redirect) {
            return <Redirect to={"/login"} />
        }
        return (
            <Fragment>
                <h1>Register</h1>
                <form>

                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" value={this.state.name} onChange={this.handleChange} />
                    <br />

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

export default Register;