
/*
$(document); // Activate jQuery for object
$('#mydiv')  // Element with ID "mydiv"
$('p.first') // P tags with class first.
$('p[title="Hello"]') // P tags with title "Hello"
$('p[title^="H"]') // P tags title starting with H
*/



// Toggle map images on click. 
$('.map[data-target]').click(function() {
    var target = $(this).data('target');
    $('#' + target).slideToggle('slow');
});


// Toggle question sections on click. 
$('.disc-list[data-target]').click(function() {
    var target = $(this).data('target');
    $('#' + target).slideToggle('slow');
});



// Add chevron to map item when toggle is open.
$(".map").click(function(e) {

        if( $(this).hasClass("open") ) {
            $(this).removeClass("open").addClass("closed");
        } else {
            // if other maps are open remove open class and add closed
            $(this).siblings().removeClass("open").addClass("closed"); 
            $(this).removeClass("closed").addClass("open");
        }

});
// Add chevron to discovery section item when toggle is open.
$(".disc-list").click(function(e) {

        if( $(this).hasClass("open") ) {
            $(this).removeClass("open").addClass("closed");
        } else {
            // if other maps are open remove open class and add closed
            $(this).siblings().removeClass("open").addClass("closed"); 
            $(this).removeClass("closed").addClass("open");
        }

});


// http://codepen.io/robwakeman/pen/zxjGWX


//Put answers in an array and store in 'Answers' variable.
var answers = ["a","a","b","c","b","a","b","a","c"];


 var answerPara = [
 		"Wilfred Arthur was later awarded the Distinguished Service Order for his bravery. Soon after, “Polly” was retired from service and ended up at an RAAF school at Flemington racecourse.",
 		"The Middle East campaign began in 1916 with Australian troops taking part in the defence of the Suez Canal and the allied re-conquest of the Sinai Desert.",
 		"After the bombing, the Australian government expanded the army and air force and called for an overhaul of economic, domestic, and industrial policies to give the government special authority to mount a total war effort at home.",
 		"Born 26 October 1863 at Stogursey, Sumerset, in England. He was the first soldier in the Australian services to be awarded the Victoria Cross.  He later served in the Australian Federal Government, and also as Minister of Defence and several other portfolios.",
 		"The Avro Lancaster B1, known with affection as 'G for George', flew ninety operational missions over Germany and occupied Europe during the height of the bomber offensive. From the time it was built in 1942 until its retirement from active service in 1944, the bomber was flown by No. 460 Squadron RAAF (when in Britain).",
 		"The windows represent the personal, social and fighting qualities of Australians. Each of the fifteen panels features a figure in the uniform and equipment of the First World War, and typifies one of the quintessential qualities displayed by Australians in war.",
 		"First Gulf War (Australian forces were deployed in the First Gulf War under the auspices of the UN. HMAS Brisbane served in the Vietnam War, the First Gulf War and later with the UN Multinational Interception Force",
 		"Two men, above all others, moulded the Memorial: Charles Bean, Australia's Official Historian of the First World War, and John Treloar, the Director of the Memorial between 1920 and 1952.",
 		"Private John Simpson Kirkpatrick John Simpson Kirkpatrick was born in Britain but later moved to Australia. Simpson became famous for his work as a stretcher-bearer. Using one of the donkeys brought in for carrying water, he transported wounded men day and night from the fighting in Monash Valley to the beach on Anzac Cove."
 		];
 		
//Store the IDs of each section to enable removal of open class and to hide question after answer has been submitted.
var sections  = ["aircrafthall", "firstworldwar", "secondworldwar", "hallofvalour", "anzachall", "hallofmemory", "conflicts45today", "memorialgrounds", "sculpturegarden"];
    

