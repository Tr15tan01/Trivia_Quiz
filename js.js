const api = fetch('https://opentdb.com/api.php?amount=3&category=28&type=multiple')
    .then(response => response.json())
    .then(data => {
        //quesion number
        let i = 0;

        const loadQuestion = () => {
            //question assign to element
            const question = document.getElementById('q1');
            question.innerHTML = data.results[i].question
            const incorrect_answers = data.results[i].incorrect_answers;
            const correct_answer = data.results[i].correct_answer;
            const answers = incorrect_answers.concat(correct_answer)
            // console.log('answers', answers)

            const answersContainer = document.getElementById('answers')
            answersContainer.innerHTML = answers.map(answer => `<div class = 'answer'>${answer}</div>`).join("<br>")

        }

        loadQuestion()

        const nextQuestion = () => {
            i = i + 1
            loadQuestion()
        }



        // console.log(data)



        const nextButton = document.getElementById('nextButton')
        nextButton.addEventListener('click', nextQuestion)
    })

