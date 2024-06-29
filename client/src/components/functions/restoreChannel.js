
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
        // Bestehenden Channel wiederherstellen
        channel = clientObj.channel("messaging", channelID);
        await channel.watch();
    }else{
        channel = null;
    }
    
    return channel;
}    

export async function restoreChannel(clientObj, cookiesObj, channelID){
    initClient(clientObj,cookiesObj)
    .then(() => {        
        return initChannel(clientObj, channelID);
    })
    .catch(error => {
        console.error(error.message)
    });
}