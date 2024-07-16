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
} from "../redux/post/postMiddleware";
import { toast } from "react-toastify";
import { authSelector } from "../redux/auth/auth.slice";
import { List } from "react-virtualized";
import InfiniteScroll from "react-infinite-scroll-component";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector(authSelector);
  const [showTextArea, setShowTextArea] = useState<string | boolean>("");
  const [like, setLike] = useState<any>("");
  const userName: any = JSON.parse(localStorage?.getItem("user") as any);
  const userId = userName._id;
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const { isError, isLoading, postData, selectedPostComments } =
    useSelector(postSelector);

  console.log("Selected Post Comment", selectedPostComments);

  console.log("Post Data", postData);

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
  console.log("selectedPostComments", selectedPostComments);

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

  const fetchNextComment = (id: string) => {
    if (!hasMore) return;
    dispatch(getCommentsByPostIdAction(id, page));
    setPage(page + 1);
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

  useEffect(() => {
    dispatch(getPostAction());
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
                  {/* <InfiniteScroll
                    dataLength={selectedPostComments?.length | 0}
                    next={() => fetchNextComment(element._id)}
                    hasMore={true}
                    loader={<h4>Loading...</h4>}
                    style={{ maxHeight: "30dvh" }}
                  > */}
                  {selectedPostComments?.map((item: any, index: any) => (
                    <ListItem>
                      <ListItemText>{item?.content} vfbkjh</ListItemText>
                      <ListItemText>
                        {item?.createdAt.substring(0, 10)}
                      </ListItemText>
                    </ListItem>
                  ))}
                  {/* </InfiniteScroll> */}
                  {/* <InfiniteScroll
                    dataLength={selectedPostComments?.length || 1} //This is important field to render the next data
                    next={() => fetchNextComment(element._id)}
                    hasMore={true}
                    loader={<h4>Loading...</h4>}
                    endMessage={
                      <p style={{ textAlign: "center" }}>
                        <b>Yay! You have seen it all</b>
                      </p>
                    }
                    // below props only if you need pull down functionality
                    refreshFunction={refreshData}
                    pullDownToRefresh
                    pullDownToRefreshThreshold={10}
                    pullDownToRefreshContent={
                      <h3 style={{ textAlign: "center" }}>
                        &#8595; Pull down to refresh
                      </h3>
                    }
                    releaseToRefreshContent={
                      <h3 style={{ textAlign: "center" }}>
                        &#8593; Release to refresh
                      </h3>
                    }
                  >
                    {selectedPostComments?.map((item: any, index: any) => (
                      <ListItem>
                        <ListItemText>{item?.content} vfbkjh</ListItemText>
                        <ListItemText>
                          {item?.createdAt.substring(0, 10)}
                        </ListItemText>
                      </ListItem>
                    ))}
                  </InfiniteScroll> */}
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
