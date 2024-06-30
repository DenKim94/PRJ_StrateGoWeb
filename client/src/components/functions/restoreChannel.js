
async function initClient(clientObj, cookiesObj) {
    try{
        const storedToken = cookiesObj.get("token");
        await clientObj.connectUser({
            id: cookiesObj.get("userID"),
            name: cookiesObj.get("playerName"),
            playerNumber: cookiesObj.get("playerNumber"),
        }, storedToken);

    }catch(error){
        console.error(error.message)
    }
}  

async function initChannel(clientObj, channelID) {
    let channel;

    if(channelID){
        channel = clientObj.channel("messaging", channelID);
        await channel.watch();
    }else{
        channel = null;
    }
    
    return channel;
}    

export async function restoreChannel(clientObj, cookiesObj, channelID){
    await initClient(clientObj,cookiesObj)
    const channel = await initChannel(clientObj, channelID);
    return channel;
}