import { get, post, deleteMethod } from './CommonAction';
import * as ActionTypes from './ActionTypes';
const server = '.';


export function fetchAllSnippet() {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.CODE_SNIPPET_REQUEST_FETCH_LIST,
    });
    return get("codeSnippet/listAll/")
      .then(response => response.json())
      .then((data) => dispatch({
        type: ActionTypes.CODE_SNIPPET_RECEIVE_FETCH_LIST, data
      }));
    ;
  }
}

export function deleteSnippet(id) {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.CODE_SNIPPET_REQUEST_DELETE,
    });
    return deleteMethod(`codeSnippet/${id}/`)
      .then(response => response.json());
    ;
  }
}

export function createSnippet(rec) {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.CODE_SNIPPET_REQUEST_CREATE,
    });
    return post(`codeSnippet/`, rec)
      .then(response => response.json());
    ;
  }
}

