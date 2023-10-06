const express = require("express");
const {
  MongoClient,
  MongoClientOptions,
  ServerApiVersion,
} = require("mongodb");
const cors = require("cors");
const { Server } = require("socket.io"); // Add this
http = require("http");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

app.use(cors());
app.use(express.json());
const client = new MongoClient(process.env.DB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// Add this
// Listen for when the client connects via socket.io-client
io.on("connection", (socket) => {
  console.log(`User connected ${socket.id}`);
  socket.emit("message", "welcome to chatApp", socket.id);
  // We can write our socket event listeners in here...
  socket.broadcast.emit("message", "A user has joined the chat", socket.id);
  socket.on("send", (message) => {
    io.emit("message", message, socket.id);
  });
  socket.on("disconnect", () => {
    io.emit("message", "A user has left the chat", socket.id);
  });
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    return await client.db(process.env.DB_NAME).command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    console.log("closing");
    // await client.close();
  }
}
run()
  .then(async (res) => {
    console.log(res);
    const db = client.db("test");
    // await db.createCollection("SSSIT");
    const col = await db.listCollections().toArray();
    const coll = await db.collection("users");
    let resp = await coll.find().toArray();
    console.log(col);
  })
  .catch(console.dir);
server.listen(PORT, () => "Server is running on port 3000");
