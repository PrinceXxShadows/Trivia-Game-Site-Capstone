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
        question: "What does the Mirror of Erised's inscription mean?",
        choice1: "I show not your face but your heart's desire",
        choice2: "Come, I will show you all the things you wish for",
        choice3: "This is not a mirror for viewing one's self, but to bestow relevation",
        choice4: "I will show you not what you love but what you despise",
        answer: 1,
    },
    {
        question: "Who is the heir of Slytherin?",
        choice1: "Draco Malfoy",
        choice2: "Harry Potter",
        choice3: "Ron Weasley",
        choice4: "Tom Morvolo Riddle",
        answer: 4,
    },
    {
        question: "Who taught Defense Against the Dark Arts in Year 4?",
        choice1: "Minerva McGonagall",
        choice2: "Alastor Moody",
        choice3: "Bartemius Crouch, Jr.",
        choice4: "Severus Snape",
        answer: 3,
    },
    {
        question: "Wit beyond measure is man’s greatest treasure’ is the motto of which house?",
        choice1: "Gryffindor",
        choice2: "Ravenclaw",
        choice3: "Hupplepuff",
        choice4: "Slytherin",
        answer: 2,
    },
    {
        question:"What was the name of the pirate radio program that opposed Lord Voldemort?",
        choice1: "Deatheater",
        choice2: "Wizarding Wireless Network",
        choice3: "Potterwatch",
        choice4: "Ministry of magic",
        answer: 3,
    },
    {
        question:"What was the last horcrux?",
        choice1: "Nagini",
        choice2: "Harry",
        choice3: "Snitch",
        choice4: "Elderwand",
        answer: 1,
    },
    {
        question:" What was Voldemorts vault number in the Gringotts Wizarding Bank?",
        choice1: "713",
        choice2: "687",
        choice3: "413",
        choice4: "763",
        answer: 1,
    },
    {
        question:"Who did Ron fall in love with under the influence of love potion?",
        choice1: "Hermione Granger",
        choice2: "Fleur Delacour",
        choice3: "Lavender Brown",
        choice4: "Romilda Vane",
        answer: 4,
    },
    {
        question:"What was the name of Hippogriff that was freed by trio in Prisoner of Azkkaban?",
        choice1: "Fang Errol",
        choice2: "Kreacher",
        choice3: "Buckbeak",
        choice4: "Hedwig",
        answer: 3,
    },
    {
        question:"What was James Potter's patronus?",
        choice1: "Otter",
        choice2: "Doe",
        choice3: "Stag",
        choice4: "Cheetah",
        answer: 3,
    },
    {
        question:"What was the name of the son of Remus Lupin and Nymphadora Tonks?",
        choice1: "Teddy",
        choice2: "James",
        choice3: "Hugo",
        choice4: "Sirius",
        answer: 1,
    },
    {
        question:"Who gave Harry Potter his first broom?",
        choice1: "James Potter",
        choice2: "Remus Lupin",
        choice3: "Minerva McGonagall",
        choice4: "Sirius Black",
        answer: 4,
    },
    {
        question:"What was the curse that killed voldemort?",
        choice1: "Avada Kedavra",
        choice2: "Expelliarmus",
        choice3: "Imperio",
        choice4: "Crucio",
        answer: 2,
    },
    {
        question:"How many staircases does Hogwarts castle have?",
        choice1: "185",
        choice2: "142",
        choice3: "200",
        choice4: "242",
        answer: 2,
    },
    {
        question:"Where is Hufflepuff common rooms?",
        choice1: "Next to the kitchen",
        choice2: "The dungeon",
        choice3: "The tower",
        choice4: "The coat of Arms",
        answer: 1,
    },
    {
        question:"What is the name of the village that Hogwarts student can go for a visit during Prisoner of Azkaban?",
        choice1: "Godric's Hollow",
        choice2: "Honeydukes",
        choice3: "Hogsmeade",
        choice4: "Diagon Alley",
        answer: 3,
    },
    {
        question:"What position does Harry play on his Quidditch team?",
        choice1: "Chaser",
        choice2: "Keeper",
        choice3: "Bludger",
        choice4: "Seeker",
        answer:4,
    },
    {
        question:"The tears of which animal are the only known antidote to basilisk venom?",
        choice1: "Hippogriff",
        choice2: "Billywig",
        choice3: "Phoenix",
        choice4: "Boggart",
        answer:3,
    },
    {
        question:"The ‘Felifors’ spell turns a cat into a what?",
        choice1: "Matchbox",
        choice2: "Cauldron",
        choice3: "Bat",
        choice4: "Heir",
        answer:2,
    },
    {
        question:"Which element is associated with Hufflepuff?",
        choice1: "Fire",
        choice2: "Water",
        choice3: "Earth",
        choice4: "Air",
        answer:3
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