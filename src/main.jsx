import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Home } from "./components/Pages/Home.jsx";
import { Tweets } from "./components/Pages/Tweets.jsx";
import { Profile } from "./components/Pages/Profile.jsx";
import { UserProfile } from "./components/UserProfile.jsx";
import Signup from "./components/Pages/Signup.jsx";
import Login from "./components/Pages/Login.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "tweets",
        element: <Tweets />,
      },
      {
        path: "profile",
        element: <Profile />,
      },

      {
        path: "userprofile/:userId",
        element: <UserProfile />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
