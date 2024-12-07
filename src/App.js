import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Home from "./pages/Home/home";
import Login from "./pages/Login/login";
import Profile from "./components/UserProfile";
import Edit from "./components/editProfile";
import Preview from "./components/postpreview";
import Upload from "./components/upload";
import Popup from "./components/popup";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit" element={<Edit />} />
        <Route path="/preview" element={<Preview />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/popup" element={<Popup />} />
        {/* Add more routes here as needed */}
      </Routes>
    </Router>
  );
}

export default App;
