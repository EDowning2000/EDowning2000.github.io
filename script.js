var questions = [
  {
    question: "Can you add elements to a webpage straight from JavaScript?",
    answers: ["yes","no","why would you do this?"],
    correctAnswer: 0
  },
  {
    question: "What can be inside of a string in JavaScript?",
    answers: ["numbers","letters","phrases","all of the above"],
    correctAnswer: 3
  },
  {
    question: "What does a 'for loop' do in JavaScript?",
    answers: ["Loops through an array","Sends all of your photos to your grandmother"],
    correctAnswer: 0
  },
  {
    question: " What is a good resource for JavaScript related questions?",
    answers: ["stackoverflow","reddit","w3schools","all of the above"],
    correctAnswer: 3
  }
];





var timerElement = document.querySelector("#timer")
var displayedQElement = document.querySelector('#displayedQ')
var choicesContainerElement =document.querySelector("#choicesContainer")
var submitButton = document.querySelector("#submitBtn")
var scoresContainer = document.querySelector(".scoresContainer")

var currentTime;
var timerInterval;
var currentQuestionIndex =0; 

function endQuiz (){
  clearInterval(timerInterval);
  currentQuestionIndex=0
  $('.currentQ').hide()
  $('.finalScreen').show()
  $("#score").text(currentTime)

}




function startTimer() {
  currentTime = 70;

  timerElement.textContent=currentTime
  timerInterval = setInterval(function() {
    currentTime--;

    if(currentTime===0){
      endQuiz()
    }


    timerElement.textContent=currentTime; 
    
  }, 1000);
}

function validateAnswer(event){
  var selectedAnswer = event.target.dataset.index;
  var currentQuestion= questions[currentQuestionIndex];

  if(currentQuestion.correctAnswer !== parseInt(selectedAnswer)){
    currentTime -= 10
  }

  currentQuestionIndex++;

  if (currentQuestionIndex<questions.length){
    displayQuestion()
  }
  else{
    endQuiz()
  }
}

function displayQuestion(){
  var currentQuestion= questions[currentQuestionIndex];

  var answers = currentQuestion.answers
  displayedQElement.textContent= currentQuestion.question;

  choicesContainerElement.innerHTML= ""

  for (var i=0; i<answers.length; i++){
    var newButton = document.createElement("button")
    newButton.textContent= answers[i]
    newButton.setAttribute("data-index", i)
    newButton.addEventListener("click", validateAnswer)

   choicesContainerElement.append(newButton)
  }
}


$(".startTimerBtn").on("click", function() {
  $(".intro").addClass("dontDisplay");
  $('.currentQ').show()
  startTimer()
  displayQuestion()
});


submitButton.addEventListener('click', function(event){
 event.preventDefault ;
  var inputBtn= document.getElementById("Your-initials").value
 console.log(inputBtn)
  
 var finalScores = {
   name : inputBtn , 
   score : currentTime
 }
 console.log(finalScores)
 localStorageInfo.push(finalScores)
 console.log(localStorageInfo)
 var pushableLocalStorage= JSON.stringify(localStorageInfo)
 localStorage.setItem('topScores' ,pushableLocalStorage)
})

function scoresOnScreen(){
  
  var localStorageInfo = JSON.parse(localStorage.getItem("topScores"))
console.log(localStorageInfo)
if(localStorageInfo===null){
  emptyScoresArray = '[]'
  localStorage.setItem("topScores", emptyScoresArray)
  // var localStorageInfo = JSON.parse(localStorage.getItem("topScores" ))
}
console.log(localStorageInfo)

}
