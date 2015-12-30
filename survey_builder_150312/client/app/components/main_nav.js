/** @jsx React.DOM */

var React = require("react");
var Link = require('react-router').Link;

var MainNav = React.createClass({
  render: function () {
    return (
      <nav className='main-nav' role='navigation'>
        <ul className='nav navbar-nav'>
          <li><Link to="list">すべてのサーベイ</Link></li>
          <li><Link to="add">サーベイを追加</Link></li>
        </ul>
      </nav>
    );
  }
});

module.exports = MainNav;
