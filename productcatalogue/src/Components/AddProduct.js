import React from 'react';
import '../App.css';
import firebase from '../Config';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';

class AddProduct extends React.Component{
    constructor(props) {
        super(props);
        this.ref = firebase.firestore().collection('Products');
        this.state = {
            name: '',
            description: '',
            url: '',
            image: null,
            imageUploaded: false
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

    handleImageUpload = () => {
        const {image} = this.state;
        const uploadTask = firebase.storage().ref(`images/${image.name}`).put(this.state.image);
        uploadTask.on('state_changed', 
            (snapshot) => {console.log('snapshot')},
            (error) => {console.log(error);},
            () => {firebase.storage().ref('images').child(image.name).getDownloadURL().then(url => {this.setState({
                url: url,
                imageUploaded: true
            })})}
        )
    }

    onSubmit = (e) => {
        e.preventDefault();
        const {name, description} = this.state;
        this.ref.add({
            name, 
            description, 
            url: this.state.url
        }).then((docRef) => {
            this.setState({
                name: '',
                description: '',
                url: '',
                imageUploaded: false
            });
            this.props.history.push("/")
        })
        .catch((error) => {
            console.error('Error adding new entry: ', error)
        })
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
            borderLeft: '50px solid black'
        }

        return (
            <div>
                <Card style={cardStyle}>
                    <div className="buttons">
                        <Link to="/">
                            <button className="edit-btn">Show all products</button>
                        </Link>
                    </div>
                    <div>
                        <div>
                            <div className="form-group"></div>
                            <label for="name">Product name: </label>
                            <input type="text" className="form-control" name="name" value={name} onChange={this.onChange} placeholder="Please enter name"></input>
                        </div>
                        <div>
                            <div className="form-group"></div>
                            <label for="description">Product description: </label>
                            <textarea className="form-control" name="description" onChange={this.onChange} placeholder="Please enter description" cols="80" rows="3">{description}</textarea>
                        </div>
                    </div>
                    <div className="upload-btn-wrapper">
                        <button className="file-btn">Choose a file</button>
                        <input type="file" onChange={this.handleChange}/>
                        <span>{this.state.image !== null && this.state.image.name}</span>
                    </div>
                    <div className="image-preview">
                        <img src={this.state.url} style={{maxWidth: 200, maxHeight: 200}}></img>
                    </div>
                    <div className="buttons">
                        <button className="submit-btn" onClick={this.handleImageUpload}>Upload image *</button>
                        <button className="submit-btn" disabled={!this.state.imageUploaded} onClick={this.onSubmit}>Save</button>
                    </div>
                    <div className="upload-before-save">
                        <span>*You must upload the image before you can save</span>
                    </div>
                </Card>
            </div>
        )
    }
}
export default AddProduct;