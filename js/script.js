var animation = false;
var animationType = "a";

$( document ).ready(function() {
  $("#slider").css("height", $('header').innerHeight() - $('nav').innerHeight())

  $('.filter').on('click', function() {
    const data = $(this).data('class');
    if (animationType == data || animation) return;
    animationType = data;
    animation = true;

    animateCSS('.movies-content', "fadeOut").then((message) => {
      if (data == "a") {
        $(".part").removeClass('d-none');
        animateCSS('.movies-content', "fadeIn");
        animation = false;
        return;
      }
      $(".part").addClass('d-none');
      $("."+data).removeClass("d-none");
      animateCSS('.movies-content', "fadeIn");
      animation = false;
    });
  });
  
});

const animateCSS = (element, animation, prefix = 'animate__') =>
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    const node = document.querySelector(element);
    node.classList.add(`${prefix}animated`, animationName);
    function handleAnimationEnd() {
      node.classList.remove(`${prefix}animated`, animationName);
      node.removeEventListener('animationend', handleAnimationEnd);
      resolve('Animation ended'); 
    }
    node.addEventListener('animationend', handleAnimationEnd);
});