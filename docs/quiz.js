

// DOM Elements
const questionView = document.getElementById('question-view');
const resultView = document.getElementById('result-view');
const questionTextElem = document.getElementById('question-text');
const answerButtonsElem = document.getElementById('answer-buttons');
const scoreValueElem = document.getElementById('score-value');
const finalScoreElem = document.getElementById('final-score');
const totalQuestionsElem = document.getElementById('total-questions');
const restartButton = document.getElementById('restart-button');


/*
=========================================================
    Quiz Class Definition
=========================================================
*/
class Quiz {

    constructor(questions) {
        this.questions = questions;
        this.score = 0;
        this.questionIndex = 0;

        // Event Listener for the restart button
        restartButton.addEventListener('click', () => this.restartQuiz());
    }

    getCurrentQuestion() {
        return this.questions[this.questionIndex];
    }

    submitAnswer(answerIndex) {
        const currentQuestion = this.getCurrentQuestion();
        if (currentQuestion && answerIndex === currentQuestion.correctAnswerIndex) {
            this.score++;
        }
        this.questionIndex++;
    }

    isEnded() { return this.questionIndex >= this.questions.length; }
    reset() { this.score = 0; this.questionIndex = 0; }
    getScore() { return this.score; }
    getTotalQuestions() { return this.questions.length; }

    displayQuestion() {
        // Clear previous answer buttons
        answerButtonsElem.innerHTML = '';

        const currentQuestion = this.getCurrentQuestion();
        questionTextElem.textContent = currentQuestion.question;

        currentQuestion.answers.forEach((answer, index) => {
            const button = document.createElement('button');
            button.textContent = answer;
            button.classList.add('answer-btn');
            button.addEventListener('click', () => this.handleAnswerClick(index));
            answerButtonsElem.appendChild(button);
        });
    }

    handleAnswerClick(answerIndex) {
        this.submitAnswer(answerIndex);
        this.updateScore();

        if (this.isEnded()) {
            this.showResults();
        } else {
            this.displayQuestion();
        }
    }

    updateScore() {
        scoreValueElem.textContent = this.getScore();
    }

    showResults() {
        questionView.style.display = 'none';
        resultView.style.display = 'block';
        finalScoreElem.textContent = this.getScore();
        totalQuestionsElem.textContent = this.getTotalQuestions();
    }

    restartQuiz() {
        this.reset();
        resultView.style.display = 'none';
        questionView.style.display = 'block';
        this.updateScore();
        this.displayQuestion();
    }

}
