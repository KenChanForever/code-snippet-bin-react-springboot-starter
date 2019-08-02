import { combineReducers } from 'redux-immutable';
import codeSnippetReducer from './CodeSnippetReducer';

export default combineReducers({
  codeSnippet: codeSnippetReducer,
});
