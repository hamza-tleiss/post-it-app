import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { Provider } from "react-redux";
import postreducer from "./store/reducer/PostReducer";
import trashreducer from "./store/reducer/TrashReducer";
import favoritepostreducer from "./store/reducer/FavoritePostReducer";
import thunk from "redux-thunk";
import { authReducer } from "./store/reducer/AuthReducer";
const reducer = combineReducers({
  post: postreducer,
  trash: trashreducer,
  favorite: favoritepostreducer,
  auth: authReducer,
});

const store = createStore(reducer, compose(applyMiddleware(thunk)));
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
