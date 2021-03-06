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

    componentDidMount() {
        const ref = firebase.firestore().collection('Products').doc(this.props.match.params.id);
        ref.get().then((doc) => {
            if (doc.exists) {
                const document = doc.data();
                this.setState({
                    key: doc.id,
                    name: document.name,
                    description: document.description,
                    url: document.url
                });
            } else {
                console.log("Could not find document");
            }
        })
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
        const {image, url} = this.state;
        var desertRef= firebase.storage().refFromURL(url)
        const uploadTask = firebase.storage().ref(`images/${image.name}`).put(this.state.image);
        uploadTask.on('state_changed', 
            (snapshot) => {console.log('snapshot')},
            (error) => {console.log(error);},
            () => {firebase.storage().ref('images').child(image.name).getDownloadURL().then(url => {this.setState({
                url: url,
                imageUploaded: true
            })})}
        )

        desertRef.delete().then(function() {
            console.log(`file deleted`);
        }).catch(function(error) {
            console.log("Error while deleting file")
        });
    }
    
    onSubmit = (e) => {
        e.preventDefault();
        const {name, description, url} = this.state;
        const updateRef = firebase.firestore().collection('Products').doc(this.state.key)
        updateRef.set({
            name, 
            description, 
            url
        }).then((docRef) => {
            this.setState({
                key: '',
                name: '',
                description: '',
                url: '',
                imageUploaded: false
            });
            this.props.history.push("/show/" + this.props.match.params.id)
        })
        .catch((error) => {
            console.error('Error editing entry: ', error)
        })
    }

    render() {
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

                <div className="image-preview">
                    <img src={this.state.url} style={{maxWidth: 350, maxHeight: 250}}></img>
                </div>

                <div className="upload-btn-wrapper">
                    <button className="file-btn">Choose a file</button>
                    <input type="file" onChange={this.handleChange}/>
                    <span>{this.state.image !== null && this.state.image.name}</span>
                </div>

                <div className="buttons">
                    <button className="submit-btn" onClick={this.handleImageUpload}>Upload image *</button>
                </div>
                <div className="upload-before-save">
                    <span>*You must upload the image before you save</span>
                </div>

                <div className="container">
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <form onSubmit={this.onSubmit}>
                                    <div>
                                        <div className="form-group"></div>
                                        <label for="name">Product name: </label>
                                        <input type="text" className="form-control" name="name" value={this.state.name} onChange={this.onChange} placeholder="Please enter name"></input>
                                    </div>
                                    <div>
                                        <div className="form-group"></div>
                                        <label for="description">Product description: </label>
                                        <textarea className="form-control" name="description" value={this.state.description} onChange={this.onChange} placeholder="Please enter description" cols="80" rows="3"></textarea>
                                    </div>
                                    <button typse="submit" className="btn btn-success">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
            </Card>
        </div>
        )
    }
}

export default EditProduct;