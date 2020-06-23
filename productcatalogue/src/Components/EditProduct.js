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
                    <img src={} style={{maxWidth: 350, maxHeight: 250}}></img>
                </div>

                <div className="upload-btn-wrapper">
                    <button className="file-btn">Choose a file</button>
                    <input type="file" onChange={this.handleChange}/>
                    <span>{this.state.image !== null && this.state.image.name}</span>
                </div>
            </Card>
        </div>
        )
    }
}

export default EditProduct;