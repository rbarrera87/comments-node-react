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
        <Comment key={comment.id} author={comment.author} body={comment.body} />
      )
    })
  }

  _fetchComments(){
    $.ajax({
      url: "/"
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
      id: this.state.comments.length + 1,
      author: author,
      body: body
    }
    this.setState({comments: this.state.comments.concat([comment]), errors: false})
  }
}
