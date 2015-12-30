/** @jsx React.DOM */

var React = require('react');

var ModuleButton = require('./module_button');

var DraggableQuestions = React.createClass({
  render: function () {
    return (
      <ul className="modules list-unstyled">
        <li><ModuleButton text='Yes / No' questionType='yes_no'/></li>
        <li><ModuleButton text='多肢選択' questionType='multiple_choice'/></li>
        <li><ModuleButton text='散文形式' questionType='essay'/></li>
      </ul>
    );
  },

  shouldComponentUpdate: function () {
    return false;
  }
});

module.exports = DraggableQuestions;
