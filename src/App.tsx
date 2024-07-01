import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./components/layout/Auth/Login";
import Register from "./components/layout/Auth/Register";
import Home from "./components/layout/Home/Home";
import Admin from "./components/layout/Admin/Admin";
import { AuthProvider, useAuth } from "./components/layout/Auth/AuthContext";

const PrivateRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" />;
};

const AfterLogin: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { token } = useAuth();
  return token ? <Navigate to="/admin" /> : children;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={
              <AfterLogin>
                <Login />
              </AfterLogin>
            }
          />
          <Route
            path="/register"
            element={
              <AfterLogin>
                <Register />
              </AfterLogin>
            }
          />
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <Admin />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
