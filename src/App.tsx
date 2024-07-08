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
import { AuthProvider, useAuth } from "./components/Layout/Auth/AuthContext";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/common/Navbar/Navbar";
// import ListProject from "./components/Layout/Admin/Project/ListProject";
import Profile from "./components/Layout/Admin/Profile/Profile";
import Dashboard from "./components/Layout/Admin/Dashboard/Dashboard";
import Project from "./components/Layout/Admin/Project";
import Sidebar2 from "./components/common/Sidebar/Sidebar2";
import Modal from "./components/common/Modal/Modal";
import ProductList from "./components/common/List/ProductList";
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
                <Layout children={<Dashboard />} />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/project"
            element={
              <PrivateRoute>
                <Layout children={<Project />} />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/profile"
            element={
              <PrivateRoute>
                <Layout children={<Profile />} />
              </PrivateRoute>
            }
          />

          <Route
            path="/sidebar"
            element={
              <PrivateRoute>
                <Sidebar2/>
              </PrivateRoute>
            }
          />
          <Route
            path="/modal"
            element={
              <PrivateRoute>
                <Modal/>
              </PrivateRoute>
            }
          />

          <Route
            path="/list"
            element={
              <PrivateRoute>
                <ProductList/>
              </PrivateRoute>
            }
          />

        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
