var express = require('express')
var expressLayouts = require('express-ejs-layouts')
// requiring our new body-parser
var bodyParser = require('body-parser')
// Model requires
var TodoList = require('./models').TodoList
// var Todo = require('./models').Todo

var app = express()
app.set('view engine', 'ejs')

//let the app know we want to use body-parser to handle form data
app.use(bodyParser.urlencoded({ extended: false }))
app.use(expressLayouts)

app.get('/', function (request, response) {
  TodoList.findAll().then(function(todoLists){
    response.render('index', {todoLists: todoLists})
  }).catch(function(error){
    response.send("Error, couldn't fetch TodoLists")
  })
});




app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});
