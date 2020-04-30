import React, {Component} from 'react';

class DisplayRatingByUser extends Component {
    constructor(props){
        super(props);
        this.state = {
            ratingArray : [],
        }
    }

    // load mock data into array
    componentDidMount = () => {
        this.loadData();
    }

    // get all documents from api endpoint
    loadData = async() => {
        let response = await fetch('/api/ratings');
        let json = await response.json();
        if(json.error){
            window.alert(json.error)
        } else {
            this.setState({ratingArray : json});
        }
    }

    // display title, form, and all characters
    render() {
        return (
            <div>
                <h1>ratings</h1>
                <div>
                    {
                        this.state.ratingArray.map((rating) => {
                            return(
                                <div key = {rating._id}>
                                    {rating.author}
                                     <br/>
                                    {rating.title} 
                                    <br/>
                                    {rating.rating} 
                                    <br/>
                                    {rating.review} 
                                    <br/>
                                    {rating.yearReleased} 
                                    <hr/>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

export default DisplayRatingByUser;