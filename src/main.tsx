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

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route path="" element={<App />} />
        <Route path="" element={<ProjectLayout />}>
          <Route path="project/:projectId/board" element={<ProjectBoard />} />
          <Route path="project/:projectId/timeline" element={<div>Timeline</div>} />
        </Route>
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Signup />} />
    </>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <ProjectsProvider>
        <RouterProvider router={router} />
      </ProjectsProvider>
    </AuthProvider>
    <Toaster />
  </React.StrictMode>
);
