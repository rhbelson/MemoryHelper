import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import { addReminder, deleteReminder, deleteAllReminders } from '../actions';
import moment from 'moment';
import { Row, Button, Col, Form, FormGroup, Input} from 'reactstrap'

class MyForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      rows: [1],
      last: 1
    };

    this.addRow = this.addRow.bind(this);
  }

addRow() {
  const newLast = this.state.last + 1
  const newArray = this.state.rows.concat([newLast])
  this.setState({rows: newArray, last: newLast})
}

deleteRow() {
  const newLast = this.state.last - 1
  const newArray = this.state.rows.slice(0, -1)
  this.setState({rows: newArray, last: newLast})
}


  render() {
    return (
        <Form>
          <FormGroup>
          {this.state.rows.map((row, i) => {
          return <Row key={i}>
            <Col><Input type="text" placeholder="Word" /></Col>
            <Col><Input type="text" placeholder="Definition" /></Col>
          </Row>}
        )}
          </FormGroup>
          <Row>
            <Col>
              <Button style = {{width: '100%'}} color = "success" onClick={() => this.addRow()}> Add Row </Button>
            </Col>
            <Col>
              <Button style = {{width: '100%'}} color = "danger" onClick={() => this.deleteRow()}> Delete Row </Button>
            </Col>
          </Row>
        </Form>
      //
    );
  }
}

function mapStateToProps(state) {
  return {
    reminders: state
  };
}

export default connect(mapStateToProps, {addReminder, deleteReminder, deleteAllReminders })(MyForm);
