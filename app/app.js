

// base framework
import $ from 'jquery';

// legacy loading for bootstrap javascript
window.$ = window.jQuery = $;
require('bootstrap');

// // import our styles
import './stylesheets/base.scss';
import _ from 'underscore';
import navbar from './components/navbar';
import todoController from './pages/todo';
import d3Example from './pages/d3Example';
import threeExample from './pages/threeExample';

// on document load
$(function(){
// kick off the app!
  console.log('%c App Started', 'color:green');


  // set default template settings
  _.templateSettings = {
    evaluate:    /{{([\s\S]+?)}}/g,
    interpolate: /{{-([\s\S]+?)}}/g,
    escape:      /{{=([\s\S]+?)}}/g
  };

  // launch navbar
  navbar.init();
  
  // My First Router: which page are we on??
  switch(window.location.pathname){
  case '/pages/todo.html': 
    todoController.init();
    break;
  case '/pages/d3Example.html': 
    d3Example.init();
    break;
  case '/pages/threeExample.html': 
    threeExample.init();
    break;
  }

 
  console.log('Hire me');
  console.log('Please');
  console.log('Now');

  

});
