// React
import React from "react";
import ReactDOM from "react-dom/client";
import { Await } from "react-router-dom";

// Redux
import { store } from "./redux";
import { Provider } from "react-redux";

// App
import "./index.scss";
import "react-datepicker/dist/react-datepicker.css";
import App from "./App";
import AppError from "./screens/AppError.jsx";
import AppLoading from "./screens/AppLoading";
// HTTP
import { createLocalAxiosInstance } from "./config/httpRequests";

import { BrowserRouter, HashRouter } from "react-router-dom";
import { setAuth } from "./redux/features/Auth";
import { authToken } from "./config/httpRequests";
import { populateLocalStorage } from "./utils/temporary";
import { PromiseTimeout } from "./utils/common";
import { useAsyncValue } from "react-router-dom";

// TODO(XENOBAS): Implement Debounce for search inputs....

function initAxios(token) {
  /**
   *  TODO: This could be improved (Maybe the frontend and the backend are not hosted on the same machine...)
   *        Although for all intensive purposes right now it is good.
   */
  const PORT = "3000";
  const HOST = window.location.host.split(":").at(0);
  createLocalAxiosInstance(HOST, PORT, token);
}

/** @param {string} token */
/** @return {boolean} */
async function validateJSONWebToken(token) {
  populateLocalStorage(); // TODO(XENOBAS): Remove this.
  initAxios(token);
  if (!token) return false;
  try {
    const tokenIsValid = await authToken(token);
    return tokenIsValid;
  } catch (error) {
    console.error(error);
    return false;
  }
}

function renderApp(loggedIn) {
  store.dispatch(
    setAuth({
      token: localStorage.getItem("sessionToken") || "",
      loggedIn: loggedIn,
      lastLogin: loggedIn ? Date.now() : -1,
    })
  );
  return (
    <Provider store={store}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <React.Suspense fallback={<AppLoading />}>
      <Await
        resolve={validateJSONWebToken(
          localStorage.getItem("sessionToken") || ""
        )}
        children={renderApp}
        errorElement={<AppError />}
      />
    </React.Suspense>
  </React.StrictMode>
);

postMessage({ payload: "removeLoading" }, "*");
