import React, { Component } from 'react';
import moment from 'moment';
import { Row, Col} from 'reactstrap';
import {MdEdit} from 'react-icons/md';
import { Jumbotron, Button } from 'reactstrap';
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import WebFont from 'webfontloader';
import firebase from 'firebase';

WebFont.load({
  google: {
    families: ['Titillium Web:300,400,700', 'sans-serif','Purple Purse','Karla']
  }
});

class Questions extends Component {
  constructor(props){
      super(props);
    }
 
  componentWillMount() {
    console.log(this.generateQuestion(this.props.deckTitle));
  }


  generateQuestion(id) {
    return id
    // return firebase.database().ref('User1/'+id).once('value').then(snapshot => {
    //   return snapshot.val();
    // })

  }



  render() {
    return (
      <Jumbotron style={{width:"100%", fontStyle:"Karla", justifyContent: 'center'}}>
        <p style={{textAlign: "center",fontWeight:"bold"}} >Question: What is the capital of Illinois?</p>
      <div>
        <InputGroup style={{width:"100%"}}>
          <Input placeholder="Input answer here" />
          <Button color="primary" >Submit</Button>
        </InputGroup>
      </div>
      <div className="container text-center">
        <Button color="success" style={{marginTop: '15px'}} onClick = {this.props.questionDrawCard}>Next Question</Button>
      </div>
      </Jumbotron>

    );
  }
}




export default Questions;
