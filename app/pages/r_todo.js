
// var $ = window.$;
import Backbone from 'backbone';
import bbTodoModel from '../models/r_todoModel';
import TodoView from '../views/r_todoView';

var Controller = Backbone.View.extend({
  model: new bbTodoModel(),
  initialize: function(){
    var that = this;
    this.model.fetch(function(){
      that.render(); 
    });
    
  },
  render: function(){
    var todos = this.model.get('todos');
    new TodoView(todos, this);
  },
  addTodo: function(newTitle){
    this.model.addTodo(newTitle);
    this.render();
  },
  addKeypress: function(event, newTitle){
    if (event.which === 13) {
      this.addTodo(newTitle);
    }
  },
  removeTodo: function(id){
    if (id >= 0){
      this.model.removeTodo(id);
      this.render();
    }
  },
  editTodo: function(id, newTitle){
    if (id >= 0){
      this.model.editTodo(id, newTitle);
      this.render();
    }
  },
  changeComplete: function(id, newTitle){
    if (id >= 0){
      this.model.completeTodo(id, newTitle);
      this.render();
    }
  }
});

module.exports = Controller;