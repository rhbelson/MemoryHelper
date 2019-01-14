import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import { addReminder, deleteReminder, deleteAllReminders } from '../actions';
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Row, Button, Col, Container } from 'reactstrap'



class Reminder extends Component {
  render() {
    return (
        <Row style = {{paddingLeft: '40px', marginBottom: '5px', borderRadius: '30', border: '1px solid lightGray', alignItems: 'center', width: '500px', alignItems: 'center'}}>
          <Col> {this.props.remind.text} </Col>
          <Col><em>{moment(new Date(this.props.remind.dueDate)).fromNow()}</em></Col>
          <Col><div style = {{display: 'flex',  justifyContent:'center', alignItems: 'right'}} onClick = {this.props.del}> &#x2715; </div></Col>
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
