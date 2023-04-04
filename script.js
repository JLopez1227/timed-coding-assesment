let startButton= document.getElementById("Start Quiz")
let questionDiv= document.getElementById("Quiz_Questions") 
let initalPage= document.getElementById("Inital Page")
let timerSpan = document.getElementById("Time")


let questions=[{
    question:"Question 1", 
    choices: ["Choice 1", "Choice 2"],
    answer: "Choice 1"
}, {
    question:"Question 2", 
    choices: ["Choice 3", "Choice 4"],
    answer: "Choice 3"
}]
let questionNumber= 0
let timer;
let timeLeft = 60;

questionDiv.style.display="none"

function startTimer(){
    timer = setInterval(function(){
        timeLeft--
        timerSpan.textContent = timeLeft 
        if(timeLeft<=0) {
            clearInterval(timer);
            endQuiz();
        }
    }, 1000);
}
function endQuiz(){

}

function nextQuestion(event){
    var userChoice = event.target.textContent
    var answer = questions[questionNumber].answer
    if (questionNumber < (questions.length - 1)){
        if (userChoice !== answer){
            timeLeft -= 15
        }
    
        questionNumber++;
        renderQuestion();
    } else {
        endQuiz();
    }
}


function renderQuestion() {
    questionDiv.innerHTML= ""

    let currentQuestion = questions[questionNumber]
    let questionPara= document.createElement("p")
    questionPara.innerHTML= currentQuestion.question;
    let choiceDiv= document.createElement("div")
    for (let i=0; i< currentQuestion.choices.length; i++){
        let choiceBtn= document.createElement("button")
        choiceBtn.innerHTML= currentQuestion.choices[i];
        choiceDiv.append(choiceBtn)
        choiceBtn.addEventListener("click", nextQuestion);
    }
    questionDiv.append(questionPara, choiceDiv)
}

function startQuiz(event){
    event.preventDefault();
    initalPage.style.display="none"
    questionDiv.style.display="block"
    startTimer();
   renderQuestion();
}

startButton.addEventListener("click", startQuiz)

