import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import { addReminder, deleteReminder, deleteAllReminders } from '../actions';
import moment from 'moment';
import { Row, Col, Button} from 'reactstrap';
import {MdEdit} from 'react-icons/md';
import firebase from 'firebase';

class Reminder extends Component {
  constructor(props){
    super(props);
    this.state = {
      selectedInterval: 'Ebbinghaus',
    };
    this.toggleDropdown=this.toggleDropdown.bind(this);

  }

  componentWillMount () {
      console.log(this.props.remind);
  }


  //Toggle Dropdown to select interval reminder
  toggleDropdown() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  render() {
    return (
        <Row onClick = {() => this.props.toggleQuestions(this.props.remind.text)} style = {{fontFamily:"Titillium Web", color: 'white', borderRadius: '15px',paddingLeft: '5px',marginBottom: '5px',  width: '100%', alignItems: 'center', backgroundColor: '#9A7197'}}>
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
