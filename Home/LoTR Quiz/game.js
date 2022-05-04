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
        question: "What is the name of Gandalf's sword?",
        choice1: 'Glamdring',
        choice2: 'Sting',
        choice3: 'Orcrist',
        choice4: 'Andúril',
        answer: 1,
    },
    {
        question:
            "Who is the king of Rohan?",
        choice1: "Eowyn",
        choice2: "Eomer",
        choice3: "Theoden",
        choice4: "None of the above",
        answer: 3,
    },
    {
        question: "What is the name of the capital of Gondor??",
        choice1: "Osgilath",
        choice2: "Helm's Deep",
        choice3: "Cirith Ungol",
        choice4: "Minas Tirith",
        answer: 4,
    },
    {
        question: "To whom does Pippin pledge allegiance?",
        choice1: "Faramir",
        choice2: "Denethor",
        choice3: "Gandalf",
        choice4: "Aragorn",
        answer: 2,
    },
    {
        question:"What is the name of the Ent who carries Pippin and Merry through Fangthorn Forest?",
        choice1: "Skinbark",
        choice2: "Treebeard",
        choice3: "Greybranch",
        choice4: "Quickbeam",
        answer:2,
    },
    {
        question:"Who does Sam marry at the end of The Return of The King?",
        choice1: "Rosie Cotton",
        choice2: "Pearly Bottom",
        choice3: "Daisy Puddle",
        choice4: "Gilly Baggins",
        answer:1,
    },
    {
        question:"What is the name of Gandalf's ring?",
        choice1: "Narya",
        choice2: "Vilya",
        choice3: "Nenya",
        choice4: "He has no ring",
        answer:1,
    },
    {
        question:"How many Academy Awards did the Lord of The Rings trilogy win",
        choice1: "4",
        choice2: "7",
        choice3: "11",
        choice4: "17",
        answer:4,
    },
    {
        question:"Who is the only one of the Fellowship who refuses to go into Lothlorien?",
        choice1: "Gimli",
        choice2: "Frodo",
        choice3: "Boromir",
        choice4: "Aragorn",
        answer:3,
    },
    {
        question:"How was Balin killed?",
        choice1: "Slain by his own men",
        choice2: "Killed by the Nazgul",
        choice3: "Shot by an orc from behind a rock",
        choice4: "Crushed by rocks",
        answer:3,
    },
    {
        question:"What are exactly the Two Watchers?",
        choice1: "Carved statues on the entrance to the Cirith Ungol Tower",
        choice2: " Massive statues of Anarion and Isildur standing on the River Anduin",
        choice3:"Two rivers flowing through and creating the borders in the Gap of Rohan",
        choice4:"None of the above",
        answer:1,
    },
    {
        question:"Who participates in the Battle of Isengard?",
        choice1: "The Fellowship versus Orcs of Dol Guldur",
        choice2: "The Galadhrim of Lothlórien versus Orcs of Dol Guldur",
        choice3: "King Théoden’s Rohirrim versus Sauron’s forces",
        choice4: "The Ents versus Sauron’s forces",
        answer:4,
    },
    {
        question:"Which metal is the armoured shirt of Frodo made out of?",
        choice1: "Steel",
        choice2: "Mithril",
        choice3: "Silver",
        choice4: "Adamantite",
        answer:2,
    },
    {
        question:"In the movies, how many times does Frodo Baggins put on the Ring?",
        choice1: "7",
        choice2: "4",
        choice3: "2",
        choice4: "9",
        answer:2,
    },
    {
        question:"Where is Legolas’s home?",
        choice1: "Mirkwood",
        choice2: "Eastfold",
        choice3: "Fangthorn Forest",
        choice4: "Rivendell",
        answer:1,
    },
    {
        question:"Which fake name does Frodo Baggins choose for himself after departing from the Shire",
        choice1: "Mr. Underfoot",
        choice2: "Mr. Proudfoot",
        choice3: "Mr. Underhill",
        choice4: "Mr. Overhill",
        answer:3,
    },
    {
        question:"What is the EXACT number of Ringwraiths?",
        choice1: "7",
        choice2: "4",
        choice3: "10",
        choice4: "9",
        answer:4,
    },
    {
        question:"How many Rings of Power were forged at the beginning?",
        choice1: "16",
        choice2: "27",
        choice3: "20",
        choice4: "25",
        answer:3,
    },
    {
        question:"How many members of the Fellowship die during the trilogy?",
        choice1: "1",
        choice2: "2",
        choice3: "3",
        choice4: "0",
        answer:2,
    },
    {
        question:"What political office did Pippin have after the War of the Ring?",
        choice1: "King",
        choice2: "President",
        choice3: "Thain",
        choice4: "Mayor",
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