/*
Name: main.js
Author: Kirill Volodkin
Created date: 2019-10-15

This code will run the quiz. It will display questions selected from the quiz questions storage, accept user
response and save the results
*/


var quizQuestions = questions;
var timePerQ = 15;
var time = quizQuestions.length * timePerQ;
var timerFunction = undefined; 
var qScore = 0;
var finalScore = 0;

// countdown will run until it reaches 0
function countDown () {
    if (time <= 0) {
        window.clearInterval(timerFunction);
        hideAnyQuestion();
        enterName();
    }
    else {
        time--;
        qScore > 1 ? qScore-- : qScore = 1; //once score for a question reaches 1, it stays 1
        $("#timer").text("Time: "+time);
    }
}

function launchQuiz () {
    // first, hide the entry screen
    $("#landing").attr("hidden", true);
    // then, start countdown, display questions one after another and get answers
    timerFunction = window.setInterval(countDown, 1000);
    // show questions and receive answers, until all questions are done
    i = 0;
    runQuiz (i);
}

// function will display question after question until all questions are done
function runQuiz (i) {
    if (i <= quizQuestions.length - 1) {
        question = quizQuestions[i];
        hideQuestion(i-1);
        showQuestion(question, i);
        qScore = timePerQ; //setting qScore to be 15 at the beginning (the timer function will substract 1 every second);
        var answer = "";
        $(".answer").on("click", function () {
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
        )
    }
    else {
        window.clearInterval(timerFunction); //stopping timer
        $("#timer").text("Time: 0"); // setting time to 0
        hideQuestion(i-1);
        enterName();
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

function hideQuestion (i) {
    $("#question"+i).remove();
    return;
}

function hideAnyQuestion () {
    $("[id^='question']").remove();
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
    $("#submit_name").on("click", setHighscores);
}

// function to get currently stored highscores from the local storage. Returns array of objects
function getHighscores () {

}


function showHighscores () {

}

// function to add the new highscore to the saved ones. If there are no saved highscores, create ones
function setHighscores () {
    console.log("got into the function call");
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
}

$("#start_button").on("click", launchQuiz);
