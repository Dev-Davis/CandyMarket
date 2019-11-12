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
            let myCandy = [...values];
            this.setState({candy: myCandy});
        }).catch((error) => {
            console.log("No candy: ", error);
        })
    }

    addCandy = () => {
        candyRequest.addCandy()
        .then((values) => {
            let newCandy = [...values];
            this.setState = ({candy: newCandy});
        }).catch((error) => {
            console.log("No new candy: ", error);
        })
    }

    showAllCandy = () => {
        const candyValues = [...this.state.candy];
        return candyValues.map(value => <div key={value.id}>{value.name}</div>)
    }

    render() {
        return (
            <div className="card" style={{ width: '21rem' }}>
                {this.showAllCandy()}
                <button className="btn btn-success" onClick={this.getCandy}>Show Candies</button>
                <form>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
                    </div>
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                <button className="btn btn-success" onClick={this.addCandy}>Add Candies</button>
            </div>
        )
    }
}

export default CandyList