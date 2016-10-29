
// var $ = window.$;
import Backbone from 'backbone';
import bbTodoItemView from '../views/bb_todoItemView';

var TodoView = Backbone.View.extend({
  el: '.todo-container',
  events: {
    'click .btn-add': 'addTodo',
    'keypress .add-input': 'addKeypress'
  },
  initialize: function(todos, controller){
    this.controller = controller;
    this.render(todos);
  },
  render: function(todos){
    // render each todo item
    var that = this;
    var renderedTodos = todos.map(function(item, index){
      item.id = index + 1;
      var view = new bbTodoItemView(item, that);
      return view.$el;
    });
    // put all todo items into the dom
    this.$el.find('.todo-list').html(renderedTodos);
  },
  addTodo: function(){
    debugger;
    var newTitle = this.$el.find('.add-input').val();
    this.controller.addTodo(newTitle);
    this.$el.find('.add-input').val('');
  },
  addKeypress: function(event){
    if (event.which === 13) {
      this.addTodo();
    }
  },
  removeTodo: function(id){
    this.controller.removeTodo(id);
  },
  editTodo: function(id, newTitle){
    this.controller.editTodo(id, newTitle);
  },
  changeComplete: function(id, newTitle){
    this.controller.changeComplete(id, newTitle);
  }
});

module.exports = TodoView;