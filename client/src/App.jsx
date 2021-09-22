import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  active: {
    textDecoration: "line-through",
    opacity: 0.6
  },
});

function App() {
  const classes = useStyles();
  const [todos, setTodos] = useState([]);
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    const getTodos = async () => {
      const res = await axios.get("/todos").catch((e) => console.log(e));
      setTodos(res.data);
    };
    getTodos();
  }, []);

  const submitTodo = async (data) => {
    if (data.todo === "") return;
    console.log(data);
    const res = await axios.post("/todo", data).catch((e) => console.log(e));
    todos.push(res.data);
    setTodos([...todos]);
    reset();
  };

  const changeCheck = async (id) => {
    await axios.put("/todos", { id: id }).catch((e) => console.log(e));
    todos.map((todo) => {
      if (todo.id === id) {
        todo.iscompleted = !todo.iscompleted;
      }
      return todo;
    });
    setTodos([...todos]);
  };

  const clickDelete = async () => {
    const res = await axios.delete("/todos").catch((e) => console.log(e));
    if (res.data === "OK") {
      const newTodos = todos.filter((todo) => {
        return todo.iscompleted === false;
      });
      setTodos(newTodos);
    }
  };

  return (
    <div className="App">
      <h1>Todos</h1>
      <form onSubmit={handleSubmit(submitTodo)}>
        <input type="text" placeholder="todo" {...register("todo")} />
        <input type="submit" value="送信" />
      </form>
      <div style={{ backgroundColor: "lightgreen" }}>
        <ul style={{ listStyle: "none" }}>
          {todos.map((todo, index) => (
            <li key={index}>
              <input
                type="checkbox"
                checked={todo.iscompleted && "checked"}
                onChange={() => changeCheck(todo.id)}
              />
              <span className={todo.iscompleted ? classes.active : ""}>
                {todo.todo}
              </span>
            </li>
          ))}
        </ul>
        <button onClick={clickDelete}>削除</button>
      </div>
    </div>
  );
}

export default App;
