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

export function upgradeRig(param, upgrades, wallet) {
  let upgradeObject = {};
  let playerItem = {};
  let newPrice;
  let newUpgrades = {...upgrades};
  switch(param) {
    case "CPU":
      upgradeObject = Constants.CPU_UPGRADES;
      playerItem = upgrades.CPU;
      newUpgrades.CPU = getNewItemName(playerItem, upgradeObject);
      newPrice = upgradeObject[newUpgrades.CPU].price;
      break;
    case "GPU":
      upgradeObject = Constants.GPU_UPGRADES;
      playerItem = upgrades.GPU;
      newUpgrades.GPU = getNewItemName(playerItem, upgradeObject);
      newPrice = upgradeObject[newUpgrades.GPU].price;
      break;
    case "HD":
      upgradeObject = Constants.HD_UPGRADES;
      playerItem = upgrades.HD;
      newUpgrades.HD = getNewItemName(playerItem, upgradeObject);
      newPrice = upgradeObject[newUpgrades.HD].price;
      break;
    case "RAM":
      upgradeObject = Constants.RAM_UPGRADES;
      playerItem = upgrades.RAM;
      newUpgrades.RAM = getNewItemName(playerItem, upgradeObject);
      newPrice = upgradeObject[newUpgrades.RAM].price;
      break;
  }
  if(wallet >= newPrice) {
    return [newUpgrades, newPrice ];
  }
  return [ upgrades, 0 ]; 
};

export function calculateDPS(gang) {
  const scripterDamage = gang.SCRIPTER * Constants.SCRIPTER.damage;
  const researcherDamage = gang.RESEARCHER * Constants.RESEARCHER.damage;
  return scripterDamage + researcherDamage + 1;
}

export function hireGang(param, gang, wallet) {
  let copyGang = {...gang};
  let price;
  switch(param) {
    case "ADMIN":
      copyGang.ADMIN++;
      price = Constants.ADMIN.price;
      break;
    case "SCRIPTER":
      copyGang.SCRIPTER++;
      price = Constants.SCRIPTER.price;
      break;
    case "RESEARCHER":
      copyGang.RESEARCHER++;
      price = Constants.RESEARCHER.price;
      break;
    case "MULE":
      copyGang.MULE++;
      price = Constants.MULE.price;
      break;
  }
  if (wallet >= price) {
    return [copyGang, price];
  }
  return [gang, 0 ];
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
