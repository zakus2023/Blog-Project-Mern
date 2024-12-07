import express from "express";
import userRouter from './routes/user.route.js'
import postRouter from './routes/post.route.js'
import commentRouter from './routes/comment.route.js'
import dotenv from 'dotenv'
import mongoose from "mongoose";
import webhookRuter from './routes/webhook.route.js'
import {clerkMiddleware} from '@clerk/express'

import cors from 'cors'

// declare port
const port = 3000

// connect to db
dotenv.config()
mongoose.connect(process.env.MONGODB_CONNECTION_STRING).then(()=>{
    console.log("Connected mongodb")
})

// create the app
const app = express()
app.use(cors(process.env.CLIENT_URL))
app.use(clerkMiddleware())
// clerk webhook end point
// NB: I moved this endpoint on top of the app.use(express.json()) 
// because i don't want conflict between app.use(express.json()) and the bodyParser
// app.use("/webhooks", webhookRuter) uses the body parser whiles the other endpints use the app.use(express.json()) 
app.use("/api/v1/webhooks", webhookRuter)
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
app.use(express.json())

// imagekit middleware
// allow cross-origin requests
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", 
      "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

// api endpoints
app.use("/api/v1/users", userRouter)
app.use("/api/v1/posts", postRouter)
app.use("/api/v1/comments", commentRouter)




// error handler middleware
app.use((error, req, res, next)=>{
    res.status(error.status || 500)
res.json({
    message:error.message || "Something went wrong",
    status:error.status,
    stack: error.stack,
})
})

// start express server
app.listen(port, ()=>{
    console.log(`App is listening on: http://localhost:${port}`)
})