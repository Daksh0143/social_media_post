import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { loginSchema } from "../utills/schema";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { userLoginAction } from "../redux/auth/auth.middleware";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setAuthCurrentUser } from "../redux/auth/auth.slice";

const Login = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState(false);
  const [submitting, setIsSubmitting] = useState(false);

  const dispatch = useDispatch();

  const initialValues = {
    email: "",
    password: "",
  };

  const {
    errors,
    handleChange,
    handleBlur,
    resetForm,
    handleSubmit,
    values,
    touched,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: loginSchema,
    onSubmit: (values) => {
      console.log(values, "Values");
      setIsSubmitting(true);
      dispatch(userLoginAction(values))
        .then(({ payload }: any) => {
          console.log("payload", payload);
          console.log("Payload Getting", payload.data.data.token);
          const user=JSON.stringify(payload.data.data.user)
          if (payload.status === 200) {
            dispatch(setAuthCurrentUser(payload.data.data.token));
            // const jsonData=JSON.stringify(payload.data.token)
            toast.success("User Loggedin Successfuly");
            localStorage.setItem("token", payload.data.data.token);
            localStorage.setItem("user", user);
            setTimeout(() => {
              navigate("/");
            }, 1500);
          }
        })
        .catch((error: any) => {
          console.log("Error Occured", error);
          toast.error(error?.repsonse?.data?.message);
        })
        .finally(() => {
          setIsSubmitting(false);
          resetForm();
        });
    },
  });

  const data = {
    email: values.email,
    password: values.password,
  };

  return (
    <Grid
      container
      // border={1}
      height={"100vh"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Grid item xs={12} md={3} border={1} bgcolor={"white"} minHeight={"40%"}>
        <Grid container>
          <Grid item sm={12}>
            <Typography textAlign={"center"} variant="h5" p={3}>
              Login Form
            </Typography>
          </Grid>
          <Grid item xs={12} p={2}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Email"
                  id="outlined-basic"
                  name="email"
                  onChange={handleChange}
                  value={values.email}
                  helperText={errors.email}
                  error={(touched.email && errors.email) as boolean}
                  placeholder="Enter Your Email"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Password"
                  name="password"
                  type={password ? "text " : "password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setPassword(!password)}>
                          {password ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  value={values.password}
                  helperText={errors.password}
                  onChange={handleChange}
                  error={(touched.password && errors.password) as boolean}
                  id="outlined-basic"
                  placeholder="Enter Your Password"
                  fullWidth
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} p={3}>
            <Button
              disabled={submitting}
              onClick={handleSubmit}
              variant="contained"
              fullWidth
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Login;
