import React from 'react';
import { styleGameLogo } from '../../game-logic/parameters.js';

const GameLogo = () => {
  return (
    <div className="game-logo" style = {styleGameLogo}>
      <h1>StrateGo</h1>
    </div>
  );
};

export default GameLogo;