//Create a function to store the users answer choice input (correct or not)
function getCheckedValue( question, radioName ){
 	var radios = document.getElementsByName( radioName ); //Find the answer choices for each question
 	var checkedValue;
    for(var y=0; y<radios.length; y++) {//Loop through answers to find checked answer
    if(radios[y].checked) checkedValue = radios[y].value;  // store the checked value ie the chosen answer/input
	}

	// Store user input in an object      
	var scoreObject = {
		questionNum: question,
		answer: answers[question],
		givenAnswer: checkedValue
	};
	
	//Store object in local storage
	storeAnswers(scoreObject);	
	if (!checkedValue) {
		
		swal({  title: "FORGET SOMETHING?",   
			text: "Please choose an answer to proceed.",   	
			imageUrl: "icons/no-answer.png", 
			confirmButtonText: "OK, GO BACK >"
			})
	}
	
	// display answer and if correct or not (Use SweetAlert)
	else if (checkedValue === answers[question]) {
		swal({  title: "CORRECT!",   
				text: answerPara[question],   	
				imageUrl: "icons/correct.png", 
				confirmButtonText: "CHOOSE NEXT MISSION >"
				}).then(function(isConfirm) {
							
					//Remove that section (answered seciton)		
					// Select the correct ID from the sections array 
					$('#' + sections[question]).hide(); 
					// now select the matching section tile and remove the open class
					$("div.section[data-target='"+ sections[question] +"']").removeClass("open").addClass("answered").hide();
					});

	} else 
		swal({  title: "WRONG ANSWER!",   
				text: answerPara[question],  	
				imageUrl: "icons/incorrect.png", 
				confirmButtonText: "CHOOSE NEXT MISSION >"
				}).then(function(isConfirm) {
					
					//Remove that section (answered seciton)	
					// Select the correct ID from the sections array (add the hash before it)
					$('#' + sections[question]).hide(); 
					// Select matching section tile and remove .open class
					$("div.section[data-target='"+ sections[question] +"']").removeClass("open").addClass("answered").hide();
					});

			}


// Empty global variable to store everything in localStorage
var scoreObjects = [];
	
	
function storeAnswers( questionNum ) {
	// Add newly answered question 
	scoreObjects.push(questionNum);
	// Store modified array in local storage Convert array back to string
	currentScore = JSON.stringify(scoreObjects);
	//Store the converted string
	localStorage.setItem( "givenAnswers", currentScore);
	
	console.log(scoreObjects.length);
	if(scoreObjects.length === answers.length){
	$('#view-report').show();
	}
}

function getAnswers() {
	// Get any previosuly correct answers as a string
	var currentScore = localStorage.getItem( "givenAnswers");
	if (currentScore === null) {
		return;
	}
	// Convert the string to an array
	scoreObjects = JSON.parse(currentScore);
}

function hideAnswers() {
	// Iterate though array and hide the question number (answered section)
	for (var i=0; i<scoreObjects.length; i++) {
		var question = scoreObjects[i];
		// Select matching section tile and remove .open class
		$("div.section[data-target='"+ sections[question.questionNum] +"']").removeClass("open").addClass("answered").hide();
	}
}


//Hide Mission Report until all questions are answered. TO FIX! 
$('#view-report').hide();




getAnswers();
hideAnswers();


// Add reset for Reset button and Results page home icon. 
function reset() {
	localStorage.removeItem("givenAnswers");
	location.reload();
}



// ========================This section is to display at the very end when all 9 questions have been answered =================

function results() {
	var correctAnswers = 0;
	var possibleCorrectAnswers = scoreObjects.length;	
	for (var i=0; i<scoreObjects.length; i++) {
		var scoreObject = scoreObjects[i];	
		if (scoreObject.answer === scoreObject.givenAnswer) {
			correctAnswers++;
		}
	}
		
	var result = {
		correct:correctAnswers,
		total:possibleCorrectAnswers
	};
	return result;
}


function showResult() {
	var score = results();
	
	$("main").hide();
	$("#results-page").show();
	
	$( "#score" ).append(score.correct);
	$( "#full-score" ).append("You scored " + score.correct + " out of " + score.total);
	
	if (score.correct <= 5) {
		$( ".mission-comp" ).append('<p>Better luck next time!</p>');
	} else {
		$( ".mission-comp" ).append('<p>Well Done!</p>');
	}
}






