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
      this.state = {
      question:"",
      answer:"",
      inputValue:"",
      emptyDeck:true,
      message:"Start practicing here:"
    };
    this.updateInputValue=this.updateInputValue.bind(this);
  }



  componentWillMount() {
    this.generateQuestionText(this.props.deckTitle);
  }


  generateQuestionText(id) {
      return firebase.database().ref('User1/'+this.props.deckTitle).once('value').then(snapshot => {
      let data = snapshot.val();

      if (data) {
        if (data.length>0) {
          this.setState({emptyDeck: false})
        }

        let random_question_number=Math.floor(Math.random() * data.length); 
        console.log(data[random_question_number].question, data[random_question_number].answer);
        this.setState({question: data[random_question_number].question});
        this.setState({answer: data[random_question_number].answer});
      }
    })

  }

  checkAnswer() {
    if (this.state.inputValue==this.state.answer) {
      console.log("You got it right!")
      this.setState({message: "Great work! Here's another:"})
      this.generateQuestionText(this.props.deckTitle);
    }
    else {
      console.log("No!");
      this.setState({message: "Sorry, try again!"})
    }
  }


  updateInputValue(evt) {
    this.setState({
      inputValue: evt.target.value
    });
  }

  render() {

    if (this.state.emptyDeck==false) {

    return (
      <Jumbotron style={{width:"100%", fontStyle:"Karla", justifyContent: 'center'}}>
        <h3 style={{textAlign:"center"}}>{this.state.message}</h3>
        <p style={{textAlign: "center",fontWeight:"bold"}} >{this.state.question}</p>
      <div>
        <InputGroup style={{width:"100%"}}>
          <Input value={this.state.inputValue} onChange={this.updateInputValue} placeholder="Input answer here" />
          <Button onClick = {() => {this.checkAnswer();}} color="primary" >Submit</Button>
        </InputGroup>
      </div>
      <div className="container text-center">
        <Button color="success" style={{marginTop: '15px'}} onClick = {this.props.questionDrawCard}>Next Question</Button>
      </div>
      </Jumbotron>
    );}

    else {
      return (
      <Jumbotron style={{width:"100%", fontStyle:"Karla", justifyContent: 'center'}}>
        <h3 style={{textAlign:"center"}}>No questions in deck :(</h3>
      </Jumbotron>
    );
    }

  }
}




export default Questions;
