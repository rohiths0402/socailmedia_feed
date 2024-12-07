import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Home from "./pages/Home/home";
import Login from "./pages/Login/login";
import Profile from "./components/UserProfile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        {/* Add more routes here as needed */}
      </Routes>
    </Router>
  );
}

export default App;
