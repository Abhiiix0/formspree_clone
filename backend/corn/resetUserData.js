// /cron/resetUserData.js

import cron from "node-cron";
import UserModel from "../model/UserModel.js";

const resetUserData = () => {
  //for 2 min */2 * * * *
  // for 1 month 0 0 1 * *
  cron.schedule("0 0 1 * *", async () => {
    console.log("Resetting submission limits for all users...");

    try {
      // Reset submissionLimit for all users
      await UserModel.updateMany({}, { $set: { submissionsuse: 0 } });
      //   await UserModel.bulkSave();

      console.log("Submission limits reset completed.");
    } catch (error) {
      console.error("Error while resetting submission limits:", error);
    }
  });
};

export default resetUserData;
