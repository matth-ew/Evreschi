import { combineReducers } from 'redux';
import heroesReducer from './heroes';
import monstersReducer from './monsters';


export default combineReducers({
  Heroes: heroesReducer,
  Monsters: monstersReducer
});
