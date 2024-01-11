/* ----- Global Imports ----- */

import { useState } from "react";

/* ----- Functionality and Constants Import ----- */

import * as Constants from "./constants";
import * as Game from "./game";

/* ----- React JSX Object Imports ----- */

import Info from "./info";
import Detail from "./detail";
import Button from "./button";


function App() {
  /* ----- Game Variables for useState ----- */

  const [hackedInLevel, setHackedInLevel] = useState(0)
  const [objectHP, setObjectHP] = useState(5);
  const [maxObjectHP, setMaxObjectHP] = useState(5);
  const [clickDamage, setClickDamage] = useState(Constants.basePlayerClickDamage);
  const [dpsDamage, setDPSDamage] = useState(0);
  const [damageDone, setDamageDone] = useState(0);
  const [numberObjectsHacked, setNumberObjectsHacked] = useState(0);
  const [sizeWallet, setSizeWallet] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [sizeBotnet, setSizeBotnet] = useState(Constants.basePLayerBotNetSize);
  const [botnetEfficiency, setBotnetEfficiency] = useState(0);
  const [currentCPU, setCurrentCPU] = useState({value: " "});
  const [currentGPU, setCurrentGPU] = useState({value: " "});
  const [currentRAM, setCurrentRAM] = useState({value: " "});
  const [currentHD, setCurrentHD] = useState({value: " "});
  const [numAdmins, setNumAdmins] = useState(0);
  const [numScripters, setNumScripters] = useState(0);
  const [numResearchers, setNumResearchers] = useState(0);
  const [numMules, setNumMules] = useState(0);


  /* ----- Damage Functions ----- */


  function newGame() {
    console.log("me clicked")
  }

  return (
    <div>
      <Button onClick={newGame} text="New Game" />
      <Info stateVariable={numberObjectsHacked} />
      <Info stateVariable={currentLevel} />
      <Info stateVariable={sizeWallet} />
      <Detail type="">
        <Info stateVariable={clickDamage} />
        <Info stateVariable={dpsDamage} />
      </Detail>
      <Info />
      <Detail type="fraction"> 
        <Info stateVariable={sizeBotnet} />
        <Info stateVariable={botnetEfficiency} />
      </Detail>
      /*<Detail stateVariable={objectHP, maxObjectHP} />*/
      
    </div>
  )
}

export default App
