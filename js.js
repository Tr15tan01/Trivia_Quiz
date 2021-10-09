fetch('https://opentdb.com/api.php?amount=3&category=28&type=multiple')
    .then(response => response.json())
    .then(data => {
        //quesion number
        let i = 0;

        //next question
        const nextQuestion = () => {
            i = i + 1
            loadQuestion()
        }

        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }

        const loadQuestion = () => {
            //question assign to element
            const question = document.getElementById('q1');
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
                    } else {
                        console.log('fuck')
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


        // console.log(data)



        const nextButton = document.getElementById('nextButton')
        nextButton.addEventListener('click', nextQuestion)
    })

