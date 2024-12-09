import React from "react";
import DashbaordHeader from "../components/DashbaordHeader";
import DashboardContent from "../components/DashboardContent";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet";
const Dashboard = () => {
  return (
    <div className=" h-full w-full bg-slate-100">
      <Helmet>
        <title>Dashboard - EazyForm</title>
        <meta
          name="description"
          content="Manage your forms and submissions seamlessly with the EazyForm Dashboard."
        />
      </Helmet>
      <DashbaordHeader></DashbaordHeader>
      <DashboardContent />
      <Footer />
    </div>
  );
};

export default Dashboard;
