// Import all required modules
import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import router from './routes/user.routes.js';
import dbConnect from './config/mongoose.config.js';

// Create an instance of the Express application
const app = express();

app.use(cookieParser(process.env.SECERT_KEY))

// Parse JSON requests and use CORS middleware to enable cross-origin requests
app.use(express.json(), cors({credentials: true, origin: 'http://localhost:5173'}));

// Use router middleware for handling API routes under the '/api' prefix
app.use("/api", router)

// Load environment variables from the .env file
dotenv.config();

// Define the 'port' variable value as what is being pulled from the .env file
const port = process.env.PORT;

// Connects to the database
dbConnect();

// Start the server and listen on the specified port from the environment variables
app.listen(port, () => console.log(`Listening on port ${port}`));