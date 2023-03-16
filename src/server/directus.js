import { Directus } from "@directus/sdk";
const directusClient = new Directus("https://ie3a5ict.directus.app/");
const tasks = directusClient.items("Tasks");
const person = directusClient.items("persons");

export const directus = {
  async createUser(userData) {
    const { username, email, password } = userData;
    try {
      let usid = await person.createOne({
        username: username,
        email: email,
        password: password,
      });
      // return await person.readByQuery({
      //   filter: {
      //     id: {
      //       _eq: usid,
      //     },
      //   },
      // }).id;
      return usid;
    } catch (error) {
      console.log(error);
      throw new Error(error);
      return error;
    }
  },

  async getUser(userData) {
    const { email, password } = userData;
    const data = await person.readByQuery({
      filter: {
        email: {
          _eq: email,
        },
        password: { _eq: password },
      },
    });
    if (data.data.length === 0) return false;
    return data.data[0];
  },

  async getTasks(userid) {
    const data = await tasks.readByQuery({
      filter: {
        Person_id: {
          // id: {
          _eq: userid,
          // },
        },
      },
    });
    return data.data;
  },

  async createTask(post) {
    const {
      title,
      user_id,
      Text,
      date,
      color,
      stylefont,
      fontColor,
      trash,
      favorite,
    } = post;
    console.log(post);
    let task = await tasks.createOne({
      title: title,
      Text: Text,
      date: date,
      color: color,
      stylefont: stylefont,
      fontColor: fontColor,
      Person_id: user_id,
      trash: trash,
      favorite: favorite,
    });
    // return await tasks.readByQuery({
    //   filter: {
    //     id: {
    //       _eq: task,
    //     },
    //   },
    // }).data;
    return task;
  },

  //favorite is of type true or false
  // status is a selection field (active or trashed)
  async updateTask(post) {
    const {
      id,
      title,
      Text,
      date,
      color,
      stylefont,
      fontColor,
      trash,
      favorite,
    } = post;

    console.log(post);
    const updatedPost = await tasks.updateOne(id, {
      title: title,
      Text: Text,
      date: date,
      color: color,
      stylefont: stylefont,
      fontColor: fontColor,
      trash: trash,
      favorite: favorite,
    });
    console.log(updatedPost);
    // const data = await person.readByQuery({
    //   filter: {
    //     id: {
    //       _eq: id,
    //     },
    //   },
    // });
    // console.log(data);
    // return data.data[0];
    return updatedPost;
  },

  async deleteTask(taskid) {
    const data = await tasks.deleteOne(taskid);
    console.log(data);
    return data;
  },
};
