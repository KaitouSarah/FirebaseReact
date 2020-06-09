import React from 'react';
import 'App.css';
import firebase from '../Config';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card} from 'react-bootstrap';

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const cardStyles = {
      width: 'auto',
      height: 'auto',
      backgroundColor: 'white',
      margin: 'auto', 
      display: 'block', 
      marginTop: '60px', 
      opacity: 0.5, 
      paddingTop: '10px', 
      paddingLeft: '20px', 
      paddingRight: '20px', 
      borderStyle: 'outset', 
      borderLeft: '50px solid black', 
      borderRadius: '20px'

    }
    return( 
      <div>
        <Card>

        </Card>
      </div>
    )
  }
}
export default App;