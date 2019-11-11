import React from 'react';
// import { Link } from 'react-router-dom';
import candyRequest from '../../Requests/candyRequests';

class CandyList extends React.Component {
    state = {
        candy: []
    }

    getCandy = () => {
        candyRequest.getAllCandies()
        .then((values) => {
            let myNewCandy = [...values];
            this.setState({candy: myNewCandy});
        }).catch((error) => {
            console.log("No new candy: ", error);
        })
    }

    showAllCandy = () => {
        const candyValues = [...this.state.candy];
        return candyValues.map(value => <div>{value.name}</div>)
    }

    render() {
        return (
            <div className="card" style={{ width: '21rem' }}>
                <button className="btn btn-success" onClick={this.getCandy}>Show Candies</button>
                {this.showAllCandy()}
            </div>
            
        )
    }
}

export default CandyList