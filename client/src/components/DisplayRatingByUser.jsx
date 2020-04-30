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
        let response = await fetch('/api/user/ratings', {
            method : "GET",
            headers : {
                "authorization" : this.props.token
            }
        });
        let json = await response.json();
        if(json.error){
            window.alert(json.error)
        } else {
            // console.log(json);
            this.setState({ratingArray : json.result});
        }
    }

    render() {
        return (
            <div>
                <h1>Ratings</h1>
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