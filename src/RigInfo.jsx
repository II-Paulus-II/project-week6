import * as Constants from "./constants.js";

export default function({upgrades}) {
  console.log(Constants.CPU_UPGRADES[upgrades.CPU_UPGRADES].name);
  return (
    <div className="box rigBox">
      <div className="rigandgangTitle">Rig:</div>
      <div>Current CPU: {Constants.CPU_UPGRADES[upgrades.CPU_UPGRADES].name}</div>
      <button id="upgradeCPU" className="myHoverButton">Upgrade</button>
      <div>Current RAM: {Constants.RAM_UPGRADES[upgrades.RAM_UPGRADES].name}</div>
      <button id="upgradeRAM" className="myHoverButton">Upgrade</button>
      <div>Current GPU: {Constants.GRAPHIC_CARD_UPGRADES[upgrades.GRAPHIC_CARD_UPGRADES].name}</div>
      <button id="upgradeGPU" className="myHoverButton">Upgrade</button>
      <div>Current HD: {Constants.HD_UPGRADES[upgrades.HD_UPGRADES].name}</div>
      <button id="upgradeHD" className="myHoverButton">Upgrade</button>
    </div>
  );
}
