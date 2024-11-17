import React from "react";
import DashbaordHeader from "../components/DashbaordHeader";
import DashboardContent from "../components/DashboardContent";
import Footer from "../components/Footer";

const Dashboard = () => {
  return (
    <div className=" h-full w-full bg-slate-100">
      <DashbaordHeader></DashbaordHeader>
      <DashboardContent />
      <Footer />
    </div>
  );
};

export default Dashboard;
