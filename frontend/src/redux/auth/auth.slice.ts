import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { AuthState } from "./types";
import { userLoginAction, userRegistrationAction } from "./auth.middleware";

const initialState: AuthState = {
  loading: false,
  currentUser: localStorage.getItem("token"),
  isLoading: false,
  isError: false,
  userData: [],
};

const authSlice = createSlice({
  name: "Auth",
  initialState: initialState,
  reducers: {
    setAuthCurrentUser: (state, { payload }: PayloadAction<any>) => ({
      ...state,
      currentUser: payload,
    }),
    signOutAction: (state: AuthState) => {
      state.currentUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userRegistrationAction.fulfilled, (state, { payload }) => {
        (state.isLoading = false),
          (state.isError = false),
          (state.userData = payload);
      })
      .addCase(userRegistrationAction.pending, (state, { payload }) => {
        (state.isLoading = true), (state.isError = false);
      }),
      builder.addCase(userRegistrationAction.rejected, (state, { payload }) => {
        (state.isLoading = true), (state.isError = true);
      });
    //Login Action
    builder.addCase(userLoginAction.fulfilled, (state, { payload }) => {
      (state.isLoading = false), (state.isError = false);
      state.userData = payload;
    });
    builder.addCase(userLoginAction.pending, (state, { payload }) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(userLoginAction.rejected, (state, { payload }) => {
      state.isLoading = true;
      state.isError = true;
    });
  },
});

export const { signOutAction, setAuthCurrentUser } = authSlice.actions;

export const authSelector = (state: RootState) => state.Auth;

export default authSlice.reducer;
