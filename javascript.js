var playing = false;
var score = 0;
var time = 60;
var action;

var startId = document.getElementById("start-reset");
var correctId = document.getElementById("correct");
var wrongId = document.getElementById("wrong");
var scoreId = document.getElementById("score-id");
var timeBoxId = document.getElementById("timeBox");
var stopwatchId = document.getElementById("stopwatch");
var gameoverId = document.getElementById("gameover");
var finalScoreId = document.getElementById("final-score");
var questionId = document.getElementById("question");
var answerBoxId = document.getElementById("answer-boxes");

function startGame() {
    if (playing == true) {
        //Restart Game
        location.reload();
    } else {
        //Start Game
        playing = true;
        //manage time
        timeBoxId.style.display = "block";
        stopwatchId.innerHTML = time;
        startCountdown();
        //Generate Question
        generateQA();
        //manage score
        scoreId.innerHTML = score;
        //manage button
        startId.innerHTML = "Reset Game";
    }
}

function startCountdown() {
    action = setInterval(watch, 1000);
}

function watch() {
    //decrease time
    time -= 1;
    stopwatchId.innerHTML = time;
    if (time == 0) {
        //gameover
        stopCountdown();
        time = 60;
        score = 0;
    }
}

function stopCountdown() {
    clearInterval(action);
    gameoverId.style.display = "block";
    finalScoreId.innerHTML = score;
    timeBoxId.style.display = "none";
    correctId.style.display = "none";
    wrongId.style.display = "none";
    answerBoxId.style.display = "none";
    startId.style.top = "50px";
    playing = true;
}
function generateQA() {
    var x = 1 + Math.round(9 * Math.random());
    var y = 1 + Math.round(9 * Math.random());
    questionId.innerHTML = x + "x" + y;
    var correctAnswer = x * y;
    for (i = 1; i < 5; i++) {
        var AnswerId = document.getElementById("box" + i);
        AnswerId.innerHTML = Math.round(
            Math.abs(x - 8 * Math.random()) * (y + 4 * Math.random())
        );
    }
    var correctPosition = Math.round(1 + 3.2 * Math.random());
    var correctAnswerId = document.getElementById("box" + correctPosition);
    correctAnswerId.innerHTML = correctAnswer;

    for (i = 1; i < 5; i++) {
        document.getElementById("box" + i).onclick = function () {
            //check if we are playing
            if (playing == true) {
                //yes
                if (this.innerHTML == correctAnswer) {
                    //correct answer

                    //increase score by 1
                    score++;
                    scoreId.innerHTML = score;
                    wrongId.style.display = "none";
                    //correctId.style.display = "block";
                    setTimeout(function () {
                        correctId.style.display = "block";
                    }, 100);

                    //Generate new Q&A

                    generateQA();
                } else {
                    correctId.style.display = "none";
                    setTimeout(function () {
                        wrongId.style.display = "block";
                    }, 100);
                }
            }
        };
    }
}
