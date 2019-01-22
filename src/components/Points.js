import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import { addReminder, deleteReminder, deleteAllReminders } from '../actions';
import moment from 'moment';
import { Row, Col, Navbar, NavbarBrand} from 'reactstrap';


class Points extends Component {
  render() {
    return (
      <Navbar color="dark" light expand="md">
          <NavbarBrand style={{color:"#ffffff", fontFamily:"Titillium Web"}} href="/">MemoryHelper</NavbarBrand>
      </Navbar>
    );
  }
}

function mapStateToProps(state) {
  return {
    reminders: state
  };
}

export default connect(mapStateToProps, {addReminder, deleteReminder, deleteAllReminders })(Points);
