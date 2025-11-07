import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../index.css";
import axios from "axios";

function App(){
    
    const [todos,setTodos] = useState([]);

    const loadTodos = async() => {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/todos`);
        setTodos(response.data.data);
        
    };

    useEffect(() => {
        loadTodos();
    }, []);

    const deleteTodo = (id) => async () => {
        const response = await axios.delete(`${import.meta.env.VITE_API_URL}/todos/${id}`);
        if(response){
            alert(response.data.message);
            loadTodos();
        }
    }

    const markTODone = async (id, isDone) => {
        console.log(id, isDone);
        const response = await axios.patch(`${import.meta.env.VITE_API_URL}/todos/${id}/status`, {isDone});
        if(response){
            loadTodos();
        }
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <header className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-extrabold">Todo List</h1>
                <Link
                    className="bg-black text-zinc-100 px-3 py-2 rounded-lg text-sm"
                    to="/new"
                >
                    + New Todo
                </Link>
            </header>

            <main className="space-y-4">
                {todos.map((todoObj) => {
                    const { id, todoItem, priority, Mood, isDone, createdAt } = todoObj;
                    return (
                        <article
                            key={id}
                            className="flex items-start gap-4 p-4 rounded-lg shadow-sm border bg-white"
                        >
                            <div className="flex-shrink-0 flex flex-col items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={isDone}
                                    onChange={(e) => {
                                        markTODone(id, e.target.checked);
                                    }}
                                />
                                <div className="text-2xl">{Mood}</div>
                            </div>

                            <div className="flex-1">
                                <div className="flex items-start justify-between">
                                    <div className={`font-semibold text-lg text-gray-800 ${!isDone ? "" : "line-through"}`}>
                                        {todoItem}
                                    </div>
                                    <span className="text-xs bg-gray-900 text-zinc-100 px-2 py-1 rounded">
                                        {priority}
                                    </span>
                                </div>

                                <div className="mt-2 text-sm text-gray-500">
                                    <time>{createdAt.replace("T", " ").slice(0, 16)}</time>
                                </div>
                            </div>

                            <div className="flex flex-col items-end gap-2">
                                <Link to={`/edit/${id}`}>
                                    <button className="bg-gray-900 text-zinc-100 px-3 py-1 rounded">Edit</button>
                                </Link>
                                <button onClick={deleteTodo(id)} className="bg-red-600 text-white px-3 py-1 rounded">Delete</button>
                            </div>
                        </article>
                    );
                })}
            </main>
        </div>
    );
}

export default App;