import { CREATE_BOX, DELETE_BOX, ADD_TEXT, ADD_SUBBOX,DELETE_ALL } from "../actions";

export const boxReducer = (state = [], action) => {
  switch (action.type) {
    case CREATE_BOX:
      return state.concat(action.payload);
    case DELETE_BOX:
      // delete the box at index === action.payload , _ == placeholder to be able to use the argument that comes after element
      return state.filter((_, index) => index !== action.payload);
    case ADD_TEXT:
      state[action.payload.index].text = action.payload.text;
      return state;
    case ADD_SUBBOX:
      state[action.payload.index].subBox = concatArray(state[action.payload.index].subBox,action.payload);
      return state;
    case DELETE_ALL:
      return state = [];
    default:
      return state;
  }
};

//SubFunction, that add subBox inside a newly created subBox
const concatArray = (array,args)=>{
  return array.concat(args)
}