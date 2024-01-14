import * as Constants from "../game/Constants.js";
import { canUpgrade } from "../game/Game.js";

export default function({upgrades, wallet, handleUpgrade}) {
  let canUpgradeCPU = canUpgrade(upgrades.CPU, Constants.CPU_UPGRADES, wallet);
  let canUpgradeRAM = canUpgrade(upgrades.RAM, Constants.RAM_UPGRADES, wallet);
  let canUpgradeGPU = canUpgrade(upgrades.GPU, Constants.GPU_UPGRADES, wallet);
  let canUpgradeHD = canUpgrade(upgrades.HD, Constants.HD_UPGRADES, wallet);

  return (
    <div className="box rigBox">
      <div className="rigandgangTitle">Rig:</div>
      <div>Current CPU: {Constants.CPU_UPGRADES[upgrades.CPU].name}</div>
      <div><button className={canUpgradeCPU ? "myHoverButton" : "hidden"} onClick={() => { handleUpgrade("CPU")}}>Upgrade</button></div>
      <div>Current RAM: {Constants.RAM_UPGRADES[upgrades.RAM].name}</div>
      <div><button className={canUpgradeRAM ? "myHoverButton" : "hidden"} onClick={() => { handleUpgrade("RAM")}}>Upgrade</button></div>
      <div>Current GPU: {Constants.GPU_UPGRADES[upgrades.GPU].name}</div>
      <div><button className={canUpgradeGPU ? "myHoverButton" : "hidden"} onClick={() => { handleUpgrade("GPU")}}>Upgrade</button></div>
      <div>Current HD: {Constants.HD_UPGRADES[upgrades.HD].name}</div>
      <div><button className={canUpgradeHD ? "myHoverButton" : "hidden"} onClick={() => { handleUpgrade("HD")}}>Upgrade</button></div>
    </div>
  );
};
