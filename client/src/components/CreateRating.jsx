import React, { Component, Fragment } from 'react';
import { Redirect } from "react-router-dom";

// class based component to register a new user via controlled component form
class CreateRating extends Component {
    constructor(props) {
        super(props);
        // set props of state for controlled component form
        this.state = {
            title: "",
            yearReleased: 0,
            rating: 0,
            review: "",
            author: this.props.user.email
        }
    }

    // controlled component form to update state based on user input
    handleChange = (event) => {
        if (event.target.name === "title") {
            this.setState({ title: event.target.value });
        } else if (event.target.name === "yearReleased") {
            this.setState({ yearReleased: event.target.value });
        } else if (event.target.name === "rating") {
            this.setState({ rating: event.target.value });
        } else if (event.target.name === "review") {
            this.setState({ review: event.target.value });
        }
    }

    // when form is submitted add rating to database
    handleSubmission = async (event) => {
        event.preventDefault(); // keep page from reloading
        // define object to send to post request
        let rating = {
            title: this.state.title,
            yearReleased: this.state.yearReleased,
            rating: this.state.rating,
            review: this.state.review,
            author: this.props.user.email
        }
        // fetch server protected endpoint and pass token from parent
        let response = await fetch('/api/rating', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': this.props.token
            },
            body: JSON.stringify(rating)
        });
        // pull out json from response
        let json = await response.json();
        // if the response has an error property
        if (json.error) {
            // alert the error in the window
            window.alert(json.error)
        }
        // if the response does not have an error property
        else {
            // alert the user that their rating was successfully submitted
            // window.alert(`${this.props.user.name} rating submitted`);
            this.setState({ redirect: true });
        }
    }

    // render form if user is logged in
    // if user accessed page but is not logged in, prompt to login
    render() {
        if (this.state.redirect) {
            return <Redirect to={"/yourRatings"} />
        }
        if (this.props.token) {
            return (
                <Fragment>
                    <h1>Add Review</h1>
                    <form>

                        <label htmlFor="title">Title</label>
                        <input type="text" name="title" id="title" value={this.state.title} onChange={this.handleChange} />
                        <br />

                        <label htmlFor="yearReleased">Year Released</label>
                        <input type="number" name="yearReleased" id="yearReleased" value={this.state.yearReleased} onChange={this.handleChange} />
                        <br />

                        <label htmlFor="rating">Rating</label>
                        <input type="number" name="rating" id="rating" value={this.state.rating} onChange={this.handleChange} />
                        <br />

                        <label htmlFor="review">Review</label>
                        <input type="text" name="review" id="review" value={this.state.review} onChange={this.handleChange} />
                        <br />

                        <button onClick={this.handleSubmission}>Review</button>
                    </form>
                </Fragment>
            )
        }
        return (
            <h1>Please Login To Add A Rating</h1>
        )
    }
}

export default CreateRating;