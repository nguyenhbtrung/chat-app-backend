const { Server } = require("socket.io");

module.exports = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:3000", // Địa chỉ frontend
            methods: ["GET", "POST"],
        },
    });

    const activeSockets = new Map();

    io.on("connection", (socket) => {
        console.log("New client connected:", socket.id);

        socket.on("register", (username) => {
            activeSockets.set(socket.id, { username });
            console.log("Active sockets:", [...activeSockets.values()]);
            io.emit("active-users", [...activeSockets.entries()]); // Gửi danh sách người dùng online tới tất cả client
        });

        socket.on("disconnect", () => {
            activeSockets.delete(socket.id);
            console.log("Client disconnected:", socket.id);
            console.log("Active sockets:", [...activeSockets.values()]);
            io.emit("active-users", [...activeSockets.entries()]); // Cập nhật danh sách người dùng online
        });

        socket.on("get-active-users", () => {
            io.to(socket.id).emit("get-active-users", [...activeSockets.entries()]);
        });

        socket.on("request-connection", ({ peerId, requestUsername }) => {
            io.to(peerId).emit("request-connection", { from: socket.id, username: requestUsername });
        });

        socket.on("request-video-call", ({ peerId, requestUsername }) => {
            io.to(peerId).emit("request-video-call", { from: socket.id, username: requestUsername });
        });

        socket.on("connection-accepted", ({ to }) => {
            io.to(to).emit("connection-accepted", { from: socket.id });
        });

        socket.on("video-call-accepted", ({ to }) => {
            io.to(to).emit("video-call-accepted", { from: socket.id });
        });

        socket.on("connection-rejected", ({ to }) => {
            io.to(to).emit("connection-rejected", { from: socket.id });
        });

        socket.on("video-call-rejected", ({ to }) => {
            io.to(to).emit("video-call-rejected", { from: socket.id });
        });


        socket.on("connection-succesful", ({ remote }) => {
            // console.log();
            io.to(socket.id).emit("connection-succesful", { remote: remote });
        });


        socket.on("peer-disconnected", ({ remote }) => {
            // console.log();
            io.to(socket.id).emit("peer-disconnected", { remote: remote });
        });



        // Khi người dùng muốn kết nối tới peer khác
        socket.on("offer", ({ offer, to }) => {
            io.to(to).emit("offer", { offer, from: socket.id });
        });

        socket.on("renegotiate-offer", ({ offer, to }) => {
            io.to(to).emit("renegotiate-offer", { offer, from: socket.id });
        });

        // Khi peer trả lời offer
        socket.on("answer", ({ answer, to }) => {
            io.to(to).emit("answer", { answer, from: socket.id });
        });

        socket.on("renegotiate-answer", ({ answer, to }) => {
            io.to(to).emit("renegotiate-answer", { answer, from: socket.id });
        });

        // Khi peer gửi candidate ICE
        socket.on("candidate", ({ candidate, to }) => {
            io.to(to).emit("candidate", { candidate, from: socket.id });
        });


    });

    return io;
};