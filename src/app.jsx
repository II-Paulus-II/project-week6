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
  /* ----- Game Data Variables with useState ----- */
  const [damageDone, setDamageDone] = useState(0);
  const [upgrades, setUpgrades] = useState(Constants.UPGRADES);
  const [gang, setGang] = useState(Constants.GANG);
  //const [currentDPSDamage, setCurrentDPSDamage] = useState(Game.calculateDPS(gang));
  const [currentObjectHP, setCurrentObjectHP] = useState(Constants.FIRSTLEVEL);
  const [objectsHacked, setObjectsHacked] = useState(0);

  /* ----- Derived Variables ----- */
  const currentClickDamage = Game.calculateClickDamage(upgrades);
  const currentDPSDamage = Game.calculateDPS(gang);
  const currentMaxObjectHP = Game.calculateMaxObjectHP(currentDPSDamage, currentClickDamage);

  /* ----- Handler Functions ----- */
  function handleClicker() {
    setDamageDone(damageDone + currentClickDamage);
    setCurrentObjectHP(currentObjectHP - currentClickDamage);
  };

  function handleUpgrade(param) {
    const upgradedRigData = Game.upgradeRig(param, upgrades);
    //setUpgrades({});
    setUpgrades(upgradedRigData);
  };
 
  function handleGang(param) {
    const newGang = Game.hireGang(param, gang);
    setGang(newGang);
    //const newDPS = Game.calculateDPS(newGang);
    //setCurrentDPSDamage(newDPS);
  };

  function handleObjects() {
    console.log("im less than 0hp do something");
  }
  
  /* ----- Handle DPS damage useEffect ----- */

  useEffect(() => {
    const dpsInterval = setInterval(() => {
      setDamageDone((damageDone) => damageDone + 1);
      setCurrentObjectHP((currentObjectHP) => currentObjectHP - 1);
    }, 1000/currentDPSDamage );

    if(currentObjectHP <= 0) {
      handleObjects(); 
    };

    return () => {
      clearInterval(dpsInterval);
    };
  }, [currentDPSDamage]);

  return (
    <div>
      <Info stateVariable={damageDone} text="Pts: " />
      <Info stateVariable={currentClickDamage} text="Click Damage: " />
      <Info stateVariable={currentDPSDamage} text="DPS: " />
      <Info stateVariable={currentObjectHP} text="HP: " />
      <RigInfo upgrades={upgrades} handleUpgrade={handleUpgrade} />
      <Clicker onClick={handleClicker} />
      <Gang gang={gang} handleGang={handleGang}/>
    </div>
  )
}

export default App
