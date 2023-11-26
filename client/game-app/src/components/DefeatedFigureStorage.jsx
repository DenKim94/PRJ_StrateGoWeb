import React from "react";
import "./FigureStorage.css";

const DefeatedFigureStorage = ({ defFigStateArray, figStorageState }) => {
    console.log(">> defFigStateArray: ", defFigStateArray)
    // *** Handle Early Return *** 
    if(figStorageState.length > 0){
        console.log(">> Early Return in 'DefeatedFigureStorage' ")
        return null;
    }

    return(
        <div className="figure-storage">
            <p id="storage-name">Defeated Figures: </p>
            {/* *** Storage of Game Figures *** */}
            <div data-bs-spy="scroll" data-bs-target="#navbar-example2" data-bs-offset="0" className="scrollspy-example" tabIndex="0">
                    {/* To-Do: Store and render the defeated figures */}
                    {/* {defFigStateArray.map((figProps, idx) => ())} */}
            </div> 
        </div>
    )
};

export default DefeatedFigureStorage;