import React from 'react';
import { ListGroup } from 'reactstrap';
import candyRequest from '../../Requests/candyRequests';
import Candy from './Candy';

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
    // eatChange = e => this.stringStateField('eat', e);

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

    deleteCandy = (candyId) => {
        // console.log(this.state.candy);
        candyRequest.eatCandy(candyId)
        .then(() => this.getCandy())
        .catch(err => console.log("Could not eat the candy", err));  
    };

    getCandy = () => {
        candyRequest.getAllCandies()
        .then((values) => {
            console.error(values)
            let myCandy = [...values];
            this.setState({candy: myCandy});
        }).catch((error) => {
            console.log("No candy: ", error);
        })
    }

    showAllCandy = () => {
        const candyValues = [...this.state.candy];
        return candyValues.map(candy => <div className="col" key={candy.id}>
        <ListGroup>
            <Candy candy={candy} deleteCandy={this.deleteCandy}/>
        </ListGroup>
        </div>)
    }

    render() {

        return (
            <div className="card" style={{ width: '21rem' }}>
                {this.showAllCandy()}
                <button onClick={this.getCandy}>Show Candies</button>
                <br></br>
                <form onSubmit={this.submitCandy}>
                    <div className="form-group">
                        <label htmlFor="candyName">Candy Name</label>
                        <input 
                        type="text" 
                        className="form-control" 
                        id="name" 
                        placeholder="Enter candy name"
                        value={this.state.newCandy.name}
                        onChange={this.nameChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="candyType">Type</label>
                        <input 
                        type="text" 
                        className="form-control" 
                        id="type" 
                        placeholder="Candy Type"
                        value={this.state.newCandy.type}
                        onChange={this.typeChange} />
                    </div>
                    <div>
                        <button type="submit" className="btn btn-primary">Add Candies</button>
                    </div>
                </form>
                    {/* <form onSubmit={this.deleteCandy}>
                        <div className="form-group">
                            <label htmlFor="candyName">Eat Name</label>
                            <input 
                            type="text" 
                            className="form-control" 
                            id="eat" 
                            placeholder="Candy to eat"
                            value={this.state.newCandy.eat}
                            onChange={this.eatChange}/>
                        </div>
                        <div>
                            <button type="submit" className="btn btn-primary">Eat Candy</button>
                        </div>
                    </form> */}
            </div>
        )
    }
}

export default CandyList