import React from "react";
import Container from "@mui/material/Container";
import Todo from "./components/Todo";

const App = () => {
  return (
    <Container maxWidth="md">
      <Todo />
    </Container>
  );
};

export default App;
