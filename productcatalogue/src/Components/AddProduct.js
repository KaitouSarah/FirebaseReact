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

    handleChange = (e) => {
        if (e.target.files[0]) {
            this.setState({
                image: e.target.files[0]
            }) ;
        }
        console.log(e.target.files[0]);
    }

    handleUpload = () => {
        const {image} = this.state;
        const uploadTask = firebase.storage().ref(`images/${image.name}`).put(this.state.image);
        uploadTask.on('state_changed', 
            (snapshot) => {console.log('snapshot')},
            (error) => {console.log(error);},
            () => {firebase.storage().ref('images').child(image.name).getDownloadURL().then(url => {this.setState({url})})}
        )
    }

    render() {
        const {name, description} = this.state;
        const cardStyle = {
            width: '40rem',
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
                    <div>
                        <div class="form-group"></div>
                        <label for="description">Product description: </label>
                        <textarea class="form-control" name="description" onChange={this.onChange} placeholder="Please enter description" cols="80" rows="3">{description}</textarea>
                    </div>
                    <div className="upload-data">
                        <input type="file" onChange={this.handleChange}/>
                        <img src={this.state.url} style={{maxWidth: 150, maxHeight: 150}}></img>
                    </div>
                    <div className="button">
                        <button className="submit-btn" onClick={this.handleUpload}>Upload image *</button>
                        <button className="submit-btn" onClick={this.handleUpload}>Save</button>
                    </div>
                </Card>
            </div>
        )
    }
}
export default AddProduct;