/* ----- Imports ----- */
import * as Constants from "./constants.js";

export function printLog() {
  console.log("this works");
};

export function calculateClickDamage(upgrades) {
  let calculatedDamage = Constants.DEFAULT_CLICK_DAMAGE;
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
      upgradeObject = Constants.GRAPHIC_CARD_UPGRADES;
      playerItem = upgrades.GRAPHIC;
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
