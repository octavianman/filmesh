import React from "react";
import { Link } from "react-router-dom";

import { makeStyles, Typography } from "@material-ui/core";
import { Box } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  image: {
    height: "30px",

    [theme.breakpoints.down("xs")]: {
      height: "20px",
    },
  },
}));

const Footer = () => {
  const classes = useStyle();

  return (
    <Box
      bgcolor="background.main"
      position="absolute"
      bottom="0"
      left="0"
      width="100%"
    >
      <Box
        maxWidth="1550px"
        m="0 auto"
        px={3}
        py={2}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Link to="/">
          <Box display="flex">
            <img src="/images/logo.png" className={classes.image} alt="Logo" />
          </Box>
        </Link>

        <Box>
          <Typography variant="body1" component="div">
            <Box color="text.opacity">© 2021 Filmesh</Box>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
