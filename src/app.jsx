/* ----- Global Imports ----- */

import { useState, useEffect } from "react";

/* ----- Functionality and Constants Import ----- */

import * as Constants from "./constants";
import * as Game from "./game";

/* ----- React JSX Object Imports ----- */

import Info from "./info";
/*import Detail from "./detail";
import Button from "./button";*/
import RigInfo from "./RigInfo";
import Clicker from "./clicker";
import Gang from "./Gang";


function App() {
  /* ----- Game Data Variables for useState ----- */
  const [damageDone, setDamageDone] = useState(0);
  const [upgrades, setUpgrades] = useState(Constants.UPGRADES);
  const [gang, setGang] = useState(Constants.GANG);
  const [currentDPSDamage, setCurrentDPSDamage] = useState(Game.calculateDPS(gang));

  /* ----- Derived Variables ----- */
  const currentClickDamage = Game.calculateClickDamage(upgrades);
  //const currentDPSDamage = Game.calculateDPS(gang);

  /* ----- Handler Functions ----- */
  function handleClicker() {
    setDamageDone(damageDone + currentClickDamage);
  };

  function handleUpgrade(param) {
    const upgradedRigData = Game.upgradeRig(param, upgrades);
    //setUpgrades({});
    setUpgrades(upgrades => ({...upgradedRigData}));
  };
 
  function handleGang(param) {
    const newGang = Game.hireGang(param, gang);
    setGang(gang => ({...newGang}));
    const newDPS = Game.calculateDPS(gang);
    setCurrentDPSDamage(newDPS);
  };
  
  /* ----- Handle DPS damage useEffect ----- */

  useEffect(() => {
    console.log("currentDPSDamage: ", currentDPSDamage)
    const dpsInterval = setInterval(() => {
      setDamageDone((damageDone) => damageDone + 1);
    }, 1000/currentDPSDamage );

    return () => {
      clearInterval(dpsInterval);
    };
  }, [currentDPSDamage]);

  return (
    <div>
      <Info stateVariable={damageDone} text="Pts: " />
      <Info stateVariable={currentClickDamage} text="Click Damage: " />
      <Info stateVariable={currentDPSDamage} text="DPS: " />
      <RigInfo upgrades={upgrades} handleUpgrade={handleUpgrade} />
      <Clicker onClick={handleClicker} />
      <Gang gang={gang} handleGang={handleGang}/>
    </div>
  )
}

export default App
