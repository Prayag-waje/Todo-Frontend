import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../index.css";
import axios from "axios";

function App(){
    
    const [todos,setTodos] = useState([]);

    const loadTodos = async() => {
        const response = await axios.get("http://localhost:8080/todos");
        setTodos(response.data.data);
        
    };

    useEffect(() => {
        loadTodos();
    }, []);

    const deleteTodo = (id) => async () => {
        const response = await axios.delete(`http://localhost:8080/todos/${id}`);
        if(response){
            alert(response.data.message);
            loadTodos();
        }
    }

    return(
        <div>
            <h1>Todo List</h1>

            {todos.map((todoObj) => {
                const {id, todoItem, priority, Mood, isDone, createdAt} = todoObj;
                return (
                    <div key={id} className="border-1 shadow border-gray-500 m-3 px-2 py-4 rounded-lg flex items-center relative box-shadow-2xl">
                        <span className="bg-gray-900 text-zinc-100 absolute top-1 right-2 m-1 p-1 px-2 rounded-lg">{priority}</span>
                        <div className="text-2xl mx-0 my-2">{Mood}</div>
                        <div className={`font-semibold text-xl text-gray-200${isDone ? "done" : ""}`}>
                            <h2>{todoItem}</h2>
                        </div>
                        <span className="absolute bottom-2 right-2">
                            {createdAt.replace("T", " ").slice(0, 16)}
                        </span>

                        <button onClick={deleteTodo(id)} className=" bg-black text-zinc-100 px-3 py-1 mx-3 rounded-lg text-md ">Delete</button>
                    </div>
                );
            })}
            <Link className="fixed right-3 bottom-3 bg-black text-zinc-100 px-3 py-1 rounded-lg text-2xl " to="/new">New Todo</Link>
        </div>
    )
}

export default App;