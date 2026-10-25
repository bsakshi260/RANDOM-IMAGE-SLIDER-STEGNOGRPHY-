import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  Navigate,
  useNavigate,
} from "react-router-dom";

import Encode from "./pages/Encode";
import Decode from "./pages/Decode";
import Slider from "./pages/Slider";
import Login from "./pages/Login";
import Registration from "./pages/Registration";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("stegano_token");
  return token ? children : <Navigate to="/login" replace />;
}

function AppLayout() {
  const navigate = useNavigate();
  const username = localStorage.getItem("stegano_username") || "User";

  function handleLogout() {
    localStorage.removeItem("stegano_token");
    localStorage.removeItem("stegano_logged_in");
    localStorage.removeItem("stegano_username");
    navigate("/login", { replace: true });
  }

  return (
    <div className="app">
      <header className="navbar"  style={{
          width: "100%",
          minHeight: "50px",
          display: "flex",
          alignItems: "center",
          backgroundColor: "#0001",
          padding: "10px 20px",
          boxSizing: "border-box",
        }}>
        <div className="logo">🔐 Steganography</div>

        <nav  style={{marginLeft:"10px",
            display: "flex",
            gap: "20px",
            alignItems: "center",
          }}>
          <NavLink to="/" end>
            Encode
          </NavLink>
          <NavLink to="/decode">
            Decode
          </NavLink>
          {/* <NavLink to="/slider">
            Image Slider
          </NavLink> */}
        </nav>

        <div className="user-area">
          <span className="welcome-user">👤 {username}</span>
          <button type="button" className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Encode />} />
          <Route path="/decode" element={<Decode />} />
          {/* <Route path="/slider" element={<Slider />} /> */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />

        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
