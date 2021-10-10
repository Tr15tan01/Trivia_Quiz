fetch('https://opentdb.com/api.php?amount=3&category=28&difficulty=easy&type=multiple')
    .then(response => response.json())
    .then(data => {
        //quesion number
        let i = 0;
        let score = 0;

        //score display
        const scoreDisplay = document.getElementById('score')
        scoreDisplay.textContent = score;

        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }

        const loadQuestion = () => {
            //question assign to element
            const question = document.getElementById('question');
            question.innerHTML = data.results[i].question
            const incorrect_answers = data.results[i].incorrect_answers;
            const correct_answer = data.results[i].correct_answer;
            // const answers = incorrect_answers.concat(correct_answer)
            const answers = [correct_answer, ...incorrect_answers]
            shuffleArray(answers)
            // console.log('answers', answers)

            const answersContainer = document.getElementById('answers')
            answersContainer.innerHTML = answers.map(answer => `<div class = 'answer'>${answer}</div>`).join("<br>")

            const selectAnswer = () => {

                const checkAnswer = (e) => {
                    console.log(e.target.textContent)
                    if (e.target.textContent == correct_answer) {
                        console.log('tadaa')
                        e.target.classList.toggle('correct')
                        score = score + 1;
                        console.log(score, 'score')
                        scoreDisplay.textContent = score;
                    } else {
                        console.log('fuck')
                        e.target.classList.toggle('incorrect')

                    }
                    for (let j = 0; j < answerToSelect.length; j++) {
                        answerToSelect[j].removeEventListener('click', checkAnswer)
                        answerToSelect[j].classList.add('noHover')
                    }

                }

                const answerToSelect = document.querySelectorAll('div.answer')
                // console.log(answerToSelect)
                for (let j = 0; j < answerToSelect.length; j++) {
                    answerToSelect[j].addEventListener('click', checkAnswer)
                }

            }

            selectAnswer()

        }


        // initially load first question
        loadQuestion()


        //next question
        const nextQuestion = () => {
            if (i < 2) {
                console.log('with if i is ', i)
                i = i + 1
                console.log('i is', i)
                loadQuestion()
            } else {
                console.log('finish')
                const containerDiv = document.getElementsByClassName('container')[0]
                const finishedDiv = document.getElementById('finished')
                const finalScore = document.getElementById('finalScore')
                finishedDiv.style.display = 'block';
                containerDiv.style.display = 'none';
                finalScore.textContent = score;
            }

        }

        const nextButton = document.getElementById('nextButton')
        nextButton.addEventListener('click', nextQuestion)
    })

//starter function
const start = () => {
    const divToHide = document.getElementsByClassName('startQuiz')[0];
    divToHide.style.display = 'none'
    console.log('start')
}