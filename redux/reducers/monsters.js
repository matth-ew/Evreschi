import produce, { applyPatches } from "immer";
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

//STANDARD
let defaultState = []


//TEST
/*let defaultState = [
  {id: 'monster-3',hp:15,curr_hp:10,def:3,curr_def: 6,poisoning: true,burning:true},
  {id: 'monster-6',hp:30,curr_hp:30,def:6,curr_def:4,poisoning: true,burning:false},
];*/

const monsters = (state = defaultState, action) =>
  produce(state, draft =>{
  let monster
  switch(action.type) {
    case ADD_MONSTER:
      draft.push({
        id: action.monster.monsterId,
        hp: parseInt(action.monster.monsterHp),
        curr_hp: parseInt(action.monster.monsterHp),
        def: parseInt(action.monster.monsterDef),
        curr_def: parseInt(action.monster.monsterDef),
        poisoning: false,
        burning: false,
      })
      return
    case CHANGE_MONSTER:
      draft[action.monster.key].hp = parseInt(action.monster.monsterHp);
      draft[action.monster.key].def = parseInt(action.monster.monsterDef);
      draft[action.monster.key].curr_hp = parseInt(action.monster.monsterHp);
      draft[action.monster.key].curr_def = parseInt(action.monster.monsterDef);
      draft[action.monster.key].poisoning= false;
      draft[action.monster.key].burning= false;
      return
    case DELETE_MONSTER:
      draft.splice(action.key,1)
      return
    case DAMAGE:
      monster = state[action.key]
      const next_hp = monster.curr_hp - action.damage;
      draft[action.key].curr_hp =  (next_hp > 0 ? next_hp : 0)
      return
    case HEAL:
      monster = state[action.key]
      if(action.total_heal){
        draft[action.key].curr_hp = monster.hp
      }
      else{
        if(action.hp_heal){
          const next_hp = monster.curr_hp + parseInt(action.hp_heal);
          draft[action.key].curr_hp = (next_hp < monster.hp ? next_hp : monster.hp)
        }
      }
      return
    case ALTERED:
      draft[action.key].poisoning = action.poisoning
      draft[action.key].burning = action.burning
      return
    case DEFENCE:
      monster = state[action.key]
      const def = monster.def + parseInt(action.value)
      draft[action.key].curr_def = (def < 0 ? 0 : def)

      return
    case RESET:
      return defaultState
  }
});

export default monsters
