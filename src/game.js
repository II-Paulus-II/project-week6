/* ----- Imports ----- */
import * as Constants from "./constants.js";

export function printLog() {
  console.log("this works");
};

export function calculateClickDamage(upgrades) {
  const cpuDamage = Constants.CPU_UPGRADES[upgrades.CPU].damage;
  const ramDamage = Constants.RAM_UPGRADES[upgrades.RAM].damage;
  const gpuDamage = Constants.GPU_UPGRADES[upgrades.GPU].damage;
  const hdDamage = Constants.HD_UPGRADES[upgrades.HD].damage;
  const calculatedDamage = Constants.DEFAULT_CLICK_DAMAGE + cpuDamage + ramDamage + gpuDamage + hdDamage;
  return calculatedDamage;
};

function getNewItemName(playerItem, upgradeObject) {
  const possibleItem = Object.keys(upgradeObject);
  const currentItemIndex = possibleItem.indexOf(playerItem);
  const newItemName = possibleItem[currentItemIndex + 1];
  return newItemName;
}

export function upgradeRig(param, upgrades) {
  let upgradeObject = {};
  let playerItem = {};
  let copyUpgrades = upgrades;
  switch(param) {
    case "CPU":
      upgradeObject = Constants.CPU_UPGRADES;
      playerItem = upgrades.CPU;
      copyUpgrades.CPU = getNewItemName(playerItem, upgradeObject);
      break;
    case "GPU":
      upgradeObject = Constants.GPU_UPGRADES;
      playerItem = upgrades.GPU;
      copyUpgrades.GPU = getNewItemName(playerItem, upgradeObject);
      break;
    case "HD":
      upgradeObject = Constants.HD_UPGRADES;
      playerItem = upgrades.HD;
      copyUpgrades.HD = getNewItemName(playerItem, upgradeObject);
      break;
    case "RAM":
      upgradeObject = Constants.RAM_UPGRADES;
      playerItem = upgrades.RAM;
      copyUpgrades.RAM = getNewItemName(playerItem, upgradeObject);
      break;
  }
  //const price = upgradeObject[possibleItem[currentItemIndex+1]].price;
  return copyUpgrades; 
};

export function calculateDPS(gang) {
  const scripterDamage = gang.SCRIPTER * Constants.SCRIPTER.damage;
  const researcherDamage = gang.RESEARCHER * Constants.RESEARCHER.damage;
  return scripterDamage + researcherDamage + 1;
}

export function hireGang(param, gang) {
  let copyGang = gang;
  switch(param) {
    case "ADMIN":
      copyGang.ADMIN++;
      break;
    case "SCRIPTER":
      copyGang.SCRIPTER++;
      break;
    case "RESEARCHER":
      copyGang.RESEARCHER++;
      break;
    case "MULE":
      copyGang.MULE++;
      break;
  }
  return copyGang;
}
