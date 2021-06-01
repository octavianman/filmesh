import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

import { SearchIcon } from "../common/icons";

import SearchBarMovie from "./SearchBarMovie";

import { makeStyles } from "@material-ui/core/styles";
import { Box, ClickAwayListener, TextField } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  searchInput: {
    "& .MuiInputBase-input": {
      padding: "12px 14px",
    },
  },
}));

const SearchBar = () => {
  const classes = useStyle();
  const [searchValue, setSearchValue] = useState("");
  const [moviesToShow, setMoviesToShow] = useState([]);
  const [open, setOpen] = useState(false);

  const pathname = useLocation().pathname;

  useEffect(() => {
    setSearchValue("");
  }, [pathname]);

  const renderedMovies = moviesToShow.map((movie, index) => (
    <SearchBarMovie
      movie={movie}
      first={index === 0}
      last={index === moviesToShow.length - 1}
      key={index}
    />
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
    <Box py={3} flexGrow={1} maxWidth="50rem">
      <ClickAwayListener onClickAway={() => setOpen(false)}>
        <Box position="relative">
          <TextField
            value={searchValue}
            variant="outlined"
            fullWidth
            name="searchValue"
            id="searchValue"
            placeholder="Search..."
            onChange={(e) => setSearchValue(e.target.value)}
            onClick={() => setOpen(true)}
            style={{ background: "#51c4d3" }}
            InputProps={{
              endAdornment: <SearchIcon />,
              className: classes.searchInput,
            }}
          />

          {moviesToShow.length > 0 && open && (
            <Box
              borderRadius="10px"
              position="absolute"
              width="100%"
              bottom="-55.5rem"
              left="0"
              zIndex={10}
            >
              {renderedMovies}
            </Box>
          )}
        </Box>
      </ClickAwayListener>
    </Box>
  );
};

export default SearchBar;
