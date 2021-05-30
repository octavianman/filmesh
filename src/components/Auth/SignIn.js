import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import Firebase from "../../services/firebase";

import { getUser } from "../../store/actions";

import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";

const SignIn = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const signInHandler = async () => {
    try {
      const response = await Firebase.auth().signInWithEmailAndPassword(
        email,
        password
      );

      dispatch(getUser(response.user));

      history.push("/");
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    Firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        history.replace("/");
      }
    });
  }, [history]);

  return (
    <Container maxWidth="sm">
      <Box mt={8}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography variant="h4" align="center">
              Sign in
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Box mb={3}>
              <TextField
                value={email}
                variant="outlined"
                fullWidth
                name="email"
                id="email"
                label="Email Address"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Box>

            <TextField
              value={password}
              variant="outlined"
              fullWidth
              name="password"
              id="password"
              label="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />

            {error !== "" && (
              <Box mt={1} color="error.main">
                *{error}
              </Box>
            )}
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => signInHandler()}
            >
              Sign in
            </Button>

            <Box mt={2}>
              <Link to="/signup">
                <Typography variant="body1" align="center" color="primary">
                  Don't have an account? Sign Up
                </Typography>
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default SignIn;
