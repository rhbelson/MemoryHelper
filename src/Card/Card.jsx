import React, { Component } from 'react';
import './Card.css';

const Card = (props) => (
  <div className="card-container">
    <div className="card">
      <div className="front">
        <div className="vocab">{props.vocab}</div>
      </div>
      <div className="back">
        <div className="definition">{props.definition}</div>
      </div>
    </div>
  </div>
)

export default Card
