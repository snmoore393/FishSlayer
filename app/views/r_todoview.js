
// var $ = window.$;
import Backbone from 'backbone';
import ReactDOM from 'react-dom';
import React from 'react';
import TodoItemView from '../views/r_todoItemView';

var TodoView = Backbone.View.extend({
  el: '.todo-container',
  events: {
    'click .btn-add': 'addTodo',
    // 'keypress .add-input': 'addKeypress'
  },
  initialize: function(todos, controller){
    this.controller = controller;
    this.render(todos);
  },
  render: function(todos){
    var controller = this.controller;
    var todosHtml = todos.map(function(todo, index){
      todo.id = index + 1;
      return <TodoItemView key={index} item={todo} controller={controller}/>;
    });

    ReactDOM.render(
        <div>{todosHtml}</div>,
        this.$el.find('.todo-list')[0]
    );
  },
  addTodo: function(){
    var newTitle = this.$el.find('.add-input').val();
    this.controller.addTodo(newTitle);
    this.$el.find('.add-input').val('');
  },
  addKeypress: function(event){
    if (event.which === 13) {
      this.addTodo();
    }
  }
});

module.exports = TodoView;