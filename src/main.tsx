import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Login from "./pages/Login.tsx";
import Signup from "./pages/Signup.tsx";
import { Toaster } from "./components/ui/toaster.tsx";
import AuthProvider from "./context/AuthProvider.tsx";
import Layout from "./Layout.tsx";
import ProjectsProvider from "./context/ProjectsProvider.tsx";
import ProjectLayout from "./ProjectLayout.tsx";
import ProjectBoard from "./pages/ProjectBoard.tsx";
import RequireAuth from "./components/RequireAuth.tsx";
import PersistLogin from "./components/PersistLogin.tsx";
import Home from "./pages/Home.tsx";
import UserBoard from "./pages/UsersBoard.tsx";
import AllIssuesProvider from "./context/AllIssuesProvider.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<PersistLogin />}>
        <Route element={<RequireAuth />}>
          <Route element={<Layout />}>
            <Route element={<App />}>
              <Route path="/" element={<Home />} />
              <Route element={<ProjectLayout />}>
                <Route
                  path="project/:projectId/board"
                  element={<ProjectBoard />}
                />
                <Route
                  path="project/:projectId/users"
                  element={<UserBoard />}
                />
              </Route>
            </Route>
          </Route>
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
      </Route>
    </>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <ProjectsProvider>
        <AllIssuesProvider>
          <RouterProvider router={router} />
        </AllIssuesProvider>
      </ProjectsProvider>
    </AuthProvider>
    <Toaster />
  </React.StrictMode>
);
