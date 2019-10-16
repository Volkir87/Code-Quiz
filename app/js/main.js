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


var time = 30;
quizQuestions = questions;

function launchQuiz () {
    // first, hide the entry screen
    $("#landing").attr("hidden", true);
    // then, start countdown, display questions one after another and get answers
    var timerFunction = window.setInterval(countDown, 1000);
    function countDown () {
        if (time <= 0) {
            window.clearInterval(timerFunction);
        }
        else {
            time--;
            $("#timer").text("Time: "+time);
        }
    }
    // show questions and receive answers, until all questions are done
    i = 0;
    runQuiz (i);
}


function runQuiz (i) {
    if (i <= quizQuestions.length - 1) {
        question = quizQuestions[i];
        hideQuestion(i-1);
        showQuestion(question, i);
        var answer = "";
        $(".answer").on("click", function () {
            answer = ($(this).attr("data"));
            answer === question.answer ? window.alert("TRUE") : window.alert("FALSE");
            i++;
            runQuiz(i);
            }
        )
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
}

function hideQuestion (i) {
    $("#question"+i).remove();
}





$("#start_button").on("click", launchQuiz);