import React from 'react';
import '../App.css';
import firebase from '../Config';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';

class AddProduct extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            url: '',
            image: null
        }
    }

    onChange = (e) => {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    render() {
        const {name, description} = this.state;
        const cardStyle = {
            width: 'auto',
            height: 'auto',
            backgroundColor: 'white',
            margin: 'auto', 
            display: 'block', 
            marginTop: '60px', 
            opacity: 0.8, 
            paddingTop: '10px', 
            paddingLeft: '20px', 
            paddingRight: '20px', 
            borderStyle: 'outset', 
            borderLeft: '50px solid black', 
            borderRadius: '20px'
        }

        return (
            <div>
                <Card style={cardStyle}>
                <div className="button">
                    <Link to="/">
                    <button class="edit-btn">Show all products</button>
                    </Link>
                </div>
                <div>
                    <div class="form-group"></div>
                    <label for="name">Product name: </label>
                    <input type="text" class="form-control" name="name" value={name} onChange={this.onChange} placeholder="Please enter name"></input>
                </div>
                </Card>
            </div>
        )
    }
}
export default AddProduct;