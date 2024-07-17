import axios from "axios";
import api from "../api";

import { toast } from "react-toastify";
import { string } from "yup";

const PostUrl = "post/create";
const GetPostUrl = "post/getAll";
const CommentUrl = "comment";
const LikeUrl = "like/toggleLike";
const GetCommentUrl = "comment/getAll";
const DeleteOwnCommentUrl = "comment/delete";

interface post {
  title: String;
  description: String;
}

interface comment {
  content: string;
  user: object | string;
  post: object | string;
  id?: string;
}

export const createPost = async (request: post) => {
  try {
    console.log("createPost : ", request);
    console.log("Request", request);
    const response = await api.post(PostUrl, request);
    console.log("Response", response);
    return response;
  } catch (error: any) {
    console.log("Error", error);
    return error.response;
  }
};

export const getAllPostAsync = async () => {
  const response = await api.get(GetPostUrl);
  console.log("Response gettting", response);
  return response.data as any[];
};

export const createCommentAsync = async (request: comment) => {
  try {
    console.log("Comment Posted", request);
    const response = await api.post(CommentUrl, request);
    console.log("Response", response);
    return response;
  } catch (error) {
    console.log("Error", error);
    return error;
  }
};

export const likeAsync = async (postId: string) => {
  try {
    const response = await api.post(LikeUrl, { postId });
    console.log("Response", response);
    return response;
  } catch (error) {
    console.log("Error", error);
    return error;
  }
};

export const getCommentsByPostIdAsync = async (id: any) => {
  try {
    const data = await api.get(`${GetCommentUrl}/${id}`);
    console.log("Data", data);
    return data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};

export const deleteOwnCommentAsync = async ({ id, commentId }: any) => {
  console.log("Id======>", id, commentId);
  try {
    const data = await api.delete(`${DeleteOwnCommentUrl}/${id}/${commentId}`);
    console.log("data", data);
    return data;
  } catch (error) {
    console.log("Error", error);
    return error;
  }
};
