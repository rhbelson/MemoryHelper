import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'whatwg-fetch';
// import { bindActionCreators } from 'redux';
import { addReminder, deleteReminder, deleteAllReminders } from '../actions';
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Row, Button, Col, Container } from 'reactstrap'
import Reminder from './Reminder'


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      text: '',
      dueDate: ''
    };
  }
  notify = () => toast("Wow so easy !");

  sendSms = () => {
        console.log('entered sendSMS');
        fetch('/api/messages', {
            method: 'POST',
            headers: {
                Accept: 'application/JSON',
                'Content-Type': 'application/JSON'
            },
            body: JSON.stringify({to: "+17576606447", "message": this.state.text})
        })
            .then(resp => {
                console.log(resp)
            })
  };

  addReminder() {
    this.props.addReminder(this.state.text, this.state.dueDate);

    this.setState({text: '', dueDate: ''});
    toast('Reminder Set', {
      position: "top-right",
      autoClose: 50,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
      });
  }

  deleteReminder(id){
    this.props.deleteReminder(id);
  }

  deleteAllReminders(){
    this.props.deleteAllReminders();
  }

  renderClearButton() {
    const { reminders } = this.props;
    if(reminders.length !== 0){
      return(
        <Button
          style ={{marginTop: '10px'}}
          color = 'danger'
          onClick = {() => this.deleteAllReminders()}>
          Clear Reminders
        </Button>
      );
    }
    else{
      return(
        <Button style ={{marginTop: '10px'}} color = 'danger' >
          Clear Reminders
        </Button>
      );
    }
  }

  renderReminders() {
    const { reminders } = this.props;
    return (
      <Container style = {{display: 'flex',  justifyContent:'center', alignItems: 'center'}}>
      <Col style = {{alignItems: 'center'}}>
        {
          reminders.map((reminder, i) => {
            return (
              <Row style = {{display: 'flex',  justifyContent:'center', alignItems: 'center'}} key={i}>
                <Reminder del = {() => this.deleteReminder(reminder.id)} remind = {reminder} />
              </Row>
            )
          })
        }
      </Col>
      </Container>
    );
  }

  render() {
    return (
      <div className="App">
        <div className="title">
          Memory Helper
        </div>

        <div className="form-inline reminder-form">
          <div className="form-group">
            <input
              className="form-control"
              placeholder="I have to..."
              value = {this.state.text}
              onChange = {event => this.setState({text: event.target.value})}
            />
            <input
              className="form-control"
              type="datetime-local"
              value={this.state.dueDate}
              onChange = {event => this.setState({dueDate: event.target.value})}
            />
            <div>
            <button
              className="btn btn-success"
              onClick = {() => {this.notify; this.sendSms(); this.addReminder()}}
            >
              Add Reminder
            </button>
            <ToastContainer />
            </div>
          </div>
        </div>
        { this.renderReminders() }
        {this.renderClearButton()}
      </div>
    );
  }
}

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({addReminder}, dispatch);
// }

function mapStateToProps(state) {
  return {
    reminders: state
  };
}

export default connect(mapStateToProps, {addReminder, deleteReminder, deleteAllReminders})(App);
