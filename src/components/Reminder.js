import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import { addReminder, deleteReminder, deleteAllReminders } from '../actions';
import moment from 'moment';
import { Row, Col} from 'reactstrap';
import {MdEdit} from 'react-icons/md';
import {MdDelete} from "react-icons/md";

class Reminder extends Component {
  constructor(props){
    super(props);
    this.state = {
      selectedInterval: 'Ebbinghaus',
    };
    this.toggleDropdown=this.toggleDropdown.bind(this);
  }


  //Toggle Dropdown to select interval reminder
  toggleDropdown() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  render() {
    return (
        <Row style = {{fontFamily:"Titillium Web", color: '#010423', border: '.1px solid black', borderRadius: '15px',paddingLeft: '5px',marginBottom: '5px',  width: '100%', alignItems: 'center', backgroundColor: 'white'}}>
          <Col  onClick = {this.props.toggleQuestions} style={{fontWeight:"bold"}}> {this.props.remind.text} </Col>
          <Col  onClick = {this.props.toggleQuestions}>{moment(new Date(this.props.remind.dueDate)).fromNow()}</Col>
          <Row>
            <Col onClick = {this.props.toggleQuestions}><div> <MdEdit onClick={this.editModal} style={{marginTop:"2%",marginLeft:"10px"}}/> </div></Col>
            <Col><div> <MdDelete onClick={this.props.del} style={{marginTop:"2%", marginRight: '10px'}}/></div></Col>
          </Row>
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
