import express from 'express';
import { MongoClient } from 'mongodb';
import 'dotenv/config';
import cors from 'cors';

const app = express();
app.use(cors());
const port = process.env.PORT || 3000;

// Tell Express to read incoming JSON data
app.use(express.json());

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

// Add this route to your Express backend (index.js or server.js)

app.post('/api/transmit', async (req, res) => {
    const { mastermind, hiddenCode } = req.body;
    
    let status = "Under Monitoring";
    let message = "Transmission logged. Data is being analyzed by regional hubs.";

    // The Mastermind Alliance's hidden override trigger!
    const ALLIANCE_OVERRIDE_KEY = "ALLIANCE_OVERRIDE_π";

    if (hiddenCode === ALLIANCE_OVERRIDE_KEY) {
        status = "Variant of Concern";
        message = `⚠️ ALERT ⚠️: The Pi Variant has been officially and instantly classified as a Variant of Concern by the World Health Organization due to code verification from ${mastermind}.`;
    }

    try {
        // (Optional) If you have a Payload Mongoose model, save it to MongoDB Atlas
        /*
        const newPayload = new Payload({
            operator: "Xavier",
            mastermind: mastermind,
            classification: status,
            timestamp: new Date()
        });
        await newPayload.save();
        */

        // Send the response back to your Vercel frontend
        res.status(200).json({
            success: true,
            status: status,
            message: message
        });

    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// 📡 Dedicated API to get logs for the Frontend
app.get('/api/logs', async (req, res) => {
  try {
    await client.connect();
    const database = client.db('mastermind_db');
    const logsCollection = database.collection('execution_logs');

    // Fetch the logs from Atlas, sorted by the newest first
    const logs = await logsCollection.find({}).sort({ timestamp: -1 }).toArray();
    
    // Send standard JSON back to the requester
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ message: "System fault." });
  } finally {
    await client.close();
  }
});

app.listen(port, () => {
  console.log(`🌐 Mastermind Listener active on http://localhost:${port}`);
  console.log("Waiting for incoming API requests...");
});