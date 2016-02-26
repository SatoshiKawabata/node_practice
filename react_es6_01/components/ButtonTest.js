import React from 'react';
import $ from 'jquery';

class ButtonTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      onClick: props.onClick
    };
  }

  render() {
    return (
      <div className='buttonBox'>
        <button 
          onClick={this.onClick}
          onDoubleClick={this.onDoubleClick}
          >ボタン</button>
      </div>
    );
  }

  onClick(e) {
    // e.preventDefault();
    // e.stopPropagation();
    console.log('click', e);
  }

  onDoubleClick(e) {
    console.log('double click', e);
  }
}

export default ButtonTest;
