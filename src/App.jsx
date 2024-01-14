/* ----- Global Imports ----- */

import { useState, useEffect } from "react";

/* ----- Functionality and Constants Import ----- */

import * as Constants from "./game/Constants";
import * as Game from "./game/Game";

/* ----- React JSX Object Imports ----- */

import Info from "./components/Info";
import RigInfo from "./components/RigInfo";
import Clicker from "./components/Clicker";
import Gang from "./components/Gang";


function App() {
  /* ----- Game Data Variables with useState ----- */
  const [damageDone, setDamageDone] = useState(0);
  const [upgrades, setUpgrades] = useState(Constants.UPGRADES);
  const [gang, setGang] = useState(Constants.GANG);
  const [currentObjectHP, setCurrentObjectHP] = useState(Constants.FIRST_LEVEL);
  const [objectsHacked, setObjectsHacked] = useState(0);
  const [gameLevel, setGameLevel] = useState(Constants.DEFAULT_LEVEL);
  const [objectsInLevel, setObjectsInLevel] = useState(Constants.DEFAULT_LEVEL_OBJECTS);
  const [wallet, setWallet] = useState(Constants.STARTING_WALLET);

  /* ----- Derived Variables ----- */
  const currentClickDamage = Game.calculateClickDamage(upgrades);
  const currentDPSDamage = Game.calculateDPS(gang);
  const currentMaxObjectHP = Game.calculateMaxObjectHP(gameLevel, currentDPSDamage, currentClickDamage);

  /* ----- Main Damage Function ----- */

  function handleDamage(damage) {
    setDamageDone(damageDone + damage);
    setCurrentObjectHP(currentObjectHP - damage);
    if(currentObjectHP <= 0 ) {
      setObjectsHacked(objectsHacked + 1 );
      setObjectsInLevel(objectsInLevel - 1);
      if(objectsInLevel <= 0) {
        setGameLevel(gameLevel + 1);
        setObjectsInLevel(Constants.DEFAULT_LEVEL_OBJECTS);
      }
      setCurrentObjectHP(currentMaxObjectHP);
      setWallet(wallet + Game.calculateMoneyEarned(gang, currentMaxObjectHP));
    }
  };

  /* ----- Handler Functions ----- */
  function handleClicker() {
    handleDamage(currentClickDamage);
  };

  function handleUpgrade(param) {
    const upgradedRigData = Game.upgradeRig(param, upgrades, wallet);
    setUpgrades(upgradedRigData[0]);
    setWallet(wallet - upgradedRigData[1]);
  };
 
  function handleGang(param) {
    const newGang = Game.hireGang(param, gang, wallet);
    setGang(newGang[0]);
    setWallet(wallet - newGang[1]);
  };

  /* ----- Handle DPS damage useEffect ----- */

  useEffect(() => {
    const dpsInterval = setInterval(() => {
      handleDamage(1);

    }, 1000/currentDPSDamage );
    return () => {
      clearInterval(dpsInterval);
    };
  }, [currentDPSDamage, currentObjectHP]);

  return (
    <>
    <div className="pageTitle">
      <h1> CLICK THE MONITOR TO BEGIN HACKING! </h1>
    </div>
    <div className="clickArea">
      <Info stateVariable={objectsHacked} text="Pts: " />
      <Info stateVariable={gameLevel} text="Level: " />
      <Info stateVariable={wallet} text={'\u00A3'} />
      <Info stateVariable={currentClickDamage} text="Click Damage: " />
      <Info stateVariable={currentObjectHP} text="HP: " />
      <Info stateVariable={currentDPSDamage} text="DPS: " />
      <RigInfo upgrades={upgrades} wallet={wallet} handleUpgrade={handleUpgrade} />
      <Clicker onClick={handleClicker} />
      <Gang gang={gang} wallet={wallet} handleGang={handleGang}/>
      <div></div><div></div><div></div>
    </div>
    </>
  );
};

export default App;
