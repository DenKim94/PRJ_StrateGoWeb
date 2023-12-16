import React from 'react';
import { styleGameLogo } from '../../game-logic/parameters.js';

const GameLogo = () => {
  return (
    <div className="game-logo" style = {styleGameLogo}>
      <h1 style = {{fontSize: styleGameLogo.fontSize}} >StrateGo</h1>
    </div>
  );
};

export default GameLogo;
