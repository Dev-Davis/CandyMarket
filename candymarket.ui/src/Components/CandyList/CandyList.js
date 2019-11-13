import React from 'react';
// import { Link } from 'react-router-dom';
import candyRequest from '../../Requests/candyRequests';

const newCandyInfo = {
    name: '',
    type: ''
};

class CandyList extends React.Component {
    state = {
        candy: [],
        newCandy: newCandyInfo
    }

    stringStateField = (name, e) => {
        const copyCandy = {...this.state.newCandy};
        copyCandy[name] = e.target.value;
        this.setState({ newCandy: copyCandy });
    }

    nameChange = e => this.stringStateField('name', e);
    typeChange = e => this.stringStateField('type', e);

    submitCandy = (e) => {
        e.preventDefault();
        const saveCandy = {...this.state.newCandy};
        candyRequest.addCandy(saveCandy)
        .then(() => this.getCandy)
        .catch(err => console.log("Unable to add candy", err));
        this.setState({
            newCandy: newCandyInfo
        })
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

    showAllCandy = () => {
        const candyValues = [...this.state.candy];
        return candyValues.map(value => <div key={value.id}>{value.name}</div>)
    }

    render() {

        return (
            <div className="card" style={{ width: '21rem' }}>
                {this.showAllCandy()}
                <button className="btn btn-success">Show Candies</button>
                <form onSubmit={this.submitCandy}>
                    <div className="form-group">
                        <label htmlFor="candyName">Candy Name</label>
                        <input 
                        type="text" 
                        className="form-control" 
                        id="nameCandy" 
                        placeholder="Enter candy name"
                        value={this.state.newCandy.name}
                        onChange={this.nameChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="candyType">Type</label>
                        <input 
                        type="text" 
                        className="form-control" 
                        id="typeCandy" 
                        placeholder="Candy Type"
                        value={this.state.newCandy.type}
                        onChange={this.typeChange} />
                    </div>
                    <div>
                        <button type="submit" className="btn btn-primary">Add Candies</button>
                    </div>
                    </form>
            </div>
        )
    }
}

export default CandyList