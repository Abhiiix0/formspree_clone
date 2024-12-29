import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import ForgetPassword from "./pages/ForgetPassword";
// import Dashboard from "./pages/Dashboard";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import OtpVerification from "./pages/OtpVerification";
// import PrivateRoute from "./components/PrivateRoute";
// import FromNotSelect from "./components/FromNotSelect";
// import Intigration from "./components/Intigration";
// import Account from "./pages/Account";
// import PageNotFound from "./pages/PageNotFound";
// import ThankYouPage from "./pages/ThankYouPage";
// import SubmissionLimitReached from "./pages/SubmissionLimitReached";
// import Contact from "./pages/Contact";

// Lazy load the components
const Home = lazy(() => import("./pages/Home"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const FromNotSelect = lazy(() => import("./components/FromNotSelect"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const PrivateRoute = lazy(() => import("./components/PrivateRoute"));
const OtpVerification = lazy(() => import("./pages/OtpVerification"));

const Intigration = lazy(() => import("./components/Intigration"));
const Account = lazy(() => import("./pages/Account"));
const Contact = lazy(() => import("./pages/Contact"));
const SubmissionLimitReached = lazy(() =>
  import("./pages/SubmissionLimitReached")
);
const ThankYouPage = lazy(() => import("./pages/ThankYouPage"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

const App = () => {
  return (
    <Router>
      <AppProvider>
        <Suspense
          fallback={
            <div className=" h-screen grid place-content-center">
              {" "}
              <p>
                <span className=" font-medium text-2xl text-gray-600">
                  Loading...{" "}
                </span>
                <Spin indicator={<LoadingOutlined spin />} size="large" />
              </p>
            </div>
          }
        >
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
            <Route
              path="/account"
              element={
                <PrivateRoute>
                  <Account />
                </PrivateRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/forget-password" element={<ForgetPassword />} />
            <Route path="/signup" element={<Register />} />

            <Route
              path="/signup/OtpVerification"
              element={<OtpVerification />}
            />
            <Route path="/thankyousubmiting" element={<ThankYouPage />} />

            <Route path="/contact" element={<Contact />} />
            <Route
              path="/submission-limit-Reached"
              element={<SubmissionLimitReached />}
            />
            <Route path="/*" element={<PageNotFound />} />
          </Routes>
        </Suspense>
      </AppProvider>
    </Router>
  );
};

export default App;
