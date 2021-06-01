import React, { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import Firebase from "../services/firebase";

import { CssBaseline, ThemeProvider } from "@material-ui/core";
import { createReduxStore } from "../services/store";
import { getUser } from "../store/actions";

import LightTheme from "./LightTheme";
import reducers from "../store/reducers";

import Footer from "../components/Footer/Footer";
import MainContainer from "../components/common/MainContainer";
import Navbar from "../components/Navbar/Navbar";
import PrivateRoute from "../components/common/PrivateRoute";

const pages = {
  discoverList: lazy(() => import("../components/Discover/DiscoverList")),
  home: lazy(() => import("../components/Home/Home")),
  movie: lazy(() => import("../components/Movie/Movie")),
  signIn: lazy(() => import("../components/Auth/SignIn")),
  signUp: lazy(() => import("../components/Auth/SignUp")),
};

export const store = createReduxStore(reducers);

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    Firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch(getUser(user));
      }
    });
  }, [dispatch]);

  return (
    <ThemeProvider theme={LightTheme}>
      <CssBaseline />

      <BrowserRouter>
        <Switch>
          <MainContainer>
            <Suspense fallback={null}>
              <Switch>
                <Route path="/signin" component={pages.signIn} exact />
                <Route path="/signup" component={pages.signUp} exact />

                <PrivateRoute path="/">
                  <Navbar />

                  <Switch>
                    <Route path="/" component={pages.home} exact />
                    <Route
                      path="/discover/:genre"
                      component={pages.discoverList}
                      exact
                    />
                    <Route path="/movie/:id" component={pages.movie} exact />
                    <Redirect to="/404" />
                  </Switch>

                  <Footer />
                </PrivateRoute>
              </Switch>
            </Suspense>
          </MainContainer>
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
