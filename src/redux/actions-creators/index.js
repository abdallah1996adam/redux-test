import {
  ADD_TEXT,
  DELETE_BOX,
  CREATE_BOX,
  ADD_SUBBOX,
  DELETE_ALL,
} from "../actions";

/**function that return a  callback and dispatch as an arguemnt 
and the type is create box 
args: it's an object which can be replaced by payload when the function createBox get called
*/

export const createBox = (args) => {
  return (dispatch) => {
    dispatch({
      type: CREATE_BOX,
      payload: args,
    });
  };
};

/**function that return a callback with dispatch as an argument and the type is delete box with it's id*/

export const deleteBox = (id) => {
  return (dispatch) => {
    dispatch({
      type: DELETE_BOX,
      payload: id,
    });
  };
};

/**function that return a callback with dispatch as an argument and args can be replaced by the text later when the function get called */
export const addText = (args) => {
  return (dispatch) => {
    dispatch({
      type: ADD_TEXT,
      payload: args,
    });
  };
};

//function that Add subBox(box inside a box)
export const addSubBox = (args) => {
  return (dispatch) => {
    dispatch({
      type: ADD_SUBBOX,
      payload: args,
    });
  };
};

//delete all boxes 
export const deleteAll = () => {
  return (dispatch) => {
    dispatch({
      type: DELETE_ALL,
    });
  };
};
