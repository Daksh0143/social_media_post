import axios from "axios";
import api from "../api";
import { toast } from "react-toastify";

const RegisterUrl = "user/register";
const LoginUrl="user/login"

interface register {
  status: number;
  data: {
    firstName: "string";
    lastName: "string";
    email: "string";
    mobile: "number";
    password: "string";
  };
}

export const RegisterUser = async (request: "Request") => {
  try {
    const response = await api.post(RegisterUrl, request);
    return response;
  } catch (error:any) {
    return error.response
  }
};


export const LoginUser=async(request:"request")=>{
  try {
    
    const response=await api.post(LoginUrl,request);
    console.log("Login user data",response);
    return response
  } catch (error:any) {
    toast.error(error?.response?.data?.message)
    console.log("Error=======>",error)
   
  }
}