import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import OtpVerification from "./pages/OtpVerification";
import Toaster from "react-hot-toast";
import PrivateRoute from "./components/PrivateRoute";
import Intigration from "./components/Intigration";
import Settings from "./components/Settings";
import Submissions from "./components/Submissions";
import FromNotSelect from "./components/FromNotSelect";
// Lazy load the components
const Home = lazy(() => import("./pages/Home"));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          >
            <Route
              path="/dashboard/form/submissions"
              element={<Submissions />}
            />
            <Route
              path="/dashboard/form/intigration"
              element={<Intigration />}
            />
            <Route path="/dashboard/form" element={<FromNotSelect />} />
            <Route path="/dashboard/form/setting" element={<Settings />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />

          <Route path="/signup/OtpVerification" element={<OtpVerification />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
