import { useState, useEffect } from "react";
import Navbar from "./components/Navbar.jsx";
import { v4 as uuidv4 } from "uuid";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setshowFinished] = useState(true);

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);

  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };
  const Togglefinished = (e) => {
    setshowFinished(!showFinished);
  };

  const handleEdit = (e, id) => {
    let t = todos.filter((i) => i.id === id);
    setTodo(t[0].todo);
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });

    setTodos(newTodos);
    saveToLS();
  };

  const handleDelete = (e, id) => {
    alert("Do yo want to delete this todo list");
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });

    setTodos(newTodos);
    saveToLS();
  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    saveToLS();
  };
  const handleChange = (e) => {
    setTodo(e.target.value);
  };
  const handleCheckBox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS();
  };

  return (
    <>
      <Navbar />
      <div className=" mx-3 md:container md:mx-auto my-5 rounded-xl bg-zinc-400 p-5 min-h-[80vh] md:w-[40%]">
        <h1 className="font-bold text-center text-xl">
          My Task - Manage your todos at one place
        </h1>
        <div className="addTodo my-5 flex flex-col gap-2">
          <h2 className="text-lg font-bold my-3">Add a Todo</h2>
          <input
            onChange={handleChange}
            value={todo}
            className="w-full rounded-xl px-5 h-10 text-lg  "
            type="text"
          />
          <button
            disabled={todo.length <= 3}
            onClick={handleAdd}
            className="bg-zinc-600 cursor-pointer hover:bg-zinc-800 py-2 px-6 font-bold text-white rounded-xl  disabled:bg-zinc-500"
          >
            Save
          </button>
        </div>
        <div className=" flex text-base font-semibold">
          <input
            onChange={Togglefinished}
            type="checkbox"
            checked={showFinished}
          />{" "}
          Show Finished
        </div>
        <div className="h-[1px] bg-zinc-900 opacity-15 mx-auto w-full"></div>
        <h2 className="text-lg font-bold text-zinc-800 my-2 ">My Todos</h2>
        <div className="todos">
          {todos.length === 0 && (
            <div className="m-5 text-base font-bold">No todos to display</div>
          )}
          {todos.map((item) => {
            return (
              (showFinished || !item.isCompleted) && (
                <div
                  key={item.id}
                  className="todo flex  md:w-full mt-4 justify-between items-center text-white font-medium"
                >
                  <div className="flex gap-5">
                    <input
                      name={item.id}
                      onChange={handleCheckBox}
                      type="checkbox"
                      checked={item.isCompleted}
                      id=""
                    />
                    <div
                      className={
                        item.isCompleted ? "line-through text-black w-1/3 " : ""
                      
                      }
                    >
                      {item.todo}
                    </div>
                  </div>

                  <div className="buttons flex h-full">
                    <button
                      onClick={(e) => handleEdit(e, item.id)}
                      className="bg-zinc-600 hover:bg-zinc-800 py-2 px-3 font-bold text-white rounded-full mx-2"
                    >
                      <FaEdit className="text-xl" />
                    </button>
                    <button
                      onClick={(e) => {
                        handleDelete(e, item.id);
                      }}
                      className="bg-zinc-600 hover:bg-zinc-800 py-2 px-2 font-bold text-white rounded-full mx-2"
                    >
                      <MdDelete className="text-2xl" />
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
