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

        // DOM Elements
        this.questionView = null;
        this.resultView = null;
        this.questionTextElem = null;
        this.answerButtonsElem = null;
        this.scoreValueElem = null;
        this.progressValueElem = null;
        this.finalScoreElem = null;
        this.restartButton = null;
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
    reset() {
        this.score = 0;
        this.questionIndex = 0;
    }
    getScore() { return this.score; }
    getTotalQuestions() { return this.questions.length; }

    displayQuestion() {
        // Clear previous answer buttons
        this.answerButtonsElem.innerHTML = '';

        const currentQuestion = this.getCurrentQuestion();
        this.questionTextElem.innerHTML = currentQuestion.question;

        currentQuestion.answers.forEach((answer, index) => {
            const button = document.createElement('button');
            button.textContent = answer;
            button.classList.add('answer-btn');
            button.addEventListener('click', () => this.handleAnswerClick(index));
            this.answerButtonsElem.appendChild(button);
        });

        this.updateProgress();
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
        this.scoreValueElem.textContent = this.getScoreText()
    }
    updateProgress() {
        this.progressValueElem.textContent =
            "Question #" + (this.questionIndex + 1)
             + " out of " + this.getTotalQuestions();
    }

    showResults() {
        this.questionView.style.display = 'none';
        this.resultView.style.display = 'block';
        this.finalScoreElem.innerHTML = this.getFinalScoreText();
    }

    getScoreText() {
        return this.getScore();
    }

    getFinalScoreText() {
        return "Your final score is " + this.getScore()
            + " out of " + this.getTotalQuestions();
    }

    startQuiz() {
        this.writeDivs();
        this.displayQuestion();
    }

    restartQuiz() {
        this.reset();
        this.resultView.style.display = 'none';
        this.questionView.style.display = 'block';
        this.updateScore();
        this.displayQuestion();
    }

    writeDivs() {
        let topHTML = `
<div id="quiz-container">
    <div id="question-view">
        <h2 id="question-text"></h2>
        <div id="answer-buttons">
            </div>
        <div id="score-container">
            <p>Score is <span id="score-value">___</span></p>
        </div>
        <div id="progress-container">
            <p><span id="progress-value">___</span></p>
        </div>
    </div>

    <div id="result-view" style="display: none;">
        <div id="result-container">
            <h2>Quiz Complete!</h2>
            <p><span id="final-score"></span></p>
            <button id="restart-button">Restart Quiz</button>
        </div>
    </div>
</div>
`;
        document.write(topHTML);
        // DOM Elements
        this.questionView = document.getElementById('question-view');
        this.resultView = document.getElementById('result-view');
        this.questionTextElem = document.getElementById('question-text');
        this.answerButtonsElem = document.getElementById('answer-buttons');
        this.scoreValueElem = document.getElementById('score-value');
        this.progressValueElem = document.getElementById('progress-value');
        this.finalScoreElem = document.getElementById('final-score');
        this.restartButton = document.getElementById('restart-button');
        // Event Listener for the restart button
        this.restartButton.addEventListener('click', () => this.restartQuiz());
    }
}
/*
=========================================================
    GoodBadQuiz Class Definition
=========================================================
*/
class GoodBadQuiz extends Quiz {

    constructor(questions) {
        super(questions)

        questions.forEach((question) => {
            question.answers = ["Good", "Neutral", "Bad"];
        });

        this.scores = [0, 0, 0];
    }

    reset() {
        super.reset();
        this.scores = [0, 0, 0];
    }

    handleAnswerClick(answerIndex) {
        this.scores[answerIndex]++;
        super.handleAnswerClick(answerIndex);
    }

    getScoreText() {
        return "Good: " + this.scores[0]
            + ", Neutral: " + this.scores[1]
            + ", Bad: " + this.scores[2]
    }

    getFinalScoreText() {
        let good = this.scores[0];
        let neutral = this.scores[1];
        let bad = this.scores[2];
        let interpretation = "You think this is ";
        if (good > neutral && good > bad) {
            interpretation += "mostly GOOD.";
        } else if (bad > neutral && bad > good) {
            interpretation += "mostly BAD.";
        } else {
            interpretation += "a mix of GOOD and BAD.";
        }
        return "Your final score is " + this.getScoreText() + "<br/>" + interpretation;
    }
}
