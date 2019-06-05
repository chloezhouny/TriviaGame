$(document).ready (function(){


	var indexQuestion = 0;
	var click = 0;
	var userAnswer = "";
	var correctCount = 0;
	var incorrectCount = 0;
	var unansweredCount = 0;
	var questionTimeout;
	var timer;
	var timeLeft = 15;

	var arr = 
	[	
		{
			index: 0, 
			question:  "Regarding granting wishes, which of the following can I do?",
			choices: ["Kill Someone","Make Anybody Fall in Love","Bring People Back from the Dead","Make Someone Royalty"],
			answer: "d",
			answerMore: "Make Someone Royalty"
		},
		
		{
			index: 1, 
			question: "Which is not part of Prince Ali's animal collection, as explained in the lyrics to 'Prince Ali'?",		
			choices: ["75 Golden Camels","95 White Persian Monkeys","53 Purple Peacocks","45 Red Parrots"],
			answer: "d",
			answerMore: "45 red parrots"
		},
		
		{
			index: 2, 
			question: "What is Jafar's official title?",
			choices: ["Majordomo","Royal Vizier","Royal Advisor","Grand Duke"],
			answer: "b",
			answerMore: "Royal Vizier"
		},

		{
			index: 3, 
			question: "What famous actor is Aladdin's look based on?",
			choices: ["Tom Cruise", "Tom Hanks" ,"Michael J. Fox","John Stamos"],
			answer: "a",
			answerMore: "Tom Cruise"
		},	

		{
			index: 4, 
			question: "The Genie won't bring people back from the dead.",
			choices: ["True","False","N/A","N/A"],
			answer: "a",
			answerMore: "True"
		},	

		{
			index: 5, 
			question: "Which member of Aladdin's voice cast went on to reprise their role in Aladdin on broadway?",
			choices: ["Jonathan Freeman","Scott Weinger","Lea Salonga","Gilbert Gottfried"],
			answer: "a",
			answerMore: "Jonathan Freeman"
		},

		{
			index: 6, 
			question: "What is Aladdin's second wish in the film?",
			choices: ["To become Prince Ali","To Own a Magic Carpet","To Be Saved From Drowning","To Free Genie"],
			answer: "c",
			answerMore: "To Be Saved From Drowning"
		},	

		{
			index: 7, 
			question: "What does Aladdin give Jasmine during 'A Whole New World'?",
			choices: ["An Apple","A Swan","A Necklace","A Ring"],
			answer: "a",
			answerMore: "An Apple"
		},	

		{
			index: 8, 
			question: "Which one of these actors was not considered for the voice of mine?",
			choices: ["Martin Short","John Goodman", "Albert Brooks","Billy Crystal"],
			answer: "d",
			answerMore: "Billy Crystal"
		},	

		{
			index: 9, 
			question: "Which Disney character makes a cameo in the Sultan's toy tower?",
			choices: ["Mickey Mouse","Beast", "Ariel", "Baloo"],
			answer: "b",
			answerMore: "Beast"
		},	

		{
			index: 10, 
			question: "How long has it been since I have seen the magic carpet at the beginning of the film?",
			choices: ["100 Years","50 Thousand Eons", "A Few Millennia", "5 Lightyears"],
			answer: "c",
			answerMore: "A Few Millennia"
		}	



	];

	getStartSecene();

	// Get Start Scene
	function getStartSecene()
	{
		
		$("#genieSection").hide();
		$("#carpetSection").show();
		$("#startSection").show();
		$("#timeSection").hide();
		$("#questionSection").hide();
		$("#answerSection").hide();
		$("#resultSection").hide();
		
	}

	//on click to start the game
	$("#startSection").on("click", function()
	{
		getQuestionSecene();

	})


	// Get Question Scene
	function getQuestionSecene()
	{
		$("#startSection").hide();
		$("#timeSection").show();
		$("#questionSection").show();
		$("#answerSection").hide();
		$("#resultSection").hide();
		$("#question").html(arr[indexQuestion].question);
		$("#a").html(arr[indexQuestion].choices[0]);
		$("#b").html(arr[indexQuestion].choices[1]);
		$("#c").html(arr[indexQuestion].choices[2]);
		$("#d").html(arr[indexQuestion].choices[3]);

		timeLeft = 15;
		$("#time").html(timeLeft);
		timer = setInterval(function()
		{

			timeLeft--;
			$("#time").html(timeLeft);
				
		},1000);

		
		questionTimeout = setTimeout(function(){
		    if (click === 0)
		    {
		 		getAnswerSecene();
		    }
		}, 15000);
	}

	// on click to answer the question
	$(".choice").on("click", function()
	{
		clearTimeout(questionTimeout);
		click = 1;
		userAnswer = $(this).attr("data-name");
		getAnswerSecene();
		
	})


	// Answer Scene
	function getAnswerSecene()
	{
		clearInterval(timer);
		
		$("#startSection").hide();
		$("#timeSection").hide();
		$("#questionSection").hide();
		$("#answerSection").show();
		$("#resultSection").hide();


		if (click !== 0)
		{
			if (userAnswer === arr[indexQuestion].answer)
			{
				$("#response").html("Hi master!")
				$("#genieSection").show();
				getCircle();
				correctCount ++;
			}
			else
			{
				$("#response").html("I'm sick...")
				$("#genieSection").hide();
				incorrectCount ++;
			}
		}
		else if(click === 0)
		{
			$("#response").html("Out of time...");
			unansweredCount ++;
			$("#genieSection").hide();
		}

		$("#answer").html("Correct Answer: " + arr[indexQuestion].answerMore);

		setTimeout(function(){
			if (indexQuestion < arr.length - 1)
			{
				click = 0;
				indexQuestion ++;
				getQuestionSecene();
			}
			else 
			{
				getResultSecene();
			}
		}, 5000);
	}





	// Result Scene
	function getResultSecene()
	{
		$("#startSection").hide();
		$("#timeSection").hide();
		$("#questionSection").hide();
		$("#answerSection").hide();
		$("#resultSection").show();
		$("#correct").html("Correct: " + correctCount);

		$("#incorrect").html("Incorrect: " + incorrectCount);
		$("#unanswered").html("Unanswered: " + unansweredCount);
	}

	// on click to answer the question
	$("#restart").on("click", function()
	{
		indexQuestion = 0;
		click = 0;
		userAnswer = "";
		correctCount = 0;
		incorrectCount = 0;
		unansweredCount = 0;
		questionTimeout = "";
	    clearInterval(timer);
	    timeLeft = 15;
		getStartSecene();
		
	})

	var circleArr = [];



// Animation





	function getCircle()
	{

		for (var i = 0; i < 30; i++)
		{

		 var circle;
		 circle = $("<div id='circle'>");
		 $("#genieSection").append(circle);
		 circle.css("right", 200);
		 circle.css("background-color", "#ddccff");
		 circle.css("top", 200);
		 circle.attr("data-top", 1);
		 circle.attr("data-right", 1);
		 circleArr.push(circle);
		}

		
		setInterval(function()
		{		

		
			for(var i = 0; i < circleArr.length; i++)
			{
				var cTDirection = 1;
				var cRDirection = 1;
				
				var cTop = parseInt(circleArr[i].css("top"));
				var cRight = parseInt(circleArr[i].css("right"));	
				console.log(cTop);
				console.log(cRight);
				var change = Math.floor(Math.random() * 100);

				if (change < 10)
				{
					cTDirection *= -1;
				}
				else if (change > 90)
				{
					cRDirection *= -1;
				}

				cTop = Math.floor(Math.random() * 3 + 3) * cTDirection + cTop;
				cRight = Math.floor(Math.random() * 3 + 3) * cRDirection + cRight;

				circleArr[i].css("top", cTop);
				circleArr[i].css("right", cRight);
			}

			 var circle;
			 circle = $("<div id='circle'>");
			 $("#genieSection").append(circle);
			 circle.css("right", 200);
			 circle.css("background-color", "#ddccff");
			 circle.css("top", 200);
			 circle.attr("data-top", 1);
			 circle.attr("data-right", 1);
			 circleArr.push(circle);
			 
			 if (circleArr.length > 30)
			 {
			 	for (var i = 0; i< 20; i++)
			 	{
			 		circleArr.shift();
			 	}
			 }		

		},1)
	}









	var height = 425;
	var width = 1000;
	var hdirection = 1;
	var vDirection = 1;
	setInterval(function()
	{
		
		var change = Math.floor(Math.random() * 100);

		if (change < 10)
		{
			hdirection *= -1;
		}
		else if (change > 90)
		{
			vDirection *= -1;
		}

		height = Math.floor(Math.random() * 3 + 3) * hdirection + height;
		width =  Math.floor(Math.random() * 3 + 3) * vDirection + width;

		if (height > 500)
		{
			height = 500;
		}
		else if (height < 400)
		{
			height = 400;
		}

		$("#carpetSection").css("top", height);	
		if (width > 1100)
		{
			width = 1100;
		}
		else if (width < 900)
		{
			width = 900;
		}
		
		$("#carpetSection").css("left", width);	

	}, 100);


	


})

