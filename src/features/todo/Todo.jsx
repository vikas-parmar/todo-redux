import React from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import {
  Card,
  CardContent,
  IconButton,
  Stack,
  Typography,
  Container,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import {
  cardContentStyle,
  cardStyle,
  todoContainer,
  typographyStyle,
} from "./TodoStyle";
import { useDispatch, useSelector } from "react-redux";
import {
  add,
  remove,
  selectTodo,
  toggle,
  update,
  deleteAll,
} from "./todoSlice";

const TodoItem = (props) => {
  const { todo, handleDelete, toggleTodo, editTodo } = props;
  const { id, content, completed } = todo;
  return (
    <Card variant="outlined" sx={cardStyle}>
      <CardContent sx={cardContentStyle}>
        <FormControlLabel
          label={
            <Typography variant="h5" component="div" color="text.secondary">
              {content}
            </Typography>
          }
          sx={{ flex: 1 }}
          control={
            <Checkbox checked={completed} onChange={() => toggleTodo(id)} />
          }
        />
        <IconButton
          aria-label="edit"
          size="large"
          color="primary"
          onClick={() => editTodo({ id, content })}
        >
          <BorderColorIcon fontSize="inherit" />
        </IconButton>
        <IconButton
          aria-label="delete"
          color="error"
          size="large"
          onClick={() => handleDelete(id)}
        >
          <DeleteOutlineOutlinedIcon fontSize="inherit" />
        </IconButton>
      </CardContent>
    </Card>
  );
};

const Todo = () => {
  const dispatch = useDispatch();

  const [input, setInput] = React.useState("");
  const [editTodoItem, setEditTodoItem] = React.useState(null);

  const todos = useSelector(selectTodo);

  const handleTodoInput = (e) => {
    setInput(e.target.value);
  };

  const addTodoButton = () => {
    if (input.length > 0) {
      const newTodo = {
        id: "todo-" + todos.length,
        content: input,
        completed: false,
      };
      dispatch(add(newTodo));
      setInput("");
    }
  };

  const updateTodoInput = () => {
    if (editTodoItem && input.length > 0) {
      const updatedTodo = {
        ...editTodoItem,
        content: input,
      };
      dispatch(update(updatedTodo));
      setInput("");
      setEditTodoItem(null);
    }
  };

  const handleKeyDown = (event) => {
    if (event.code === "Enter") {
      if (editTodoItem !== null) {
        updateTodoInput();
      } else {
        addTodoButton();
      }
    }
  };

  const editTodo = (todo) => {
    setEditTodoItem(todo);
    setInput(todo.content);
  };

  const toggleTodo = (id) => {
    dispatch(toggle(id));
  };

  const deleteTodoButton = (id) => {
    dispatch(remove(id));
  };

  const deleteAllButton = () => {
    dispatch(deleteAll());
  };

  return (
    <Container component={Paper} sx={todoContainer} maxWidth="md" elevation={3}>
      <Typography
        variant="h3"
        gutterBottom
        align="center"
        fontWeight={"bold"}
        sx={typographyStyle}
      >
        Todo List
      </Typography>
      <Box display={"flex"} alignItems={"stretch"}>
        <TextField
          id="outlined-basic"
          label="Type Your Todo"
          variant="outlined"
          fullWidth
          value={editTodoItem ? input : input}
          onChange={handleTodoInput}
          onKeyDown={handleKeyDown}
        />
        <Button
          variant="contained"
          size="large"
          sx={{ marginLeft: 2 }}
          onClick={editTodoItem ? updateTodoInput : addTodoButton}
        >
          {editTodoItem ? "Update" : "Add"}
        </Button>
      </Box>
      <Stack spacing={2} marginTop={3}>
        {todos.map((todo, index) => {
          return (
            <TodoItem
              key={index}
              todo={todo}
              editTodo={editTodo}
              handleDelete={deleteTodoButton}
              toggleTodo={toggleTodo}
            />
          );
        })}
      </Stack>
      {todos.length > 0 && (
        <Button
          variant="contained"
          size="large"
          sx={{ mt: 3, alignSelf: "center" }}
          startIcon={<DeleteOutlineOutlinedIcon />}
          onClick={deleteAllButton}
        >
          Delete All
        </Button>
      )}
    </Container>
  );
};

export default Todo;