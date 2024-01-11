/* ----- Global Imports ----- */

import { useState } from "react";

/* ----- Functionality and Constants Import ----- */

import * as Constants from "./constants";
import * as Game from "./game";

/* ----- React JSX Object Imports ----- */

import Info from "./info";
/*import Detail from "./detail";
import Button from "./button";*/
import RigInfo from "./RigInfo";
import Clicker from "./clicker";


function App() {
  /* ----- Game Data Variables for useState ----- */
  const [damageDone, setDamageDone] = useState(0);
  const [upgrades, setUpgrades] = useState(Constants.UPGRADES);
  console.log("inside App", upgrades);

  /* ----- Derived Variables ----- */
  const currentClickDamage = Game.calculateClickDamage(upgrades);

  /* ----- Handler Functions ----- */
  function handleClicker() {
    setDamageDone(damageDone + currentClickDamage);
  };
  
  return (
    <div>
      <Info stateVariable={damageDone} text="Pts: " />
      <Info stateVariable={currentClickDamage} text="Click Damage: " />
      <RigInfo upgrades={upgrades} />
      <Clicker onClick={handleClicker} />
      
    </div>
  )
}

export default App
