// Define quiz questions and options

const quizData = [
    
    // Quiz 1
    [

        {
            title: "Geography Quiz",
            question: "What is the capital of France?",
            options: ["Paris", "Berlin", "Madrid", "Rome"],
            answer: 0 // Index of the correct answer
        },
        {
            title: "Geography Quiz",
            question: "Which planet is known as the Red Planet?",
            options: ["Venus", "Mars", "Jupiter", "Saturn"],
            answer: 1
        },
        {
            title: "Geography Quiz",
            question: "What is the chemical symbol for water?",
            options: ["H2O", "CO2", "O2", "NaCl"],
            answer: 0
        }
    ],

    [

        {
            title: "3A Unit 1",
            question: "Do all humans have the same skin color?",
            options: ["Yes", "No", "Maybe", "Definitely"],
            answer: 1 // Index of the correct answer
        },
        {
            title: "3A Unit 1",
            question: "Are all humans the same height?",
            options: ["Yes", "No", "I don't know", "Maybe"],
            answer: 0
        },
        {
            title: "3A Unit 1",
            question: "Do humans have different hair color?",
            options: ["Maybe", "No", "Yes", "I don't know"],
            answer: 2
        }

    ],
    [

        {
            title: "6A Unit 1",
            question: "What happens when the sperm joins the egg??",
            options: ["Fertilization", "The egg dies", "The world ends", "Mating"],
            answer: 0 // Index of the correct answer
        },
        {
            title: "6A Unit 1",
            question: "Where is a bird's egg fertilized?",
            options: ["In outer space", "In the mother's stomach", "In the nest", "In the rabbit's stomach"],
            answer: 1
        },
        {
            title: "6A Unit 1",
            question: "Where do fish mate?",
            options: ["In the sky", "In the earth", "In the fish's stomach", "In the water"],
            answer: 3
        }

    ],
    [

        {
            title: "5A Unit 1",
            question: "What do plants grow from?",
            options: ["Seeds", "Water", "Soil", "Sand"],
            answer: 0 // Index of the correct answer
        },
        {
            title: "5A Unit 1",
            question: "What do seeds need to grow into seedlings?",
            options: ["Light and Water", "Light and Heat", "Nothing", "Water and Heat"],
            answer: 3
        },
        {
            title: "5A Unit 1",
            question: "How do Pine Tree seeds disperse?",
            options: ["Animals eat them and then they are dispersed in their poo", "They float in the water", "They fly on the wind", "They teleport"],
            answer: 2
        }

    ]
];

const container = document.querySelector(".container");
const results = document.querySelector('.results');
const questionElement = document.querySelector("#question");
const optionsElement = document.querySelector("#options");
const submitButton = document.querySelector("#submit_button");
const restartButton = document.querySelector("#restart_button");
const submitScoreButton = document.getElementById('submit_score');
const quizSelect = document.getElementById('quiz_select');
const quizSelectors = quizSelect.querySelectorAll('.quiz_select_button');
const nameInput = document.getElementById('name_input');





let quizTitle = document.getElementById('title');

let currentQuiz = 0
let currentQuestion = 0;
let currentScore = 0;
let currentQuizData = quizData[currentQuiz][currentQuestion];

// Load the initial question

function loadQuestion() {

    restartButton.style.display = 'none';

    
    currentQuizData = quizData[currentQuiz][currentQuestion];


    quizTitle.textContent = currentQuizData.title;

    questionElement.textContent = currentQuizData.question;

    optionsElement.innerHTML = ""; // Clear previous question

    currentQuizData.options.forEach((option, index) => {
        const optionElement = document.createElement("label");
        optionElement.innerHTML = `
        <input type="radio" name="answer" value=${index}">
        ${option}
        `;

        optionsElement.appendChild(optionElement);
    });
}

// Check the selected answer and move to the next question

function submitAnswer() {

    
    

    const answer = document.querySelector("input[name='answer']:checked");

    if (!answer) {
        alert("Please select an answer!");
        return;
    }

    const selectedAnswer = parseInt(answer.value);

    if (selectedAnswer === quizData[currentQuiz][currentQuestion].answer) {

        currentScore++;
    }


    currentQuestion++;

    if (currentQuestion < quizData[currentQuiz].length) {
        loadQuestion();
    } else {
        showResults();
    }
}


// Display the final score

function showResults() {


    results.innerHTML = `
    <h1>Quiz Results</h1>
    <p>You scored ${currentScore} out of ${quizData[currentQuiz].length}!</p>
    `;

    submitButton.style.display = 'none';
    restartButton.style.display = 'inline';

    
}

function restartQuiz() {
    console.log('restart');
    results.innerHTML = '';
    currentQuestion = 0;
    currentScore = 0;
    submitButton.style.display = 'inline';
    loadQuestion();

}



// Render the scores on the page

function renderScores(scores) {

    scoreList.innerHTML = '';
    scores.forEach((score) => {
        const li = document.createElement('li');
        li.textContent = `${score.name}: ${score.score}`;
        scoreList.appendChild(li);
    })

}



// Event Listeners
submitButton.addEventListener("click", submitAnswer);

restartButton.addEventListener('click', restartQuiz);

submitScoreButton.addEventListener("click", (e) => {

    e.preventDefault();

    const name = nameInput.value;
    
    console.log(name, currentScore);


    // Send the score to the server
    fetch('/scores', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: name, score: currentScore }),
    })
    .then(() => {
        nameInput.value = '';
        

        // Refresh the score list
        fetch('/scores')
        .then((res) => res.json())
        .then((data) => {
            renderScores(data);
        });
    });
});


quizSelectors.forEach((btn) => {


    btn.addEventListener('click', () => {

        currentQuiz = parseInt(btn.innerHTML) - 1; // get index for quiz select
        loadQuestion();
    })
})


// Load the first question
loadQuestion();


// Initial fetch to retrieve scores

fetch('/scores')
.then((res) => res.json())
.then((data) => {
    renderScores(data);
});