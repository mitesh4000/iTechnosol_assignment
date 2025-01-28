// App.js
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./login"; // Your About page component
import RegisterPage from "./register";
import TaskListing from "./task";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TaskListing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
};

export default App;
