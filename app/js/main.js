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

timerFunction = undefined; 

function countDown () {
    if (time <= 0) {
        window.clearInterval(timerFunction);
        hideAnyQuestion();
        enterName();
    }
    else {
        time--;
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


function runQuiz (i) {
    if (i <= quizQuestions.length - 1) {
        question = quizQuestions[i];
        hideQuestion(i-1);
        showQuestion(question, i);
        var answer = "";
        $(".answer").on("click", function () {
            answer = ($(this).attr("data"));
            //answer === question.answer ? window.alert("TRUE") : time = time - 15;
            if (answer === question.answer) {
                window.alert("TRUE");
            }
            else {
                time = time - 15;
                time <= 0 ? $("#timer").text("Time: 0") : $("#timer").text("Time: "+time);
            }
            i++;
            runQuiz(i);
            return;
            }
        )
    }
    else {
        window.clearInterval(timerFunction);
        $("#timer").text("Time: 0");
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
    container.attr("class","container mt-5 row justify-content-center"); 
    container.attr("id","enter_name"); 
    var nBlock = $("<div>");
    nBlock.attr("class","mt-5 col-sm-6 offset-sm-3");
    container.append(nBlock);
    var nTitle = $("<h2>All Done!</h2><p>Please submit your initials</p>");
    nBlock.append(nTitle);
    var nInput = $("<input></input>");
    var nSubmit = $("<button>Submit</button>");
    nSubmit.attr("id","submit_name");
    nBlock.append(nInput);
    nBlock.append(nSubmit);
    $("body").append(container);
}

function showHighscores () {

}





$("#start_button").on("click", launchQuiz);