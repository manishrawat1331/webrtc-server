// const port = process.env.PORT || 5050;
// const http = require("http");
// const express = require("express");
// const app = express();
// const server = http.createServer(app);
// const { Server } = require("socket.io");
// const IO = new Server(server, {
//   cors: {
//     origin: "*",
//     methods: ["GET", "POST"],
//   },
// });

// // Map to track custom user IDs with their socket IDs
// const userSocketMap = new Map();

// // Middleware for caller ID verification
// IO.use((socket, next) => {
//   const callerId = socket.handshake.query.callerId;
//   if (callerId) {
//     socket.user = callerId;
//     next();
//   } else {
//     console.error("Connection attempt with missing caller ID");
//     next(new Error("Invalid caller ID"));
//   }
// });

// IO.on("connection", (socket) => {
//   const userId = socket.user;
//   console.log(`User ${userId} connected with socket ID ${socket.id}`);

//   // Store the callerId and corresponding socket.id in the map
//   userSocketMap.set(userId, socket.id);
//   console.log(`Current user map:`, userSocketMap);

//   // Handle initiating a call
//   socket.on("callUser", ({ callerId, calleeId }) => {
//     // checking if the caller oor callee id is empty
//     if (!callerId || !calleeId) {
//       console.error("Caller ID or Callee ID missing in callUser event");
//       socket.emit("callFailed", {
//         message: "Caller ID or Callee ID missing.",
//       });
//       return;
//     }

//     const calleeSocketId = userSocketMap.get(calleeId);
//     if (calleeSocketId) {
//       console.log(`User ${callerId} is calling ${calleeId}`);
//       // calling the your
//       IO.to(calleeSocketId).emit("incomingCall", {
//         callerId: callerId,
//         message: `User ${callerId} is calling you.`,
//       });
//     } else {
//       console.log(`Callee with ID ${calleeId} is not connected`);
//       socket.emit("callFailed", {
//         calleeId: calleeId,
//         message: "Callee is not connected.",
//       });
//     }
//   });

//   // Handle accepting a call
//   socket.on("acceptCall", ({ callerId }) => {
//     const callerSocketId = userSocketMap.get(callerId);
//     if (callerSocketId) {
//       console.log(`Call accepted by ${userId} for ${callerId}`);
//       IO.to(callerSocketId).emit("acceptedCall", {
//         calleeId: userId,
//         reply: "Accept",
//       });
//     } else {
//       console.error(`Caller with ID ${callerId} is not connected`);
//     }
//   });

//   // Handle rejecting a call
//   socket.on("rejectCall", ({ callerId }) => {
//     const callerSocketId = userSocketMap.get(callerId);
//     if (callerSocketId) {
//       console.log(`Call rejected by ${userId} for ${callerId}`);
//       IO.to(callerSocketId).emit("rejectedCall", {
//         calleeId: userId,
//         reply: "Reject",
//       });
//     } else {
//       console.error(`Caller with ID ${callerId} is not connected`);
//     }
//   });

//   // making call if the call is accepted by the callee
//   socket.on("makeCall", (data) => {
//     const { calleeId, sdpOffer: sdpOffer } = data;
//     console.log(`${calleeId} is callee and sdp ${sdpoffer}`);

//     console.log(`call initated by ${userId} to ${calleeId}`);
//     const calleeSocketId = userSocketMap.get(calleeId);
//     if (calleeSocketId) {
//       console.log(`User ${socket.user} is calling ${calleeId}`);
//       // calling the your
//       IO.to(calleeSocketId).emit("newCall", {
//         callerId: socket.user,
//         sdpOffer: sdpOffer,
//       });
//     } else {
//       console.log(`Callee with ID ${calleeId} is not connected`);
//       socket.emit("callFailed", {
//         calleeId: calleeId,
//         message: "Callee is not connected.",
//       });
//     }
//   });

//   // Sending the ICECandidate
//   socket.on("IceCandidate", (data) => {
//     const { calleeId, iceCandidate } = data;
//     console.log(`${socket.user} is sending an ICE candidate to ${calleeId}`);

//     const calleeSocketId = userSocketMap.get(calleeId);
//     if (calleeSocketId) {
//       console.log(`User ${callerId} is calling ${calleeId}`);
//       // calling the your
//       IO.to(calleeSocketId).emit("IceCandidate", {
//         sender: socket.user,
//         iceCandidate: iceCandidate,
//       });
//     } else {
//       console.log(`Callee with ID ${calleeId} is not connected`);
//       socket.emit("callFailed", {
//         calleeId: calleeId,
//         message: "Callee is not connected.",
//       });
//     }
//   });

//   //Answer to the caller
//   // Handle answering a call
//   socket.on("answerCall", (data) => {
//     console.log("while answer call data:", data);
//     const { callerId, sdpAnswer } = data;
//     console.log(`${socket.user} answered the call from ${callerId}`);

//     // here it will send the caller that the callee answered the call
//     const calleeSocketId = userSocketMap.get(calleeId);
//     if (calleeSocketId) {
//       console.log(`User ${callerId} is calling ${calleeId}`);
//       // calling the your
//       IO.to(calleeSocketId).emit("callAnswered", {
//         callee: socket.user,
//         sdpAnswer: sdpAnswer,
//       });
//     } else {
//       console.log(`Callee with ID ${calleeId} is not connected`);
//       socket.emit("callFailed", {
//         calleeId: calleeId,
//         message: "Callee is not connected.",
//       });
//     }
//   });

