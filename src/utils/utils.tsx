import * as Localization from "expo-localization";
import {ConditionRateData, peopleProblem, PeopleProblemType} from "./generalData";
import {afflictionType} from "../store/AuthStore/auth-store";
import peopleNoProblem from '../assets/images/people_problem/people-no-problem.png'

const regex = {
    hostname: /^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i,
    email:
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
}
export const validateEmail = (email: string) => {
    return regex.email.test(email.trim())
}
export const isLanguageHE = Localization.locale.includes('he')
export const getTimeElapsedFromNow = (dateString) => {
    const givenDate = new Date(dateString);
    const currentDate = new Date();
    // @ts-ignore
    const timeDifference = currentDate - givenDate;

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
        return `wrote ${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
        return `wrote ${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (minutes > 0) {
        return `wrote ${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else {
        return 'wrote just now';
    }
}

export const checkLanguage = Localization.locale.includes('he')
export const getCurrentConditionRateData = (id: number) => {
    return ConditionRateData.find((el) => el.id === id)
}
export const getCurrentPeopleProblem = (affliction: afflictionType[]): PeopleProblemType[] => {
    if (affliction.join() === '') {
        return [{
            description: 'doesn’t feel pain anywhere.',
            id: 2,
            title: '' as any,
            img: peopleNoProblem
        }]
    }
    const findProblem = peopleProblem.filter((problem, index) => affliction.includes(problem.title))
    return findProblem
}
export const getAllDescriptions = (affliction: afflictionType[], returnArray = false): string | string[] => {
    if (affliction.join() === '') {
        return ''
    }
    const peopleProblems = getCurrentPeopleProblem(affliction);
    const descriptionsArray = peopleProblems.map((problem) => problem.description);

    return returnArray ? descriptionsArray : descriptionsArray.join(', ');
};
export const monosyllable = (text: string) => {
    if (!text) return ''
    const wordsArray = text.split(/(?=[А-ЯЁІЇЄҐA-Z])/);

    return wordsArray.join(" ").toLowerCase();
}
