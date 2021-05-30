import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  root: {
    position: "relative",
    width: "100%",
    height: "9rem",
    cursor: "pointer",

    "& h6 > div": {
      transition: "all .2s ease-in",
    },

    "&:hover h6 > div": {
      letterSpacing: "5px",
    },
  },

  image: {
    borderRadius: "10px",
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },

  gradient: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.3,
  },

  title: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: "10",
    letterSpacing: "2px",
  },
}));

const GenreCard = (props) => {
  const { image, title } = props;
  const classes = useStyle();

  return (
    <Box className={classes.root}>
      <img
        src={`/images/genres/${image}`}
        alt="Genre background"
        className={classes.image}
      />

      <Box borderRadius="10px" className={classes.gradient}></Box>

      <Box className={classes.title}>
        <Typography variant="h6">
          <Box color="common.white">{title}</Box>
        </Typography>
      </Box>
    </Box>
  );
};

export default GenreCard;
