import { directus } from "../server/directus";
import { REV_POST } from "../store/constants/FavoriteAction";
import { ADD_POST, DELETE_POST } from "../store/constants/PostAction";
import {
  ADD_POST_TO_TRASH,
  DELETE_PERMANENTLY,
} from "../store/constants/TrashAction";

export const deletepost = (postData) => async (dispatch) => {
  try {
    const updatedPost = await directus.updateTask(postData);
    dispatch({ type: DELETE_POST, value: updatedPost.id });
    dispatch({ type: ADD_POST_TO_TRASH, value: updatedPost });
    dispatch({ type: REV_POST, value: updatedPost.id });
  } catch (error) {
    console.log(error);
  }
};
export const restorepost = (postData) => async (dispatch) => {
  try {
    const updatedPost = await directus.updateTask(postData);
    dispatch({ type: ADD_POST, value: updatedPost });
    dispatch({ type: DELETE_PERMANENTLY, value: updatedPost.id });
  } catch (error) {
    console.log(error);
  }
};
export const deletepermenantlypost = (id) => async (dispatch) => {
  try {
    const updatedPost = await directus.deleteTask(id);
    console.log(updatedPost);
    dispatch({ type: DELETE_PERMANENTLY, value: id });
  } catch (error) {
    console.log(error);
  }
};
