import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'whatwg-fetch';
// import { bindActionCreators } from 'redux';
import { addReminder, deleteReminder, deleteAllReminders } from '../actions';
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Row, Button, Col, Container, Navbar } from 'reactstrap'
import Reminder from './Reminder'


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      text: '',
      dueDate: '',
      phone: ''
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
            body: JSON.stringify({to: this.state.phone, "message": this.state.text, "ts": this.state.dueDate})
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
      autoClose: 500,
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
      <div>
      <Container style = {{paddingTop:'10px', backgroundColor: '#82d6f2', display: 'flex',  justifyContent:'center', alignItems: 'center', width: '100%'}}>
        <h2 > Memory Help </h2>
      </Container>


      <div className="App">
        <div className="form-inline reminder-form">
          <div className="form-group">
            <input
              style ={{height: '35px', borderRadius: '10px'}}
              className="form-control"
              placeholder="I have to..."
              value = {this.state.text}
              onChange = {event => this.setState({text: event.target.value})}
            />

            <input
              style ={{height: '35px', borderRadius: '10px'}}
              className="form-control"
              placeholder="Your Phone Number"
              value = {this.state.phone}
              onChange = {event => this.setState({phone: event.target.value})}
            />
            <div style = {{textAlign: 'center'}}> Enter Due Date: </div>
            <input
              style ={{height: '35px', borderRadius: '10px'}}
              className="form-control"
              type="datetime-local"
              placeholder="Due Date"
              value={this.state.dueDate}
              onChange = {event => this.setState({dueDate: event.target.value})}
            />
            <div style = {{display: 'flex',  justifyContent:'center', alignItems: 'right'}}>
            <Button
              className="btn btn-success"
              onClick = {() => {this.notify; this.sendSms(); this.addReminder()}}
              style= {{alignItems: 'center'}}
            >
              Add Reminder
            </Button>
            <ToastContainer />
            </div>
          </div>
        </div>
        { this.renderReminders() }
        {this.renderClearButton()}
        </div>
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
