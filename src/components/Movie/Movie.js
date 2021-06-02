import React, { useEffect, useState } from "react";
import axios from "axios";

import firebase from "firebase";

import { WatchlistAddIcon, WatchlistRemoveIcon } from "../common/icons";

import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Button,
  Grid,
  Typography,
  Card,
  CardContent,
  Dialog,
  TextField,
  Slider,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import { db } from "../../services/firebase";

const useStyle = makeStyles((theme) => ({
  image: {
    width: "25rem",
    height: "35rem",
    objectFit: "cover",
  },
}));

const createReview = async ({ movieId, newReview }) => {
  console.log({ newReview });
  const updateQuery = {
    reviews: firebase.firestore.FieldValue.arrayUnion(newReview),
  };
  await db.collection("movies").doc(movieId).update(updateQuery);
};

const getUserProfile = async (userId) => {
  const doc = await db.collection("users").doc(userId).get();
  return doc.data();
};

const CreateRatingDialog = ({ isOpen, onClose, onSubmit }) => {
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setRating(5);
      setContent("");
    }
  }, [isOpen]);

  const handleSliderChange = (event, newValue) => {
    setRating(newValue);
  };

  const handleTextFieldChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = () => {
    onSubmit({ rating, content });
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <Box p={5}>
        <p>Add a rating</p>
        <Slider
          value={rating}
          onChange={handleSliderChange}
          aria-labelledby="discrete-slider"
          valueLabelDisplay="auto"
          step={1}
          marks
          min={1}
          max={10}
        />
        <TextField
          label="Write your review here..."
          multiline
          rows={5}
          variant="outlined"
          style={{ width: "25rem" }}
          onChange={handleTextFieldChange}
        />
        <Box mt={3} textAlign="center">
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Submit
          </Button>
        </Box>
        <Box mt={3} textAlign="center">
          <Button onClick={onClose} variant="contained">
            Cancel
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

const Movie = (props) => {
  const classes = useStyle();
  const id = props.match.params.id;
  const userId = useSelector((state) => state.auth.user.uid);

  const [watchlistMovies, setWatchlistMovies] = useState([]);

  const [movie, setMovie] = useState();

  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState();

  const [dialogVisible, setDialogVisible] = useState(false);

  const [hasReviewed, setHasReviewed] = useState(false);

  const [userProfile, setUserProfile] = useState();

  console.log(reviews);

  useEffect(() => {
    if (userId) {
      getUserProfile(userId).then((profile) => setUserProfile(profile));
    }
  }, [userId]);

  useEffect(() => {
    const getReviews = async () => {
      if (!movie) {
        return;
      }
      const doc = await db.collection("movies").doc(movie.id.toString()).get();
      const data = doc.data();
      if (!data) {
        await db.collection("movies").doc(movie.id.toString()).set({
          reviews: [],
        });
        return;
      }
      setReviews(data.reviews);
    };
    getReviews();
  }, [movie]);

  useEffect(() => {
    setHasReviewed(reviews.some((review) => review.userId === userId));
  }, [reviews, userId]);

  useEffect(() => {
    const ratingSum = reviews.reduce((sum, item) => (sum += item.rating), 0);
    const ratingAverage = ratingSum / reviews.length;
    setRating(ratingAverage);
  }, [reviews]);

  useEffect(() => {
    const getMovie = async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}`,
        {
          params: {
            api_key: process.env.REACT_APP_MOVIEDB_API_KEY,
          },
        }
      );

      setMovie(response.data);
    };

    const getWatchlist = async () => {
      const doc = await db.collection("watchlist").doc(userId).get();
      const data = doc.data();

      if (data?.movies) {
        setWatchlistMovies(data.movies);
      }
    };

    getMovie();
    getWatchlist();

    // eslint-disable-next-line
  }, []);

  const watchlistHandler = async () => {
    if (watchlistMovies.length > 0) {
      if (watchlistMovies.includes(parseInt(id))) {
        const newWatchlist = watchlistMovies.filter((m) => m !== parseInt(id));

        await db
          .collection("watchlist")
          .doc(userId)
          .set({ userId, movies: newWatchlist });

        setWatchlistMovies(newWatchlist);
      } else {
        await db
          .collection("watchlist")
          .doc(userId)
          .update({ movies: [...watchlistMovies, movie.id] });
        setWatchlistMovies([...watchlistMovies, movie.id]);
      }
    } else {
      await db
        .collection("watchlist")
        .doc(userId)
        .set({ userId, movies: [movie.id] });
    }
  };

  if (!movie) return null;

  const date = new Date(movie.release_date).getFullYear();

  const onDialogClose = () => {
    setDialogVisible(false);
  };

  const openDialog = () => {
    setDialogVisible(true);
  };

  const onRatingSubmit = async ({ rating, content }) => {
    setDialogVisible(false);
    const newReview = {
      userId,
      rating,
      content,
      userFirstName: userProfile.firstName,
      userLastName: userProfile.lastName,
    };
    await createReview({ movieId: movie.id.toString(), newReview });
    setReviews([...reviews, newReview]);
  };

  return (
    <Box pt={5} pb={16}>
      <CreateRatingDialog
        isOpen={dialogVisible}
        onClose={onDialogClose}
        onSubmit={onRatingSubmit}
      />
      <Grid container>
        <Grid item xs={12}>
          <Box mb={2}>
            <Typography component="div" align="center">
              <img
                className={classes.image}
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt="Movie poster"
              />
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h2" align="center">
            {movie.title} ({date})
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Box mb={4}>
            <Grid container spacing={2} alignItems="center" justify="center">
              <Grid item>
                <Typography variant="body1" component="div">
                  <Box color="text.opacity">{movie.runtime} minutes</Box>
                </Typography>
              </Grid>

              <Grid item>
                <Typography variant="body1" component="div">
                  <Box color="text.opacity">•</Box>
                </Typography>
              </Grid>

              <Grid item>
                <Grid container>
                  {movie.genres.map((genre, i) => (
                    <Typography variant="body1" component="div" key={i}>
                      <Box color="text.opacity">
                        {genre.name}
                        {i !== movie.genres.length - 1 && ","}&nbsp;
                      </Box>
                    </Typography>
                  ))}
                </Grid>
              </Grid>

              <Grid item>
                <Typography variant="body1" component="div">
                  <Box color="text.opacity">•</Box>
                </Typography>
              </Grid>

              <Grid item>
                <Grid container>
                  {movie.production_countries.map((country, i) => (
                    <Typography variant="body1" component="div" key={i}>
                      <Box color="text.opacity">
                        {country.name}
                        {i !== movie.production_countries.length - 1 && ","}
                        &nbsp;
                      </Box>
                    </Typography>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Typography component="div" variant="body1" align="center">
            <Box mb={3}>
              {rating ? (
                <Box display="flex" justifyContent="center">
                  <Typography variant="body2" component="div">
                    Rating:{" "}
                    <Box display="inline" fontWeight="bold">
                      {rating.toFixed(2)}
                    </Box>
                  </Typography>
                </Box>
              ) : (
                <Box>
                  <Typography variant="body2">No rating</Typography>
                </Box>
              )}
            </Box>
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="body1" align="center">
            {movie.overview}
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Box width="18rem" m="0 auto" mt={4}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              endIcon={
                watchlistMovies.includes(movie.id) ? (
                  <WatchlistRemoveIcon />
                ) : (
                  <WatchlistAddIcon />
                )
              }
              onClick={() => watchlistHandler()}
            >
              {watchlistMovies.includes(movie.id)
                ? "Remove from watchlist"
                : "Add to watchlist"}
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box mt={8}>
            <Box mb={3} display="flex" alignItems="center">
              <Typography variant="h3">Reviews</Typography>
              {!hasReviewed && (
                <Box ml={2} width="9.5rem">
                  <Button
                    onClick={openDialog}
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    Add a review
                  </Button>
                </Box>
              )}
            </Box>

            {reviews.map((review) => (
              <Box mb={3} key={review.userId}>
                <Card>
                  <CardContent>
                    <p>Rating: {review.rating}</p>
                    <p>
                      {review.userFirstName} {review.userLastName}
                    </p>
                    <p>{review.content}</p>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Movie;
