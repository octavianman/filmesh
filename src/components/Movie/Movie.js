import React, { useEffect, useState } from "react";
import axios from "axios";

import { WatchlistAddIcon, WatchlistRemoveIcon } from "../common/icons";

import { makeStyles } from "@material-ui/core/styles";
import { Box, Button, Grid, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import { db } from "../../services/firebase";

const useStyle = makeStyles((theme) => ({
  image: {
    width: "25rem",
    height: "35rem",
    objectFit: "cover",
  },
}));

const Movie = (props) => {
  const classes = useStyle();
  const id = props.match.params.id;
  const userId = useSelector((state) => state.auth.user.uid);

  const [watchlistMovies, setWatchlistMovies] = useState([]);

  console.log(watchlistMovies);

  const [movie, setMovie] = useState();

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

  return (
    <Box pt={5}>
      <Grid container>
        <Grid item xs={12}>
          <Box mb={2}>
            <Typography align="center">
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
            <Typography variant="h3">Reviews</Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Movie;
