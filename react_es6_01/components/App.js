import React from 'react';
import $ from 'jquery';
import Router, { Link, RouteHandler } from 'react-router';
// import Link from Router.Link;
// import RouteHandler from Router.RouteHandler;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <header>
          <ul>
            <li><Router.Link to='app'>Dashboard</Router.Link></li>
            <li><Router.Link to='inbox'>inbox</Router.Link></li>
            <li><Router.Link to='calendar'>calendar</Router.Link></li>
            <Router.RouteHandler />
          </ul>
        </header>
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

export default App;
