import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const App = () => {
  const [input, setInput] = useState("");
  const [totalData, setTotalData] = useState([]);

  useEffect(() => {
    const todos = localStorage.getItem("todo");
    setTotalData(JSON.parse(todos));
  }, []);

  const addTodo = () => {
    const todo = {
      id: uuidv4(),
      todo: input,
    };
    totalData.push(todo);
    localStorage.setItem("todo", JSON.stringify(totalData));
    setInput("");
  };

  const Delete = (id) => {
    const filtered = totalData.filter((res) => res.id !== id);
    localStorage.setItem("todo", JSON.stringify(filtered));
    setTotalData(filtered);
  };

  return (
    <div style={{ height: "60vh" }}>
      <div style={{ display: "flex" }}>
        <div className="input-group">
          <span className="input-group-text">Enter Task</span>
          <textarea
            className="form-control"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          ></textarea>
        </div>
        <div
          class="btn-group"
          role="group"
          aria-label="Basic checkbox toggle button group"
        >
          <input
            type="checkbox"
            class="btn-check"
            id="btncheck1"
            autocomplete="off"
          />
          <label
            class="btn btn-outline-primary"
            for="btncheck1"
            onClick={addTodo}
          >
            Add Task
          </label>
        </div>
      </div>
      {totalData.map((res) => {
        return (
          <div class="card" style={{ width: "18rem" }}>
            <div class="card-body">
              <h5 class="card-title">{res.todo}</h5>
              <a class="btn btn-primary" onClick={() => Delete(res.id)}>
                Delete
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default App;
