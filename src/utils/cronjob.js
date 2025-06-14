const cron = require('node-cron');
const { subDays, startOfDay, endOfDay } = require("date-fns");
const sendEmail = require("./sendEmail.js");
const connectionRequestModel = require("../models/connectionRequest.js");

// This job will run every day at 9:15 AM
cron.schedule("15 9 * * *", async () => {
    // send email to all the people who got the request the previous day
    try {
        const Yesterday = subDays(new Date(), 1);

        const YesterdayStart = startOfDay(Yesterday);
        const YesterdayEnd = endOfDay(Yesterday);

        const pendingRequests = await connectionRequestModel
          .find({
            status: "interested",
            createdAt: {
              $gte: YesterdayStart,
              $lt: YesterdayEnd,
            },
          })
            .populate("fromUserId toUserId");
        
        const listOfEmails = [...new Set(pendingRequests.map((request) => {
            return request.toUserId.email;
        }))];
        console.log("List of emails to send:", listOfEmails);

        for (const email of listOfEmails) {
            try {
                await sendEmail.run("Reminder: You have pending connection requests " , email, "You have pending connection requests that you haven't responded to yet. Please check your profile for more details.");
                // console.log("Email sent to:", res);
            } catch (error) {
                console.error("Error sending email:", error);
            }
        }
    } catch (error) {
        console.error("Error in cron job:", error);
    }
});
