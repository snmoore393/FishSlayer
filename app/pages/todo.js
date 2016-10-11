var $ = window.$;
import _ from 'underscore';
import model from '../models/todoModel';
import view from 'text!../views/todoItem.tpl';

var controller = {
  init: function(){
    model.init();
    // cache some selectors
    controller.addButton = $('.btn-add');
    // compile template
    controller.compiledTemplate = _.template(view);
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
    // get the database
    // loop over each item in the database
    var compiledTodos = model.get().map(function(item, index){
      // creat an id equal to index + 1
      // the + 1 is to make it more human readable
      // ID is required by our view
      item.id = index + 1;
      // replace {{id}} with the items id value
      return controller.compiledTemplate(item);
      // add this rendered todo to our list of todos
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
    $('.edit').off();
  },
  // add the event handlers
  createEventHandlers: function(){
    controller.addButton.on('click', controller.addTodoHandler);
    $('input[type="checkbox"]').on('change', controller.checkedHandler);
    $('.close').on('click', controller.removeHandler);
    // edit button handler
    $('.edit').on('click', controller.editHandler);
  },
  // event handler for the edit button
  editHandler: function(event){
    // which item to edit??
    var index = $(event.currentTarget).parent().parent().index();
    var $item = $('.todo').eq(index);
    // text imput disappears
    $item.find('.todo-title').addClass('hidden');
    // text input appears
    $item.find('.todo-title-edit').removeClass('hidden');
    // edit button replaced by save button
    $item.find('.edit').addClass('hidden');
    $item.find('.save').removeClass('hidden');
    // make change when they click on save button
    $item.find('.save').on('click', controller.updateTitle);
    $item.find('.todo-title-edit input').on('keypress', controller.updateTitleKeypress);
  },
  // handler to update title on enter
  updateTitleKeypress: function(event){
    if (event.which === 13) {
      // they hit enter!!
      controller.updateTitle(event);
    }
  },
  // save edit button handler
  updateTitle: function(){
    // which title??
    var index = $(event.currentTarget).parent().parent().index();
    var $item = $('.todo').eq(index);
    $item.find('.save').off();
    $item.find('.todo-title-edit input').off();
    var newTodoTitle = $item.find('.todo-title-edit input').val();
    // update the database
    model.get()[index].title = newTodoTitle;
    model.save();
    controller.renderTemplates();
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

