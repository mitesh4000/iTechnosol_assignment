import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/protectedRoute.tsx";
import "./index.css";
import LoginPage from "./login.tsx";
import RegisterPage from "./register.tsx";
import { store } from "./store.ts";
import TaskListing from "./task.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<TaskListing />} />
          </Route>

          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/counter" element={<RegisterPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
