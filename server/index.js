import express from "express";
import morgan from "morgan";
import { Server as SocketServer } from "socket.io";
import http from "http";
import cors from "cors";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
const server = http.createServer(app);
const io = new SocketServer(server, {
  cors: {
    origin: "https://hctrdubs24.github.io/mini-chat-client/",
  },
});
// En el caso de origin de puede agregar un '*' para indicar que se puede conectar cualquiera

// midlewares
app.use(cors());
app.use(morgan("dev"));

io.on("connection", (socket) => {
  console.log(`User ${socket.id} connected`);
  socket.on("message", (message) => {
    console.log(message);
    socket.broadcast.emit("message", {
      body: message,
      from: socket.id,
    });
  });
});

// app.use(express.static(join(__dirname, "../client/build")));

server.listen(process.env.PORT || 4000, () =>
  console.log(`Server listening on port ${process.env.PORT || 4000}`)
);
