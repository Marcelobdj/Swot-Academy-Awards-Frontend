import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUsers } from "../api";
import '../styles/LoginPage.css';

const LoginPage = () => {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsersData();
  }, []);

  const fetchUsersData = async () => {
    try {
      const response = await fetchUsers();
      setUsers(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = users.find((user) => user.username === username && user.password === password);

    if (user) {
      if (user.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/voting-page");
      }
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="login-page">
      <h1>Swot Academy Awards</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default LoginPage;