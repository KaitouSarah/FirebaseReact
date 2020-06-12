import React from 'react';
import '../App.css';
import firebase from '../Config';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';

class ShowProduct extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            product: [],
            key: ''
        }
    }

    componentDidMount() {
        const ref = firebase.firestore.collection('Products').doc(this.props.match.params.id);

        ref.get().then((doc) => {
            if (doc.exists) {
                this.setState({
                    product: doc.data(),
                    key: doc.id,
                    isLoading: false
                });
            } else {
                console.log("Could not find document");
            }
        })
    }

    delete(id) {
        var desertRef = firebase.storage().refFromURL(this.state.product.url);
        firebase.firestore().collection('Products').doc(id).delete().then(() => {
            this.props.history.push("/");
        }).catch((error) => {
            console.error("Error when trying to delete document");
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
                        <img src={this.state.url} style={{maxWidth: 150, maxHeight: 150}}></img>
                    </div>
                    <div className="container">
                        <div className="panel panel-default">
                            <h3 className="panel-title">{this.state.product.name}</h3>
                        </div>
                        <div className="panel-body">
                            <dl>
                                <dt>Description:</dt>
                                <dd>{this.state.product.description}</dd>
                            </dl>
                            <Link to={`/edit/${this.state.key}`} className="btn btn-success">Edit</Link>
                            <button onClick={this.delete.bind(this, this.state.key)} className="btn btn-danger">Delete</button>
                        </div>
                    </div>
                </Card>
            </div>
        )
    }
}
export default ShowProduct;