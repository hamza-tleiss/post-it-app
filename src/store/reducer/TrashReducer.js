import {
  ADD_POST_TO_TRASH,
  DELETE_PERMANENTLY,
  GET_TRASH,
} from "../constants/TrashAction";

const initstate = [];
const trashreducer = (state = initstate, action) => {
  switch (action.type) {
    case GET_TRASH:
      return action.value;
    case ADD_POST_TO_TRASH:
      const clone = [...state];
      clone.push(action.value);
      return clone;
    case DELETE_PERMANENTLY:
      const copy = [...state];
      const arr = copy.filter((post) => post.id !== action.value);
      return arr;
    default:
      return state;
  }
};
export default trashreducer;
