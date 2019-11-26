import produce, { applyPatches } from "immer";
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

//STANDARD
let defaultState = []


//TEST
/*let defaultState = [
  {id: 'hero-3',hp:15,mp:7,fp:5,curr_hp:10,curr_mp:4,def:3, curr_def: 6,poisoning: true,burning:true,bleeding:false},
  {id: 'hero-6',hp:30,mp:5,fp:0,curr_hp:30,curr_mp:5,def:6,curr_def:4,poisoning: true,burning:false,bleeding:true},
  {id: 'hero-9',hp:13,mp:15,fp:0,curr_hp:13,curr_mp:15,def:2,curr_def:2,poisoning: false,burning:true,bleeding:false},
];*/

const heroes = (state = defaultState, action) =>
  produce(state, draft =>{
  console.log(action.type)
  switch(action.type) {
    case ADD_HERO:
      draft.push({
        id: action.hero.heroId,
        hp: parseInt(action.hero.heroHp),
        mp: parseInt(action.hero.heroMp),
        curr_fp: 0,
        fp: parseInt(action.hero.heroFp),
        curr_hp: parseInt(action.hero.heroHp),
        curr_mp: parseInt(action.hero.heroMp),
        def: parseInt(action.hero.heroDef),
        curr_def: parseInt(action.hero.heroDef),
        poisoning: false,
        burning: false,
        bleeding: false,
      })
      return
    case CHANGE_HERO:
      draft.forEach((hero,i) => {
        if(hero.id == action.hero.id){
        draft[i].hp = parseInt(action.hero.heroHp);
        draft[i].mp = parseInt(action.hero.heroMp);
        draft[i].def = parseInt(action.hero.heroDef);
        draft[i].curr_hp = parseInt(action.hero.heroHp);
        draft[i].curr_mp = parseInt(action.hero.heroMp);
        draft[i].curr_def = parseInt(action.hero.heroDef);
        draft[i].poisoning= false;
        draft[i].burning= false;
        draft[i].bleeding= false;
        }
      });
      return
    case DELETE_HERO:
      let index = state.findIndex(x => x.id == action.id)
      if(index != -1){
        draft.splice(index,1)
      }
      return
    case DAMAGE:
      draft.forEach((hero,i) => {
        if(hero.id == action.id){
          const next_hp = hero.curr_hp - action.damage;
          if(next_hp > 0) draft[i].curr_hp = next_hp;
          else {
            draft[i].curr_hp = 0;
            draft[i].curr_mp = 0;
            draft[i].curr_fp = 0;
            draft[i].poisoning= false;
            draft[i].burning= false;
            draft[i].bleeding= false;
          } 
        }
      });
      return
    case MANA:
      draft.forEach((hero,i) => {
        if(hero.id == action.id){
          const next_mp = hero.curr_mp - action.value;
          (next_mp > 0 ? draft[i].curr_mp = next_mp :  draft[i].curr_mp = 0)
        }
      });
      return
    case HEAL:
      draft.forEach((hero,i) => {
        if(hero.id == action.id){
          if(action.total_heal){
            draft[i].curr_hp = hero.hp
            draft[i].curr_mp = hero.mp
          }
          else if(action.half_heal){
            draft[i].curr_hp = Math.ceil((hero.hp) / 2);
            draft[i].curr_mp = Math.ceil((hero.mp) / 2);
          }
          else{
            if(action.hp_heal){
              const next_hp = hero.curr_hp + parseInt(action.hp_heal);
              (next_hp < hero.hp ? draft[i].curr_hp = next_hp :  draft[i].curr_hp = hero.hp)
            }
            if(action.mp_heal){
              const next_mp = hero.curr_mp + parseInt(action.mp_heal);
              (next_mp < hero.mp ? draft[i].curr_mp = next_mp :  draft[i].curr_mp = hero.mp)
            }
          }
        }
      });
      return
    case FURY:
      draft.forEach((hero,i) => {
        if(hero.id == action.id){
          const curr_fp = hero.curr_fp + action.value
          if(curr_fp > hero.fp) draft[i].curr_fp = hero.fp
          else if(curr_fp < 0) draft[i].curr_fp = 0
          else draft[i].curr_fp = curr_fp
        }
      });
      return
    case ALTERED:
      draft.forEach((hero,i) => {
        if(hero.id == action.id){
          if(action.poisoning != null) draft[i].poisoning = action.poisoning
          if(action.burning != null) draft[i].burning = action.burning
          if(action.bleeding != null) draft[i].bleeding = action.bleeding
        }
      });
      return
    case DEFENCE:
      draft.forEach((hero,i) => {
        if(hero.id == action.id){
          const def = hero.def + parseInt(action.value)
          if(def < 0) draft[i].curr_def = 0
          else draft[i].curr_def = def
        }
      });
      return
    case RESET:
      return defaultState
  }
});

export default heroes
