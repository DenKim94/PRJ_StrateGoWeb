import express from "express"
import cors from "cors"
import dotenv from 'dotenv'
import stream from 'getstream'
import { v4 as uuidv4 } from "uuid"

/*
* Backend logic for running an express-server with the stream-chat API
* Date of last changes: 20.01.2024
* Author: D.Kim
*/

dotenv.config();  
// Get environment variables
const portNumber = parseInt(process.env.PORT_NUMBER,10); 
const apiKey = process.env.API_KEY; 
const apiSecret = process.env.API_SECRET;

// Create an express server to exchange data
const app = express();
app.use(cors());
app.use(express.json());

// Create an instance to connect the account to the stream platform 
const serverClient = stream.connect(apiKey, apiSecret);
// console.log("serverClient: ", serverClient)

// Create/Use Routes
app.post("/setup", async (req, res) => {
    try{
        const gameSets = req.body.gameSets;
        const {playerName, playerNumber} = gameSets;  // Parameters should be adapted to requirements
        if(!playerName || !playerNumber){
            console.log("Error: Incomplete request body!")
            throw("Error: Incomplete request body!")
        }
        const userID = uuidv4();    // Generate a unique user ID
        const token = serverClient.createUserToken(userID); // Create a specific token for authentication
        const userProps = {userID: userID, playerName: playerName, playerNumber: playerNumber}; // TO-DO: Parameters should be adapted to requirements
        res.json({userProps, token})  // Provide response data in json format
    }
    catch(e){
        console.log(e)
        res.json({ error: e });
    }
})

// Start the server
app.listen(portNumber, () => {
    console.log(">> Server is running... ")
})

