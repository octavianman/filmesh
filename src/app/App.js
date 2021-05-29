import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@material-ui/core";

import LightTheme from "./LightTheme";

import MainContainer from "../components/common/MainContainer";

const pages = {
  home: lazy(() => import("../components/Home/Home")),
  signUp: lazy(() => import("../components/Auth/SignUp")),
};

const App = () => {
  return (
    <ThemeProvider theme={LightTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Switch>
          <MainContainer>
            <Suspense fallback={null}>
              <Switch>
                <Route path="/" component={pages.home} exact />
                <Route path="/signup" component={pages.signUp} exact />
              </Switch>
            </Suspense>
          </MainContainer>
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
