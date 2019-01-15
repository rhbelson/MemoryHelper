import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import { addReminder, deleteReminder, deleteAllReminders } from '../actions';
import moment from 'moment';
import { Row, Col} from 'reactstrap';


class Reminder extends Component {
  render() {
    return (
        <Row style = {{fontFamily:"Karla", fontWeight:"bold", paddingLeft: '40px', paddingTop: '3px',paddingBottom:'3px' ,marginBottom: '5px', borderRadius: '40px', border: '1px solid lightGray',  width: '90%', alignItems: 'center', backgroundColor: '#99EDCC'}}>
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
