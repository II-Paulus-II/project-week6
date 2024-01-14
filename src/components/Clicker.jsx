export default function Clicker({onClick}) {
  return (
    <div className="clickDiv">
      <button className="objectHacker" onClick={onClick}></button>
    </div>
  );
};
