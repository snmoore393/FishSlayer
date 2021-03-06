
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
import rTodoController from './pages/r_todo';
import nativePaintingHome from './pages/nativePaintingHome';
import nativePaintingService from './pages/nativePaintingService';
import nativePaintingAbout from './pages/nativePaintingAbout';
import nativePaintingContact from './pages/nativePaintingContact';

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
  case '/pages/r_todo.html': 
    new rTodoController();
    break;
  case '/pages/d3Example.html': 
    d3Example.init();
    break;
  case '/pages/threeExample.html': 
    threeExample.init();
    break;
  case '/pages/nativePaintingHome.html': 
    nativePaintingHome.init();
    break;
  case '/pages/nativePaintingService.html': 
    nativePaintingService.init();
    break;
  case '/pages/nativePaintingAbout.html': 
    nativePaintingAbout.init();
    break;
  case '/pages/nativePaintingContact.html': 
    nativePaintingContact.init();
    break;
  }

 
  console.log('Hire me');
  console.log('Now');
  console.log('Please');

  

});
