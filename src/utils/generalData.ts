import {ItemData} from "../screen/patientScreens/EmotionalStateS";
import smileGood from "../assets/images/coleredSmile/smileGood.png";
import smileOk from "../assets/images/coleredSmile/smileOk.png";
import smileAverage from "../assets/images/coleredSmile/smileAverege.png";
import smileBad from "../assets/images/coleredSmile/smileBad.png";
import smileVeryBad from "../assets/images/coleredSmile/smileVeryBad.png";

import peopleLeftHand from "../assets/images/people_problem/peolple-problem-leftHand.png"
import peopleRightHand from "../assets/images/people_problem/people-problem-rightHand.png"
import peopleHead from "../assets/images/people_problem/people-problem-head.png"
import peopleHeart from "../assets/images/people_problem/people-problem-heart.png"
import peopleStomach from "../assets/images/people_problem/people-problem-stomach.png"
import {afflictionType} from "../store/AuthStore/auth-store";

export const ConditionRateData: ItemData[] = [
    {
        id: 0,
        img: smileGood,
        title: 'I’m good',
    },
    {
        id: 1,
        img: smileOk,
        title: 'I’m ok',
    },
    {
        id: 2,
        img: smileOk,
        title: 'I’m ok',
    },
    {
        id: 3,
        img: smileOk,
        title: 'I’m ok',
    },
    {
        id: 4,
        img: smileAverage,
        title: 'Average',
    },
    {
        id: 5,
        img: smileAverage,
        title: 'Average',
    },
    {
        id: 6,
        img: smileAverage,
        title: 'Average',
    },
    {
        id: 7,
        img: smileBad,
        title: 'I feel bad',
    },
    {
        id: 8,
        img: smileBad,
        title: 'I feel bad',
    },
    {
        id: 9,
        img: smileBad,
        title: 'I feel bad',
    },
    {
        id: 10,
        img: smileVeryBad,
        title: 'I feel very bad',
    },
];
export type PeopleProblemType = Omit<ItemData, 'title'> & {
    title: afflictionType
}
export const peopleProblem: PeopleProblemType[] = [
    {
        id: 5,
        img: peopleStomach,
        title: 'stomach',
        description: 'stomach'
    },
    {
        id: 4,
        img: peopleHeart,
        title: 'heart',
        description: 'heart'
    },
    {
        id: 3,
        img: peopleHead,
        title: 'head',
        description: 'head'
    },
    {
        id: 2,
        img: peopleRightHand,
        title: 'rightHand',
        description: 'right hand'
    },
    {
        id: 1,
        img: peopleLeftHand,
        title: 'leftHand',
        description: 'left hand'
    }
];
