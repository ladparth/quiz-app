const quizData = [
    {
        question: 'What year was the very first model of the iPhone released?',
        a:'2006',
        b:'2007',
        c:'2008',
        d:'2009',
        answer: 'b'
    },
    {
        question: 'What’s the shortcut for the “copy” function on most computers?',
        a:'Ctrl + V',
        b:'Ctrl + X',
        c:'Ctrl + C',
        d:'Ctrl + Z',
        answer: 'c'
    },
    {
        question: 'What is often seen as the smallest unit of memory?',
        a:'kilobyte',
        b:'byte',
        c:'megabyte',
        d:'terabyte',
        answer: 'a'
    },
    {
        question: 'What does “HTTP” stand for?',
        a:'HyperText Transport Protocol',
        b:'HyperText Transfer Protocol',
        c:'HyperText Transfer Process',
        d:'HyperText Transfers Protocols',
        answer: 'b'
    }
]

const quiz = document.getElementById('quiz');

const questionEle = document.getElementById('question');
const a_text = document.getElementById('a_text');  
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');
const submitBtn = document.getElementById('submit'); 
const error = document.querySelector('.error');

//Initialize quiz question & score
let currentQuiz = 0;
let score = 0;

//Generate Quiz Qustions and Options from quizData array

function loadQuiz(){
    const currentQuizData = quizData[currentQuiz];

    questionEle.innerHTML = currentQuizData.question;

    a_text.innerHTML = currentQuizData.a;
    b_text.innerHTML = currentQuizData.b;
    c_text.innerHTML = currentQuizData.c;
    d_text.innerHTML = currentQuizData.d;

    //unCheckRadios();

}
//Loading the first question on to DOM
loadQuiz();

//Next Button 
submitBtn.addEventListener('click', () =>{
    //Store selected answer
    const answer = getSelectedAnswer();
    //store correct answer from the object
    const currentQuizData = quizData[currentQuiz];
    const correctAns = currentQuizData.answer;

    //check if the answer was selected or not
    if(answer){
        error.style.display = 'none';
        //Check answer is correct or not, if correct increment the score
        if(answer === correctAns){
            score++;
        }
        //Increment current question counter to load next question on to the DOM
        currentQuiz++;

        //Check if the current question counter is less than or equal to total question stored in the object.

        if(currentQuiz<quizData.length){
            loadQuiz();
            //change the button text to Submit for last question only
            changeBtnText();
        }else{

            //Show Result
            quiz.innerHTML = `
                <h2 class = "result">You answered ${score}/${quizData.length} questions correctly </h2>

                <button onclick="location.reload()">Restart</button>`
        }

    }else{
        error.style.display = 'block';
    }
    
});

function getSelectedAnswer(){
    const answersEles = document.querySelectorAll('.answer');
    let answer = undefined;
    answersEles.forEach((answerEle) =>{
        if(answerEle.checked){
            answer = answerEle.id;
        }
        answerEle.checked = false;
    });
    return answer; 
}
function changeBtnText(){

    if(currentQuiz === (quizData.length -1)){
        submitBtn.innerText = 'Submit'
    }
}