const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'What is the name of the terrorist group that captures and imprisons Tony Stark in Iron Man?',
        choice1: 'The Tivan Group',
        choice2: 'The Ten Rings',
        choice3: 'The Tracksuit Mafia',
        choice4: 'The Zealots',
        answer: 2,
    },
    {
        question: `Who or what is slowly poisoning Tony Stark in Iron Man 2?`,
        choice1: `Pepper Potts`,
        choice2: `The metal of his suit`,
        choice3: `The core in his arc reactor`,
        choice4: `J.A.R.V.I.S`,
        answer: 3,
    },
    {
        question: `Who is the gatekeeper of the Bifröst in Thor?`,
        choice1: `Heimdall`,
        choice2: `Hella`,
        choice3: `Hogun`,
        choice4: `Gilgamesh`,
        answer: 1,
    },
    {
        question: `What is the name of the woman Steve Rogers falls in love with in Captain America: The First Avenger?`,
        choice1: `Darcy Lewis`,
        choice2: `Cassie Lang`,
        choice3: `Maria Hill`,
        choice4: `Peggy Carter`,
        answer: 4,
    },
    {
        question: `In the Avengers, who is the leader of the extraterrestrial race known as the Chitauri?`,
        choice1: `Korg`,
        choice2: `The Other`,
        choice3: `Electro`,
        choice4: `Taskmaster`,
        answer: 2,
    },
    {
        question: `What kind of party did Tony Stark meet Maya Hansen at in Iron Man 3?`,
        choice1: `Christmas`,
        choice2: `Birthday`,
        choice3: `New Year's Eve`,
        choice4: `Bachlor's`,
        answer: 3,
    },
    {
        question: `Where was the center of the Convergence located in Thor: The Dark World?`,
        choice1: `Boston`,
        choice2: `New York`,
        choice3: `Moscow`,
        choice4: `Greenwich`,
        answer: 4,
    },
    {
        question: `Who is the Winter Soldier in Captain America: The Winter Soldier`,
        choice1: `Curt Connors`,
        choice2: `Darron Cross`,
        choice3: `Max Dillon`,
        choice4: `Bucky Barnes`,
        answer: 4,
    },
    {
        question: `What is inside the Orb Peter Quill steals from Morag in Guardians of the Galaxy?`,
        choice1: `Time Stone`,
        choice2: `Power Stone`,
        choice3: `Space Stone`,
        choice4: `Mind Stone`,
        answer: 2,
    },
    {
        question: `What is the name of Wanda Maximoff's twin in Avengers: Age of Ulton?`,
        choice1: `Ajak`,
        choice2: `Emil`,
        choice3: `Pietro`,
        choice4: `Aldrich`,
        answer: 3,
    },
    {
        question: `What divides the Avengers in Captain America: Civil War?`,
        choice1: `The Underage Superhuman Welfare Act`,
        choice2: `The Sokovia Accords`,
        choice3: `The MI-13 Reegistration Act`,
        choice4: `Proposition X`,
        answer: 2,
    },
    {
        question: `The three Sanctums that protect Earth in Doctor Strange are located in Hong Kong, New York, and ...`,
        choice1: `Wakanda`,
        choice2: `San Francisco`,
        choice3: `Paris`,
        choice4: `London`,
        answer: 4,
    },
    {
        question: `What is revealed to be the cause of Quill's mother's tumor in Guardians of the Galaxy Vol 2?`,
        choice1: `Mantis gave it to her because she was jealous`,
        choice2: `Quill's Celestial power`,
        choice3: `Ego gave it to her because she was a distraction`,
        choice4: `Cancer`,
        answer: 3,
    },
    {
        question: `In Spiderman: Homecoming, who is Adrian Toomes' daughter?`,
        choice1: `Pepper`,
        choice2: `MJ`,
        choice3: `Liz`,
        choice4: `Wanda`,
        answer: 3,
    },
    {
        question: `Who destroys Mjolnir in Thor: Ragnarök?`,
        choice1: `Surtur`,
        choice2: `Loki`,
        choice3: `Skurge`,
        choice4: `Hela`,
        answer: 4,
    },
    {
        question: `Killmonger, in Black Panther, was a part of which branch of the US military?`,
        choice1: `Army`,
        choice2: `Navy`,
        choice3: `Marine Corps`,
        choice4: `Air Force`,
        answer: 2,
    },
    {
        question: `What was the Space Stone hidden inside of in Avengers: Infinity War?`,
        choice1: `Tesseract`,
        choice2: `Vison's forehead`,
        choice3: `Eye of Agamotto`,
        choice4: `Aether`,
        answer: 1,
    },
    {
        question: `Who blinds Nick Fury in Captain Marvel?`,
        choice1: `Goose`,
        choice2: `Ronan`,
        choice3: `Talos`,
        choice4: `Yon-Rogg`,
        answer: 1,
    },
    {
        question: `Who makes the sacrifice to obtain the Soul Stone in Avengers: Endgame?`,
        choice1: `Natasha Romanoff`,
        choice2: `Gamora`,
        choice3: `Clint Barton`,
        choice4: `Nebula`,
        answer: 1,
    },
    {
        question: `What allows Peter Parker to communicate with E.D.I.T.H. in Spiderman: Far From Home?`,
        choice1: `his sunglasses`,
        choice2: `his suit`,
        choice3: `his watch`,
        choice4: `his belt`,
        answer: 1,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 20

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()