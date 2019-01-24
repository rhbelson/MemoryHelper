import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import { addReminder, deleteReminder, deleteAllReminders } from '../actions';
import moment from 'moment';
import { Row, Col} from 'reactstrap';
import {MdEdit, MdAlarm} from 'react-icons/md';
import {IoIosBook} from "react-icons/io";
import { Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';


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
        <Row style = {{fontFamily:"Titillium Web", color: '#010423', border: '.1px solid black', borderRadius: '15px',paddingLeft: '5px',marginBottom: '5px',  width: '100%', alignItems: 'center', backgroundColor: 'white',paddingTop:"5px",paddingBottom:"5px"}}>
          
          <Col style={{fontWeight:"bold"}}> {this.props.remind.text} </Col>

          <Col>{moment(new Date(this.props.remind.dueDate)).fromNow()}</Col>

          <Col style = {{display: 'flex',  justifyContent:'center', alignItems: 'right'}}>
            <Button onClick={this.props.toggleQuestions}> <IoIosBook style={{marginTop:"2%",marginRight:"10%"}}/>Study
             </Button></Col>


          <Col> <Dropdown style={{marginLeft:"3%",border:'0px',marginTop:"1%"}} isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown}>
                <DropdownToggle caret>
                  <MdAlarm/> {this.state.selectedInterval}
                </DropdownToggle>
                <DropdownMenu style = {{width: '60px'}}>
                  <DropdownItem header>Reminder Interval</DropdownItem>
                  <DropdownItem onClick = {() => this.setState({selectedInterval: "Ebbinghaus"})}>Ebbinghaus</DropdownItem>
                  <DropdownItem onClick = {() => this.setState({selectedInterval: "Daily"})}>Daily</DropdownItem>
                  <DropdownItem onClick = {() => this.setState({selectedInterval: "Weekly"})}>Weekly</DropdownItem>
                </DropdownMenu>
              </Dropdown></Col>

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
