/* ----- Global Imports ----- */

import { useState } from "react";

/* ----- Functionality and Constants Import ----- */

import * as Constants from "./constants";
import * as Game from "./game";

/* ----- React JSX Object Imports ----- */

import Info from "./info";
/*import Detail from "./detail";
import Button from "./button";*/

import Clicker from "./clicker";


function App() {
  /* ----- Game Data Variables for useState ----- */
  const [damageDone, setDamageDone] = useState(0);

  function handleClicker() {
    const currentClickDamage = Game.calculateClickDamage();
    setDamageDone(damageDone + currentClickDamage);
  };
  

  function newGame() {
    console.log("me clicked")
  }

  return (
    <div>
      <Info stateVariable={damageDone} text="Pts: " />
      <Clicker onClick={handleClicker} />
      
    </div>
  )
}

export default App
