var container = document.getElementById("container");

container.questionBox = document.getElementById("questionBox");

/*
container.questionDiv;
container.answerDiv;
container.button;
container.bgDivs;
*/

// can be customized
container.options = ["Pizza", "Burger", "Pasta", "Fried Chicken", "Hot Pot", "BBQ", "Ramen", "Sandwiches", "Taco Truck", "Salad", "Ice Cream", "Sushi", "Pho", "Thai"];
container.colors = ["red", "yellow", "green", "pink", "brown", "blue"];

container.setup = function(){
	var questionDiv = document.createElement("div");
	questionDiv.setAttribute("id", "questionDiv");
	questionDiv.innerHTML = "What to eat?";
	container.questionDiv = questionDiv;
	container.questionBox.appendChild(questionDiv);
	
	var answerDiv = document.createElement("div");
	answerDiv.setAttribute("id", "answerDiv");
	answerDiv.innerHTML = " ";
	container.answerDiv = answerDiv;
	container.questionBox.appendChild(answerDiv);
	
	var button = document.createElement("button");
	button.setAttribute("id", "button");
	button.innerHTML = "Start!";
	button.clicked = 0;
	container.button = button;
	container.questionBox.appendChild(button);
	
	container.bgDivs = [];
	
	for (var i = 0; i < 10; i++){	
		var div = document.createElement("div");
		div.setAttribute("class", "bgDivs");
		container.appendChild(div);
		div.style.color = container.colors[container.getRandomInt(0, container.colors.length - 1)];
		container.bgDivs.push(div);
	}
	
	button.addEventListener("click", container.runRandomizer);
}

container.runRandomizer = function(e){
	var button = e.target;
	button.removeEventListener("click", container.runRandomizer);
	
	if (button.clicked == 0){
		button.clicked = 1;
		
		container.backgroundEffect();
		
		container.timer = setInterval(function(){
			var index = container.getRandomInt(0, container.options.length - 1);
			answerDiv.innerHTML = container.options[index];
		}, 50);
		
		button.innerHTML = "Stop!";
	} else {
		button.clicked = 0;
		clearInterval(container.timer);
		container.clearBackgroundEffect();
		button.innerHTML = "Nope. Try again."
	}	
	
	button.addEventListener("click", container.runRandomizer);
	
}

container.backgroundEffect = function(){
	for (var i = 0; i < container.bgDivs.length; i++){
		container.bgDivs[i].style.opacity = 0.5;
		container.bgDivs[i].style.top = i * 10 + "vh";
		
		var startingPoint = container.getRandomInt(0, 1);
		if (startingPoint){
			container.bgDivs[i].style.left = "120vw";	
		} else {
			container.bgDivs[i].style.left = "-20vw";		
		}
		
		(function(i){
			container.playAnimation(container.bgDivs[i], startingPoint);
		})(i)
		
	}
}

// dir: 0 is left, 1 is right
container.playAnimation = function(div, dir){
	var index = container.getRandomInt(0, container.options.length - 1);
	div.innerHTML = container.options[index];
	if (dir){
		div.animation = setInterval(function(){
			var posX = parseInt(div.style.left);
			if (posX <= -30) {
				clearInterval(div.animation);
				if (container.button.clicked){
					div.style.left = "-20vw";
					container.playAnimation(div, !dir);
				}
			} else {
				posX = posX - 5;
				div.style.left = posX + "vw";
			}
		}, container.getRandomInt(15, 40));
	} else {
		div.animation = setInterval(function(){
			var posX = parseInt(div.style.left);
			if (posX >= 100) {
				clearInterval(div.animation);
				if (container.button.clicked){
					div.style.left = "120vw";
					container.playAnimation(div, !dir);
				}
			} else {
				posX = posX + 5;
				div.style.left = posX + "vw";
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