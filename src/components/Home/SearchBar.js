import React, { useEffect, useState } from "react";
import axios from "axios";

import SearchBarMovie from "./SearchBarMovie";

import { Box, ClickAwayListener, TextField } from "@material-ui/core";

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState("");
  const [moviesToShow, setMoviesToShow] = useState([]);
  const [open, setOpen] = useState(false);

  const renderedMovies = moviesToShow.map((movie, index) => (
    <SearchBarMovie movie={movie} key={index} />
  ));

  useEffect(() => {
    if (!searchValue) {
      setMoviesToShow([]);
    } else {
      const getMovies = async () => {
        const response = await axios.get(
          "https://api.themoviedb.org/3/search/movie",
          {
            params: {
              api_key: process.env.REACT_APP_MOVIEDB_API_KEY,
              include_adult: false,
              query: searchValue,
            },
          }
        );

        setMoviesToShow(response.data.results.slice(0, 5));
      };

      getMovies();
    }
  }, [searchValue]);

  return (
    <Box py={3}>
      <ClickAwayListener onClickAway={() => setOpen(false)}>
        <Box>
          <TextField
            value={searchValue}
            variant="outlined"
            fullWidth
            name="searchValue"
            id="searchValue"
            label="Search"
            onChange={(e) => setSearchValue(e.target.value)}
            onClick={() => setOpen(true)}
          />

          {moviesToShow.length > 0 && open && (
            <Box mt={1}>{renderedMovies}</Box>
          )}
        </Box>
      </ClickAwayListener>
    </Box>
  );
};

export default SearchBar;
