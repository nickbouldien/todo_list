var express = require('express')
var expressLayouts = require('express-ejs-layouts')
var bodyParser = require('body-parser')
var TodoList = require('./models').TodoList
var Todo = require('./models').Todo

var app = express()
app.use(express.static('public'))
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

//get certain todo list
app.get('/todo-list/:id', function(request, response) {
  TodoList.findById(request.params.id,
    {include: [{
      model: Todo,
      as: 'todos'
    }]
  }).then(function(todoList){
    response.render('todo-list', {todoList: todoList, todos: todoList.todos})
  }).catch(function(error){
    response.send("Error, couldn't fetch TodoLists")
  })
})

//mark todo as complete
app.post('/todo-list/:todoListId/todo/:id/complete', function(request, response){
  Todo.findById(request.params.id).then(function(todo){
    todo.isComplete = true
    return todo.save()
  }).then(function(todo){
    response.redirect("/todo-list/" + request.params.todoListId)
  }).catch(function(error){
    response.send("Error, couldn't fetch Todo")
  })
})

//new todo
app.post('/todo-list/:todoListId/todo/new', function(request, response){
  TodoList.findById(request.params.todoListId).then(function(todoList){
    return todoList.createTodo({
      name: request.body.name,
      isComplete: false
    })
  }).then(function(todo){
    response.redirect("/todo-list/" + request.params.todoListId)
  }).catch(function(error){
    response.send("Error, couldn't create Todo")
  })
})

//delete todos
app.post('/todo-list/:todoListId/todo/:id/delete', function(request, response){
  Todo.findById(request.params.id).then(function(todo){
    return todo.destroy()
  }).then(function(todo){
    response.redirect("/todo-list/" + request.params.todoListId)
  }).catch(function(error){
    response.send("Error, couldn't fetch Todo")
  })
})

app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port 3000!')
});
