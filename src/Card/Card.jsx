import React, { Component } from 'react';
import './Card.css';

const Card = (props) => (
  <div className="card-container">
    <div className="card">
      <div className="front">
        <div className="vocab">Code Vocab</div>
      </div>
      <div className="back">
        <div className="definition">Code definition</div>
      </div>
    </div>
  </div>
)

export default Card 
