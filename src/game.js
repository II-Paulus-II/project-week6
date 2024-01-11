export function itemName(playerItem, upgradeObject) {
  const itemKey = playerItem.value;
  const itemName = upgradeObject[itemKey].name;
  return itemName;
}

//This function checks if a current rig items can be upgraded - passes by reference
//Seperated because used by the rendering function

export function canUpgradeItemCheck(playerItem, UpgradeObject) {

  const possibleItem = Object.keys(UpgradeObject);
  const numAvailItems = possibleItem.length;
  let canUpgrade = false;

  //First Check if current object is not the last member of the list?
  const currentItemIndex = possibleItem.indexOf(playerItem.value);
  
  if (currentItemIndex < numAvailItems-1) {
    const nextItemPrice = UpgradeObject[possibleItem[currentItemIndex+1]].price;
    //Second check inside first to prevent checking price for non existent next item. 
    if ( nextItemPrice <= sizeWallet ) {
      canUpgrade = true;
    }
  }

  return canUpgrade;
}

//This function upgrades player Items

export function upgradeItem(playerItem, upgradeObject) {

  let canUpgradeItemCheck = canUpgradeItem(playerItem, upgradeObject);
  //Get Array of object Names and number of Objects's available
  const possibleItem = Object.keys(upgradeObject);
  const currentItemIndex = possibleItem.indexOf(playerItem.value);

  //If can upgrade then do it and pay price
  if (canUpgradeItemCheck) {
    sizeWallet -= upgradeObject[possibleItem[currentItemIndex+1]].price
    playerItem.value = possibleItem[currentItemIndex + 1];
  }
  // Now recalculate Click Damage and render
  //setClickDamage();
}

/* ----- Gang Hire Functions ----- */

//Function to check if one can pay the hire fee

export function canHire(gangMember) {
  let canAfford = false;
  const hirePrice = gangMember.price;
  if (hirePrice <= sizeWallet) {
    canAfford = true;
  }
  return canAfford
}

//Function to Hire Gang members -- I am sure this can be optimised slightly better but its fine for now 

export function hireGangMember(gangMember) {
  let canHireGM = canHire(gangMember);
  if (canHireGM) {
    if(gangMember.name == "Admins") {
      numAdmins++;
    }
    else if (gangMember.name == "Scripters") {
      numScripters++;
    }
    else if (gangMember.name == "Researchers") {
      numResearchers++;
    }
    else if (gangMember.name == "Mules") {
      numMules++;
    }
    sizeWallet -= gangMember.price
  }
  //Recalculate DPS
  //setDPSDamage();
}

/* ----- Damage Functions ----- */

// Function to Calculate Click Damage

function setClickDamage() {

  //refactor
  const gpuKey = currentGPU.value;
  const gpuDamage = GCardUpgrades[gpuKey].damage;
  const cpuKey = currentCPU.value;
  const cpuDamage = cpuUpgrades[cpuKey].damage;

  //Calculate Total Click Damage

  clickDamage = basePlayerClickDamage + gpuDamage + cpuDamage;
};

// Function to calculate Botnet Efficiency and i love my brackets

export function getBotNetEfficiency() {
  let baseEfficiency = 0.2;
  return (numAdmins * ((botnetAdmin.efficiency)/100)) + (numScripters*(scripter.efficiency/100)) + baseEfficiency;
}

export function getGangDamage() {
  let researcherDamage = numResearchers * researcher.damage;
  let scripterDamage = numScripters * scripter.damage;
  return researcherDamage + scripterDamage;
}
//Function to calculate DPS Damage

export function setDPSDamage() {
  botnetEfficiency = getBotNetEfficiency();
  let damageIncrease = getGangDamage();
  if (sizeOfBotnet <= 5) {
    dps = sizeOfBotnet + damageIncrease;
  }
  else {
    dps = 5 + ((sizeOfBotnet - 5) * botnetEfficiency) + damageIncrease;
  }
}


//This function provides a new object and/or new level when an objects hack is completed. 
//If make a boss do it here. 

export function getNextObject() {
  //If website hacked have chance of adding to botnet
  let newBotNetChance = Math.random();

  if (newBotNetChance > 0.85 ) {
    sizeOfBotnet++;
    setDPSDamage();
  }
  //If website hacked have chance of getting money
  //Mules increase this amount
  let chanceOfMoney = Math.random();
  if (chanceOfMoney < 0.15) {
    sizeWallet+=(maxObjectHP*(3+(numMules*mule.money))); //May change this amount. 
  }
  //Check if level complete
  if (hackedinLevel == objectsinLevel) {
    //incremement level
    currentLevel++;
    //reset level counter
    hackedinLevel = 0;
    //Calculate new max HP for website
    maxObjectHP = 2*clickDamage + 4*dps; //May change this later
    //Save Game after completing Level
    saveGame();
  }

  objectHP = maxObjectHP;
}

//This calculates the damage done to the object determined by current clickDamage or dps 
//Called by either the dps listerner or the clickingDone function 

export function damageObject(eventParam) {

  if (eventParam == "click") {
  //Record all damage done anyway
  damageDone += clickDamage;

  //Do damage to current object
  objectHP -= clickDamage;
  }
  else if (eventParam == "dps") {
    damageDone += dps;
    objectHP -= dps;
  }

  //check if object killed [i mean hacked]
  if (objectHP <= 0) {
    //Increase objects hacked
    numberObjectsHacked += 1;
    hackedinLevel += 1;

    getNextObject();
  }
}

