import produce from 'immer';
import {
  SET_LEVELS,
  RESET,
} from "../constants/const-settings";


const defaultState =
  {
    hero_levels: [null, null, null, null, null],
    dungeon_level: null,
    monster_multiplier: [1,2,3,4,5,6,7,8,9,10]
  };

  const settings = (state = defaultState, action) =>
    produce(state, draft =>{
      switch(action.type) {
        case SET_LEVELS:
            action.hero_levels.forEach( (hero_level,i) => {
              draft.hero_levels[i] = hero_level
            });
            draft.dungeon_level = action.dungeon_level
            return
          case RESET:
            return defaultState
        }
      });

  export default settings;
