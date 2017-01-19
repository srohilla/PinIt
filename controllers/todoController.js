var bodyParser=require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;﻿
//connecting to the mlab mongodb instance
mongoose.connect("mongodb://test:test@ds117919.mlab.com:17919/node_app");
//create a schema
var schema= new mongoose.Schema({
     //property
    item: String

});

//create a model for the schema
var Todo = mongoose.model('Todo',schema);

module.exports=function(app){
//set the routes
app.get('/toDo',function(req,resp){
//handle the get requests
//get the data from the model and send it to the view
//the find function will return the data needed (all values in this case) from the model
Todo.find({},function(err,data){
  //throw an error if any
  if (err) throw err;
  //send the response back with the data
  resp.render('toDo',{todoList:data});

});
});

app.post('/toDo',urlencodedParser,function(req,resp){
//handle the post request
  //add item in the array from the incoming request
  //create the first object and call save method on it
  //throw error if any and print message.
  var todoitem=Todo(req.body).save(function(err,data){
    if (err) throw err;
    //send data back as json
    //the frontend js file will handle an ajax request on this
    resp.json(data);
  });

});

app.delete('/toDo/:item',function(req,resp){
//handle the delete request
//the find function will return the data needed
//and we call remove function on it.
Todo.find({item: req.params.item.replace(/\-/g," ")}).remove(function(err,data){
  if (err) throw err;
//returning the response back to ajax handler
  resp.json(data);

});
});
};
