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
			question: "question",
			choices: ["a","b","c","d"],
			answer: "a",
			answerMore: "aba"
		},
		
		{
			index: 1, 
			question: "question",
			choices: ["a","b","c","d"],
			answer: "c",
			answerMore: "aba"
		},
		
		{
			index: 2, 
			question: "question",
			choices: ["a","b","c","d"],
			answer: "d",
			answerMore: "aba"
		},

		{
			index: 3, 
			question: "question",
			choices: ["a","b","c","d"],
			answer: "b",
			answerMore: "aba"
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
		console.log(click);

		if (click !== 0)
		{
			if (userAnswer === arr[indexQuestion].answer)
			{
				console.log("Correct!");
				correctCount ++;
			}
			else
			{
				console.log("Wrong!");
				incorrectCount ++;
			}
		}
		else if(click === 0)
		{
			console.log("Out of time!");
			unansweredCount ++;
		}

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
		}, 1000);
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

