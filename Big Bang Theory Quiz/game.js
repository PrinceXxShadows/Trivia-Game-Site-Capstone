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
        question: 'How does Sheldon choose his seat at the movie theatre?',
        choice1: 'He figures out the exact center of the room',
        choice2: "He inspects the floor for the spot that's the least sticky",
        choice3: "He looks for the 'acoustic sweet spot'",
        choice4: 'He measures an equal distance from the screen and the concession stand',
        answer: 3,
    },
    {
        question:"According to Leonard, what is Sheldon's 'kryptonite?'",
        choice1: "His Mother",
        choice2: "Single-ply toilet paper",
        choice3: "Crying babies",
        choice4: " Astronomers",
        answer: 1,
    },
    {
        question: "What song does Sheldon like to hear when he's sick?",
        choice1: "Sleepy Baby",
        choice2: "Soft Kitty",
        choice3: "Twinkle, Twinkle, Little Star",
        choice4: "Sleepy Baby",
        answer: 2,
    },
    {
        question: "What did Penny get Sheldon for Christmas?",
        choice1: "A hamburger half-eaten by William Shatner",
        choice2: "A caricature drawn by Stan Lee",
        choice3: "A toupee worn by George Lucas",
        choice4: "A napkin signed by Leonard Nimoy",
        answer: 4,
    }, 
    {
        question:"When Penny decided to throw a surprise birthday party for Leonard, who had to keep Leonard occupied before the party? ",
       choice1:"Sheldon",
       choice2:"Leslie",
       choice3:"Howard",
       choice4:"Raj",
        answer: 3,
    },
    {
        question:"What magazine was Raj honoured by",
       choice1:"Sports Illustrated",
       choice2:"People",
       choice3:"Cosmopolitan",
       choice4:"O",
        answer: 2,
    },
    {
        question:"What was involved in the elevator incident and who was primarily at fault?",
       choice1:"A stick of dynamite was lit by Raj",
       choice2:"Uranium was disposed of incorrectly by Sheldon",
       choice3:"A fire was accidentally set by Howard",
       choice4:"Rocket fuel was misused by Leonard",
        answer: 4,
    },
    {
        question:"Raj and Howard spent a lot of money on a 3D printer. Why did they make this purchase?",
       choice1:"To make action figures of themselves",
       choice2:"To print a girlfriend for Raj",
       choice3:"To make fake comic memorabilia to sell to kids",
       choice4:"To decorate their offices",
        answer: 1,
    },
    {
        question:"For which famous celebrity does Howard think up the pick up line \"It's hot in here, it must be summer\"?",
        choice1:"Summer Pheonix",
        choice2:"Summer Sanders",
        choice3:"Summer Glau",
        choice4:"Summer Altice",
        answer: 3,
    },
    {
        question:"Howard's astronaut nickname comes from which cereal?",
        choice1:"Cheerios",
        choice2:"Wheetos",
        choice3:"Froot Loops",
        choice4:"Sugar Python",
        answer: 3,
    },
    {
        question:"Why does Sheldon have to return his \"Star Wars\" sheets to Pottery Barn?",
        choice1:"He gets nightmares that Darth Vader is his father",
        choice2:"He doesn't like Darth Vader staring at him",
        choice3:"He accidentally got queen size bed sheets",
        choice4:"Because they are too small",
        answer: 2,
    },
    {
        question:" What is the name of Penny's online character in the game \"Age of Conan\"?",
        choice1:"Slayer Penny, Guardian",
        choice2:"Queen Penelope, Guardian",
        choice3:"Princess Penelope, Guardian",
        choice4:"Princess Penny, Guardian",
        answer: 2,
    },
    {
        question:"What is Amy Farrah Fowler's profession?",
        choice1:"Theoretical Physicist",
        choice2:"Experimental Physicist",
        choice3:"Microbiologist",
        choice4:"Neurobiologist",
        answer: 4,
    },
    {
        question:"What is Howard's middle name?",
        choice1:"William",
        choice2:"Leakey",
        choice3:"Lee",
        choice4:"Joel",
        answer: 4,
    },
    {
        question:"Which \"Sesame Street\" character does Penny have a tattoo of?",
        choice1:"Cookie Monster ",
        choice2:"Elmo",
        choice3:"Big Bird",
        choice4:"Oscar",
        answer: 1,
    },
    {
        question:" Leonard tells Raj in the living room of the apartment that \"The Terminator\" is actually a rip off of what Outer Limits script?",
        choice1:"The Soldier",
        choice2:"Commando",
        choice3:"A Force of One",
        choice4:"The Terminators ",
        answer: 1,
    },
    {
        question:"What famous musician does BOTH Howard and Amy like? ",
        choice1:"Wayne Newton",
        choice2:"Neil Diamond ",
        choice3:"Neil Young",
        choice4:"David Lee Roth",
        answer: 2,
    },
    {
        question:"When is Amy's birthday?",
        choice1:"April 26th ",
        choice2:"May 14th",
        choice3:"December 17th",
        choice4:"July 1st",
        answer: 3,
    },
    {
        question:"Penny's wedding vows were song lyrics from what movie?",
       choice1:"Batman",
       choice2:"Toy Story",
       choice3:"Moulin Rouge!",
       choice4:"The Lord of The Rings:The Fellowship",
        answer: 2,
    },
    {
        question:"What Band sings the theme song for The Big Bang Theory ",
       choice1:"The Barenaked Ladies ",
       choice2:"The Tragically Hip",
       choice3:"The Rolling Stones",
       choice4:"The Beatles",
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