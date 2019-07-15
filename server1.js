console.log("got data");
//default make connection for mongoose
/*
var mongoose = require("mongoose");
//connect with mongoose
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');
*/
var express = require("express");

var {ObjectID} = require("mongodb");

var bodyparser = require("body-parser");

var mongoose = require("./mongoose");

var {Todo} = require('./todo1');

var app = express();

//const port = process.env.PORT || 3000;

app.use(bodyparser.json());

app.post('/todos',(req,res) => {
    var todo = new Todo({
        text: req.body.text,
        completed: req.body.completed
    });
    //console.log(req.body);
    //res.send("got page");
    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        //console.log(e);
        res.status(400).send(e);
    });

});

app.get('/todos',(req,res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    },(e) => {
        res.status(400).send(e);
    });
});

app.get('/todos/:id',(req,res) => {
    //res.send(req.params);
    var id = req.params.id;
    console.log(id);
    if(!ObjectID.isValid(id)){
        //console.log("enter valid id is invalid");
        return res.status(404).send();
    }
    else{
        console.log("enter valid id is valid");
    }

    Todo.findById(id).then((resp) => {
        console.log("my",resp);
        if(!resp){
            console.log("data not found");
            throw new error('fhgh');
        }
        res.send(resp);
    }).catch((e) => {
        res.status(400).send(e);
    });

});

app.listen(3000, () => {
    console.log("started on port");
});

//dynamic assign port
/*
app.listen(port, () => {
    console.log(`port assign is ${port}`);
});
*/
module.exports = {app};
//create model in single page
/*
var Todo = mongoose.model('Todo',{
    text:{
        type:String,
        //validation
        required: true,
        minlength:1,
        trim:true
    },
    completed:{
        type:Boolean,
        default:false
    },
    completedAt:{
        type:Number,
        default:null
    }
});
*/

//Add data in mongoose
/*
var newtodo = new Todo({
    text:"  get all-data with all property",
    completed:true,
    completedAt:2323
});
*/


//add another data in mongoose model
/*
var newtodo2 = new Todo({
   text:"check data added here",
   completed:true,
   completedAt:123
});
*/

//save in database
/*
newtodo.save().then((doc) => {
    console.log("save to do",doc);
},(e) => {
    console.log("unable to save to do");
});
*/


/*
newtodo2.save().then((doc) => {
    console.log("save another data",doc);
},(e) => {
   console.log("error occured in add 2nd data");
});
*/

