import img1 from '../../../assets/images/testQuestions/1.jpg'
import img2 from '../../../assets/images/testQuestions/2.jpg'
import img3 from '../../../assets/images/testQuestions/3.jpg'
import img4 from '../../../assets/images/testQuestions/4.jpg'
import img5 from '../../../assets/images/testQuestions/5.jpg'
import img6 from '../../../assets/images/testQuestions/6.jpg'
import img7 from '../../../assets/images/testQuestions/7.jpg'
type AnswerType = {
    id: number,
    text: string
}

export type QuestionsType = {
    id: number,
    text: string,
    answers: AnswerType[]
    img: string
}
export const DATA_QUESTIONS: QuestionsType[] = [
    {
        id: 1,
        text: 'How\'s your day shaping up?',
        answers: [
            {
                id: 1, text: 'A. Like a roller coaster that\'s lost its brakes!',
            },
            {id: 2, text: 'B. Meh, just another day in the life saga.'},
            {id: 3, text: 'C. Surprisingly, I\'ve had more coffee than crises today!'},
        ],
        img: img1
    },
    {
        id: 2,
        text: 'If you could pick a superpower right now, what would it be?',
        answers: [
            {
                id: 1, text: 'A. Mind reading – because knowing is half the battle!',
            },
            {id: 2, text: 'B. Time travel – maybe skip to a bit where things are brighter?'},
            {id: 3, text: 'C. Invisibility – sometimes, it\'s nice to take a break from the spotlight'},
        ],
        img: img2
    },
    {
        id: 3,
        answers: [
            {
                id: 1, text: 'A. "Gone with the Wind" – because who knows where I\'m being swept off to!',
            },
            {id: 2, text: 'B. "Into the Wild" – it\'s a jungle out there, and inside here.'},
            {id: 3, text: 'C. "Groundhog Day" – living the same day over and over.'},
        ],
        text: 'Which movie title best describes your current state?',
        img: img3
    },
    {
        answers: [
            {
                id: 1, text: 'A. Anything with chocolate – the solution to, and cause of, all of life\'s problems.',
            },
            {id: 2, text: 'B. Pizza, because it\'s a full meal (and circle) of joy.'},
            {id: 3, text: 'C. Ice cream – because why not?'},
        ],
        id: 4,
        text: 'What\'s your go-to comfort food?',
        img: img4
    },
    {
        answers: [
            {
                id: 1, text: 'A. A quiet beach at sunset, where the only drama is the crashing waves.',
            },
            {id: 2, text: 'B. A cozy cabin in the woods, with nature as my only neighbor.'},
            {id: 3, text: 'C. The top of a mountain, because problems seem smaller from up high'},
        ],
        id: 5,
        text: 'If you could teleport to a place of peace, where would it be?',
        img: img5
    },
    {
        answers: [
            {
                id: 1, text: 'A. Sheldon from "The Big Bang Theory" – brilliant but oh so frustrating.',
            },
            {id: 2, text: 'B. Michael Scott from "The Office" – means well, but oh boy...'},
            {id: 3, text: 'C. Dr. House from "House" – complicated, with a side of genius.'},
        ],
        id: 6,
        text: 'Imagine your stress as an annoying TV character. Who are they?',
        img: img6
    },
    {
        answers: [
            {
                id: 1, text: 'A. A listening ear that doesn\'t judge or interrupt.',
            },
            {id: 2, text: 'B. A good laugh that makes everything feel lighter, even just for a moment.'},
            {id: 3, text: 'C. A clear sign that things will get better'},
        ],
        id: 7,
        text: 'Finally, what\'s one thing you wish for right now (besides a magic wand)?',
        img: img7
    },
]