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
import AuthLayout from "./components/AuthLayout.jsx";
import Login from "./components/Pages/Login.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/tweets",
        element: (
          <AuthLayout authentication>
            <Tweets />
          </AuthLayout>
        ),
      },
      {
        path: "profile",
        element: (
          <AuthLayout authentication>
            <Profile />
          </AuthLayout>
        ),
      },

      {
        path: "userprofile/:id",
        element: <UserProfile />,
      },
      {
        path: "signup",
        element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        ),
      },
      {
        path: "login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
