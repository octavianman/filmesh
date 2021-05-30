import React from "react";
import { Link, useHistory } from "react-router-dom";
import Firebase from "../../services/firebase";

import { makeStyles } from "@material-ui/core";
import { Box, Typography } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  image: {
    height: "45px",

    [theme.breakpoints.down("xs")]: {
      height: "40px",
    },
  },

  pointer: {
    cursor: "pointer",
  },
}));

const Navbar = () => {
  const classes = useStyle();
  const history = useHistory();

  const logoutHandler = async () => {
    await Firebase.auth().signOut();

    history.push("/signin");
  };

  return (
    <Box position="fixed" top="0" left="0" bgcolor="primary.main" width="100%">
      <Box maxWidth="1430px" m="0 auto" px={3} height="70px">
        <Box
          display="flex"
          height="100%"
          alignItems="center"
          justifyContent="space-between"
        >
          <Link to="/">
            <Box display="flex">
              <img
                src="/images/logo.png"
                className={classes.image}
                alt="Logo"
              />
            </Box>
          </Link>

          <Box display="flex">
            <Box mr={3}>
              <Typography variant="h6">Watchlist</Typography>
            </Box>
            <Box onClick={logoutHandler} className={classes.pointer}>
              <Typography variant="h6">Logout</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Navbar;
