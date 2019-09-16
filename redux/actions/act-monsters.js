import {
  ADD_MONSTER,
  CHANGE_MONSTER,
  DELETE_MONSTER,
  DAMAGE,
  HEAL,
  DEFENCE,
  ALTERED,
  RESET,
} from "../constants/const-monsters";

export const addMonster = monster => ({type: ADD_MONSTER, monster});
export const changeMonster = monster => ({type: CHANGE_MONSTER, monster});
export const deleteMonster = key => ({type: DELETE_MONSTER, key});
export const monsterDamage = (key,damage) => ({type: DAMAGE, key, damage})
export const monsterHeal = (monster_heal) => ({type: HEAL, ...monster_heal})
export const monsterDefence = (key,value) => ({type: DEFENCE, key, value})
export const monsterAltered = (monster_altered) => ({type: ALTERED, ...monster_altered})
export const resetMonsters = () => ({type: RESET})
