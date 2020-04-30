import React, { Component, Fragment } from 'react';

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

    // controlled component form
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

    // when form is submitted read user from database
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
        // fetch server endpoint 
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
        // log json response from server
        if (json.error) {
            window.alert(json.error)
        } else {
            window.alert(`${this.state.author} comment submitted`);
        }
    }

    // render form
    render() {
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
}

export default CreateRating;