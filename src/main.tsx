import React from "react";
import ReactDOM from "react-dom";
import { Outlet, ReactLocation, Router } from "react-location";

import { Contest } from "~/pages/Contest";
import { UnauthorizedTop, Top } from "~/pages/Top";
import { AuthProvider } from "~/parts/Auth";
import { CreatePage } from "~/pages/Create";

import "~/index.css";
import { useAuth } from "~/logics/auth";
import { Header } from "~/parts/Header";

const location = new ReactLocation();

const Routing = () => {
  const auth = useAuth();

  if (auth.isLoading) {
    return <div>loading</div>;
  }

  if (!auth.uid) {
    return <UnauthorizedTop />;
  }

  return (
    <Router
      location={location}
      routes={[
        { path: "/", element: <Top /> },
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
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
