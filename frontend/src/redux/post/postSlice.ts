import {
  postADetails,
  getPostAction,
  postCommentAction,
  likeAction,
  getCommentAction,
  getCommentsByPostIdAction,
} from "../post/postMiddleware";

import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { PostState } from "./type";

const initialState: PostState = {
  isLoading: false,
  isError: false,
  postData: null,
  selectedPostComments : null
};

const postSlice = createSlice({
  name: "Post",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postADetails.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isError = false;
        state.postData = payload?.data;
      })
      .addCase(postADetails.pending, (state, { payload }) => {
        state.isLoading = true;
        state.isError = false;
        console.log("Payload", payload);
      })
      .addCase(postADetails.rejected, (state, { payload }) => {
        (state.isLoading = false), (state.isError = true);
      })

      // Get a Post
      .addCase(getPostAction.fulfilled, (state, { payload }) => {
        (state.isLoading = false),
          (state.isError = false),
          (state.postData = payload?.data);
      })
      .addCase(getPostAction.pending, (state, { payload }) => {
        state.isLoading = true;
        state.isError = false;
        // console.log("Payload", payload);
      })
      .addCase(getPostAction.rejected, (state, { payload }) => {
        (state.isLoading = false), (state.isError = true);
      })

      //Comment Post
      .addCase(postCommentAction.fulfilled, (state, { payload }) => {
        console.log("Payload Get Successfully", payload);
        state.isLoading = false;
        state.isError = false;
        state.postData = payload;
        console.log("Payload in slice", payload);
      })
      .addCase(postCommentAction.pending, (state, { payload }) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(postCommentAction.rejected, (state, { payload }) => {
        (state.isLoading = false), (state.isError = true);
      });

    // put a like
    builder.addCase(
      likeAction.fulfilled,
      (state: any, { payload }: PayloadAction<any>) => {
        console.log("new dataaaa", payload);

        return {
          ...state,
          loading: false,
          postData: payload,
        };
      }
    );
    builder
      .addCase(likeAction.pending, (state, { payload }) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(likeAction.rejected, (state, { payload }) => {
        (state.isLoading = false), (state.isError = true);
      })

      //get all comment
      .addCase(getCommentsByPostIdAction.fulfilled, (state, { payload }) => {
        state.isError = false;
        state.isLoading = false;
        state.selectedPostComments = payload.data.data;
      })
      .addCase(getCommentsByPostIdAction.pending, (state, { payload }) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(getCommentsByPostIdAction.rejected, (state, { payload }) => {
        state.isError = true;
        state.isLoading = false;
      });
  },
});

export const postSelector = (state: RootState) => state.Post;

export default postSlice.reducer;
