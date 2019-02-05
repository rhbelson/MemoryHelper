import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import { addReminder, deleteReminder, deleteAllReminders } from '../actions';
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Row, Button, Col, Container, Form, FormGroup, Label, Input, FormText } from 'reactstrap'
import {MdDone, MdDelete} from 'react-icons/md';
import firebase from 'firebase';

class MyForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      content: [],
      newVocab: '',
      newAnswer: '',
      count: 0
    };

    this.addRow = this.addRow.bind(this);
  }

addRow() {
  const state = this.state
  const props = this.props



  if(this.state.newLast!= '' && this.state.newAnswer != ''){
    let db = firebase.database().ref(`/User1/${props.deckTitle}/${state.count}`);
    db.update({question: this.state.newVocab, answer: this.state.newAnswer})

    this.setState({content: [...state.content, [state.newVocab, state.newAnswer]],
                   newVocab: '',
                   count: state.count + 1,
                   newAnswer: ''})
  }
}

deleteRow() {
  console.log(this.state.content)
  return
}


  render() {
    return (
        <Form>
          <FormGroup> {this.state.content.map((row, i) => {
                          return   <Row key={i}>
                                      <Col><Input id = "Vocab"
                                                    type="text"
                                                    disabled = {true}
                                                    value = {row[0]}/></Col>
                                      <Col><Input id = "Definition"
                                                    type="text"
                                                    disabled = {true}
                                                    value = {row[1]}/>

                                      </Col>
                                        <Button style = {{marginTop: '5px', height: '50%', textAlign: 'center'}} color = "danger" onClick={() => this.deleteRow()}> <MdDelete style = {{marginRight: '5px'}}/> </Button>
                                     </Row>
                        }
                                )}
              <Row>
                  <Col><Input id = "Vocab"
                                type="text"
                                placeholder="Question"
                                value = {this.state.newVocab}
                                onChange = {event => this.setState({newVocab: event.target.value})} /></Col>
                  <Col><Input id = "Definition"
                                type="text"
                                placeholder="Answer"
                                value = {this.state.newAnswer}
                                onChange = {event => this.setState({newAnswer: event.target.value})} />

                    </Col>
                    <Button style = {{marginTop: '5px', height: '50%', textAlign: 'center'}} color = "success" onClick={() => this.addRow()}> <MdDone style = {{marginRight: '5px'}}/> </Button>
                </Row>
          </FormGroup>
        </Form>
      //
    );
  }
}

function mapStateToProps(state) {
  return {
    reminders: state
  };
}

export default connect(mapStateToProps, {addReminder, deleteReminder, deleteAllReminders })(MyForm);
