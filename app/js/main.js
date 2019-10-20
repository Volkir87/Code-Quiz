/*
Name: main.js
Author: Kirill Volodkin
Created date: 2019-10-15

This code will run the quiz. It will display questions selected from the quiz questions storage, accept user
response and save the results
*/


var quizQuestions = questions; // from questions.js
var timePerQ = 15;
var time = quizQuestions.length * timePerQ;
var timerFunction = undefined; 
var qScore = 0;
var finalScore = 0;

// function to reinstantiate all the original variables to the default state
function reset () {
    time = quizQuestions.length * timePerQ;
    timerFunction = undefined; 
    qScore = 0;
    finalScore = 0;
}


// countdown will run until it reaches 0
function countDown () {
    if (time <= 0) { // once time runs out
        window.clearInterval(timerFunction);
        hideAnyQuestion(); //hide all questions
        enterName(); //display screen to enter name and save results
        return;
    }
    else {
        time--;
        qScore > 1 ? qScore-- : qScore = 1; //once score for a question reaches 1, it stays 1
        $("#timer").text("Time: "+time); //display countdown time on the screen
        return;
    }
}

// this function will initialize the quiz
function launchQuiz () {
    // first, reset all varaibles and hide the entry screen
    reset ();
    $("#landing").attr("hidden", true);
    // then, start countdown, display questions one after another and get answers
    timerFunction = window.setInterval(countDown, 1000);
    // show questions and receive answers, until all questions are done
    i = 0;
    runQuiz (i);
    return;
}

// function to process all answers
function answerF () {
    answer = ($(this).attr("data"));
    //answer === question.answer ? window.alert("TRUE") : time = time - 15;
    if (answer === question.answer) {
        console.log("This score: " + qScore);
        finalScore = finalScore + qScore;
        console.log("Final Score: " + finalScore);
    }
    else {
        time = time - timePerQ; // penalize player 
        time <= 0 ? $("#timer").text("Time: 0") : $("#timer").text("Time: "+time); //if the penalty results in time being <0, show 0
    }
    i++;
    runQuiz(i);
    return;
}

// function will display one question unless all questions are done
function runQuiz (i) {
    if (i <= quizQuestions.length - 1) {
        question = quizQuestions[i];
        hideQuestion(i-1);
        showQuestion(question, i);
        qScore = timePerQ; //setting qScore to be 15 at the beginning (the timer function will substract 1 every second);
        var answer = ""; 
        $(".answer").on("click", answerF);
    }
    else {
        window.clearInterval(timerFunction); //stopping timer
        $("#timer").text("Time: 0"); // setting time to 0
        hideQuestion(i-1);
        enterName();
        return;
    }
}


// function to display question on the screen as title with options
function showQuestion (question, i) {
    var container = $("<div>");
    container.attr("class","container mt-5 row justify-content-center"); 
    container.attr("id","question"+i); 
    var qBlock = $("<div>");
    qBlock.attr("class","mt-5 col-sm-6 offset-sm-3");
    container.append(qBlock);
    var qTitle = $("<div>"+question.title+"</div>");
    qBlock.append(qTitle);
    for (i in question.choices) {
        choice = (parseInt(i)+1)+". "+question.choices[i];
        var qChoice = $("<button>"+choice+"</button><br>");
        qChoice.attr("class","btn btn-primary mt-1 answer");
        qChoice.attr("id", "answer"+i);
        qChoice.attr("data", question.choices[i]);
        qBlock.append(qChoice);
    }
    $("body").append(container);
    return;
}

// hiding the question 
function hideQuestion (i) {
    $("#question"+i).remove();
    return;
}

// hiding any question (at the end of the quiz)
function hideAnyQuestion () {
    $("[id^='question']").remove();
    return;
}

