import { FAV_POST, GET_FAV, REV_POST } from "../constants/FavoriteAction";

const initstate = [];

const favoritepostreducer = (state = initstate, action) => {
  switch (action.type) {
    case GET_FAV:
      return action.value;
    case FAV_POST:
      const clone = [...state];
      clone.push(action.value);
      return clone;
    case REV_POST:
      const copy = [...state];
      const arr = copy.filter((post) => post.id !== action.value);
      return arr;
    default:
      return state;
  }
};

export default favoritepostreducer;
