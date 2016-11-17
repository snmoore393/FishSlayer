
var slideIndex = 1;

var app = {
  init: function () {

    app.render();
  },

  render: function () {
    var acc = document.getElementsByClassName('accordion');
    var i;
    for (i = 0; i < acc.length; i++) {
      acc[i].onclick = function(){
        this.classList.toggle('active');
        this.nextElementSibling.classList.toggle('show');
      };
    } 
    var slide1 = document.getElementsByClassName('slide-1')[0];
    slide1.onclick = function(){
      app.openModal();
      app.currentSlide(1);
    };
    var slide2 = document.getElementsByClassName('slide-2')[0];
    slide2.onclick = function(){
      app.openModal();
      app.currentSlide(2);
    };
    var slide3 = document.getElementsByClassName('slide-3')[0];
    slide3.onclick = function(){
      app.openModal();
      app.currentSlide(3);
    };
    var slide4 = document.getElementsByClassName('slide-4')[0];
    slide4.onclick = function(){
      app.openModal();
      app.currentSlide(4);
    };
    var demo1 = document.getElementsByClassName('demo-slide-1')[0];
    demo1.onclick = function (){
      app.currentSlide(1);
    };
    var demo2 = document.getElementsByClassName('demo-slide-2')[0];
    demo2.onclick = function (){
      app.currentSlide(2);
    };
    var demo3 = document.getElementsByClassName('demo-slide-3')[0];
    demo3.onclick = function (){
      app.currentSlide(3);
    };
    var demo4 = document.getElementsByClassName('demo-slide-4')[0];
    demo4.onclick = function (){
      app.currentSlide(4);
    };
    // onclick="closeModal()"
    var closeButton = document.getElementsByClassName('cursor')[0];
    closeButton.onclick = function (){
      app.closeModal();
    };
    // onclick="plusSlides(-1)"
    var previous = document.getElementsByClassName('prev')[0];
    previous.onclick = function (){
      app.plusSlides(-1);
    };
    // onclick="plusSlides(1)"
    var next = document.getElementsByClassName('next')[0];
    next.onclick = function (){
      app.plusSlides(1);
    };
  },
  openModal: function () {
    document.getElementById('myModal').style.display = 'block';
  },

  closeModal: function () {
    document.getElementById('myModal').style.display = 'none';

  },

  plusSlides: function (n) {
    app.showSlides(slideIndex += n);

  },

  currentSlide: function (n) {
    app.showSlides(slideIndex = n);

  },

  showSlides: function (n) {
    var i;
    var slides = document.getElementsByClassName('mySlides');
    var dots = document.getElementsByClassName('demo');
    var captionText = document.getElementById('caption');
    if (n > slides.length) {slideIndex = 1;}
    if (n < 1) {slideIndex = slides.length;}
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = 'none';
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace('active', '');
    }
    slides[slideIndex-1].style.display = 'block';
    dots[slideIndex-1].className += 'active';
    captionText.innerHTML = dots[slideIndex-1].alt;
  },
};

module.exports = app;