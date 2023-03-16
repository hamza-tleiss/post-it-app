import { directus } from "../server/directus";
import { GET_FAV } from "../store/constants/FavoriteAction";
import {
  ADD_POST,
  GET_POSTS,
  UPDATE_POST,
} from "../store/constants/PostAction";
import { GET_TRASH } from "../store/constants/TrashAction";

export const getposts = (id) => async (dispatch) => {
  try {
    const data = await directus.getTasks(id);
    const Allposts = data.filter((post) => post.trash === false);
    dispatch({ type: GET_POSTS, value: Allposts });
    const favoritePosts = data.filter((post) => post.favorite === true);
    dispatch({ type: GET_FAV, value: favoritePosts });
    const trashPosts = data.filter((post) => post.trash === true);
    dispatch({ type: GET_TRASH, value: trashPosts });
  } catch (error) {
    console.log(error);
  }
};
export const createpost = (postData) => async (dispatch) => {
  try {
    const newPost = await directus.createTask(postData);
    dispatch({ type: ADD_POST, value: newPost });
  } catch (error) {
    console.log(error);
  }
};
export const updatedpost = (postData) => async (dispatch) => {
  try {
    const updatedPost = await directus.updateTask(postData);
    dispatch({ type: UPDATE_POST, value: updatedPost });
  } catch (error) {
    console.log(error);
  }
};
export const updatedPostsubtask = (post) => async (dispatch) => {
  try {
    const updatedPostTasks = await directus.updateTask(post);
    dispatch({ type: UPDATE_POST, value: updatedPostTasks });
  } catch (error) {
    console.log(error);
  }
};
