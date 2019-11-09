import React from 'react';
import getAllCandies from '../../Requests/candyRequests';

class CandyList extends React.Component {
    state = {
        candy: []
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