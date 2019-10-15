/*
Name: main.js
Author: Kirill Volodkin
Created date: 2019-10-15

This code will run the quiz. It will display questions selected from the quiz questions storage, accept user
response and save the results
*/

function getQuestions () {

}
// a function to control the count down
function countDown () {
    if (time <= 0) {
        window.clearInterval(timerFunction);
    }
    else {
        time--;
        $("#timer").text("Time: "+time);
    }
}

var time = 30;
quizQuestions = questions;

function launchQuiz () {
    // first, hide the entry screen
    $("#landing").attr("hidden", true);
    // then, start countdown, display questions one after another and get answers
    var timerFunction = window.setInterval(countDown, 1000);
    i = 0;
    while (i <= (quizQuestions.length - 1)) {
        question = quizQuestions[i];
        showQuestion(question);
        i++;
    }
}
    


// function to display question on the screen as title with options
function showQuestion (question) {
    var qBlock = $("<div>");
    qBlock.attr("class","container mt-5");
    var qTitle = $("<div>"+question.title+"</div>");
    qBlock.append(qTitle);
    for (i in question.choices) {
        choice = (parseInt(i)+1)+". "+question.choices[i];
        var qChoice = $("<button>"+choice+"</button><br>");
        qChoice.attr("class","btn btn-primary mt-1");
        qChoice.attr("id", "answer"+i);
        qBlock.append(qChoice);
    }
    $("body").append(qBlock);
}







$("#start_button").on("click", launchQuiz);