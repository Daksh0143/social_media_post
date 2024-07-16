import { Button, Grid, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { green } from "@mui/material/colors";
import React, { FC } from "react";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import { Textarea } from "@mui/joy";
import CommonButton from "../Common/CommonButton";
import { postSchema } from "../helpers/postSchema";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { postADetails } from "../redux/post/postMiddleware";
import { toast } from "react-toastify";
import {useNavigate} from "react-router-dom"

const CreatePost: FC = () => {
  const initialValues = {
    title: "",
    description: "",
  };

  const dispatch = useDispatch();
  const navigate=useNavigate()

  const { errors, handleBlur, handleChange, handleSubmit, touched, values } =
    useFormik({
      initialValues: initialValues,
      validationSchema: postSchema,
      onSubmit: (values) => {
        console.log(values, "Values");
        dispatch(postADetails(values))
          ?.then(({ payload }) => {
            console.log("Values IN Side Dispatch", values);
            if (payload.status === 200 || payload.status === 201) {
              console.log("Get Payload", payload);
              toast.success("Post posted Successfully");
              navigate("/")
              
            }
          })
          .catch((error: any) => {
            toast.error(error?.repsonse?.data?.message);
            console.log("Error", error);
          });
      },
    });
  return (
    <Grid container>
      <Grid container justifyContent={"center"} mt={5}>
        <Grid item bgcolor={"white"} border={2} p={5}>
          <Typography variant="h4" mb={2} color={"green"}>
            Create a Post
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="filled-basic"
                helperText={errors?.title}
                error={(touched.title && errors.title) as boolean}
                label="Title"
                variant="standard"
                name="title"
                value={values.title}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Textarea
                name="description"
                placeholder="Type in here…"
                variant="outlined"
                helperText={errors?.description}
                error={(touched.title && errors.title) as boolean}
                value={values.description}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Grid container justifyContent={"center"} mt={2}>
            <CommonButton
              title="submit"
              color="success"
              variant="contained"
              type="submit"
              sx={{ padding: "10px", width: "80%" }}
              onClick={handleSubmit}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CreatePost;
