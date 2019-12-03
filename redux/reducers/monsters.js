import produce from "immer";
import {
  ADD_MONSTER,
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
      for(i = 0; i < action.number; i++)
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
    case DELETE_MONSTER:
      if(action.options.killThisMonster){
        draft[action.key].curr_hp = 0;
        draft[action.key].poisoning= false;
        draft[action.key].burning= false;
      }
      else if(action.options.killAllMonsters){
        state.forEach((monster,i) => {
          draft[i].curr_hp = 0;
          draft[i].poisoning= false;
          draft[i].burning= false;
        });
      }
      else if(action.options.deleteAllDead){
        return draft.filter((x,i) => x.curr_hp !== 0);
      }
      else if(action.options.deleteThisMonster){
        draft.splice(action.key,1);
      }
      return
    case DAMAGE:
      monster = state[action.key]
      const next_hp = monster.curr_hp - action.damage;
      if(next_hp > 0) draft[action.key].curr_hp = next_hp;
      else {
        draft[action.key].curr_hp = 0;
        draft[action.key].poisoning= false;
        draft[action.key].burning= false;
      } 
      return
    case HEAL:
      monster = state[action.key]
      if(action.total_heal){
        draft[action.key].curr_hp = monster.hp
      }
      else if(action.half_heal){
        draft[action.key].curr_hp = Math.ceil((monster.hp) / 2);
      }
      else{
        if(action.hp_heal){
          const next_hp = monster.curr_hp + parseInt(action.hp_heal);
          draft[action.key].curr_hp = (next_hp < monster.hp ? next_hp : monster.hp)
        }
      }
      return
    case ALTERED:
      if(action.poisoning != null) draft[action.key].poisoning = action.poisoning
      if(action.burning != null) draft[action.key].burning = action.burning
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
