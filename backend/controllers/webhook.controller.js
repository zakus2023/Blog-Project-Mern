import { Webhook } from "svix";
import User from "../models/user.model.js";

import dotenv from 'dotenv'
dotenv.config()

export const clerkWebhook = async (req, res) => {
    try {
        // Get the secret from the .env
        const CLERK_WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
        // console.log("CLERK_WEBHOOK_SECRET:", CLERK_WEBHOOK_SECRET);

        // Check if secret exists
        if (!CLERK_WEBHOOK_SECRET) {
            throw new Error("Webhook Secret Needed");
        }

        const payload = req.body;
        const headers = req.headers; // Fixed typo

        const wh = new Webhook(CLERK_WEBHOOK_SECRET);
        let evt;

        // Verify the webhook payload
        try {
            evt = wh.verify(payload, headers);
        } catch (error) {
            return res.status(400).json({ message: "Webhook verification failed", error: error.message });
        }

        // Handle the `user.created` event
        if (evt.type === "user.created") {
            const email = evt.data?.email_addresses?.[0]?.email_address;

            // Ensure email exists before proceeding
            if (!email) {
                return res.status(400).json({ message: "Email address not found in the event data" });
            }

            // Create the user in MongoDB
            const newUser = new User({
                clerkUserId: evt.data.id,
                username: evt.data.username || email,
                email: email,
                img: evt.data.profile_img_url,
            });

            await newUser.save();
        } else {
            // Return for events other than `user.created`
            return res.status(200).json({ message: "Unhandled event type" });
        }

        // Success response
        return res.status(201).json({ message: "Webhook received and processed" });
    } catch (error) {
        console.error("Error processing webhook:", error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};