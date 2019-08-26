import {
  SET_LEVELS,
} from "../constants/const-settings";

export const setLevels = settings => ({type: SET_LEVELS, ...settings});
