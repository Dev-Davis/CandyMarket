import React from 'react';
import { ListGroupItem } from 'reactstrap';


class Candy extends React.Component {

    render() {
        const {candy} = this.props;

        const deleteThisCandy = () => {
            const {deleteCandy, candy} = this.props;      
            deleteCandy(candy.id)
        }
        return(

            <div>
                <ListGroupItem>{candy.name}<br></br><button className="btn btn-danger" onClick={deleteThisCandy}>Eat Candy</button>
                </ListGroupItem>
            </div>
        )
    }
}

export default Candy