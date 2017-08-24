import React, { Component } from 'react';

class Add extends Component{
  constructor(props){
    super(props);

    this.addCard = this.addCard.bind(this);

  }

  addCard(){
    this.props.addCard();
  }

  render(props){
    return(
      <div className="add-container">
        <button className="addCard" onClick={this.addCard}>Add Card</button>
      </div>
    )
  }
}

export default Add