//   // Clean up on disconnect
//   socket.on("disconnect", () => {
//     console.log(`User ${userId} disconnected`);
//     // Remove the user from the map on disconnect
//     userSocketMap.delete(userId);
//     console.log(`User ${userId} removed. Current user map:`, userSocketMap);
//   });
// });

// // Route for server status check
// app.get("/", (req, res) => {
//   return res.status(200).json({
//     message: "This is a signaling server which is working properly",
//   });
// });

// // Start the server
// server.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

const port = process.env.PORT || 4004;
const http = require("http");
const express = require("express");
const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
const IO = new Server(
  server
  //   {
  //   cors: {
  //     origin: "*",
  //     methods: ["GET", "POST"],
  //   },
  // }
);

// Map to track custom user IDs with their socket IDs
const userSocketMap = new Map();

// Middleware for caller ID verification
IO.use((socket, next) => {
  const callerId = socket.handshake.query.callerId;
  if (callerId) {
    socket.user = callerId;
    next();
  } else {
    console.error("Connection attempt with missing caller ID");
    next(new Error("Invalid caller ID"));
  }
});

// Utility function to send error messages to clients
function emitError(socket, event, message) {
  socket.emit(event, { success: false, message });
}

IO.on("connection", (socket) => {
  const userId = socket.user;
  console.log(`User ${userId} connected with socket ID ${socket.id}`);

  // Store the user ID and corresponding socket ID in the map
  userSocketMap.set(userId, socket.id);
  console.log(`Current user map:`, userSocketMap);

  // Handle initiating a call
  socket.on("callUser", ({ callerId, calleeId }) => {
    if (!callerId || !calleeId) {
      console.error("Caller ID or Callee ID missing in callUser event");
      emitError(socket, "callFailed", "Caller ID or Callee ID missing.");
      return;
    }

    const calleeSocketId = userSocketMap.get(calleeId);
    if (calleeSocketId) {
      console.log(`User ${callerId} is calling ${calleeId}`);
      IO.to(calleeSocketId).emit("incomingCall", {
        callerId,
        message: `User ${callerId} is calling you.`,
      });
    } else {
      console.log(`Callee with ID ${calleeId} is not connected`);
      emitError(socket, "callFailed", "Callee is not connected.");
    }
  });

  // Handle accepting a call
  socket.on("acceptCall", (data) => {
    var callerId = data["callerId"];
    var reply = data["reply"];
    const callerSocketId = userSocketMap.get(callerId);
    console.log(`This is the ${reply}`);
    if (callerSocketId) {
      console.log(`Call accepted by ${userId} for ${callerId}`);
      IO.to(callerSocketId).emit("accept", {
        calleeId: userId,
        reply: "accept",
      });
    } else {
      emitError(
        socket,
        "callFailed",
        `Caller with ID ${callerId} is not connected.`
      );
    }
  });

  // Handle rejecting a call
  socket.on("rejectCall", ({ callerId }) => {
    const callerSocketId = userSocketMap.get(callerId);
    if (callerSocketId) {
      console.log(`Call rejected by ${userId} for ${callerId}`);
      IO.to(callerSocketId).emit("reject", {
        calleeId: userId,
        reply: "Reject",
      });
    } else {
      emitError(
        socket,
        "callFailed",
        `Caller with ID ${callerId} is not connected.`
      );
    }
  });

  // Handle making a call
  socket.on("makeCall", (data) => {
    const { calleeId, sdpOffer } = data;
    // console.log(`THis is the data coming from ${data}`);
    if (!calleeId || !sdpOffer) {
      emitError(socket, "callFailed", "Callee ID or SDP offer is missing.");
      return;
    }

    const calleeSocketId = userSocketMap.get(calleeId);
    if (calleeSocketId) {
      // console.log`User ${userId} is calling ${calleeId} with SDP offer ${sdpOffer}.`;
      // console.log(sdpOffer);
      IO.to(calleeSocketId).emit("newCall", {
        callerId: userId,
        sdpOffer,
      });
    } else {
      emitError(
        socket,
        "callFailed",
        `Callee with ID ${calleeId} is not connected.`
      );
    }
  });

  // Handle ICE candidate
  socket.on("IceCandidate", ({ calleeId, iceCandidate }) => {
    if (!calleeId || !iceCandidate) {
      emitError(socket, "callFailed", "Callee ID or ICE candidate is missing.");
      return;
    }

    console.log(`${socket.user} is sending an ICE candidate to ${calleeId}`);
    const calleeSocketId = userSocketMap.get(calleeId);
    if (calleeSocketId) {
      IO.to(calleeSocketId).emit("IceCandidate", {
        sender: userId,
        iceCandidate,
      });
    } else {
      emitError(
        socket,
        "callFailed",
        `Callee with ID ${calleeId} is not connected.`
      );
    }
  });

  // Handle answering a call
  socket.on("answerCall", ({ callerId, sdpAnswer }) => {
    const callerSocketId = userSocketMap.get(callerId);
    if (callerSocketId) {
      console.log(`${userId} answered the call from ${callerId}`);
      IO.to(callerSocketId).emit("callAnswered", {
        calleeId: userId,
        sdpAnswer,
      });
    } else {
      emitError(
        socket,
        "callFailed",
        `Caller with ID ${callerId} is not connected.`
      );
    }
  });

  // Clean up on disconnect
  socket.on("disconnect", () => {
    console.log(`User ${userId} disconnected`);
    userSocketMap.delete(userId);
    console.log(`User ${userId} removed. Current user map:`, userSocketMap);
  });
});

// Route for server status check
app.get("/", (req, res) => {
  return res.status(200).json({
    message: "This is a signaling server which is working properly.",
  });
});

// Start the server
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
