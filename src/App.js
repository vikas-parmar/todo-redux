import React from "react";
import Container from "@mui/material/Container";
import { containerStyle } from "./features/todo/TodoStyle";
import Todo from "./features/todo/Todo";

const App = () => {
  return (
    <Container maxWidth={false} sx={containerStyle}>
      <Todo />
    </Container>
  );
};

export default App;