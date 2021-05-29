import React, { useState } from "react";
import { useHistory } from "react-router-dom";
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

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const signUpHandler = async () => {
    try {
      const response = await Firebase.auth().createUserWithEmailAndPassword(
        email,
        password
      );

      if (response.user.uid) {
        const user = {
          uid: response.user.uid,
          email: email,
        };

        db.collection("users").doc(response.user.uid).set(user);

        history.push("/");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography variant="h4" align="center">
            Sign up
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

          {error !== "" && <Box color="error.main">{error}</Box>}
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
        </Grid>
      </Grid>
    </Container>
  );
};

export default SignUp;
