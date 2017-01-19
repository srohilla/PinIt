var express=require('express');

//importing the controller
var toDoAppController = require('./controllers/todoController');
var app = express();
//set up the template engine
app.set('view engine','ejs');

//use the static files
app.use(express.static('./public'));

//fire the controllers
toDoAppController(app);

//listen to port 8080
app.listen(8080);
console.log("listening to the port : 8080");
