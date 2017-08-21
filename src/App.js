import React, { Component } from 'react';
import './App.css';
import Card from './Card/Card';
import Draw from './Draw/Draw';

class App extends Component {
  constructor(props){
    super(props);

    this.updateCard = this.updateCard.bind(this);

    this.state = {
      cards: [
        {id: 1, vocab: "Vocabulary", definition: "Definition"},
        {id: 2, vocab: "Vocabulary_2", definition: "Definition_2"}
      ],
      currentCard: {}
    }
  }

  componentWillMount(){
    const currentCards = this.state.cards;

    this.setState({
      cards: currentCards,
      currentCard: this.getRandomCard(currentCards)
    })
  }

  getRandomCard(currentCards){
    var card = currentCards[Math.floor(Math.random() * currentCards.length)]
    return(card);
  }

  updateCard(){
    console.log("New Card");
  }
  render() {
    return (
      <div className="App">
        <div className="cardRow">
          <Card vocab={this.state.currentCard.vocab}
                definition={this.state.currentCard.definition}
                />
        </div >
        <div className="buttonRow">
          <Draw drawCard={this.updateCard}/>
        </div>
      </div>
    );
  }
}

export default App;
