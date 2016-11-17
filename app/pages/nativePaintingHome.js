
var playing = true;
var currentSlide = 0;

var pauseButton = document.getElementById('pause');
var slides = document.querySelectorAll('#slides .slide');
var controls = document.querySelectorAll('.controls');


var app = {

  init: function(){
    for(var i=0; i<controls.length; i++){
      controls[i].style.display = 'inline-block';
    }    
    app.render();
  },

  render: function(){
    var next = document.getElementById('next');
    next.onclick = function(){
      app.pauseSlideshow();
      app.nextSlide();
    };
    var previous = document.getElementById('previous');
    previous.onclick = function(){
      app.pauseSlideshow();
      app.previousSlide();
    };
    pauseButton.onclick = function(){
      if (playing){ app.pauseSlideshow(); }
      else { app.playSlideshow(); }
    };

    // kick it off!!!!!
    app.playSlideshow();
  },

  nextSlide: function(){
    app.goToSlide(currentSlide + 1);
  },

  previousSlide: function(){
    app.goToSlide(currentSlide - 1);
  },

  goToSlide: function(n){
    slides[currentSlide].className = 'slide';
    currentSlide = (n+slides.length)%slides.length;
    slides[currentSlide].className = 'slide showing';
  },

  pauseSlideshow: function(){
    pauseButton.innerHTML = '&#9658;'; // play character
    playing = false;
    app.slideInterval = clearInterval(app.slideInterval); 
  },

  playSlideshow: function(){
    pauseButton.innerHTML = '&#10074;&#10074;'; // pause character
    playing = true;
    app.slideInterval = setInterval(app.nextSlide, 4000); 
  },

};

module.exports = app;




