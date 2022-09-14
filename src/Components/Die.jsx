const Die = (props) => {
  const styles = {
    backgroundColor: props.isHeld ? "#59e391" : "white",
  };
  return (
    <div className="numbers-container" style={styles} onClick={props.holdDice}>
      <h3>{props.value}</h3>
    </div>
  );
};

export default Die;
