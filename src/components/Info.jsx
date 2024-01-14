export default function({text, stateVariable}) {
  return (
    <div className="info">
      <p>{text}{stateVariable}</p>
    </div>
  );
};
