import * as Constants from "../game/Constants.js";
import { canHireGang } from "../game/Game.js";

export default function({gang, wallet, handleGang}) {
  
  let canHireAdmin = canHireGang(Constants.ADMIN, wallet);
  let canHireScripter = canHireGang(Constants.SCRIPTER, wallet);
  let canHireResearcher = canHireGang(Constants.RESEARCHER, wallet);
  let canHireMule = canHireGang(Constants.MULE, wallet);

  return (
    <div className="box gangBox">
      <div className="rigandgangTitle">Gang:</div>
      <div>Admins: {gang.ADMIN}</div>
      <button className={canHireAdmin ? "myHoverButton" : "hidden"} onClick={() => { handleGang("ADMIN")}}>Hire</button>
      <div>Scripters: {gang.SCRIPTER}</div>
      <button className={canHireScripter ? "myHoverButton" : "hidden"} onClick={() => { handleGang("SCRIPTER")}}>Hire</button>
      <div>Researchers: {gang.RESEARCHER}</div>
      <button className={canHireResearcher ? "myHoverButton" : "hidden"} onClick={() => { handleGang("RESEARCHER")}}>Hire</button>
      <div>Money Mules: {gang.MULE}</div>
      <button className={canHireMule ? "myHoverButton" : "hidden"} onClick={() => { handleGang("MULE")}}>Hire</button>
    </div>
  );
};
