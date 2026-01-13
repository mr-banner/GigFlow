import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

dotenv.config({
    path:'./.env'
})

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.use(cookieParser());
app.use(cors({
  origin: ["http://localhost:5173", "https://gig-flow-ashy.vercel.app"],
  credentials: true
}));


import healthCheckRouter from "./router/healthCheck.router.js"
import authRouter from "./router/auth.router.js"
import gigRouter from "./router/gig.router.js"
import bidRouter from "./router/bid.router.js";


app.use("/api/healthCheck",healthCheckRouter);
app.use("/api/auth",authRouter);
app.use("/api/gigs",gigRouter);
app.use("/api/bids", bidRouter);

export default app;
