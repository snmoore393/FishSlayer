

// base framework
import $ from 'jquery';

// legacy loading for bootstrap javascript
window.$ = window.jQuery = $;
require('bootstrap');

// // import our styles
import './stylesheets/base.scss';
import navbar from './components/navbar';
import todoController from './pages/todo';
import d3Example from './pages/d3Example';
import threeExample from './pages/threeExample';
import bbTodoController from './pages/bb_todo';

// on document load
$(function(){
// kick off the app!
  console.log('%c App Started', 'color:green');

  // launch navbar
  navbar.init();
  
  // My First Router: which page are we on??
  switch(window.location.pathname){
  case '/pages/todo.html': 
    todoController.init();
    break;
  case '/pages/bb_todo.html': 
    new bbTodoController();
    break;
  case '/pages/d3Example.html': 
    d3Example.init();
    break;
  case '/pages/threeExample.html': 
    threeExample.init();
    break;
  }

 
  console.log('Hire me');
  console.log('Now');
  console.log('Please');

  

});
