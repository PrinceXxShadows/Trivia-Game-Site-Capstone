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
        question: 'Which villain shares her voice with Lady Tremaine, the evil stepmother from Cinderella?',
        choice1: 'Ursula',
        choice2: 'Maleficent',
        choice3: 'Cruella De Vil',
        choice4: 'Queen of Hearts',
        answer: 2,
    },
    {
        question:
            `The Evil Queen and the Evil Witch in Snow White and the Seven Dwarfs are played by the same actress. How did she achieve this drastic voice change?`,
        choice1: `She removed her false teeth`,
        choice2: `She gargled salt water`,
        choice3: `She used a voice altering device`,
        choice4: `She held her nose`,
        answer: 1,
    },
    {
        question: `Who was the first male villain in a Disney princess movie?`,
        choice1: `Ratcliff`,
        choice2: `Jafar`,
        choice3: `Gaston`,
        choice4: `Clayton`,
        answer: 3,
    },
    {
        question: `What is Scar's real name?`,
        choice1: `Taka`,
        choice2: `Keti`,
        choice3: `Natis`,
        choice4: `Buta`,
        answer: 1,
    },
    {
        question: `Sid Phillips makes a cameo as a garbage truck driver in which Disney film?`,
        choice1: `Atlantis: The Lost Empire`,
        choice2: `Lilo & Stitch`,
        choice3: `Wreck It Ralph`,
        choice4: `Toy Story 3`,
        answer: 4,
    },
    {
        question: `Which villain said, "You're speechless, I see. A fine quality in a wife."?`,
        choice1: `Hades`,
        choice2: `Jafar`,
        choice3: `Governor Ratcliff`,
        choice4: `Claude Frollo`,
        answer: 2,
    },
    {
        question: `Most Disney villains wear some combination of black, red and what other color?`,
        choice1: `Yellow`,
        choice2: `White`,
        choice3: `Purple`,
        choice4: `Blue`,
        answer: 3,
    },
    {
        question: `Assistant Mayor Dawn Bellweather is what kind of animal?`,
        choice1: `cat`,
        choice2: `goat`,
        choice3: `dog`,
        choice4: `sheep`,
        answer: 4,
    },
    {
        question: `Which Disney villain is the first to die on-screen of old age?`,
        choice1: `Amos Slade`,
        choice2: `Claude Frollo`,
        choice3: `Yzma`,
        choice4: `Mother Gothel`,
        answer: 4,
    },
    {
        question: `Frollo was originally supposed to be a Catholic Priest. To not offend any religious sensibilities, Disney made him into a...?`,
        choice1: `king`,
        choice2: `judge`,
        choice3: `governor`,
        choice4: `bishop`,
        answer: 2,
    },
    {
        question: `What quote is the Queen of Hearts most famous for?`,
        choice1: `I killed Mufasa!`,
        choice2: `And there, my faithful huntsman, you will kill her!`,
        choice3: `Off with their heads!`,
        choice4: `You poor, simple fools. Thinking you could defeat me. Me! The mistress of all evil!`,
        answer: 3,
    },
    {
        question: `What appendage of Captain Hook does Peter Pan feed to the crocodile?`,
        choice1: `left hand`,
        choice2: `right hand`,
        choice3: `right foot`,
        choice4: `left foot`,
        answer: 1,
    },
    {
        question: `What are the names of the two thieves Cruella hired to steal the puppies?`,
        choice1: `Bruce and Frank`,
        choice2: `Jasper and Horace`,
        choice3: `Sherman and Ted`,
        choice4: `Billy and Ralph`,
        answer: 2,
    },
    {
        question: `Prince Hans is Prince of ....`,
        choice1: `The Enchanted Forest`,
        choice2: `Northuldra`,
        choice3: `The Valley of the Living Rock`,
        choice4: `The Southern Isles`,
        answer: 4,
    },
    {
        question: `What are the only two things Shere Khan fears?`,
        choice1: `Water and Gorillas`,
        choice2: `Thunder and Lightning`,
        choice3: `Man's Gun and Fire`,
        choice4: `Heights and Darkness`,
        answer: 3,
    },
    {
        question: `Which of these villains is best known for sucking their thumb?`,
        choice1: `Hades`,
        choice2: `Captain Gantu`,
        choice3: `Prince John`,
        choice4: `Professor Ratigan`,
        answer: 3,
    },
    {
        question: `What is the Shadow Man's real name?`,
        choice1: `Mr. Gussler`,
        choice2: `Mr. Loveless`,
        choice3: `Dr. Gabriel`,
        choice4: `Dr. Facilier`,
        answer: 4,
    },
    {
        question: `Gantu is the former captain of the ...`,
        choice1: `Space Rangers`,
        choice2: `Galactic Federation`,
        choice3: `Universal Patrol`,
        choice4: `Milky Way Army`,
        answer: 2,
    },
    {
        question: `Which villain is this quote attributed to? "Pull the lever, Kronk."`,
        choice1: `Yzma`,
        choice2: `Gaston`,
        choice3: `Jafar`,
        choice4: `Captain Hook`,
        answer: 1,
    },
    {
        question: `Which villain's hair changes with their mood?`,
        choice1: `Hades`,
        choice2: `Yzma`,
        choice3: `Scar`,
        choice4: `Ursula`,
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