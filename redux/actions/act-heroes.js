import {
  ADD_HERO,
  CHANGE_HERO,
  DELETE_HERO,
  DAMAGE,
  MANA,
  HEAL,
  FURY,
  DEFENCE,
  ALTERED,
  RESET,
} from "../constants/const-heroes";

export const addHero = hero => ({type: ADD_HERO, hero});
export const changeHero = hero => ({type: CHANGE_HERO, hero});
export const deleteHero = (id,options) => ({type: DELETE_HERO, id,options});
export const heroDamage = (id,damage) => ({type: DAMAGE, id, damage})
export const heroMana = (id,value) => ({type: MANA, id, value})
export const heroHeal = (hero_heal) => ({type: HEAL, ...hero_heal})
export const heroFury = (id,value) => ({type: FURY, id, value})
export const heroDefence = (id,value) => ({type: DEFENCE, id, value})
export const heroAltered = (hero_altered) => ({type: ALTERED, ...hero_altered})
export const resetHeroes = () => ({type: RESET})
