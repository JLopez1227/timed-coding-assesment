let startButton = document.getElementById("start_quiz");
let questionDiv = document.getElementById("Quiz_Questions");
let initalPage = document.getElementById("Inital Page");
let timerSpan = document.getElementById("Time");

let questions = [
  {
    question: "When creating boiler plate HTML, which of the following would you do?",
    choices: ["Use ! to generate the HTML", "Type all of the HTML from scratch", "Google HTML boiler plate then copy and paste"],
    answer: "Use ! to generate the HTML",
  },
  {
    question: "Which of the following is NOT a JavaScript data type?",
    choices: ["String", "Boolean", "Function"],
    answer: "Function",
  },
  {
    question: "Which of the following is the correct symbol for ID in CSS?",
    choices: [".", "#", "ID"],
    answer: "#",
  }
];
let questionNumber = 0;
let timer;
let timeLeft = 60;

questionDiv.style.display = "none";

function startTimer() {
  timer = setInterval(function () {
    timeLeft--;
    timerSpan.textContent = timeLeft;
    if (timeLeft <= 0) {
      endQuiz();
    }
  }, 1000);
}
function endQuiz() {
  questionDiv.innerHTML = "";
  clearInterval(timer);
  questionDiv.textContent = "Game over! Enter your initals to save your score.";
  var initalInput = document.createElement("input");
  initalInput.setAttribute("id", "Initals");
  questionDiv.appendChild(initalInput);
  var saveInital = document.createElement("button");
  saveInital.classList.add('saveInital')

  saveInital.textContent = "Save";
  questionDiv.appendChild(saveInital);

  saveInital.addEventListener("click", function () {
    var initals = initalInput.value;

    var savedInitals = localStorage.getItem("savedInitals");
    if (!savedInitals) {
      localStorage.setItem(
        "savedInitals",
        JSON.stringify([
          {
            name: initals,
            score: timeLeft,
          },
        ])
      );
      return;
    }
   var initalOb= JSON.parse(savedInitals);
   initalOb.push( {
    name: initals,
    score: timeLeft,
  })
  localStorage.setItem("savedInitals", JSON.stringify(initalOb));
  });
}

function nextQuestion(event) {
  var userChoice = event.target.textContent;
  var answer = questions[questionNumber].answer;
  if (questionNumber < questions.length - 1) {
    if (userChoice !== answer) {
      timeLeft -= 15;
    }

    questionNumber++;
    renderQuestion();
  } else {
    endQuiz();
  }
}

function renderQuestion() {
  questionDiv.innerHTML = "";

  let currentQuestion = questions[questionNumber];
  let questionPara = document.createElement("p");
  questionPara.classList.add('quiz_questions')
  questionPara.innerHTML = currentQuestion.question;
  let choiceDiv = document.createElement("div");
  for (let i = 0; i < currentQuestion.choices.length; i++) {
    let choiceBtn = document.createElement("button");
    choiceBtn.classList.add('quiz_button')
    choiceBtn.innerHTML = currentQuestion.choices[i];
    choiceDiv.append(choiceBtn);
    choiceBtn.addEventListener("click", nextQuestion);
  }
  questionDiv.append(questionPara, choiceDiv);
}

function startQuiz(event) {
  event.preventDefault();
  initalPage.style.display = "none";
  questionDiv.style.display = "block";
  startTimer();
  renderQuestion();
}

startButton.addEventListener("click", startQuiz);
