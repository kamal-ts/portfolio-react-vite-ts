import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./components/Layout/Auth/Login";
import Register from "./components/Layout/Auth/Register";
import Home from "./components/Layout/Home/Home";
import Admin from "./components/Layout/Admin/Admin";
import { AuthProvider, useAuth } from "./components/Layout/Auth/AuthContext";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/common/Navbar/Navbar";
import ListProject from "./components/Layout/Project/ListProject";
// import Sidebar from "./components/common/Sidebar/Sidebar";

const PrivateRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" />;
};

const AfterLogin: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { token } = useAuth();
  return token ? <Navigate to="/admin" /> : children;
};

const Layout: React.FC<{ children: JSX.Element }> = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <ToastContainer />
    </>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={[
              <AfterLogin>
                <Login />
              </AfterLogin>,
              <ToastContainer />,
            ]}
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
                <Layout children={<Admin />} />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/project"
            element={
              <PrivateRoute>
                <Layout children={<ListProject />} />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
