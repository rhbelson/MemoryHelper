import React from 'react';

const CardForm = props => (
  <div>
    <form>
      <div className="form">
        <label>Vocab</label>
        <input type="text" ref="text"/>
        <label>Definition</label>
        <input type="text" ref="text"/>
      </div>
    </form>
  </div>

)

export default CardForm
