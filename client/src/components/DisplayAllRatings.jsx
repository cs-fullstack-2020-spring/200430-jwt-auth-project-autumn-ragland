import React, { Component } from 'react';

// class based component to display all movie ratings
class DisplayAllRatings extends Component {
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
        let response = await fetch('/api/ratings');
        let json = await response.json();
        // if the response has an error property
        if (json.error) {
            // alert the error in the window
            window.alert(json.error)
        }
        // if the response does not have an error property
        else {
            // set the ratingArray property of state to the returned movies from database
            this.setState({ ratingArray: json });
        }
    }

    // display rating author, title, number and review using bootstrap list groups
    render() {
        return (
            <div>
                <h1>All Movie Ratings</h1>
                <div className="row row-cols-1 row-cols-md-4">
                    {
                        this.state.ratingArray.map((rating) => {
                            return (
                                <div className="col mb-4" key={rating._id} >
                                    <div className="card" style={{ width: "18rem", margin: "1%" }}>
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
}

export default DisplayAllRatings;