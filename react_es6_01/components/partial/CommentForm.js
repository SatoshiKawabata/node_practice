import React from 'react';

class CommentBox extends React.Component {

  render() {

    return (
      <div className='commentForm'>
        <form className='commentForm' onSubmit={ this._handleSubmit.bind(this) }>
          <input type='text' placeholder='Your name' ref='author' />
          <input type='text' placeholder='Say something...' ref='text' />
          <input type='submit' placeholder='Post' />
        </form>
      </div>
    );
  }

  _handleSubmit(e) {
    e.preventDefault();
    let authorElm = React.findDOMNode(this.refs.author);
    let textElm = React.findDOMNode(this.refs.text);
    let author = authorElm.value.trim();
    let text = textElm.value.trim();
    if (!text || !author) {
      return;
    }

    this.props.handleCommentSubmit({
      author: author,
      text: text,
    });

    authorElm.value = '';
    textElm.value = '';
  }
}

export default CommentBox;
