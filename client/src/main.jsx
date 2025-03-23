import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./utils/redux/store.js";

import Router from "./router.jsx";
//import withRoleAuthorization from './components/Auth/Protected.jsx'

// const AuthenticatedDashboard=withRoleAuthorization(Dashboard,["admin"]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Router />
  </Provider>
);
