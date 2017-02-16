var container = document.getElementById("container");

container.questionBox = document.getElementById("questionBox");

// can be customized
container.options = ["Pizza", "Burger", "Pasta", "Fried Chicken", "Hot Pot", "BBQ", "Ramen", "Sandwiches", "Taco Truck", "Salad", "Ice Cream", "Sushi", "Pho", "Thai"];

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
	
	button.addEventListener("click", container.runRandomizer);
}

container.runRandomizer = function(e){
	var button = e.target;
	button.removeEventListener("click", container.runRandomizer);
	
	if (button.clicked == 0){
		button.clicked = 1;
		
		container.timer = setInterval(function(){
			var index = container.getRandomInt(0, container.options.length-1);
			answerDiv.innerHTML = container.options[index];
		}, 50);
		
		button.innerHTML = "Stop!";
	} else {
		button.clicked = 0;
		clearInterval(container.timer);
		button.innerHTML = "Nope. Try again."
	}	
	
	button.addEventListener("click", container.runRandomizer);
	
}

container.getRandomInt = function(min, max){
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

window.onload = container.setup();