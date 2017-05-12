var express = require('express')
var expressLayouts = require('express-ejs-layouts')
// requiring our new body-parser
var bodyParser = require('body-parser')
// Model requires
// var List = require('./models').List
// var Todo = require('./models').Todo

var app = express()
app.set('view engine', 'ejs')

//let the app know we want to use body-parser to handle form data
app.use(bodyParser.urlencoded({ extended: false }))
app.use(expressLayouts)

app.get('/', function (request, response) {
  // load all the lists
  //List.all().then(function(lists){
    // render those lists in the index view
    response.render('index') //, {'lists': lists})
  });


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});
