var React = require('react')
var ReactDOM = require('react-dom')
var $ = require('jquery')

class CommentBox extends React.Component {
  constructor(){
    super()

    this.state = {
      showComments: false,
      comments: [],
      errors: false
    }
  }

  render(){
    const comments = this._getComments()
    let commentNodes,
        showText = "Show",
        errorsDiv;

    if(this.state.showComments){
      commentNodes = <div className="comment-list"> {comments}</div>
      showText = "Hide"
    }

    //Showing errors
    if (this.state.errors) {
      errorsDiv = <div id="errors">Check your form</div>
    }

    return (
      <div className="comment-box">
        {errorsDiv}
        <CommentForm addComment={this._addComment.bind(this)} />
        <button onClick={this._toggleComments.bind(this)}>{showText} comments</button>
        <h3>Comments {this.state.comments.length}</h3>
        {commentNodes}
      </div>
    )
  }
  _getComments(){
    return this.state.comments.map( (comment) => {
      return (
        <Comment
          key={comment.id}
          author={comment.author}
          body={comment.body}
          comment={comment}
          onDelete={this._deleteComment.bind(this)} />
      )
    })
  }

  componentWillMount(){
    this._fetchComments()
  }

  _fetchComments(){
    $.ajax({
      method: 'GET',
      url: '/api/comments/',
      success: (comments) => this.setState({ comments })
    })
  }

  _deleteComment(comment){
    $.ajax({
      method: 'DELETE',
      url: `/api/comments/${comment.id}`,
      success: (comments) => {
        this.setState({ comments })
      }
    })
  }

  _toggleComments(){
    this.setState({
      showComments: !this.state.showComments
    })
  }

  _addComment(author, body){
    if(!author || !body) {
      this.setState({errors: true})
      return false
    }
    let comment = {
      author: author,
      body: body
    }
    //AJAX Request
    $.ajax({
      method: 'POST',
      url: 'api/comments',
      data: comment,
      success: (comments) => {
        this.setState({ comments })
      }
    })
  }
}

class Comment extends React.Component{
  render(){
    return (
      <div className="comment">
        <p className="comment-header">
          {this.props.author}
        </p>
        <p className="comment-body">
          {this.props.body}
        </p>
        <div className="comment-footer">
          <a href="#" className="comment-footer-delete" onClick={this._handleDelete.bind(this)}>
            Delete
          </a>
        </div>
      </div>
    )
  }

  _handleDelete(e){
    e.preventDefault()
    this.props.onDelete(this.props.comment)
  }
}

class CommentForm extends React.Component{
  render(){
    return (
      <form className="comment-form" onSubmit={this._handleSubmit.bind(this)}>
        <label>Join the discussion</label>
        <div className="comment-form-fields">
          <input type="text" placeholder="Name:" ref={(input) => this._author = input} />
          <textarea placeholder="Comment:" ref={(textarea) => this._body = textarea}></textarea>
        </div>
        <div className="form-actions">
          <button type="submit">Post Comment</button>
        </div>
      </form>
    )
  }

  _handleSubmit(e){
    e.preventDefault()
    let author = this._author.value
    let body = this._body.value
    this.props.addComment(author, body)
    this._author.value = ""
    this._body.value = ""
  }
}


ReactDOM.render(
  <CommentBox />, document.getElementById('comment-app')
)
