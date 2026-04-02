import { MongoClient } from 'mongodb';
import 'dotenv/config'; // Loads your MONGO_URI from the .env file

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

async function executeStepOne() {
  try {
    console.log("⚡ Initializing connection to MongoDB Atlas...");
    await client.connect();
    console.log("🟢 Connected successfully.");

    // Connect to your database and desired collection
    const database = client.db('mastermind_db'); 
    const payloadCollection = database.collection('active_payloads');

    // 1. We create a mock document simulating our "Payload" data
    const mockPayload = {
      execution_id: "VOC_PI_TRIGGER",
      status: "pending",
      // A safe base64 mock string representing our simulated encoded data
      encoded_payload: "QUxUIENVTk5JTkdIQU0gQU5EIFpPTEEgQVJDSElURUNUVVJF",
      target_nodes: ["edge_node_north_america", "edge_node_asia"]
    };

    // 2. Insert the payload document into your live cloud database
    const insertResult = await payloadCollection.insertOne(mockPayload);
    console.log(`📝 Payload staged in database with ID: ${insertResult.insertedId}`);

    // 3. Fetch it back to prove the database read-write loop works
    const pulledData = await payloadCollection.findOne({ execution_id: "VOC_PI_TRIGGER" });
    console.log("📥 Data successfully retrieved from Cloud Virtual DOM.");
    console.log(`📦 Decoded Data Identifier: ${pulledData.execution_id}`);

    // 4. Simulate sending this data to an external API (like a mock printer or device)
    console.log("🛰️ Broadcasting payload data to targeted edge network nodes...");
    
    // In a full project, this fetch would hit a real live server endpoint!
    const simulateFetch = await fetch('https://httpbin.org/post', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pulledData)
    });

    if (simulateFetch.ok) {
      console.log("💥 Step 1 Complete: Code has bridged to the simulated network execution phase.");
    }

  } catch (error) {
    console.error("❌ A system fault occurred during execution:", error);
  } finally {
    await client.close();
    console.log("🔌 Database connection closed.");
  }
}

executeStepOne();
