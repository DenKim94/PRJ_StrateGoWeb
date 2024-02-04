import express from "express"
import cors from "cors"
import dotenv from 'dotenv'
import { v4 as uuidv4 } from "uuid"
import { StreamChat } from 'stream-chat';
import e from "express";

/*
* Backend logic for running an express-server with the stream-chat API
* Date of last changes: 04.02.2024
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
const serverClient = StreamChat.getInstance(apiKey, apiSecret);

// Clean-Up: Remove of old/offline users 
await deleteOldUsers()
await getUsers(); 


// Get data from the frontend and provide specific User-ID and token
app.post("/setup", async (req, res) => {
    try{
        const gameSets = req.body.gameStates;
        const {playerName, playerNumber} = gameSets;  // Parameters should be adapted to requirements

        if(!playerName || !playerNumber){
            console.log("Error: Incomplete request body!")
            throw("Incomplete request body!")
        }
        const userID = uuidv4();                            // Generate a unique user ID
        const token = serverClient.createToken(userID); // Create a specific token for authentication
        const userProps = {userID: userID, playerName: playerName, playerNumber: playerNumber}; // Parameters should be adapted to requirements
        res.json({userProps, token})                        // Provide response data in json format
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


// Function to clean up the user list
async function deleteOldUsers(){
    console.log(">> Run user clean-up... ")
    const response = await serverClient.queryUsers({});
    let deletedUser = null;
    try{    
        response.users.forEach(async (props) => {        
            if(props.id && !props.online && props.role === 'user'){
                deletedUser = await serverClient.deleteUser(props.id)
            }
        })
    }
    catch(error){
        console.log("Error: ", error)
    }
}

// Function to get current users
async function getUsers(){
    const response = await serverClient.queryUsers({});
    console.log(">> Current users: ", response.users)
    
    return response.users
}