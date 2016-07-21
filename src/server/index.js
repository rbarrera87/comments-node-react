import express from 'express'
import bodyParser from "body-parser";
const server  = express()
let comments = [
  {id: 1, author: "Anne Droid", body: "I wanna know what am i Doing here"},
  {id: 2, author: "Other", body: "this is a new comment"}
]
let urlencode = bodyParser.urlencoded({ extended: false })

//middleware
server.use(express.static('public'))


server.get("/", (req, res) => {})

server.post("/api/comments", urlencode, (req, res) => {
  let comment = req.body
  comment.id = comments[comments.length-1].id + 1
  comments.push(comment)
  res.json(comments)
})

server.delete('/api/comments/:id', (req, res) => {
  let id = parseInt(req.params.id)
  for (var i = comments.length - 1; i >= 0; i--) {
    if(comments[i].id === id){
      comments.splice(i, 1)
      break
    }
  }
  res.json(comments)
})

server.get("/api/comments", (req, res) => {
  res.json(comments)
})

server.listen(8080, () => console.log("Server running..."))
