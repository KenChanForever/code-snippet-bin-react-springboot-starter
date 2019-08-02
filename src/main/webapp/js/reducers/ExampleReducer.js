import * as ActionTypes from '../actions/ActionTypes';
import Immutable from 'immutable';
import { combineReducers } from 'redux-immutable';

function exampleList(state = Immutable.List(), action) {
  switch (action.type) {
    case ActionTypes.EXAMPLE_LIST:
      return Immutable.fromJS(action.data);
    default:
      return state;
  }
}


export default combineReducers({
  exampleList,
});
