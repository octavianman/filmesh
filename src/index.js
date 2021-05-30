import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import App from "./app/App";

import { createReduxStore } from "./services/store";
import reducers from "./store/reducers";

export const store = createReduxStore(reducers);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
