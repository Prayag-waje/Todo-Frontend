import React from 'react'
import { useState } from 'react';
import EmojiPicker from 'emoji-picker-react';
import axios from 'axios';

function NewTodos() {
  const [tododata, setTododata] = useState({
    todoItem: "",
    priority: "High",
    Mood: "😊",
  });

  const [emojiPicker, setEmojiPicker] = useState(false);

  const addTodo = () =>async () => {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/todos`,
      tododata);

      if (response){
        alert(response.data.message);

        // setTimeout(()=>{
        //   window.location.href = "/";
        // }, 2000)
      }
    }


  return (
    <div >
      <p className='text-2xl'>
        {tododata.todoItem}, 
        {tododata.priority}, 
        {tododata.Mood}
      </p>

      <div className='flex flex-col gap-2 w-150 border-2 px-2 py-4 my-6 mx-auto rounded-xl shadow-xl'>
        <h1 className='text-3xl font-semibold'>New TODO</h1>
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
          onClick={addTodo()}
        >Add TODO</button>
      </div>

      
    </div>
  )
}

export default NewTodos
