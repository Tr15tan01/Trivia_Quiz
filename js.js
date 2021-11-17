import { greenLogStyle, redLogStyle, blueLogStyle } from "./styles.js";


window.start = () => {
    const starterDiv = document.getElementsByClassName('startQuiz')[0];
    // const spinner = document.getElementById('spinner')
    starterDiv.style.display = 'none'
    console.log('difficulty - start function')
    fetcher()
}

const fetcher = () => {
    console.log('difficulty fetcher')
    const spinner = document.getElementById('spinner')
    const containerDiv = document.getElementsByClassName('container')[0]
    containerDiv.style.display = 'none'
    fetch(`https://opentdb.com/api.php?amount=3&category=28&type=multiple`)
        .then(response => response.json())
        .then(data => {
            //quesion number
            let i = 0;
            let score = 0;
            let selected = false;
            const nextButton = document.getElementById('nextButton')
            containerDiv.style.display = 'block'
            spinner.style.display = 'none'
            const finishedDiv = document.getElementById('finished')
            // const containerDiv = document.getElementsByClassName('container')[0]


            //score display
            const scoreDisplay = document.getElementById('score')
            scoreDisplay.textContent = `Your score is: ${score}`;

            function shuffleArray(array) {
                console.log('array shuffled')
                for (let i = array.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [array[i], array[j]] = [array[j], array[i]];
                }
            }

            const loadQuestion = () => {
                //question assign to element
                console.log('%cloadQuestion function started', redLogStyle)
                const question = document.getElementById('question');
                question.innerHTML = data.results[i].question
                const incorrect_answers = data.results[i].incorrect_answers;
                const correct_answer = data.results[i].correct_answer;
                // const answers = incorrect_answers.concat(correct_answer)
                const answers = [correct_answer, ...incorrect_answers]
                shuffleArray(answers)
                // console.log('answers', answers)
                nextButton.disabled = true;
                const answersContainer = document.getElementById('answers')
                answersContainer.innerHTML = answers.map(answer => `<div class = 'answer'>${answer}</div>`).join("<br>")
                const selectAnswer = () => {

                    const checkAnswer = (e) => {
                        // console.log(e.target.textContent)
                        console.log('%ccheckAnswer function', greenLogStyle)
                        nextButton.disabled = false;
                        if (e.target.textContent == correct_answer) {
                            // console.log('answer')
                            e.target.classList.toggle('correct')
                            score = score + 1;
                            // console.log(score, 'score')
                            scoreDisplay.textContent = `Your score is: ${score}`;
                        } else {
                            // console.log('fuck')
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
                console.log('next question function')
                if (i < data.results.length - 1) {
                    i = i + 1
                    loadQuestion()
                    console.log('i = ', i)
                    console.log('data results length', data.results.length)
                }
                else {
                    console.warn('finished')
                    // const containerDiv = document.getElementsByClassName('container')[0]
                    // const finishedDiv = document.getElementById('finished')
                    const finalScore = document.getElementById('finalScore')
                    finishedDiv.style.display = 'block';
                    containerDiv.style.display = 'none';
                    finalScore.textContent = `Your score is: ${score}`;
                    console.log('%cfinalScore', blueLogStyle, score)
                }

                console.log('the score is -', score)

            }

            nextButton.addEventListener('click', nextQuestion)

            // const nextLevel = () => {
            //     console.log('nextleven function')

            //     fetcher()
            //     finishedDiv.style.display = 'none'
            //     containerDiv.style.display = 'block'
            // }

            // const nextLevelButton = document.getElementById('nextLevelButton')
            // nextLevelButton.addEventListener('click', nextLevel)
        })
}


const nextLevel = () => {
    // const finishedDiv = document.getElementById('finished')
    // const containerDiv = document.getElementsByClassName('container')[0]

    // console.log('nextleven function')

    // fetcher()
    // finishedDiv.style.display = 'none'
    // containerDiv.style.display = 'block'
    window.location.reload()
}

const nextLevelButton = document.getElementById('nextLevelButton')
nextLevelButton.addEventListener('click', nextLevel)