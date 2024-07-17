import {
  Badge,
  Box,
  Button,
  CardMedia,
  CssBaseline,
  Grid,
  IconButton,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useEffect, useId, useState } from "react";
import CommonButton from "../Common/CommonButton";
import Textarea from "@mui/joy/Textarea";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import {
  getCommentsByPostIdAction,
  getPostAction,
  likeAction,
} from "../redux/post/postMiddleware";
import { postSelector } from "../redux/post/postSlice";
import { RootState } from "../redux/store";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import AddIcon from "@mui/icons-material/Add";
import CommonSlider from "../Common/CommonSlider";
import { commentSchema } from "../utills/schema";
import {
  postCommentAction,
  getCommentAction,
  deleteOwnCommentAction,
} from "../redux/post/postMiddleware";
import { toast } from "react-toastify";
import { authSelector } from "../redux/auth/auth.slice";
import { List } from "react-virtualized";
import InfiniteScroll from "react-infinite-scroll-component";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { parseUserData } from "../utills/services";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector(authSelector);
  const userData = parseUserData(currentUser);
  const [showTextArea, setShowTextArea] = useState<string | boolean>("");
  const [like, setLike] = useState<any>("");
  const userName: any = JSON.parse(localStorage?.getItem("user") as any);
  const userId = userName._id;
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const { isError, isLoading, postData, selectedPostComments, ownComment } =
    useSelector(postSelector);

  const { errors, handleChange, handleSubmit, touched, values } = useFormik({
    initialValues: {
      content: "",
      user: userId,
      post: showTextArea,
    },
    enableReinitialize: true,
    validationSchema: commentSchema,
    onSubmit: (values) => {
      console.log("values", values);
      dispatch(postCommentAction(values))?.then(({ payload }: any) => {
        console.log("Payload Getting", payload);
        if (payload) {
          console.log("Get Paytload", payload);
          values.content = "";
          setShowTextArea(false);
          toast.success("Comment Posted Successfully");
          navigate("/");
        }
      });
    },
  });

  const handleLike = (id: string) => {
    console.log("Id Like", id);
    dispatch(likeAction(id));
    setLike((prev: any) =>
      prev.includes(id)
        ? prev.filter((postId: any) => postId !== id)
        : [...prev, id]
    );
  };

  const toogleTextArea = (id: string) => {
    if (showTextArea === id) {
      setShowTextArea("");
    } else {
      setShowTextArea(id);
      dispatch(getCommentsByPostIdAction(id));
      setPage(2);
      console.log("Id", id);
    }
  };

  const handleDelete = (id: any, commentId: any) => {
    dispatch(deleteOwnCommentAction({ id, commentId })).then(({ payload }) => {
      if (payload.status === 200 || payload.status === 201) {
        console.log("payload=---->", payload);
        getApi();
      }
    });
  };

  const fetchNextComment = (id: string) => {
    if (!hasMore) return;
    dispatch(getCommentsByPostIdAction(id, page));
    setPage(page + 1);
  };
  const getCommentInfo = (id: string) => {
    return selectedPostComments?.find((item) => item._id === id);
  };
  const refreshData = () => {
    console.log("sdfgljh");
  };
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const getApi = () => {
    console.log(" payload=----> get dataaa");

    dispatch(getPostAction());
  };
  useEffect(() => {
    getApi();
  }, [dispatch]);

  return (
    <Grid
      container
      gap={2}
      bgcolor={"black"}
      sx={{ border: "1px solid red" }}
      justifyContent={"center"}
    >
      {isError && <Typography>Error while fetching API</Typography>}
      {postData?.map((element: any) => (
        <Grid
          item
          key={element?._id}
          xs={11}
          md={10}
          lg={6}
          sx={{
            color: "white",
            backgroundColor: "green",
            border: "1px solid white",
          }}
        >
          <Typography
            variant="h4"
            p={0.5}
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {element.title}
          </Typography>
          <Typography
            variant="body2"
            p={0.5}
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {element.description}
          </Typography>
          <Grid container>
            <CommonSlider {...settings}>
              {[1, 2, 3, 4].map((element: any, index: any) => (
                <Grid item xs={12} key={index}>
                  <CardMedia
                    component="img"
                    height="350px"
                    image="https://images.unsplash.com/photo-1720371300677-ba4838fa0678?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8"
                    alt="Paella dish"
                    sx={{ objectFit: "cover", aspectRatio: 1 / 1 }}
                  />
                </Grid>
              ))}
            </CommonSlider>
          </Grid>

          <Grid
            container
            // spacing={2}
            sx={{
              justifyContent: "center",
              border: "2px solid white",
              alignItems: "center",
            }}
          >
            <Grid
              item
              xs={12}
              md={6}
              display={"flex"}
              justifyContent={"space-evenly"}
            >
              <Badge badgeContent={element.postLike?.length} color="secondary">
                <CommonButton
                  title="like"
                  onClick={() => handleLike(element?._id)}
                  variant="contained"
                  size="large"
                  color={like.includes(element._id) ? "success" : "secondary"}
                  startIcon={
                    like.includes(element._id) ? (
                      <ThumbDownIcon />
                    ) : (
                      <ThumbUpIcon />
                    )
                  }
                />
              </Badge>
              <Badge
                badgeContent={element.postComment?.length}
                color="secondary"
              >
                <CommonButton
                  title="comment"
                  variant="contained"
                  size="large"
                  color="secondary"
                  // sx={{ margin: "20px" }}
                  onClick={() => toogleTextArea(element?._id)}
                />
              </Badge>
            </Grid>
            {showTextArea === element._id && (
              <>
                <Grid
                  bgcolor={"red"}
                  item
                  xs={12}
                  sx={{ overflowY: "auto", maxHeight: "40dvh" }}
                >
                  {/* {JSON.stringify(element)} */}
                  {element?.postComment?.map((item: any, index: any) => {
                    const commentInfo = getCommentInfo(item);

                    return (
                      <ListItem key={index}>
                        <ListItemText>{commentInfo?.content} </ListItemText>
                        <ListItemText>
                          {commentInfo?.createdAt?.substring(0, 10)}
                          sdfpoijukjh
                        </ListItemText>
                        {/* {JSON.stringify(userData)} */}
                        {/* {JSON.stringify(item._id)} */}
                        {commentInfo?.user === userData?._id ? (
                          <Button
                            onClick={() =>
                              handleDelete(element._id, commentInfo._id)
                            }
                            variant="contained"
                          >
                            {" "}
                            Delete Button
                          </Button>
                        ) : null}
                      </ListItem>
                    );
                  })}
                  {/* {selectedPostComments?.map((item: any, index: any) => (
                    <ListItem key={index}>
                      <ListItemText>{item?.content} </ListItemText>
                      <ListItemText>
                        {item?.createdAt.substring(0, 10)}
                      </ListItemText>
                      {item.user === userData?._id ? (
                        <Button
                          onClick={() => handleDelete(element._id, item._id)}
                          variant="contained"
                        >
                          {" "}
                          Delete Button
                        </Button>
                      ) : null}
                    </ListItem>
                  ))}} */}
                </Grid>

                <Grid
                  item
                  xs={12}
                  md={8}
                  lg={12}
                  sx={{ margin: "20px", bgcolor: "white" }}
                >
                  <Textarea
                    minRows={2}
                    name="content"
                    error={(touched.content && errors.content) as boolean}
                    value={values.content}
                    onChange={handleChange}
                    placeholder="Write your comment... "
                  />
                  <CommonButton
                    title="Post a Comment"
                    variant="contained"
                    type="submit"
                    color="success"
                    sx={{ margin: "10px" }}
                    onClick={handleSubmit}
                  />
                </Grid>
              </>
            )}
          </Grid>
        </Grid>
      ))}
      <IconButton
        aria-label="fingerprint"
        color="secondary"
        sx={{
          bgcolor: "white",
          position: "fixed",
          right: "3%",
          bottom: "5%",
        }}
        onClick={() => navigate("/create-post")}
      >
        <AddIcon />
      </IconButton>
    </Grid>
  );
};

export default Home;
