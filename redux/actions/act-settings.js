import {
  SET_LEVELS,
  RESET,
} from "../constants/const-settings";

export const setLevels = settings => ({type: SET_LEVELS, ...settings});
export const resetSettings = () => ({type: RESET});
