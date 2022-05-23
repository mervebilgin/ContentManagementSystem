$(window).scroll(function() {
    if ($(document).scrollTop() > 50) {
        $('nav').addClass('shrink');
    }
    else {
        $('nav').removeClass('shrink');
    }
});

$(document).ready(function(){
  $(".owl-carousel").owlCarousel({
  items: 1,
  loop: true,
  autoplay:true,
  smartSpeed: 300
  });
});