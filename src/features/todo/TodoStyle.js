const containerStyle = {
  background:
    "radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)",
  minHeight: "100vh",
  display: "inline-block",
};

const cardStyle = {
  background: "rgba( 255, 255, 255, 0.25 )",
  boxShadow: "0 2px 4px 0 rgba( 31, 38, 135, 0.37 ) ",
  backdropFilter: "blur( 7px )",
  WebkitBackdropFilter: "blur( 7px )",
  borderRadius: "10px",
  border: "1px solid rgba( 255, 255, 255, 0.18 )",
};

const cardContentStyle = {
  display: "flex",
  // justifyContent: "space-between",
  alignItems: "center",
  "&:last-child": { pb: 2 },
};

const todoContainer = {
  display: "flex",
  flexDirection: "column",
  p: 3,
  mt: "5%",
  background: "rgba( 255, 255, 255, 0.25 )",
  boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
  backdropFilter: "blur( 4px )",
  WebkitBackdropFilter: "blur( 4px )",
  borderRadius: "10px",
  border: "1px solid rgba( 255, 255, 255, 0.18 )",
};

const typographyStyle = {
  background: "linear-gradient(to right, #121FCF 0%, #CF1512 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

export {
  cardStyle,
  cardContentStyle,
  todoContainer,
  typographyStyle,
  containerStyle,
};