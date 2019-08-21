import {
  ADD_HERO,
} from "../constants/const-heroes";

//STANDARD
//let defaultState = []

//TEST
let defaultState = [
  {id: 'hero-1',hp:15,mp:7,curr_hp:15,curr_mp:7,def:3},
  {id: 'hero-6',hp:30,mp:5,curr_hp:30,curr_mp:5,def:6},
  {id: 'hero-9',hp:13,mp:15,curr_hp:13,curr_mp:15,def:2},
];

const hero = (state, action) => {
  switch(action.type) {
    case ADD_HERO:
      return {
        id: action.hero.heroId,
        hp: action.hero.heroHp,
        mp: action.hero.heroMp,
        curr_hp: action.hero.heroHp,
        curr_mp: action.hero.heroMp,
        def: action.hero.heroDef,
      }
    default: return state;
  }
}

const heroes = (state = defaultState, action) => {
  switch(action.type) {
    case ADD_HERO:
      return [
        ...state,
        hero(undefined,action)
      ]
    default: return state;
  }
}

export default heroes
