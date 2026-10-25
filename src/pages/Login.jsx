import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../api";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const cleanUsername = username.trim();

    if (!cleanUsername || !password) {
      setError("Please enter username and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: cleanUsername,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Invalid username or password.");
        return;
      }

      localStorage.setItem("stegano_token", data.token);
      localStorage.setItem("stegano_logged_in", "true");
      localStorage.setItem("stegano_username", data.user.username);

      navigate("/", { replace: true });
    } catch (error) {
      console.error(error);
      setError("Unable to connect to the server. Make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-icon">🔐</div>
        <h1>Welcome Back</h1>
        <p className="login-subtitle">
          Sign in to Random Image Slider Using Image Steganography
        </p>

        <form onSubmit={handleSubmit} className="login-form">
          <label>
            Username
            <input
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError("");
              }}
              placeholder="Enter username"
              autoComplete="username"
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              placeholder="Enter password"
              autoComplete="current-password"
            />
          </label>

          {error && <div className="alert error">⚠ {error}</div>}

          <button className="primary-btn login-btn" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          <button
            type="button"
            className="secondary-btn"
            onClick={() => navigate("/registration")}
          >
            Create New User
          </button>
        </form>
      </div>
    </div>
  );
}
