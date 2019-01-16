import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import { addReminder, deleteReminder, deleteAllReminders } from '../actions';
import moment from 'moment';
import { Row, Col} from 'reactstrap';


class Reminder extends Component {
  render() {
    return (
        <Row style = {{fontFamily:"Karla", fontWeight:"bold", color: '#010423', paddingLeft: '5px',marginBottom: '5px', borderRadius: '40px',  width: '95%', alignItems: 'center', backgroundColor: '#b1b7fc'}}>
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
