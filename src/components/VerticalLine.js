const VerticalLine = ({ sx }) => {
  const lineStyle = {
    width: "2px",
    height: "100%",
    backgroundColor: "gainsboro",
    minHeight: "18px",
    ...(sx || {}),
  };

  return <div id="verticalLine" style={lineStyle}></div>;
};

export default VerticalLine;
