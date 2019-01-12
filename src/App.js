import React, { Component } from 'react';
import './App.css';
import Card from './Card/Card';
import Draw from './Draw/Draw';
import CardForm from './Card-Form/Card-Form';
import Add from './Add/Add';
import firebase from 'firebase/app';
import 'firebase/database';

// import { DB_CONFIG } from './firebase';

class App extends Component {
  constructor(props){
    super(props);
    const DB_CONFIG = {
      apiKey: "AIzaSyDwoaVL_68rhSf_fbbMIdUNVaqtVQfFoWE",
      authDomain: "memoryhelper-27244.firebaseapp.com",
      databaseURL: "https://memoryhelper-27244.firebaseio.com",
      projectId: "memoryhelper-27244",
      storageBucket: "memoryhelper-27244.appspot.com",
      messagingSenderId: "468773177726"
    };
    this.app = firebase.initializeApp(DB_CONFIG);
    this.database = this.app.database().ref().child('cards');
    this.addCard = this.addCard.bind(this);
    // this.deleteCard = this.deleteCard.bind(this);
    this.updateCard = this.updateCard.bind(this);

    this.state = {
      cards: [],
      currentCard: {}
    }
  }

  componentWillMount(){
    const currentCards = this.state.cards;

    this.database.on('child_added', snap => {
      currentCards.push({
        id: snap.key,
        vocab: snap.val().vocab,
        definition: snap.val().definition,
      })
       this.setState({
        cards: currentCards,
        currentCard: this.getRandomCard(currentCards)
      })
   })
   this.database.on('child_removed', snap => {
     for(var i=0; i < currentCards.length; i++){
       if(currentCards[i].id === snap.key){
         currentCards.splice(i, 1);
       }
     }
     this.setState({
       cards: currentCards
     })
   })
  }

  getRandomCard(currentCards){
    var card = currentCards[Math.floor(Math.random() * currentCards.length)]
    return(card);
  }

  updateCard(){
    const currentCards = this.state.cards;
    this.setState({
      currentCard: this.getRandomCard(currentCards)
    })
  }

  addCard(cards){
    this.database.push().set({currentCards: cards});
  }

  removeCard(id){
    this.database.child(id).remove();
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

        <div className="formRow">
          <CardForm form={this.state.currentCard.CardForm}/>
        </div>

        <div className="addButton">
          <Add addCard={this.addCard}/>
        </div>
      </div>
    );
  }
}

export default App;
