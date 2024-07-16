import {
  Box,
  Button,
  FormHelperText,
  Grid,
  Icon,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { FC, useState } from "react";
import { useFormik } from "formik";
import MockDatas from "../Constant/MOCK_DATA.json";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { registerSchema } from "../utills/schema";
import { useDispatch, useSelector } from "react-redux";
import { userRegistrationAction } from "../redux/auth/auth.middleware";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Resgister: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [password, setPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);
  const[submit,setSubmit]=useState(false)
  const isMobile = useMediaQuery("(max-width:600px)");
  const handleClickPassword = (e: React.FormEvent<HTMLButtonElement>) => {
    // e.preventDefault();
    setPassword(!password);
  };

  const handleConfirmPassword = (e: React.FormEvent<HTMLButtonElement>) => {
    // e.preventDefault();
    setConfirmPassword(!confirmPassword);
  };

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile: "",
  };

  const { errors, handleChange, handleBlur, values,resetForm, touched, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: registerSchema,
      onSubmit: (values) => {
        console.log("values", values);
        const {confirmPassword,...filteredValues}=values
        setSubmit(true) 
        dispatch(userRegistrationAction(filteredValues))
          ?.then(({ payload }: any) => {
            console.log("Payload Getting",payload)
            if ((payload.status === 200)) {
              console.log("Get Paytload", payload);
              toast.success("User Register Successfully");
              navigate("/");
            }
          })
          .catch((error: any) => {
            console.log("Errors", error);
            toast.error(error?.response?.data?.message);
          })
          .finally(()=>{
            setSubmit(false)
            resetForm()
          })
      },
    });

  console.log(errors, "Errors=========>");

  const data = {
    firstName: values.firstName,
    last_name: values.lastName,
    email: values.email,
    mobile: values.mobile,
    password: values.password,
    confirmPassword: values.confirmPassword,
  };

  console.log("Data", data);

  return (
    <Grid
      container
      display={"flex"}
      minWidth={"90%"}
      justifyContent={"center"}
      alignItems={"center"}
      sx={{
        height : "calc(100vh - 100px)"
      }}
    >
      <Grid
        item
        sm={12}
        md={6}
        border={1}
        p={2}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        bgcolor={"white"}
      >
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            justifyContent={"center"}
            alignItems={"center"}
            display={"flex"}
            marginBottom={2}
          >
            <Typography variant="h4" color={"#142117"}>
              Register Form
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <TextField
              type="text"
              fullWidth
              value={values.firstName}
              id="outlined-basic"
              size="medium"
              helperText={errors.firstName}
              error={(touched.firstName && errors.firstName) as boolean}
              label="First Name"
              variant="outlined"
              name="firstName"
              onChange={handleChange}
              onBlur={handleBlur}
              // sx={{ marginBottom: "15px", px: 1 }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              type="text"
              name="lastName"
              fullWidth
              value={values?.lastName}
              helperText={errors.lastName}
              error={(touched.lastName && errors.lastName) as boolean}
              id="outlined-basic"
              size="medium"
              label="Last Name"
              variant="outlined"
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <TextField
              type="text"
              fullWidth
              id="outlined-basic"
              value={values.mobile}
              helperText={errors.mobile}
              error={(touched.mobile && errors.mobile) as boolean}
              size="medium"
              label="Mobile"
              variant="outlined"
              name="mobile"
              onChange={handleChange}
              onBlur={handleBlur}
              // sx={{ marginBottom: "15px", px: 1 }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              type="text"
              fullWidth
              id="outlined-basic"
              size="medium"
              value={values.email}
              helperText={errors.email}
              error={(touched.email && errors.email) as boolean}
              label="Email"
              variant="outlined"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              // sx={{ marginBottom: "15px", px: 1 }}
            />
          </Grid>
          {/* <Grid container border={2}> */}
          <Grid item xs={12} md={6}>
            <TextField
              type={password ? "text" : "password"}
              fullWidth
              id="outlined-basic"
              size="medium"
              helperText={errors.password}
              error={(touched.password && errors.password) as boolean}
              label="Password"
              value={values.password}
              variant="outlined"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              sx={{ marginBottom: "15px" }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickPassword}>
                      {password ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              // sx={{ marginBottom: "15px", px: 1 }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              type={confirmPassword ? "text" : "password"}
              fullWidth
              error={
                (touched.confirmPassword && errors.confirmPassword) as boolean
              }
              helperText={errors.confirmPassword}
              id="outlined-basic"
              size="medium"
              value={values.confirmPassword}
              name="confirmPassword"
              label="Confirm Password"
              onChange={handleChange}
              onBlur={handleBlur}
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleConfirmPassword}>
                      {confirmPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              // sx={{ marginBottom: "15px", px: 1 }}
            />
          </Grid>
          {/* </Grid> */}
          {/* <Grid container> */}
          <Grid item xs={12} m={2} display={"flex"} justifyContent={"center"}>
            <Button
              onClick={handleSubmit}
              variant="contained"
              disabled={submit}
              fullWidth={isMobile}
              color="success"
            >
              Submit
            </Button>
          </Grid>
          {/* </Grid> */}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Resgister;
