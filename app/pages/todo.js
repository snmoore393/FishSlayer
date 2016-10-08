var $ = window.$;
var Handlebars = window.Handlebars;
import model from '../models/todoModel';
import view from 'text!../views/todoItem.tpl';

var controller = {
  init: function(){
    model.init();
    // cache some selectors
    controller.addButton = $('.btn-add');
    // compile todo template
    controller.compiledTemplate = Handlebars.compile(view);
    // render the todo item template
    controller.renderTemplates();     
  },
  // do all the visual stuff
  render: function(compiledTodos){
    // remove all the event handlers for the todo app
    // event handlers are functions that get run when an event happens
    controller.destroyEventHandlers();
    // compiled todos is an array
    // we are joining the elements of the array together to make on long string
    // put the long string into the HTML element with a class of "todo"
    $('.todo-list').html(compiledTodos.join(''));
    // now that all the todos have been added to the DOM
    // add all the event handlers for todo app 
    controller.createEventHandlers();

  },
  renderTemplates: function(){
    var compiledTodos = [];
    // get the database
    // loop over each item in the database
    model.get().forEach(function(item, index){
      // creat an id equal to index + 1
      // the + 1 is to make it more human readable
      // ID is required by our view
      item.id = index + 1;
      //handlebars, step 2
      // replace {{id}} with the items id value
      var renderedTodo = controller.compiledTemplate(item);
      // add this rendered todo to our list of todos
      compiledTodos.push(renderedTodo);
    });// end of forEach
    // pass list of todos to the render function
    controller.render(compiledTodos);
    // tell the model to save our data
    model.save();
  },
  // remove event handlers from app
  // get ready to re-render
  destroyEventHandlers: function(){
    controller.addButton.off();
    $('input[type="checkbox"]').off();
    $('.close').off();
  },
  // add the event handlers
  createEventHandlers: function(){
    controller.addButton.on('click', controller.addTodoHandler);
    $('input[type="checkbox"]').on('change', controller.checkedHandler);
    $('.close').on('click', controller.removeHandler);
  },
  // event handler for the close "x" button
  // deletes the todo
  removeHandler: function(event){
  // which on was clicked?
    var index = $(event.currentTarget).parent().parent().index();
     // update the database
    model.get().splice(index, 1);
     // update the view
    controller.renderTemplates();
  },
  // event handler for the checkboxes
  checkedHandler: function(event){
    // which checkbox?
    var index = $(event.currentTarget).parent().parent().index();
      // update the database
    model.get()[index].completed = !model.get()[index].completed;
      // console.log(modle[index])
    model.save();
    controller.renderTemplates();
  },
  // event handler for the add button creates the ADD button
  // creates a new todo
  addTodoHandler: function(){
    // reads the imput using jquery.val()
    var newTitle = $('.add-input').val();
    // quick exit
    if (newTitle === '') return;
    // model.get()? returns the database
    // push adds an item to the database
    model.get().push({
      title: newTitle,
      completed: false
    });
    // clear the text out of the box
    $('.add-input').val('');
    // updates the display
    controller.renderTemplates();
  }
};  
// specifies what will be returned
// when this file is imported  
module.exports = controller;  

