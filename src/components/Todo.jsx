import React from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import {
  Card,
  CardContent,
  IconButton,
  Typography,
  FormControlLabel,
  Checkbox,
  Grid,
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
} from "../features/todoStyle";
import { useDispatch, useSelector } from "react-redux";
import {
  addToSlice,
  add,
  remove,
  selectTodo,
  toggle,
  update,
  deleteAll,
} from "../features/todoSlice";
import {
  useAddTodosMutation,
  useDeleteTodosMutation,
  useGetTodosQuery,
  useUpdateTodosMutation,
} from "../features/todoApi";

const TodoItem = (props) => {
  const { data, handleDelete, toggleTodo, editTodo } = props;
  const { id, todo, completed } = data;

  return (
    <Card variant="outlined" sx={cardStyle}>
      <CardContent sx={cardContentStyle}>
        <FormControlLabel
          label={
            <Typography variant="h6" color="text.secondary">
              {todo}
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
          onClick={() => editTodo({ id, todo })}
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

  // Adding todos to slice
  const { data } = useGetTodosQuery();
  React.useEffect(() => {
    if (data) {
      dispatch(addToSlice(data.todos));
    }
  }, [data, dispatch]);
  const [addTodos] = useAddTodosMutation();
  const [updateTodos] = useUpdateTodosMutation();
  const [deleteTodos] = useDeleteTodosMutation();

  const [input, setInput] = React.useState("");
  const [editTodoItem, setEditTodoItem] = React.useState(null);

  const todos = useSelector(selectTodo);
  const handleTodoInput = (e) => {
    setInput(e.target.value);
  };

  const addTodoButton = () => {
    if (input.length > 0) {
      const newTodo = {
        id: todos.length + 1,
        todo: input,
        completed: false,
        userId: 4,
      };
      dispatch(add(newTodo));
      addTodos(newTodo);
      setInput("");
    }
  };

  const updateTodoInput = async () => {
    if (editTodoItem && input.length > 0) {
      const updatedTodo = {
        ...editTodoItem,
        todo: input,
      };
      dispatch(update(updatedTodo));
      await updateTodos(updatedTodo);
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

  const editTodo = (todoData) => {
    setEditTodoItem(todoData);
    setInput(todoData.todo);
  };

  const toggleTodo = (id) => {
    dispatch(toggle(id));
  };

  const deleteTodoButton = (id) => {
    dispatch(remove(id));
    deleteTodos(id);
  };

  const deleteAllButton = () => {
    dispatch(deleteAll());
  };

  return (
    <Paper sx={todoContainer} elevation={3}>
      <Typography
        variant="h3"
        gutterBottom
        align="center"
        fontWeight="bold"
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

      <Grid
        container
        spacing={2}
        marginTop={3}
        sx={{ maxHeight: 300, overflowY: "auto" }}
      >
        {todos.map((todo, index) => {
          return (
            <Grid item key={index} xs={12} p={1}>
              <TodoItem
                data={todo}
                editTodo={editTodo}
                handleDelete={deleteTodoButton}
                toggleTodo={toggleTodo}
              />
            </Grid>
          );
        })}
      </Grid>

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
    </Paper>
  );
};

export default Todo;
