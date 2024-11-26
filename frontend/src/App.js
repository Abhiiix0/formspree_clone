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
import PageNotFound from "./pages/PageNotFound";
import Account from "./pages/Account";
import { AppProvider } from "./context/AppContext";
// Lazy load the components
const Home = lazy(() => import("./pages/Home"));

const App = () => {
  return (
    <Router>
      <AppProvider>
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
              <Route path="/dashboard/form/:id" element={<Intigration />} />
              <Route path="/dashboard" element={<FromNotSelect />} />
            </Route>
            <Route path="/account" element={<Account />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Register />} />

            <Route
              path="/signup/OtpVerification"
              element={<OtpVerification />}
            />
            <Route path="/*" element={<PageNotFound />} />
          </Routes>
        </Suspense>
      </AppProvider>
    </Router>
  );
};

export default App;
