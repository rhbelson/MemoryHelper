import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'whatwg-fetch';
// import { bindActionCreators } from 'redux';
import { addReminder, deleteReminder, deleteAllReminders } from '../actions';
import { Row,
 Button,
 Col,
 Container,
 Modal, ModalHeader, ModalFooter, ModalBody,
 Navbar, NavbarBrand, NavItem, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
 import { toast } from 'react-toastify';
 import Reminder from './Reminder'
 import Questions from './Questions'
 import MyForm from './Form'
 import 'bootstrap/dist/css/bootstrap.min.css';
 import WebFont from 'webfontloader';
 import firebase from 'firebase';
 import './card.css';
 import { MdAlarm } from 'react-icons/md';
 import Tilt from 'react-tilt';
 import StudyPic from './study.png';
 import { FaTasks } from "react-icons/fa";


 WebFont.load({
  google: {
    families: ['Titillium Web:300,400,700', 'sans-serif','Purple Purse','Karla']
  }
});


//setting up firebase
var config = {
  apiKey: "AIzaSyCyodghAcVUIbW6NC6hBaOghQVml3RLIKs",
  authDomain: "memory-helper-de33b.firebaseapp.com",
  databaseURL: "https://memory-helper-de33b.firebaseio.com",
  projectId: "memory-helper-de33b",
  storageBucket: "memory-helper-de33b.appspot.com",
  messagingSenderId: "482145597160"
};
firebase.initializeApp(config);


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      text: '',
      dueDate: '',
      phone: '',
      modal: false,
      errorModal: false,
      points: 0,
      dropdownOpen:false,
      toggleQuestions: false,
      numReminders:0,
      AddNewActivity:false,
      viewingTasks:false
    };
    this.toggle = this.toggle.bind(this);
    this.toggleErrorModal = this.toggleErrorModal.bind(this);
    this.count = 0;
    this.toggleQuestions = this.toggleQuestions.bind(this)
  }

  //Adds card data to database
  addCard(){
    var  db = firebase.database().ref("Cards/");
    db.push({
      id: this.count,
      vocab: document.getElementById("Vocab").value,
      definition: document.getElementById("Definition").value
    });

    this.count += 1;

  }


   //grabs a random card's Vocab Value from database
  //right now just draws a specific card
  drawCard(){

    const rand = Math.floor(Math.random() * (this.count - 0 + 1)) + 0;
    var db = firebase.database().ref("Cards/");

    db.on("value", function(snapshot) {
     var myCard = snapshot.val().vocab;
     console.log(myCard);
   });
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


  //Increment Points in Header
  incrementPoints(num_points) {
    let currentPoints=this.state.points;
    currentPoints=currentPoints+num_points;
    this.setState({points: currentPoints});
  }




  //Lyon to write function that takes in due date of task as input, and outputs 4 Datetime objects for times to schedule Twilio messages
  scheduleTimes(givendate) {
    var date = new Date();
    var given = new Date(givendate);
    var timeleft = given.getTime() - date.getTime();
    var remindertimes = [timeleft / 16];
    remindertimes.push(timeleft / 8);
    remindertimes.push(timeleft / 4);
    remindertimes.push(timeleft / 2);
    //var wantedtime = givendate.getTime();
    return remindertimes;

  }

//Function that schedules Twilio messages given output determined by scheduleTimes function (calls sendSms function)
scheduleMessages() {
    //To Do
  }

  addReminder() {
    this.props.addReminder(this.state.text, this.state.numReminders, this.state.dueDate, this.state.phone);
    this.setState({text: '', dueDate: '', phone: ''});
    this.incrementPoints(5);
    this.setState({numReminders: this.state.numReminders+1});
    this.viewTasks();
  }

  deleteReminder(id){
    this.props.deleteReminder(id);
    this.setState({numReminders: this.state.numReminders-1});
  }

  deleteAllReminders(){
    this.props.deleteAllReminders();
    this.setState({numReminders: 0});
  }

  toggleQuestions(){
    this.setState({toggleQuestions: !this.state.toggleQuestions})
  }

  renderClearButton() {
    const { reminders } = this.props;
    if(reminders.length !== 0){
      return(
        <Button
        style ={{marginTop: '10px',marginLeft:"40%",fontFamily:'Karla', border: '0px', backgroundColor: '#f96571'}}
        onClick = {() => this.deleteAllReminders()}>
        Clear Reminders
        </Button>
        );
      }
      // else{
    //   return(
    //     <Button style ={{marginTop: '10px',fontFamily:'Karla', border: '0px', backgroundColor: '#f96571'}} >
    //       Clear Reminders
    //     </Button>
    //   );
    // }
  }


  renderReminderForm() {
    if (this.state.numReminders===0) {
      return (
        <div className="form-inline reminder-form" style={{fontFamily:"Karla",color:"black",marginLeft:"25%"}}>
          <div className="form-group">
            <div style = {{textAlign: 'center', fontWeight: 'bold'}}> Create a Study Set! </div>
              <input
              style ={{height: '35px', borderRadius: '10px', textAlign: 'center'}}
              className="form-control"
              placeholder="Study Set Title"
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
          onChange = {event => this.setState({dueDate: event.target.value})}
          />

          <div style = {{display: 'flex',  justifyContent:'center', alignItems: 'right'}}>
            <Button
              onClick = {() => {
                if(this.state.text !== '' && this.state.phone !== '' && this.state.dueDate !== ''){
                  this.toggle(); this.sendSms(); this.addReminder()
                }
                else {this.toggleErrorModal()}
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
        <Button color="primary" onClick={() => {this.toggle(); this.addCard()}}>Confirm</Button>{' '}
        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
        </ModalFooter>
        </Modal>
      </div>

      <div>
        <Modal isOpen={this.state.toggleQuestions} toggle={this.toggleQuestions}>
        <ModalHeader toggle={this.toggleQuestions}>Questions</ModalHeader>
        <Questions />
        </Modal>
      </div>

          </div>
        </div>
      </div>
      );
    }
    else{
      return
    }
  }


  viewTasks() {
    if (this.state.viewingTasks==false) {
      this.renderReminders();
      this.setState({viewingTasks: true});
    }
    else {
      this.setState({viewingTasks: false});
    }
  }




  renderReminders() {
    const { reminders } = this.props;
    const state = this.state

    if (this.state.numReminders>=1 && this.state.viewingTasks==true) {
      return (
      <div>
      <h2 style={{fontFamily:"Karla",marginLeft:"30%",fontWeight:"bold"}}>My Reminders</h2>
      <Container style = {{display: 'flex',  justifyContent:'center', alignItems: 'center'}}>
      <Col style = {{alignItems: 'center'}}>
      {
        reminders.map((reminder, i) => {
          return (
          <Row style = {{display: 'flex',  justifyContent:'center', alignItems: 'center',marginTop:'2%'}} key={i}>
          <Reminder toggleQuestions = {() => this.setState({toggleQuestions: !this.state.toggleQuestions})}
          del = {() => this.deleteReminder(reminder.id)} remind = {reminder} />
          </Row>
          )
        })
      }
      </Col>
      </Container>
      </div>
      );
  }

  if (this.state.numReminders==0 && this.state.viewingTasks==true) {
      return(
        <div>
      <h2 style={{fontFamily:"Karla",marginLeft:"30%",fontWeight:"bold",marginTop:"5%"}}>My Reminders</h2>
        <h4 style={{textAlign:"center", fontFamily:"Karla"}}>Sorry, you currently have no reminders</h4>
      </div>
        );
    }


  else {
      return
    }


  }

  renderCards(){
    return(
    <div>
    <div className="card-container">
    <div className="card">
    <div className="front">
    <div className="vocab">Vocab</div>
    </div>
    <div className="back">
    <div className="definition">Definition</div>
    </div>
    </div>
    </div>

    <Button onClick={this.drawCard}> Draw Card </Button>
    </div>
    )
  }


  render() {
    const num = this.props.numReminders

    return (
    <div style={{backgroundColor:"#FCF6B1", height: '100vh'}}>
      <Navbar color="dark" light expand="md">
        <NavbarBrand style={{color:"#ffffff", fontFamily:"Titillium Web"}} href="/">MemoryHelper</NavbarBrand>
        <NavItem style = {{listStyleType: 'none', color:"#ffffff", fontFamily:"Titillium Web", fontSize: '18px'}}>
          <img src={require(`../images/star.jpg`)} width={30} style={{marginRight: '10px'}} />
               {this.state.points} Points!
        </NavItem>
        
        <NavItem style = {{listStyleType: 'none'}}>
        <Button onClick = {() => this.viewTasks()}><FaTasks/> View Tasks</Button>
        </NavItem>

      </Navbar>

      <div className="App">
        <Tilt className="Tilt" options={{ max : 180, perspective: 1000, speed:300, transition:true,easing: "cubic-bezier(.03,.98,.52,.99)" }} >
        <div className="Tilt-inner"> <img src={StudyPic} alt="logo" style={{width:"100px",animation:"spin infinite 20s linear"}}/></div>
        </Tilt>
      </div>



     {this.renderReminderForm()}
    {this.renderReminders()}
    {this.renderClearButton()}

    </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    reminders: state
  };
}

export default connect(mapStateToProps, {addReminder, deleteReminder, deleteAllReminders})(App);
