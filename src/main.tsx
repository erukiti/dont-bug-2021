import React from "react";
import ReactDOM from "react-dom";
import { Outlet, ReactLocation, Router } from "react-location";

import { Contest } from "~/pages/Contest";
import { Top } from "~/pages/Top";
import { AuthProvider } from "~/parts/Auth";
import { CreatePage } from "~/pages/Create";

import "~/index.css";
import { useAuth } from "~/logics/auth";
import { Header } from "~/parts/Header";

const location = new ReactLocation();

const Routing = () => {
  return (
    <Router location={location} routes={[{ path: "/", element: <Top /> }]}>
      <Outlet />
    </Router>
  );
};

const AuthorizedRouting = () => {
  const auth = useAuth();

  if (auth.isLoading) {
    return <div>loading</div>;
  }

  if (!auth.uid) {
    return <Top />;
  }

  return (
    <Router
      location={location}
      routes={[
        { path: "/create", element: <CreatePage /> },
        { path: ":contestId", element: <Contest /> },
      ]}
    >
      <Header />
      <Outlet />
    </Router>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <Routing />
      <AuthorizedRouting />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
