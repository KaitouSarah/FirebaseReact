import React from 'react';
import './App.css'
import firebase from './Config';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection("Products");
    this.unsubscribe = null;
    this.state = {
      products : []
    };
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  onCollectionUpdate = (querySnapshot) => {
    const products = [];
    querySnapshot.forEach((doc) => {
      const {name, description, url} = doc.data();
      products.push({
        key: doc.id, 
        doc, 
        name, 
        description, 
        url
      });
    });
    this.setState({
      products
    });
  }

  render() {
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

    return( 
      <div>
        <Card style={cardStyle}>
          <div className="buttons">
            <Link to="/create">
              <button className="add-btn">Add product</button>
            </Link>
          </div>

          <div className="container">
            <div className="panel panel-heading">
              <h3 className="panel heading">Product Details</h3>
            </div>
          </div>

          <div className="panel-body">
            <table className="table table-stripe">
              <thead>
                <tr>
                  <th>Product name</th>
                  <th>Description</th>
                  <th>Image</th>
                </tr>
              </thead>
              <tbody>
                {this.state.products.map(product =>
                  <tr>
                    <td><Link to={`/show/${product.key}`}>{product.name}</Link></td>
                    <td>{product.description}</td>
                    <td><img src={product.url} style={{maxWidth: 150, maxHeight: 150}} alt=""></img></td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    )
  }
}
export default App;