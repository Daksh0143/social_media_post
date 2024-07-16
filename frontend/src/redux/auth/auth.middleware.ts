import { createAsyncThunk, AsyncThunk } from "@reduxjs/toolkit";

import MockData from ".././../Constant/MOCK_DATA.json";

import { LoginUser, RegisterUser } from "./auth.services";
import { toast } from "react-toastify";

// const updatedMockData = [...MockData];
// console.log(updatedMockData.length, "Updated Mock data");

export const userRegistrationAction: AsyncThunk<any, any, {}> =
  createAsyncThunk<any, any>(
    "/register/user",
    async (request, { rejectWithValue }) => {
      try {
          
        const response = await RegisterUser(request);
        if (response?.status === 201 || response?.status === 200) {
          console.log("request", request);
          // const newUser = { id: updatedMockData.length + 1, ...request };
          return response;
        } 
        return rejectWithValue(response);
      } catch (error: any) {
        return rejectWithValue(error?.response?.data?.message);
      }
    }
  );

export const userLoginAction: AsyncThunk<any, any, {}> = createAsyncThunk(
  "/login/user",
  async (request, { rejectWithValue }) => {
    try {
      const response: any = await LoginUser(request);
      console.log(response, "Response");

      console.log("Request=====>", request);
      if (response?.status === 201 || response?.status === 200) {
        console.log("Aftrer Success Request=======>", request);
        console.log("response=======>",response)
        return response
      } else {
        return rejectWithValue(response);
      }
    } catch (error) {
      console.log("Error=========>", error);
      return rejectWithValue(error);
    }
  }
);
