import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

function App() {
  const { register, handleSubmit, reset } = useForm();
  const submitTodo = (data) => {
    console.log(data);
  };
  return (
    <div className="App">
      <h1>Todos</h1>
      <form onSubmit={handleSubmit(submitTodo)}>
        <input type="text" placeholder="todo" {...register("todo")} />
        <input type="submit" value="送信" />
      </form>
      <div style={{ backgroundColor: "lightgreen" }}>
        <ul>
          <li>
            <input type="checkbox" /> テスト1
          </li>
          <li>
            <input type="checkbox" /> テスト2
          </li>
        </ul>
        <button>削除</button>
      </div>
    </div>
  );
}

export default App;
