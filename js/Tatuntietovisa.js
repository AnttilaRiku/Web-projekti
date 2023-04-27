const questions = [
    {
        question: "Mikä on 25%:n osuus luvusta 80?",
        answers: [
            {text: "20" , correct: true},
            {text: "40" , correct: false},
            {text: "60" , correct: false},
            {text: "70" , correct: false},
        ]
    },
    {
        question: "Mikä on seuraavien lukujen keskiarvo: 8, 10, 11, 13, 8?",
        answers: [
            {text: "8" , correct: false},
            {text: "9" , correct: false},
            {text: "10" , correct: true},
            {text: "11" , correct: false},
        ]
    },
    {
        question: "Laske yhteen luvut 2, 6, 8, 4 ja 10, ja jaa sitten tulos viidellä. Mikä on vastaus?",
        answers: [
            {text: "4" , correct: false},
            {text: "5" , correct: true},
            {text: "6" , correct: false},
            {text: "7" , correct: false},
        ]
    },
    {
        question: "Mikä on x, jos 3  2 = 11?",
        answers: [
            {text: "8" , correct: false},
            {text: "9" , correct: false},
            {text: "10" , correct: true},
            {text: "11" , correct: false},
        ]
    },
    {
        question: "Mikä on seuraavien lukujen keskiarvo: 8, 10, 11, 13, 8?",
        answers: [
            {text: "8" , correct: false},
            {text: "9" , correct: false},
            {text: "10" , correct: true},
            {text: "11" , correct: false},
        ]
    },
    {
        question: "Mikä on seuraavien lukujen keskiarvo: 8, 10, 11, 13, 8?",
        answers: [
            {text: "8" , correct: false},
            {text: "9" , correct: false},
            {text: "10" , correct: true},
            {text: "11" , correct: false},
        ]
    },
   

];

// Get references to elements on the page
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");


// Initialize variables to track the current question and the user's score
let currentQuestionIndex = 0;
let score = 0;

// Function to start the quiz
function startQuiz(){
    // Reset the question index and score
    currentQuestionIndex = 0;
    score = 0;
    // Set the text on the "Next" button to "Seuraava"
    nextButton.innerHTML = "Next";
 
    // Show the first question
    showQuestion();
}

// Function to display the current question on the page
function showQuestion(){
    // Reset the state of the page (remove previous answer buttons and hide the "Next" button)
    resetState();
    // Get the current question from the array
    let currentQuestion = questions[currentQuestionIndex];
    // Calculate the question number (1-based index)
    let questionNo = currentQuestionIndex + 1;
    // Set the question text on the page
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    // Loop through the possible answers and create a button for each one
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        // If this answer is correct, add a data attribute to the button to mark it as correct
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        // Add an event listener to the button to handle user clicks
        button.addEventListener("click", selectAnswer);
    }); 
} 

// Function to reset the state of the page (remove previous answer buttons and hide the "Next" button)
function resetState(){
    nextButton.style.display = "none";
    

    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

// Function to handle when the user selects an answer
function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    // If the answer is correct, add 1 to the user's score and add a "correct" class to the button
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        // If the answer is incorrect, add an "incorrect" class to the button
        selectedBtn.classList.add("incorrect")
    }
    // Loop through all the answer buttons and disable them, and add a "correct" class to the correct answer
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    // Show the "Next" button
    nextButton.style.display = "block";
 

}

// Function to show the user's score when all questions have been answered
function showScore(){
    // Reset the state of the page (remove previous answer buttons)
    resetState();
    questionElement.innerHTML = `Sinun pisteesi ${score} / ${questions.length}`;
    nextButton.innerHTML = "Pelaa uudestaan";
    nextButton.style.display ="block";
  
}

// Advances to next question or shows score if at end of quiz
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
};

// Handles when user clicks the next button
nextButton.addEventListener("click", () =>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

// Starts the quiz
startQuiz();