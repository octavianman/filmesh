import React, { useEffect, useState } from "react";

import firebase from "firebase";

import axios from "axios";

import { Link } from "react-router-dom";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";

import { db } from "../../services/firebase";

import { useSelector } from "react-redux";

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
    <Link to={`/discover/${genre.name.toLowerCase()}`} key={genre.id}>
      <span style={{ margin: 5 }}>{genre.name}</span>
    </Link>
  ));
};

const Watchlist = () => {
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
            <Card style={{ marginTop: 10, marginBottom: 10, height: "36rem" }}>
              <CardContent style={{ textAlign: "center" }}>
                <Link to={`/movie/${movie.id}`}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt="Movie poster"
                    style={{
                      height: "20rem",
                      margin: "0 auto",
                      display: "block",
                      marginTop: "1rem",
                    }}
                  />
                </Link>
                <p style={{ fontWeight: 600 }}>{movie.title}</p>
                {renderGenres(movie)}
                <p
                  style={{
                    border: "1px solid black",
                    borderRadius: 10,
                    width: "10rem",
                    display: "block",
                    margin: "15px auto",
                  }}
                >
                  {ratingByMovie[movie.id] ? (
                    <span style={{ display: "block", margin: "0 auto" }}>
                      Rating:{" "}
                      <span style={{ fontWeight: 600 }}>
                        {ratingByMovie[movie.id]}
                      </span>
                    </span>
                  ) : (
                    <span>No rating</span>
                  )}
                </p>
                <p style={{ cursor: "pointer" }}>
                  <span onClick={() => onClickRemove(movie.id)}>Remove</span>
                </p>
              </CardContent>
            </Card>
          </Grid>
        ))}
    </Grid>
  );
};

export default Watchlist;
