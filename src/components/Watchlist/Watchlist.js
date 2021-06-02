import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import firebase from "firebase";
import axios from "axios";
import { db } from "../../services/firebase";

import { ImageIcon } from "../common/icons";

import { makeStyles } from "@material-ui/core/styles";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  image: {
    height: "20rem",
    width: "15rem",
    margin: "0 auto",
  },
}));

const getMovie = async (movieId) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}`,
    {
      params: {
        api_key: process.env.REACT_APP_MOVIEDB_API_KEY,
      },
    }
  );
  return response.data;
};

const getWatchlist = async (userId) => {
  const doc = await db.collection("watchlist").doc(userId).get();
  const data = doc.data();
  return data;
};

const getRating = async (movieId) => {
  const doc = await db.collection("movies").doc(movieId.toString()).get();
  const data = doc.data();

  if (!data) {
    return null;
  }
  const reviews = data.reviews;
  const ratingSum = reviews.reduce((sum, item) => (sum += item.rating), 0);
  const ratingAverage = ratingSum / reviews.length;
  return ratingAverage;
};

const removeMovieFromWatchlist = async (userId, movieId) => {
  const updateQuery = {
    movies: firebase.firestore.FieldValue.arrayRemove(movieId),
  };
  await db.collection("watchlist").doc(userId).update(updateQuery);
};

const renderGenres = (movie) => {
  return movie.genres.map((genre) => (
    <Grid item key={genre.id}>
      <Link to={`/discover/${genre.name.toLowerCase()}`}>
        <Typography variant="body2" component="div">
          <Box color="text.opacity">{genre.name}</Box>
        </Typography>
      </Link>
    </Grid>
  ));
};

const Watchlist = () => {
  const classes = useStyle();
  const [watchlist, setWatchlist] = useState(null);
  const [movies, setMovies] = useState([]);
  const [ratingByMovie, setRatingByMovie] = useState({});
  const userId = useSelector((state) => state.auth.user.uid);

  useEffect(() => {
    const initWatchlist = async () => {
      const watchlist = await getWatchlist(userId);
      if (!watchlist || !watchlist.movies) {
        return;
      }
      setWatchlist(watchlist);
    };
    initWatchlist();
  }, [userId]);

  useEffect(() => {
    const getMovies = async () => {
      const getMoviePromises = [];
      for (const movieId of watchlist.movies) {
        getMoviePromises.push(getMovie(movieId));
      }
      const populatedMovies = await Promise.all(getMoviePromises);
      setMovies(populatedMovies);
    };
    if (watchlist && watchlist.movies) {
      getMovies();
    }
  }, [watchlist]);

  useEffect(() => {
    const getRatingByMovie = async () => {
      const getRatingPromises = [];
      for (const movieId of watchlist.movies) {
        getRatingPromises.push(getRating(movieId));
      }
      const ratings = await Promise.all(getRatingPromises);
      const newRatingByMovie = {};
      for (let i = 0; i < ratings.length; i++) {
        newRatingByMovie[watchlist.movies[i]] = ratings[i];
      }
      setRatingByMovie(newRatingByMovie);
    };
    if (watchlist && watchlist.movies) {
      getRatingByMovie();
    }
  }, [watchlist]);

  const onClickRemove = async (movieId) => {
    await removeMovieFromWatchlist(userId, movieId);
    const filteredMovies = watchlist.movies.filter((mid) => mid !== movieId);
    console.log({ filteredMovies });
    setWatchlist({
      ...watchlist,
      movies: filteredMovies,
    });
  };

  return (
    <Grid container spacing={2}>
      {movies &&
        movies.map((movie) => (
          <Grid item key={movie.id} xs={3}>
            <Card
              style={{
                marginTop: 10,
                marginBottom: 10,
                height: "36rem",
                borderRadius: "10px",
              }}
            >
              <CardContent style={{ textAlign: "center" }}>
                <Link to={`/movie/${movie.id}`}>
                  <Avatar
                    variant="square"
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt="Movie poster"
                    className={classes.image}
                  >
                    <ImageIcon />
                  </Avatar>
                </Link>
                <Typography variant="h6">{movie.title}</Typography>

                <Grid container spacing={1} justify="center">
                  {renderGenres(movie)}
                </Grid>

                <Box
                  border="1px solid #51c4d3"
                  borderRadius="10px"
                  width="10rem"
                  m="15px auto"
                  p="0.3rem"
                >
                  {ratingByMovie[movie.id] ? (
                    <Box display="flex" justifyContent="center">
                      <Typography variant="body2" component="div">
                        Rating:{" "}
                        <Box display="inline" fontWeight="bold">
                          {ratingByMovie[movie.id].toFixed(2)}
                        </Box>
                      </Typography>
                    </Box>
                  ) : (
                    <Box>
                      <Typography variant="body2">No rating</Typography>
                    </Box>
                  )}
                </Box>

                <Button
                  onClick={() => onClickRemove(movie.id)}
                  variant="contained"
                  color="secondary"
                >
                  Remove
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
    </Grid>
  );
};

export default Watchlist;
