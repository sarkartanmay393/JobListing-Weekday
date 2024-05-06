const VerticalLine = ({ sx }) => {
  const lineStyle = {
    width: "1px",
    height: "100%",
    backgroundColor: "grey",
    minHeight: "18px",
    ...(sx || {}),
  };

  return <div id="verticalLine" style={lineStyle}></div>;
};

export default VerticalLine;
