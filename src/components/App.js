import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'whatwg-fetch';
// import { bindActionCreators } from 'redux';
import { addReminder, deleteReminder, deleteAllReminders } from '../actions';
import { Row, Button, Col, Container, Modal, ModalHeader, ModalFooter, ModalBody, Navbar, NavbarBrand } from 'reactstrap'
import Reminder from './Reminder'
import MyForm from './Form'
import 'bootstrap/dist/css/bootstrap.min.css';
import WebFont from 'webfontloader';

WebFont.load({
  google: {
    families: ['Titillium Web:300,400,700', 'sans-serif','Purple Purse','Karla']
  }
});



class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      text: '',
      dueDate: '',
      phone: '',
      modal: false,
      errorModal: false
    };
    this.toggle = this.toggle.bind(this);
    this.toggleErrorModal = this.toggleErrorModal.bind(this)
  }

  toggle() {
      this.setState({modal: !this.state.modal});
    }

  toggleErrorModal() {
      this.setState({errorModal: !this.state.errorModal});
    }

  sendSms = () => {
        console.log('entered sendSMS');
        fetch('/api/messages', {
            method: 'POST',
            headers: {
                Accept: 'application/JSON',
                'Content-Type': 'application/JSON'
            },
            body: JSON.stringify({to: this.state.phone, "message": this.state.text, "ts": this.state.dueDate})
            // body used for testing:
            // body: JSON.stringify({to: "7576606447", "message": `message at ${new Date().toLocaleTimeString()}`, "ts": this.state.dueDate})

        })
            .then(resp => {
                console.log(resp)
            })
  };

  addReminder() {
    this.props.addReminder(this.state.text, this.state.dueDate, this.state.phone);
    this.setState({text: '', dueDate: '', phone: ''});
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
          style ={{marginTop: '10px',fontFamily:'Karla', border: '0px', backgroundColor: '#f96571'}}
          onClick = {() => this.deleteAllReminders()}>
          Clear Reminders
        </Button>
      );
    }
    else{
      return(
        <Button style ={{marginTop: '10px',fontFamily:'Karla', border: '0px', backgroundColor: '#f96571'}} >
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
              <Row style = {{display: 'flex',  justifyContent:'center', alignItems: 'center',marginTop:'2%'}} key={i}>
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
      <div style={{backgroundColor:"#FCF6B1", height: '100vh'}}>
      <Navbar color="dark" light expand="md">
          <NavbarBrand style={{color:"#ffffff", fontFamily:"Titillium Web"}} href="/">MemoryHelper</NavbarBrand>
      </Navbar>

      <div className="App">
        <div className="form-inline reminder-form" style={{fontFamily:"Karla",color:"black"}}>
          <div className="form-group">
              <div style = {{textAlign: 'center', fontWeight: 'bold'}}> Enter Reminder Details: </div>
            <input
              style ={{height: '35px', borderRadius: '10px', textAlign: 'center'}}
              className="form-control"
              placeholder="I have to..."
              value = {this.state.text}
              onChange = {event => this.setState({text: event.target.value})}
            />

            <input
              style ={{height: '35px', borderRadius: '10px', textAlign: 'center'}}
              className="form-control"
              placeholder="Your Phone Number"
              value = {this.state.phone}
              onChange = {event => this.setState({phone: event.target.value})}
            />
            <div style = {{textAlign: 'center', fontWeight: 'bold'}}> Enter Due Date: </div>
            <input
              style ={{height: '35px', borderRadius: '10px'}}
              className="form-control"
              type="datetime-local"
              placeholder="Due Date"
              value={this.state.dueDate}
                // if(this.state.dueDate == ''){
                //   value=moment()
                // }
                // else {
                //   this.state.dueDate
                // }
              onChange = {event => this.setState({dueDate: event.target.value})}
            />
            <div style = {{display: 'flex',  justifyContent:'center', alignItems: 'right'}}>
            <Button
              // className="btn btn-success"
              onClick = {() => {
                if(this.state.text !== '' && this.state.phone !== '' && this.state.dueDate !== '')
                {
                this.toggle();
                this.sendSms();
                this.addReminder()
                }
                else
                {
                  this.toggleErrorModal()
                }
              }}
              style= {{alignItems: 'center', marginTop: '5px', border: '0px', backgroundColor: '#5a9506'}}
            >
              Add Reminder
            </Button>

            <div>
              <Modal isOpen={this.state.errorModal} toggle={this.toggleErrorModal}>
                <ModalHeader toggle={this.toggleErrorModal}>Please Fill in All Fields</ModalHeader>
                <ModalFooter>
                  <Button color="primary" onClick={this.toggleErrorModal}>OK</Button>{' '}
                </ModalFooter>
              </Modal>
            </div>

            <div>
              <Modal isOpen={this.state.modal} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>Make Your FlashCards!</ModalHeader>
                <ModalBody>
                  <MyForm />
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={this.toggle}>Confirm</Button>{' '}
                  <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                </ModalFooter>
              </Modal>
            </div>

            </div>
          </div>
        </div>
        {this.renderReminders()}
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
