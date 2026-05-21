import dotenv from "dotenv";
dotenv.config();

import http from "http";
import { Server } from "socket.io";

import app from "./app.js";
import { connectDB } from "./db/index.js";
import { initSocket } from "./socket/socketManager.js";
import { initIO } from "./socket/io.js"; 


const port = process.env.PORT || 8000;

//http server
const httpServer = http.createServer(app);

// setup socket server
const io = new Server(httpServer, {
  cors: {
    origin: CORS_ORIGIN,
    credentials: true,
  },
});

// Store io globally so controllers can import getIO()
initIO(io); 

//hand off all socket logic to socketManager
initSocket(io);

connectDB()
  .then(() => {
    httpServer.listen(port, () => {
      console.log("serveer is running on port: ", port);
    });
  })

  .catch((error) => {
    console.log("mogo db connection failed: ", error);
  });
