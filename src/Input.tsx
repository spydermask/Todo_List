import React, { useState } from "react";

interface Todo {
  text: string;
  completed: boolean;
}

interface InputProps {
  onAddTodo: (text: string) => void;
}

function Input({ onAddTodo }: InputProps) {
  const [inputText, setInputText] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const handleAddTodoClick = () => {
    if (inputText.trim() !== "") {
      onAddTodo(inputText);
      setInputText("");
    }
  };

  return (
    <>
      <div className="mmmm">
        <header className="list">
          <h1>TodoInput</h1>
        </header>
      </div>
      <div className="bb">
        <label className="input"> </label>
        <input
          type="text"
          placeholder="New Todo"
          name="New Todo"
          value={inputText}
          onChange={handleInputChange}
          required
        ></input>
        <br />

        <button className="submit" onClick={handleAddTodoClick}>
          Add new task
        </button>
      </div>
    </>
  );
}

function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editText, setEditText] = useState<string>("");

  const addTodo = (text: string) => {
    setTodos([...todos, { text, completed: false }]);
  };

  const toggleTodo = (index: number) => {
    setTodos(
      todos.map((todo, i) =>
        i === index ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleEditClick = (index: number) => {
    setEditIndex(index);
    setEditText(todos[index].text);
  };

  const handleSaveEdit = (index: number) => {
    setTodos(
      todos.map((todo, i) => (i === index ? { ...todo, text: editText } : todo))
    );
    setEditIndex(null);
  };

  const handleDeleteDoneTasks = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const handleDeleteAllTasks = () => {
    setTodos([]);
  };

  return (
    <>
      <Input onAddTodo={addTodo} />
      <div>
        {todos.map((todo, index) => (
          <div key={index} className="todo-item">
            <div>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(index)}
              />
              {editIndex === index ? (
                <>
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="edit-input"
                  />
                  <button className="h" onClick={() => handleSaveEdit(index)}>
                    Save
                  </button>
                </>
              ) : (
                <>
                  <span
                    style={{
                      textDecoration: todo.completed ? "line-through" : "none",
                    }}
                  >
                    {todo.text}
                  </span>
                  <button className="h" onClick={() => handleEditClick(index)}>
                    Edit
                  </button>
                </>
              )}
            </div>
          </div>
        ))}

        <button className="e" onClick={handleDeleteDoneTasks}>
          Delete done tasks
        </button>
        <button className="d" onClick={handleDeleteAllTasks}>
          Delete all tasks
        </button>
      </div>
    </>
  );
}

export default TodoList;
