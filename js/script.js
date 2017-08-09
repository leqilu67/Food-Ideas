(function(){
  var container = document.getElementById('container');

  container.setup = function(){
    container.style.width = window.innerWidth + 'px';
    container.style.height = window.innerHeight + 'px';

    container.bg = document.getElementById('bg');
    container.questionBox = document.getElementById('quesetionBox');
    container.questionDiv = document.getElementById('questionDiv');
    container.answerDiv = document.getElementById('answerDiv');
    container.button = document.getElementById('startButton');

    container.options = ["Pizza", "Burger", "Pasta", "Fried Chicken", "Hot Pot", "BBQ", "Ramen", "Sandwiches", "Taco Truck", "Salad", "Ice Cream", "Sushi", "Pho", "Thai"];
    container.colors = ["red", "yellow", "green", "pink", "brown", "blue"];

    container.button.clicked = 0;

    container.bgDivs = [];

    for (var i = 0; i < 10; i++){
      var div = document.createElement('div');
      div.setAttribute('class', 'bgDivs');
      container.bg.appendChild(div);
      div.style.color = container.colors[container.getRandomInt(0, container.colors.length - 1)];
      div.style.top = i * window.innerHeight/10 + 'px';
      container.bgDivs.push(div);
    }

    container.button.addEventListener('click', container.runRandomizer);
  }


  container.runRandomizer = function(e){
    var button = e.target;
    button.removeEventListener('click', container.runRandomizer);

    if (button.clicked == 0){
      button.clicked = 1;

      container.backgroundEffect();

      container.timer = setInterval(function(){
        var index = container.getRandomInt(0, container.options.length - 1);
        container.answerDiv.innerHTML = container.options[index];
      }, 50);
      button.innerHTML = "Stop!";
    } else {
      button.clicked = 0;
      clearInterval(container.timer);
      container.clearBackgroundEffect();
      button.innerHTML = "Nope. Try again.";
    }
    button.addEventListener('click', container.runRandomizer);
  }

  container.backgroundEffect = function() {
    for (var i = 0; i < container.bgDivs.length; i++){
      container.bgDivs[i].style.opacity = 0.5;

      var startingPoint = container.getRandomInt(0, 1);
      if (startingPoint){
        container.bgDivs[i].style.left = window.innerWidth + 20 + 'px';
      } else {
        container.bgDivs[i].style.left = '-20px';
      }

      (function(i){
  			container.playAnimation(container.bgDivs[i], startingPoint);
  		})(i);
    }
  }

  //dir: 0 is left, 1 is right
  container.playAnimation = function(div, dir){
    var index = container.getRandomInt(0, container.options.length - 1);
    div.innerHTML = container.options[index];
    if (dir){
      div.animation = setInterval(function(){
        var posX = parseInt(div.style.left);
        if (posX <= -.3 * window.innerWidth) {
          clearInterval(div.animation);
          if (container.button.clicked){
            div.style.left = '-20px';
            container.playAnimation(div, !dir);
          }
        } else {
          posX = posX - .05 * window.innerWidth;
          div.style.left = posX + 'px';
        }
      }, container.getRandomInt(15, 40));
    } else {
      div.animation = setInterval(function(){
  			var posX = parseInt(div.style.left);
  			if (posX >= window.innerWidth) {
  				clearInterval(div.animation);
  				if (container.button.clicked){
  					div.style.left = window.innerWidth + 20 + 'px';
  					container.playAnimation(div, !dir);
  				}
  			} else {
  				posX = posX + .05 * window.innerWidth;
  				div.style.left = posX + "px";
  			}
  		}, container.getRandomInt(15, 40));
    }
  }

  container.clearBackgroundEffect = function(){
  	for (var i = 0; i < container.bgDivs.length; i++){
  		if (container.bgDivs[i].animation){
  			clearInterval(container.bgDivs[i].animation);
  			container.bgDivs[i].style.opacity = 0;
  		}
  	}
  }

  container.getRandomInt = function(min, max){
  	return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  window.onload = container.setup();
})();
