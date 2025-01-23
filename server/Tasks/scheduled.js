//contains the code to refresh daily news

import cron from "node-cron";
import { refreshDailyNews } from "../Controllers/dailyNews.js";

const updateDailyNews = async () => {
  try {
    console.log("Scheduled task is running");
    await refreshDailyNews(); // Example task
  } catch (error) {
    console.error("Error running the scheduled task:", error);
  }
};

// Schedule the task to run every day at 6 AM local time
cron.schedule(
  "0 6 * * *",
  () => {
    console.log("Running the scheduled task at 6 AM");
    updateDailyNews();
  },
  {
    timezone: "Asia/Dubai",
  }
);
