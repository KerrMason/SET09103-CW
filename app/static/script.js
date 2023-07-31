const homeScreen = document.getElementById("home-screen")
const rulesScreen = document.getElementById("rules-screen")
const readyScreen = document.getElementById("ready-screen")
const teamColor = document.querySelector("body")
const questionsScreen = document.getElementById("questions-screen")
const prompt = document.getElementById("prompt")
const answerFlex=document.getElementById("answer-flex")
const scores= document.getElementById("score")
const scoreScreen = document.getElementById("score-screen")
const final = document.getElementById("final-score")
const close = document.getElementById("close")


var shuffled
var index

var score

//class list reveals some sections of the quiz depending on button clicks.
function rules() {
    
    homeScreen.classList.add('hide')
    rulesScreen.classList.remove('hide')
}

function returnHome(){
   
    rulesScreen.classList.add('hide')
    homeScreen.classList.remove('hide')
    scoreScreen.classList.add("hide")
    teamColor.classList.remove("team1")
}
// This is a button to return to home from where ever you are.
function closes() {
    homeScreen.classList.remove("hide")
    questionsScreen.classList.add("hide")
    teamColor.classList.remove("team1")
    readyScreen.classList.add("hide")
    rulesScreen.classList.add("hide")
    scoreScreen.classList.add("hide")
    close.classList.add("hide")


}
//starts the ready up screen and changes the background color.
function startQuiz(){
   
    homeScreen.classList.add("hide")
    readyScreen.classList.remove("hide")
    teamColor.classList.add("team1")
    close.classList.remove("hide")
}
//this initialises the score and question index to 0, then shuffles the question order using math.random
function team1ready(){
    readyScreen.classList.add("hide")
    questionsScreen.classList.remove("hide")
    index = 0
    score = 0
    shuffled = questions.sort(function(a,b){return 0.5 - Math.random()})
    setQuestion()


}
// this function clears the previous questions and begins to show questions from the shuffled index.
function setQuestion(){
    reset()
    showQuestion(shuffled[index])
}
// this shows incremental score and also uses the prompt element for the questions
function showQuestion(questions){
    scores.innerHTML = "Score: " + score
    prompt.innerHTML = questions.question
    questions.answers.forEach(answer)
}
// this functions loops through every answer in the question objects in order to assign each answer to a button
//this also checks for the correct answer conditions in order to award a point where needed
function answer(value){
const button = document.createElement("button")
button.innerHTML = value.text
button.classList.add("btn")
if(value.correct){
    button.dataset.correct = value.correct
}
// this adds the freshly made answer buttons to the answer flexbox
button.addEventListener("click", selectedAnswer)
answerFlex.appendChild(button)
}
//this checks the clicked answer to see if it was correct.
//If it was correct, then add 1 to the score.
function selectedAnswer(e){
    const selected = e.target
    const correct = selected.dataset.correct
    if (correct){
        console.log("hello")
        score++
    }
    // this makes sure that the question pop ups dont exceed the amount of questions in the array
    index++
    if(shuffled.length>index){

    setQuestion()
}
else{
    // once all questions are answered, this brings up the final score
    showScore()
}
}
function showScore(){
    questionsScreen.classList.add("hide")
    scoreScreen.classList.remove("hide")
    teamColor.classList.add("team1")
    final.innerHTML = "Your Final Score Was: " + score

}


function reset(){
    while(answerFlex.firstChild){
        answerFlex.removeChild(answerFlex.firstChild)
    }
}

// these are the questions and answers.
const questions = [
    {
        question: "What does the word 'wat' mean in Thai?",
         answers:[
            {text: "Temple", correct: true},
            {text: "Island", correct: false},
            {text: "Food",correct: false}
        ]
    },
    {
        question: "How long does it take the ISS to orbit the earth?",
         answers:[
            {text: "2 hours", correct: false},
            {text: "90 minutes", correct: true},
            {text: "1 day",correct: false}
        ]
    },
    {
        question: "How many countries are in between North Korea and Norway?",
         answers:[
            {text: "6", correct: false},
            {text: "4", correct: false},
            {text: "1",correct: true}
        ]
    },
    {
        question: "What instrument is commonly used to tune an orchestra?",
         answers:[
            {text: "Violin", correct: false},
            {text: "Oboe", correct: true},
            {text: "Piano",correct: false}
        ]
    },
    {
        question: "Which of these is not a vegetable?",
         answers:[
            {text: "Pumpkin", correct: true},
            {text: "Broccoli", correct: false},
            {text: "Cauliflower",correct: false}
        ]
    },
    {
        question: "Which infamous ruler was known as 'the scourge of god'?",
         answers:[
            {text: "Genghis Kahn", correct: false},
            {text: "Ivan the Terrible", correct: false},
            {text: "Attila the Hun",correct: true}
        ]
    },
]