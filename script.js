const questions = [
    {
        question: "MS-Word is an example of _____. ",
        answers:[
            { text: "An operating system ", correct: false},
            { text: "A processing device ", correct: false},
            { text: "Application software ", correct: true},
            { text: " An input device ", correct: false},
        ]
    },
    {
        question: "Ctrl, Shift and Alt are called _____ keys.",
        answers:[
            { text: "modifier ", correct: true},
            { text: "function", correct: false},
            { text: " alphanumeric", correct: false},
            { text: " adjustment", correct: false},
        ]
    },
    {
        question: "Microsoft Office is an example of a _____. ",
        answers:[
            { text: "Closed source software ", correct: false},
            { text: "Open source software ", correct: false},
            { text: "Horizontal market software ", correct: true},
            { text: "Vertical market software", correct: false},
        ]
    },
    {
        question: "By default, the documents print in ________ mode.",
        answers:[
            { text: " Landscape", correct: false},
            { text: "Portrait ", correct: true},
            { text: " Page Setup", correct: false},
            { text: "Print View", correct: false},
        ]
    },
    {
        question: "Where is RAM located ?",
        answers:[
            { text: " Mother Board ", correct: true},
            { text: "External Drive ", correct: false},
            { text: " Expansion Board ", correct: false},
            { text: "None", correct: false},
        ]
    },
    {
        question: "A _______ is a software program used to view Web pages.",
        answers:[
            { text: "site ", correct: false},
            { text: " host ", correct: false},
            { text: " link ", correct: false},
            { text: " browser ", correct: true},
        ]
    },
    {
        question: "A hyperlink means ____. ",
        answers:[
            { text: "text connected to page", correct: true},
            { text: "plain text ", correct: false},
            { text: "coloured text ", correct: false},
            { text: "None of the above", correct: false},
        ]
    },
    {
        question: "The telephone network is a good example of ____. ",
        answers:[
            { text: "Half-duplex", correct: false},
            { text: "Simplex ", correct: false},
            { text: "Full duplex", correct: true},
            { text: "None ", correct: false},
        ]
    },
    {
        question: "What is the Full form of PDF ?",
        answers:[
            { text: "Printed Document Format", correct: false},
            { text: "Public Document Format", correct: false},
            { text: "Portable Document Format  ", correct: true},
            { text: "Published Document Format", correct: false},
        ]
    },
    {
        question: " The simplest Scheduling algorithm in Operating system is ______ ",
        answers:[
            { text: "Multilevel Sceduling algorithms ", correct: false},
            { text: "FCFS Scheduling algorithm ", correct: true},
            { text: "SJF Scheduling algorithm ", correct: false},
            { text: "Round-Robin Scheduling alorithm ", correct: false},
        ]
    },
];

const questionElement = document.getElementById("question")
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex=0;
let score=0;

function startQuiz(){
    currentQuestionIndex=0;
    score = 0;
    nextButton.innerHTML="Next";
    showQuestion();
}


function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex +1;
    questionElement.innerHTML = questionNo + "." +currentQuestion.question;

    currentQuestion.answers.forEach(answer=> {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function  resetState(){
    nextButton.style.display="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length} !`;
    nextButton.innerHTML = "play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
       handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();