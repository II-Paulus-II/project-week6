/* ----- Imports ----- */
import * as Constants from "./Constants.js";

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
  let copyUpgrades = {...upgrades};
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
  let copyGang = {...gang};
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

export function calculateMaxObjectHP(lvl, dps, click) {
  if (lvl == 1) {
    return Constants.FIRST_LEVEL;
  }
  return ((2 * click) + (4 * dps));
}

export function calculateMoneyEarned(gang, HP) {
  //console.log(gang.MULE, " Is number of mules");
  let chanceOfMoney = Math.random();
  if (chanceOfMoney < 0.15) {
    return HP *(3+(gang.MULE * Constants.MULE.money)); //May change this amount. 
  }
  return 0;
}

export function canUpgrade(playerItem, UpgradeObject, wallet) {
  const possibleItem = Object.keys(UpgradeObject);
  const numAvailItems = possibleItem.length;
  let canUpgrade = false;

  //First Check if current object is not the last member of the list?
  const currentItemIndex = possibleItem.indexOf(playerItem);
  
  if (currentItemIndex < numAvailItems-1) {
    const nextItemPrice = UpgradeObject[possibleItem[currentItemIndex+1]].price;
    //Second check inside first to prevent checking price for non existent next item. 
    if ( nextItemPrice <= wallet ) {
      canUpgrade = true;
    }
  }

  return canUpgrade;
}

export function canHireGang(member, wallet) {
  let canAfford = false;
  const hirePrice = member.price;
  if (hirePrice <= wallet) {
    canAfford = true;
  }
  return canAfford
}
