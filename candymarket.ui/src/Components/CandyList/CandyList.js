import React from 'react';
import candyRequest from '../../Requests/candyRequests';

class CandyList extends React.Component {
    state = {
        candy: []
    }

    getCandyValue = () => {
        candyRequest.getAllCandies()
        .then((values) => {
            let myNewCandies = [...values];
            this.setState({candy: myNewCandies});
        }).catch((error) => {
            console.log("broken connection: ", error);
        })
    }

    showCandies = () => {
        const candyValues = [...this.state.candy];
        return candyValues.map(value => <div>{value}</div>)
    }

    componentDidMount() {
        getAllCandies().then(data => {
            this.setState({candy:data})
        })
    }

    buildCandy = () => this.state.candy.map(c => (
        <div>{c.name}</div>
    ))

    render() {
        return (
            <p>{this.buildCandy()}</p>
        )
    }
}

export default CandyList