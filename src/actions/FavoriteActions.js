import { directus } from "../server/directus";
import { FAV_POST, REV_POST } from "../store/constants/FavoriteAction";
import { ADD_POST_TO_TRASH } from "../store/constants/TrashAction";
import {
  DELETE_POST,
  FAVORITE,
  UNFAVORITE,
} from "../store/constants/PostAction";
export const favpost = (postData) => async (dispatch) => {
  console.log(postData);
  try {
    const updatedPost = await directus.updateTask({
      ...postData,
      favorite: true,
    });
    console.log("fav", updatedPost);
    console.log(updatedPost);
    dispatch({ type: FAV_POST, value: updatedPost });
    dispatch({ type: FAVORITE, value: updatedPost.id });
  } catch (error) {
    console.log(error);
  }
};
export const unfavpost = (postData) => async (dispatch) => {
  console.log(postData);
  try {
    const updatedPost = await directus.updateTask({
      ...postData,
      favorite: false,
    });
    console.log("unfav", updatedPost);
    dispatch({ type: REV_POST, value: updatedPost.id });
    dispatch({ type: UNFAVORITE, value: updatedPost.id });
  } catch (error) {
    console.log(error);
  }
};
export const deleteFavPost = (postData) => async (dispatch) => {
  try {
    const updatedPost = await directus.updateTask({
      ...postData,
      favorite: false,
      trash: true,
    });
    dispatch({ type: REV_POST, value: updatedPost.id });
    dispatch({ type: ADD_POST_TO_TRASH, value: updatedPost });
    dispatch({ type: DELETE_POST, value: updatedPost.id });
  } catch (error) {
    console.log(error);
  }
};
