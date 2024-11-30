import { Progress } from "antd";
import React from "react";

const SubmissionUsage = ({ submissionsuse, submissionlimit }) => {
  console.log("hi");
  function calculatePercentage(submissionsUse, submissionLimit) {
    if (!submissionLimit || submissionLimit === 0) return 0; // Prevent division by zero
    const percent = (submissionsUse / submissionLimit) * 100;
    return Math.min(percent, 100); // Ensure it doesn't exceed 100%
  }
  return (
    <div>
      {" "}
      <div className=" bg-white shadow rounded-md ">
        <p className="border-b uppercase py-3 px-3 text-sm font-medium">
          Usage
        </p>
        <div className="p-3 flex flex-col gap-2">
          <div className="flex flex-col">
            <p className="text-lg font-semibold">Total Submissions</p>
            <div className=" flex flex-col gap-1 w-full">
              <p className=" font-semibold text-xl text-gray-500">
                <span className=" text-black mr-[4px]">
                  {submissionsuse || 0}
                </span>
                / {submissionlimit}
              </p>
              <Progress
                percent={calculatePercentage(submissionsuse, submissionlimit)}
                size={{ height: "14px" }}
                showInfo={false}
                strokeColor={
                  calculatePercentage(submissionsuse, submissionlimit) >= 90 &&
                  "red"
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(SubmissionUsage);
