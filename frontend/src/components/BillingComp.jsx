import React from "react";
import SubmissionUsage from "./SubmissionUsage";
import { useAppContext } from "../context/AppContext";

const BillingComp = () => {
  const { user } = useAppContext();
  return (
    <div>
      <SubmissionUsage
        submissionlimit={user?.submissionlimit}
        submissionsuse={user?.submissionsuse}
      />
      <div className=" grid place-content-center font-semibold text-2xl text-gray-300 shadow rounded-md h-[400px] w-full bg-white mt-3">
        Cooming soon
      </div>
    </div>
  );
};

export default BillingComp;
