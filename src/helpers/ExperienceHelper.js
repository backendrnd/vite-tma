import { EXPERIENCE_TABLE, MAX_LEVEL } from '../constants/experience-table.js';

export const getLevelByExperience = (experience) => {
    for (let level = 0; level < EXPERIENCE_TABLE.length; level++) {
        if (EXPERIENCE_TABLE[level] > experience) {
            return level;
        }
    }
    return MAX_LEVEL;
};
