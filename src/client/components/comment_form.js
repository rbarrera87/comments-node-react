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
