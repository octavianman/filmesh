import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Firebase, { db } from "../../services/firebase";

import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";

const SignUp = () => {
  const history = useHistory();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const signUpHandler = async () => {
    if (!firstName) {
      setError("Please enter your first name");
    } else if (!lastName) {
      setError("Please enter your last name");
    } else {
      try {
        const response = await Firebase.auth().createUserWithEmailAndPassword(
          email,
          password
        );

        if (response.user.uid) {
          const user = {
            uid: response.user.uid,
            email,
            firstName,
            lastName,
          };

          db.collection("users").doc(response.user.uid).set(user);

          history.push("/");
        }
      } catch (err) {
        setError(err.message);
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={8}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography variant="h4" align="center">
              Sign up
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  value={firstName}
                  variant="outlined"
                  fullWidth
                  name="firstName"
                  label="First Name"
                  required
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  value={lastName}
                  variant="outlined"
                  fullWidth
                  name="lastName"
                  label="Last Name"
                  required
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Grid>
            </Grid>
            <Box mb={3} mt={3}>
              <TextField
                value={email}
                variant="outlined"
                fullWidth
                name="email"
                id="email"
                label="Email Address"
                required
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
              required
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
              onClick={() => signUpHandler()}
            >
              Sign up
            </Button>

            <Box mt={2}>
              <Link to="/signin">
                <Typography variant="body1" align="center" color="primary">
                  Already have an account? Sign In
                </Typography>
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default SignUp;
