import {
  ADD_ANIMAL,
  DELETE_ANIMAL,
  DAMAGE,
  HEAL,
  FURY,
  DEFENCE,
  RESET,
} from "../constants/const-animals";

export const addAnimal = animal => ({type: ADD_ANIMAL, animal});
export const deleteAnimal = id => ({type: DELETE_ANIMAL, id});
export const animalDamage = (id,damage) => ({type: DAMAGE, id, damage})
export const animalHeal = (animal_heal) => ({type: HEAL, ...animal_heal})
export const animalFury = (id,value) => ({type: FURY, id, value})
export const animalDefence = (id,value) => ({type: DEFENCE, id, value})
export const resetAnimals = () => ({type: RESET})
