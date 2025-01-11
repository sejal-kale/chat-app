import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoute from "./routes/user.route.js"
import messageRoute from "./routes/Message.route.js"
import cors from "cors"
import cookieParser from "cookie-parser";
import { app, server } from "./SocketIO/server.js";
import path from "path"

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())
app.use(cors())

const PORT = process.env.PORT || 5000;

try {
    mongoose.connect("mongodb://localhost:27017/chat-app-db")
    console.log("connect to mongo")

} catch (error) {
    console.log(error.message);

}

app.use('/api/user', userRoute)
app.use('/api/message', messageRoute)


// ----------------code of deployment------------------
if (process.env.NODE_ENV == 'production') {
    const dirPath = path.resolve();
    app.use(express.static('./Frontend/dist'));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(dirPath, './Frontend/dist/', 'index.html'))
    })

}


server.listen(PORT, () => {
    console.log("App is running", PORT);
})