// function to display the name input and final score
function enterName () {
    var container = $("<div>");
    container.attr({
        class: "container mt-5 row justify-content-center",
        id: "enter_name"
    }); 
    var nBlock = $("<div>");
    nBlock.attr("class","mt-5 col-sm-6 offset-sm-3");
    var nTitle = $("<h2>All Done!</h2><p>Your final score is: " + finalScore+ "</p><br><p>Please submit your initials</p>");
    nBlock.append(nTitle);
    var inputGroup = $("<div>");
    inputGroup.attr("class", "input-group")
    var nInput = $("<input></input>");
    nInput.attr({
        class: "form-control",
        placeholder: "Your initials",
        id: "initials"
    });
    var nSubmitDiv = $("<div>");
    nSubmitDiv.attr("class", "input-group-append");
    var nSubmit = $("<button>Submit</button>");
    nSubmit.attr({
        id: "submit_name",
        class: "btn btn-primary ml-1",
        type: "button"
    });
    nSubmitDiv.append(nSubmit);
    inputGroup.append(nInput);
    inputGroup.append(nSubmitDiv);
    nBlock.append(inputGroup);
    container.append(nBlock);
    $("body").append(container);
    $("#submit_name").on("click", setHighscores); // code to watch for clicking on "Submit" button. 
    return;
}

// function to sort the highscores by score
function sortByScore (a,b) {
    if ( a.score < b.score ){
        return 1;
      }
      if ( a.score > b.score ){
        return -1;
      }
      return 0;
}

// function to display highscores on a screen
function showHighscores () {
    highScore = window.localStorage.getItem("highscore");
    if (highScore === null) {
        window.alert("Uh oh... There are no highscores to view :(");
        return;
    }
    highScore = JSON.parse(highScore);
    highScore = highScore.sort(sortByScore);
    console.log(highScore);
    $("#landing").attr("hidden", true);
    $("#enter_name").remove();
    $("#highscores").remove();
    var container = $("<div>");
    container.attr({
        class: "container mt-5 row justify-content-center",
        id: "highscores"
    }); 
    var hBlock = $("<div>");
    hBlock.attr("class","mt-5 col-sm-6 offset-sm-3");
    var hTitle = $("<h2>Highscores</h2>");
    hBlock.append(hTitle);
    var scoresBlock = $("<div>");
    scoresBlock.attr("id", "all_scores");
    hBlock.append(scoresBlock);
    for (row in highScore) {
        console.log(row);
        var hRow = $("<p>" + (parseInt(row)+1) + ". " + highScore[row].name + ": " + highScore[row].score + "</p>");
        hRow.attr("class", "row_record");
        scoresBlock.append(hRow);
    }
    var buttonGroup = $("<div>");
    buttonGroup.attr("class", "d-flex justify-content-between");
    var goBack = $("<button>Go Back</button>");
    goBack.attr({
        class: "btn btn-primary",
        id: "go_back",
    });
    var removeScores = $("<button>Clear Highscores</button>");
    removeScores.attr({
        class: "btn btn-primary",
        id: "remove",
    });
    buttonGroup.append(goBack).append(removeScores);
    hBlock.append(buttonGroup);
    container.append(hBlock);
    $("body").append(container);
    $("#go_back").on("click", goBackF); // had to put listener here, otherwise it doesn't understand what's #go_back
    $("#remove").on("click", clearHighscores);
}

// function to add the new highscore to the saved ones. If there are no saved highscores, create them
function setHighscores () {
    highScore = window.localStorage.getItem("highscore");
    initials = $("#initials").val();
    var savedScore = "";
    newScore = {
        name: initials,
        score: finalScore
    }
    if (highScore === null) {
        savedScore = JSON.stringify([newScore]);
    }
    else {
        highScore = JSON.parse(highScore);
        highScore.push(newScore);
        savedScore = JSON.stringify(highScore);
    }
    window.localStorage.setItem("highscore", savedScore);
    showHighscores();
    return;
}

// function to clear all Highscores (both from screen and from local memory)
function clearHighscores () {
    $("#all_scores").remove();
    window.localStorage.removeItem("highscore");
} 

// function to return back to the main screen
function goBackF () {
    $("#highscores").remove();
    $("#landing").attr("hidden", false);
}

$("#start_button").on("click", launchQuiz);
$("#highscores_button").on("click", showHighscores);

