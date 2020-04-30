import React, {Component, Fragment} from 'react';

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

    // controlled component form
    handleChange = (event) => {
        if (event.target.name === "email") {
            this.setState({ email: event.target.value });
        } else if (event.target.name === "password") {
            this.setState({ password: event.target.value });
        }  else if (event.target.name === "name") {
            this.setState({ name: event.target.value });
        }
    }

    // when form is submitted read user from database
    handleSubmission = async (event) => {
        event.preventDefault(); // keep page from reloading
        // console.log(this.state);

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
        // log json response from server
        if(json.error){
            window.alert(json.error)
        } else {
            window.alert(`New User ${json.name} created`);
        }
    }

    // render form
    render() {
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