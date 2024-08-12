import React from "react";
import ReactDOM from "react-dom/client";
// import App from './App';
// import App from './01-父传子';
// import App from './02-子传父';
// import App from './03-兄弟通信';
// import App from './04-跨层通信';
// import App from './05-useEffect.js';
// import App from './06-useEffect.js';
// import App from './07-useEffect-清除副作用';
// import App from "./08-自定义hook的实现.js";
import App from "./09-count-redux.js";
import store from "./store";
import { Provider } from "react-redux";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
