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
        question: "Rachel got a job with which company in Paris?",
        choice1: "Chanel",
        choice2: "Milani",
        choice3: "Louis Vuitton",
        choice4: "Maybelline",
        answer: 3,
    },
    {
        question: "Which Stephen King book did Joey hide in his freezer?",
        choice1: "The Shining",
        choice2: "It",
        choice3: "Carrie",
        choice4: "Pet Sematary",
        answer: 1,
    },
    {
        question: "What is the name of Joey’s Cabbage-Patch kid?",
        choice1: "Ken Adams",
        choice2: "Alicia May Emory",
        choice3: "Maurice",
        choice4: "Hugsy",
        answer: 2,
    },
    {
        question: "Where does Ross spend the night with Emily after they first meet?",
        choice1: "A hotel in Poughkeepsie",
        choice2: "The bungalow in Tulsa",
        choice3: "A park in Atlantic City",
        choice4: "A bed and breakfast in Vermont",
        answer: 4,
    }, 
    {
        question: "What pet did Ross own?",
       choice1: "A dog named Keith",
       choice2: "A rabbit called Lancelot",
       choice3: "A monkey named Marcel",
       choice4: "A lizard named Alistair",
        answer: 3,
    },
    {
        question: "What is Monica skilled at?",
       choice1: "Sewing",
       choice2: "Cooking",
       choice3: "American Football",
       choice4: "Bricklaying",
        answer: 2,
    },
    {
        question: "What’s the name of the 1950s-themed diner where Monica worked as a waitress?",
       choice1: "Marilyn & Audrey",
       choice2: "Twilight Galaxy",
       choice3: "Marvin’s",
       choice4: "Moondance Diner",
        answer: 4,
    },
    {
        question: "What song is Phoebe best known for?",
       choice1: "Smelly Cat",
       choice2: "Smelly Possum",
       choice3: "Smelly Dog",
       choice4: "Smelly Worm",
        answer: 1,
    },
    {
        question: "What job does Ross have?",
        choice1: "Insurance salesman",
        choice2: "Artist",
        choice3: "Paleontologist",
        choice4: "Photograoher",
        answer: 3,
    },
    {
        question: "Who sang the Friends theme?",
        choice1: "The constables",
        choice2: "The banksys",
        choice3: "The Rembrandts",
        choice4: "The Da Vinci Band",
        answer: 3,
    },
    {
        question: "What are Ross and Monica’s parents called?",
        choice1: "Jack and Jill",
        choice2: "Jack and Judy",
        choice3: "Phillip and Holly",
        choice4: "Margaret and Peter",
        answer: 2,
    },
    {
        question: "What is the name of Phoebe’s alter-ego?",
        choice1: "Phoebe Neeby",
        choice2: "Regina Phalange",
        choice3: "Elaine Benes",
        choice4: "Monica Bing",
        answer: 2,
    },
    {
        question: "To get over Richard, what did Monica start making?",
        choice1: "Milkshakes",
        choice2: "Wedding Cakes",
        choice3: "Lemonade",
        choice4: "Jam",
        answer: 4,
    },
    {
        question: "What random object of Julie's sent Ross into a shame spiral after kissing Rachel for the first time?",
        choice1: "Birth Control Pills",
        choice2: "Cat toys",
        choice3: "Condoms",
        choice4: "Saline Solution",
        answer: 4,
    },
    {
        question: "Which of the following is not the name of one of Joey's seven sisters?",
        choice1: "Sophia",
        choice2: "Cookie",
        choice3: "Veronica",
        choice4: "Tina",
        answer: 1,
    },
    {
        question: "Which one of Joey’s sisters did Chandler hook up with?",
        choice1: "Mary Angela",
        choice2: "Cookie",
        choice3: "Tina",
        choice4: "Veronica",
        answer: 1,
    },
    {
        question: "What instrument does Phoebe play?",
        choice1: "Piano",
        choice2: "Guitar",
        choice3: "Violin",
        choice4: "Trumpet",
        answer: 2,
    },
    {
        question: "What does Chandler’s dad do for a living?",
        choice1: "Movie Director in Hollywood",
        choice2: "Bartender",
        choice3: "Drag Queen in Vegas",
        choice4: "Lawyer",
        answer: 3,
    },
    {
        question: "What is Monica’s biggest pet peeve?",
       choice1: "People chewing with their mouths open",
       choice2: "Animals dressed as humans",
       choice3: "People coughing in public",
       choice4: "PDA",
        answer: 2,
    },
    {
        question: "Who was Monica’s first kiss?",
       choice1: "Ross",
       choice2: "Chandler",
       choice3: "Joey",
       choice4: "Mike",
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