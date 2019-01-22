import React, { Component } from 'react';
import moment from 'moment';
import { Row, Col} from 'reactstrap';
import {MdEdit} from 'react-icons/md';
import { Jumbotron, Button } from 'reactstrap';
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import WebFont from 'webfontloader';

WebFont.load({
  google: {
    families: ['Titillium Web:300,400,700', 'sans-serif','Purple Purse','Karla']
  }
});

class Question extends Component {
  render() {
    return (
        <div>
      <Jumbotron style={{width:"50%",marginLeft:"25%",fontStyle:"Karla"}}>
        <p style={{textAlign: "center",fontWeight:"bold"}}>Question: What is the capital of Illinois?</p>
        <div>
        <InputGroup style={{width:"50%",marginLeft:"25%"}}>
        <InputGroupAddon addonType="prepend">Your Answer</InputGroupAddon>
        <Input placeholder="Input answer here" />
        <Button color="primary">Submit</Button>
      </InputGroup>
        </div>

      </Jumbotron>
    </div>
    );
  }
}



export default Question;
