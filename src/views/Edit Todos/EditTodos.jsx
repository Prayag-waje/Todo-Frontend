import React, { useEffect } from 'react'
import { useState } from 'react';
import EmojiPicker from 'emoji-picker-react';
import axios from 'axios';
import { useParams } from 'react-router';

function EditTodos() {

  const { id } = useParams();

  const [tododata, setTododata] = useState({
    todoItem: "",
    priority: "low",
    Mood: "😊",
    isDone: false,
  });

  const editTodo = async () => {
    const response = await axios.put(`${import.meta.env.VITE_API_URL}/todos/${id}`,
      tododata);

    if (response){
      alert(response.data.message);

      setTimeout(()=>{
        window.location.href = "/";
      }, 2000)
    }
  }

  const [emojiPicker, setEmojiPicker] = useState(false);

  const loadTodo = async () => {
    if(!id) return;
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/todos/${id}`);

    const tododetail = response.data.data;

    setTododata({
      todoItem: tododetail.todoItem,
      priority: tododetail.priority,
      Mood: tododetail.Mood,
      isDone: tododetail.isDone,
    });
  }

  useEffect(() => {
    loadTodo();
  }, [id]);

  return (
    <div >
      <div className='flex flex-col gap-2 w-150 border-2 px-2 py-4 my-6 mx-auto rounded-xl shadow-xl'>
        <h1 className='text-3xl font-semibold'>Edit TODO : {id}</h1>
        <input type="text" value={tododata.todoItem}
        className='border-2 border-gray-700 rounded-lg p-1 m-2'
        onChange={(e) => {setTododata({...tododata, todoItem: e.target.value})}}
        />

        <select value={tododata.priority} 
          className='border-2 border-gray-700 rounded-lg p-1 m-2'
          onChange={(e) => setTododata({...tododata, priority: e.target.value})}>
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>

        <span className='text-xl mx-2'>
          Emoji: {tododata.Mood}

        <button className='border-2 border-gray-700 bg-black text-zinc-50 rounded-lg p-1 m-2' 
        onClick={()=>{setEmojiPicker(!emojiPicker)}}>Set Mood</button>
        <EmojiPicker 
        onEmojiClick={({emoji}) => {setTododata({...tododata, Mood: emoji,});  setEmojiPicker(false)}} 
        open={emojiPicker} />
        </span>

        <button className='border-2 border-gray-700 bg-black text-zinc-50 rounded-lg p-1 m-2'
          onClick={editTodo}
          alert={"Update TODO"}
        >Update TODO</button>
      </div>

      
    </div>
  )
}

export default EditTodos
