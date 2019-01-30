import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import { addReminder, deleteReminder, deleteAllReminders } from '../actions';
import moment from 'moment';
import { Row, Col} from 'reactstrap';
import {MdEdit} from 'react-icons/md';
import firebase from 'firebase';


class Reminder extends Component {
  render() {
    return (
        <Row onClick = {this.props.toggleQuestions} style = {{fontFamily:"Titillium Web", color: '#010423', border: '.1px solid black', borderRadius: '15px',paddingLeft: '5px',marginBottom: '5px',  width: '100%', alignItems: 'center', backgroundColor: 'white'}}>
          <Col style={{fontWeight:"bold"}}> {this.props.remind.text} </Col>
          <Col>{moment(new Date(this.props.remind.dueDate)).fromNow()}</Col>
          <Col><div style = {{display: 'flex',  justifyContent:'center', alignItems: 'right'}} /*onClick = {this.props.del}*/> <MdEdit onClick={this.editModal} style={{marginTop:"2%",marginLeft:"10%"}}/> </div> </Col>
        </Row>
      //
    );
  }
}

function mapStateToProps(state) {
  return {
    reminders: state
  };
}

export default connect(mapStateToProps, {addReminder, deleteReminder, deleteAllReminders })(Reminder);
