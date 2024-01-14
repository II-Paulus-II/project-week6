export default function({onClick, text}) {
  return (
    <div>
      <button onClick={onClick}>{text}</button>
    </div>
  );
};
