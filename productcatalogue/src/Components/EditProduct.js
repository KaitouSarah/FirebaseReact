import React from 'react';
import '../App.css';
import firebase from '../Config';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';

class EditProduct extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            key: '',
            name: '',
            description: '',
            url: '',
            image: null

        }
    }

}

export default EditProduct;