import produce, { applyPatches } from "immer";
import {
  ADD_ANIMAL,
  CHANGE_ANIMAL,
  DELETE_ANIMAL,
  DAMAGE,
  HEAL,
  FURY,
  DEFENCE,
  RESET,
} from "../constants/const-animals";

//STANDARD
let defaultState = []


//TEST
/*let defaultState = [
  {id: 'animal-3',hp:15,fp:5,curr_hp:10,def:3, curr_def: 6},
  {id: 'animal-6',hp:30,fp:0,curr_hp:30,def:6,curr_def:4},
];*/

const animals = (state = defaultState, action) =>
  produce(state, draft =>{
  let index;
  switch(action.type) {
    case ADD_ANIMAL:
    index = state.findIndex(x => x.id == action.animal.animalId)
    if(index == -1){
      draft.push({
        id: action.animal.animalId,
        hp: parseInt(action.animal.animalHp),
        fp: 0,
        curr_hp: parseInt(action.animal.animalHp),
        def: parseInt(action.animal.animalDef),
        curr_def: parseInt(action.animal.animalDef),
      })
    }
    else{
      draft[index].hp = parseInt(action.animal.animalHp);
      draft[index].fp = 0
      draft[index].def = parseInt(action.animal.animalDef);
      draft[index].curr_hp = parseInt(action.animal.animalHp);
      draft[index].curr_def = parseInt(action.animal.animalDef);
    }
      return
    case CHANGE_ANIMAL:
      draft.forEach((animal,i) => {
        if(animal.id == action.animal.id){
        draft[i].hp = parseInt(action.animal.animalHp);
        draft[i].def = parseInt(action.animal.animalDef);
        draft[i].curr_hp = parseInt(action.animal.animalHp);
        draft[i].curr_def = parseInt(action.animal.animalDef);
        }
      });
      return
    case DELETE_ANIMAL:
      index = state.findIndex(x => x.id == action.id)
      if(index != -1){
        draft.splice(index,1)
      }
      return
    case DAMAGE:
      draft.forEach((animal,i) => {
        if(animal.id == action.id){
          const next_hp = animal.curr_hp - action.damage;
          (next_hp > 0 ? draft[i].curr_hp = next_hp :  draft[i].curr_hp = 0)
        }
      });
      return
    case HEAL:
      draft.forEach((animal,i) => {
        if(animal.id == action.id){
          if(action.total_heal){
            draft[i].curr_hp = animal.hp
          }
          else{
            if(action.hp_heal){
              const next_hp = animal.curr_hp + parseInt(action.hp_heal);
              (next_hp < animal.hp ? draft[i].curr_hp = next_hp :  draft[i].curr_hp = animal.hp)
            }
          }
        }
      });
      return
    case FURY:
      draft.forEach((animal,i) => {
        if(animal.id == action.id){
          const fp = animal.fp + action.value
          if(fp > 5) draft[i].fp = 5
          else if(fp < 0) draft[i].fp = 0
          else draft[i].fp = fp
        }
      });
      return
    case DEFENCE:
      draft.forEach((animal,i) => {
        if(animal.id == action.id){
          const def = animal.def + parseInt(action.value)
          if(def < 0) draft[i].curr_def = 0
          else draft[i].curr_def = def
        }
      });
      return
    case RESET:
      return defaultState
  }
});

export default animals
