import * as Constants from "../game/Constants.js";

export default function({gang, wallet, handleGang}) {
  return (
    <div className="box gangBox">
      <div className="rigandgangTitle">Gang:</div>
      <div>Admins: {gang.ADMIN}</div>
      <button className="myHoverButton" onClick={() => { handleGang("ADMIN")}}>Hire</button>
      <div>Scripters: {gang.SCRIPTER}</div>
      <button className="myHoverButton" onClick={() => { handleGang("SCRIPTER")}}>Hire</button>
      <div>Researchers: {gang.RESEARCHER}</div>
      <button className="myHoverButton" onClick={() => { handleGang("RESEARCHER")}}>Hire</button>
      <div>Money Mules: {gang.MULE}</div>
      <button className="myHoverButton" onClick={() => { handleGang("MULE")}}>Hire</button>
    </div>
  );
};
