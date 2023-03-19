let startButton= document.getElementById("Start Quiz")
let questionDiv= document.getElementById("Quiz_Questions") 
let initalPage= document.getElementById("Inital Page")

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

questionDiv.style.display="none"



function startQuiz(event){
    event.preventDefault();
    initalPage.style.display="none"
    questionDiv.style.display="block"
    questionDiv.innerHTML= ""

    let currentQuestion = questions[questionNumber]
    let questionPara= document.createElement("p")
    questionPara.innerHTML= currentQuestion.question;
    let choiceDiv= document.createElement("div")
    for (let i=0; i< currentQuestion.choices.length; i++){
        let choiceBtn= document.createElement("button")
        choiceBtn.innerHTML= currentQuestion.choices[i];
        choiceDiv.append(choiceBtn)
    }
    questionDiv.append(currentQuestion, choiceDiv)
}

startButton.addEventListener("click", startQuiz)

