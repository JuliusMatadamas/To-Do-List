import "dotenv/config";
import express from "express";
import cors from "cors";
import * as mongoose from "mongoose";
import { router } from "./routes";
import dbConnect from "./config/mongo";
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
app.use(router);

dbConnect().then(() => {
    console.log('Connected to database.');
}).catch(() => {
    console.log('Failed to connect to database');
});
app.listen(PORT, () => console.log(`Listening on ${PORT}`));