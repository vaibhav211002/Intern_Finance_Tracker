import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AddTransaction from "./pages/AddTransaction";
import EditTransaction from "./pages/EditTransaction";
import DeleteTransaction from "./pages/DeleteTransaction";
import Register from "./Pages/Register.jsx";
import ProtectedRoute from "./components/ProtectedRoute";


function App() {
  const logout = () => {
    localStorage.removeItem("ft_token");
    window.location.href = "/login";
  };

const isLoggedIn = !!localStorage.getItem("ft_token");

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 20 }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h1 style={{ margin: 0 }}>Finance Tracker</h1>
        <nav>
          {isLoggedIn ? (
            <>
              <Link to="/" style={{ marginRight: 12 }}>Dashboard</Link>
              <Link to="/add" style={{ marginRight: 12 }}>Add</Link>
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </nav>
      </header>

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={
          <ProtectedRoute><Dashboard /></ProtectedRoute>
        } />
        <Route path="/add" element={
          <ProtectedRoute><AddTransaction /></ProtectedRoute>
        } />
        <Route path="/:id/edit" element={
          <ProtectedRoute><EditTransaction /></ProtectedRoute>
        } />
        <Route path="/:id/delete" element={
          <ProtectedRoute><DeleteTransaction /></ProtectedRoute>
        } />
        <Route path="/*" element={
          <div>404 Not Found</div>
        } />
      </Routes>
    </div>
  );
}

export default App;
