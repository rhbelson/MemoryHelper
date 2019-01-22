import React, { Component } from 'react';
import moment from 'moment';
import { Row, Col} from 'reactstrap';
import {MdEdit} from 'react-icons/md';
import { Jumbotron, Button } from 'reactstrap';


class Question extends Component {
  render() {
    return (
        <div>
      <Jumbotron>
        <h1 className="display-3">Question Time</h1>
        <p className="lead">Practice the flashcards you learned here!</p>
        <hr className="my-2" />
        <p>Question: What is the capital of Illinois?</p>
        <p className="lead">
          <Button color="primary">Submit</Button>
        </p>
      </Jumbotron>
    </div>
    );
  }
}



export default Question;
