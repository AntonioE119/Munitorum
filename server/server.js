// Load environment variables from the .env file
dotenv.config();

// Import all required modules
import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import factionRouter from './routes/faction.routes.js';
import miniatureRouter from './routes/miniature.routes.js';
import dbConnect from './config/mongoose.config.js';

// Create an instance of the Express application
const app = express();

// Connects to the database
dbConnect();

app.use(cookieParser(process.env.SECERT_KEY))

// Parse JSON requests and use CORS middleware to enable cross-origin requests
app.use(express.json(), cors());

// Use router middleware for handling API routes under the '/api' prefix
app.use("/api", factionRouter, miniatureRouter)

// Define the 'port' variable value as what is being pulled from the .env file
const port = process.env.PORT;

// Start the server and listen on the specified port from the environment variables
app.listen(port, () => console.log(`Listening on port ${port}`));