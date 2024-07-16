import { AsyncThunk, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createComment,
  createCommentAsync,
  createPost,
  getAllPost,
  getAllPostAsync,
  likeAsync,
  getAllCommentAsync,
  getCommentsByPostIdAsync
} from "../post/postServices";
import { toast } from "react-toastify";
import { ErrorResponse } from "react-router-dom";

interface getData {
  _id: string;
  posts: string;
  title: string;
  description: string;
  createdBy: string | object;
  postComment: [];
  postLike: [];
}

interface Comment {
  content: string;
  user: object | string;
  post: object | string;
}

export const postADetails: AsyncThunk<any, any, {}> = createAsyncThunk<
  any,
  any
>("post/create/post", async (request, { rejectWithValue }) => {
  try {
    const response = await createPost(request);
    console.log("Response", response);
    if (response?.status === 201 || response?.status === 200) {
      console.log("Response", response);
      return response;
    }
    console.log("Rejected With response", response);
    return rejectWithValue(response);
  } catch (error: any) {
    console.log("Errror", error);
    return rejectWithValue(error?.response?.data?.message);
  }
});

export const getPostAction = createAsyncThunk<any, any>(
  "/getPostAction",
  async (_, { rejectWithValue }) => {
    try {
      const response: any = await getAllPostAsync();
      return response;
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  }
);

export const postCommentAction = createAsyncThunk<any, any>(
  "create/comment",
  async (request, { rejectWithValue, getState }) => {
    try {
      const response: any = await createCommentAsync(request);
      const newPost = response.data?.data;
      let data = await getState()?.Post?.postData;
      console.log("Response Middleware", newPost, data);
      let newData = data?.map((item, index) => {
        if (item._id === newPost.post) {
          let newArray = item.postComment;
          return {
            ...item,
            postComment: [...newArray, newPost?._id],
          };
        }
        return item; // Return the original item if no update is needed
      });

      console.log("Updated Data:", newData);


      return newData;
    } catch (error) {
      console.log("Error", error);
      return error;
    }
  }
);

export const likeAction = createAsyncThunk<any, any>(
  "post/like",
  async (postId: string, { rejectWithValue, getState }) => {
    console.log("PostId", postId);

    try {
      const response: any = await likeAsync(postId);
      console.log("Response", response);
      const data = getState()?.Post?.postData;
      // const newArray = [...data, response.data?.data?.post];
      const post = response?.data?.data?.post;
      console.log("Post step 1", post);
      const newData = data.map((item: any) => {
        if (item._id === post._id) {
          return {
            ...item,
            ...post,
          };
        }
        return item;
      });

      console.log("response in middleware", response, data, newData);
      return newData;
    } catch (error) {
      console.log("Error", error);
      return error;
    }
  }
);

export const getCommentsByPostIdAction=createAsyncThunk<any,any>("/get/comment",async(id,{rejectWithValue})=>{
  try {
    const response=await getCommentsByPostIdAsync(id)
    console.log("Response Getting For All Comment",response)
    return response
  } catch (error) {
    console.log("Error",error)
    return error
  }
})