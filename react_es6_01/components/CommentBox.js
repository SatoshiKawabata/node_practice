import React from 'react';
import CommentList from './partial/CommentList';
import CommentForm from './partial/CommentForm';
import $ from 'jquery';

class CommentBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    this._loadCommentsFromServer();
    setInterval(this._loadCommentsFromServer.bind(this), this.props.pollInterval);
  }

  render() {
    return (
      <div className='commentBox'>
        <h2>Comments</h2>
        <CommentList data={this.state.data} />
        <CommentForm handleCommentSubmit={ this._handleCommentSubmit.bind(this) } />
      </div>
    );
  }

  _loadCommentsFromServer() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: (data) => {
        this.setState({ data: data });
      },
      error: (xhr, status, err) => {
        console.error(this.props.url, status, err.toString());
      },
    });
  }

  _handleCommentSubmit(data) {
    console.log(data, this.state);

    this.state.data.push(data);
    this.setState(this.state);

    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: comment,
      success: (data) => {
        this.setState({ data: data });
      },
      error: (xhr, status, err) => {
        console.error(this.props.url, status, err.toString());
      },
    });
  }
}

export default CommentBox;
