import React, { useState, useEffect, useMemo } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Route, Routes } from 'react-router-dom';
import { useChatContext, Channel } from 'stream-chat-react';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Button from '../gameSection/Button.jsx'
import './CustomToastStyle.css'
import axios from 'axios';
import Cookies from 'universal-cookie'
import CustomTimerButton from './CustomTimerButton.jsx'
import DropDownButton from './DropDownButton.jsx'
import WaitingRoom from './WaitingRoom';
import * as parameters from '../../game-logic/parameters.js';
import { useGameStates } from '../context/GameStatesContext.js';

const SetUp = ({ setToken,
                 userCreated, 
                 setUserCreated, 
                 setUpProps = parameters.setUpProps}) => {

    const { client } = useChatContext();
    const cookies = useMemo(() => new Cookies(), []);
    const { gameStates, setGameStates } = useGameStates();
    const [isReadyToStart, setReadyToStart] = useState(false);
    const [channel, setChannel] = useState(null);

    const navigate = useNavigate();
    const SETUPURL = process.env.REACT_APP_SETUP_URL;
    
    useEffect(() => {
        const setUserProps = async () => {
            // let toastId = null;

            try {
                // Get data from backend
                const res = await axios.post(SETUPURL, { gameStates });
                const { userProps, token } = res.data;
          
                console.log(">> res.data: ", res.data);
          
                // Setting cookies
                cookies.set("token", token);
                cookies.set("userID", userProps.userID);
                cookies.set("playerName", userProps.playerName);
                cookies.set("playerNumber", userProps.playerNumber);
          
                setToken(token);

            } catch(error) {
                const errorPath = "/";
                console.error(">> Error: ", error.message);

                // Error Handling
                toast.error("User-ID not found, please try again!", {
                    autoClose: parameters.genCfg.timeOutAutoClose_ms, // Optional: Timeout for closing the pop-up
                  });
                // Timeout for closing navigate back to the home section
                setTimeout(() => {
                    navigate(errorPath);
                }, parameters.genCfg.timeOutFunction_ms);
            }

            setUserCreated(true)
        }
        // Get user properties to set cookies 
        if(!userCreated){
            setUserProps() 
        }

        // Ensure complete game settings provided by player 1 and player 2
        if(gameStates.isPlayer1 && gameStates.opponentName.length > parameters.genCfg.minInputLength && gameStates.colorPlayer && gameStates.timePerTurn_ms){
            setReadyToStart(true)
        }else if(!gameStates.isPlayer1 && gameStates.opponentName.length > parameters.genCfg.minInputLength){
            setReadyToStart(true)
        }

        // eslint-disable-next-line
    },[gameStates, isReadyToStart, setReadyToStart, userCreated, setUserCreated, SETUPURL, cookies, setToken])

    // Function to create a channel
    const createChannel = async () => {

        const response = await client.queryUsers({name: { $eq: gameStates.opponentName }}); 
        console.log(">> response: ", response)
        
        // Checking if a user is found
        const foundUser = response.users.filter( props => 
            props.online === true &&
            props.playerNumber !== gameStates.playerNumber
        )

        console.log(">> foundUser : ", foundUser )

        if(foundUser.length === 0){
            toast.info("Opponent not found! Please try again!", {
                autoClose: parameters.genCfg.timeOutAutoClose_ms, // Optional: Timeout for closing the pop-up
              });            
            return null
        }

        if(client.userID !== foundUser[0].id){
            const newChannel = client.channel("messaging", {
                members: [client.userID, foundUser[0].id],
            });
            console.log(">> newChannel: ", newChannel)  
    
            await newChannel.watch() // Listening to the channel
            setChannel(newChannel)
        }
        else{
            alert(">> Names of user and opponent shall not match!")
            return null
        }

    };

    useEffect(() => {
        console.log("channel: ", channel)
        const provideUserToWaitingRoom = () => {
            if(channel){
                console.log(">> Channel established.")
                console.log("####################")
                const pathToNextPage = "/waitingRoom";
                navigate(pathToNextPage)
            }
        }
        provideUserToWaitingRoom()
        // eslint-disable-next-line 
    }, [channel])

    // Update the state with opponent name
    const handleChangedName = (event) => {
        const inputValue = event.target.value;
        setGameStates((prevStates) => ({
            ...prevStates,
            opponentName: inputValue.trim(),
        }))           
    };

    const startGame = () => {
        console.log(">> Start Game in progress...")
        createChannel()
    }

    const joinGame = () => {
        console.log(">> Join Game in progress...")
        createChannel()
    }

    const handleCancel = () => {
        console.log(">> User canceled.")
        const homePath = "/";
        navigate(homePath);
    }
     
    if(parameters.genCfg.debugMode){
        console.log("> cookies_SetUp:", cookies)
        console.log("> gameStates_SetUp:", gameStates)
        console.log("> userCreated_SetUp:", userCreated)
    }

    return (
        <div style={setUpProps.style}>
            <p style={{ fontSize: '15px', 
                        color: 'rgb(248, 202, 45)', 
                        textAlign: 'center',
                        marginBottom: "20px"}}>

                Welcome {gameStates.playerName}! 
                <br/> {gameStates.isPlayer1 ? (setUpProps.messages.player1) : (setUpProps.messages.player2)}
            </p>
            <div className='game-settings' style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                <input style = {setUpProps.inputStyle} 
                    type='string' 
                    placeholder = "Name of opponent" 
                    value={gameStates.opponentName}
                    onChange = {handleChangedName} />

                {gameStates.isPlayer1 ? (
                    <>   
                        <DropDownButton /> 
                        <CustomTimerButton /> 
                        <div style={{display: 'flex', flexDirection: 'row', gap: '10px'}}> 
                            <Button buttonName = {"Start Game"} isDisabled = {isReadyToStart ? false : true} 
                                    customStyleProps = {{width: '120px', marginTop:'20px'}} onCklickFunction = {startGame}/> 
                            <Button buttonName = {"Cancel"} isDisabled = {false}
                                    customStyleProps = {{width: '120px', marginTop:'20px'}} onCklickFunction = {handleCancel}/>  
                        </div>
                    </>     
                ) : 
                <div style={{display: 'flex', flexDirection: 'row', gap: '10px'}}>
                    <Button buttonName = {"Join Game"} isDisabled = {isReadyToStart ? false : true} 
                            customStyleProps = {{width: '120px', marginTop:'20px'}} onCklickFunction = {joinGame}/> 
                    <Button buttonName = {"Cancel"} isDisabled = {false} 
                            customStyleProps = {{width: '120px', marginTop:'20px'}} onCklickFunction = {handleCancel}/> 
                </div> } 

                <Channel channel={channel}>
                    <Routes>
                        <Route path = "/waitingRoom" element={ <WaitingRoom channel = {channel}/> }/>
                    </Routes> 
                </Channel>                      
                              
                <ToastContainer position='top-right'/>
            </div>
                      
        </div> 
    );
}
 
export default SetUp;
