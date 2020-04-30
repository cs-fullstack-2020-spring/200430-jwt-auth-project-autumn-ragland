import React, { Component } from 'react';

// class based component to display movie ratings by user
class DisplayRatingByUser extends Component {
    constructor(props) {
        super(props);
        // array to hold ratings from database
        this.state = {
            ratingArray: [],
        }
    }

    // call method to fetch data from database on load
    componentDidMount = () => {
        this.loadData();
    }

    // fetch all movie ratings from database
    loadData = async () => {
        let response = await fetch('/api/user/ratings', {
            method: "GET",
            headers: {
                "authorization": this.props.token
            }
        });
        let json = await response.json();
        // if the response has a result property
        if (json.result) {
            // set the ratingArray property of state to the returned movies from database
            this.setState({ ratingArray: json.result });
        }
    }
    // display rating author, title, number and review using bootstrap list groups
    // if user accessed page but is not logged in, prompt to login
    render() {
        if (this.state.ratingArray <= 0 && this.props.token) {
            return (
                <h1>Add Movie Ratings!</h1>
            )
        } else if (this.props.token) {
            return (
                <div>
                    <h1>Your Movie Ratings</h1>
                    <div className="row row-cols-1 row-cols-md-4">
                        {
                            this.state.ratingArray.map((rating) => {
                                return (
                                    <div className="col mb-4" key={rating._id} >
                                        <div className="card">
                                            <div className="card-header">
                                                {rating.title}
                                            </div>
                                            <ul className="list-group list-group-flush">
                                                <li className="list-group-item">{rating.yearReleased}</li>
                                                <li className="list-group-item">{rating.rating}</li>
                                                <li className="list-group-item">{rating.review}</li>
                                                <li className="list-group-item">{rating.author}</li>
                                            </ul>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            )
        }
        return (
            <h1>Please Login to View Your Ratings</h1>
        )
    }
}
export default DisplayRatingByUser;