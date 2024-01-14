import * as Constants from "../game/Constants.js";

export default function({upgrades, handleUpgrade}) {
  return (
    <div className="box rigBox">
      <div className="rigandgangTitle">Rig:</div>
      <div>Current CPU: {Constants.CPU_UPGRADES[upgrades.CPU].name}</div>
      <button className="myHoverButton" onClick={() => { handleUpgrade("CPU")}}>Upgrade</button>
      <div>Current RAM: {Constants.RAM_UPGRADES[upgrades.RAM].name}</div>
      <button className="myHoverButton" onClick={() => { handleUpgrade("RAM")}}>Upgrade</button>
      <div>Current GPU: {Constants.GPU_UPGRADES[upgrades.GPU].name}</div>
      <button className="myHoverButton" onClick={() => { handleUpgrade("GPU")}}>Upgrade</button>
      <div>Current HD: {Constants.HD_UPGRADES[upgrades.HD].name}</div>
      <button className="myHoverButton" onClick={() => { handleUpgrade("HD")}}>Upgrade</button>
    </div>
  );
};
