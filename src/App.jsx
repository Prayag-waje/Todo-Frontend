import React, { useState } from "react";
import "./index.css";
import Card from "./components/cards";

function App(){

    const raw = [
        {name:"Prayag", profession:"Painter", image:"", friend: false, image:"https://img.freepik.com/premium-photo/professional-painter-painting-wall-with-paint-roller_1024356-12565.jpg?semt=ais_hybrid&w=740"},
        {name:"Ravin", profession:"Singer", image:"", friend: false, image:"https://media.istockphoto.com/id/880905436/photo/lyric-singer-with-acoustic-guitar.jpg?s=612x612&w=0&k=20&c=3QR4ss582RlA0N0ozg2Q_UN1PDyBV2Ea8_MT0_KW8Ws="},
        {name:"Shubham", profession:"Driver", image:"", friend: false, image:"https://t4.ftcdn.net/jpg/01/79/99/99/360_F_179999999_1mzWKikF52md2KxaKIh2yPC47A365Jtx.jpg"},
        {name:"Rahul", profession:"Worker", image:"", friend: false, image:"https://media.istockphoto.com/id/1346124841/photo/successful-construction-site-worker-thinking.jpg?s=612x612&w=0&k=20&c=nIOAGsr7yd2h-0XNLqY8lFRFsbAqKl411VVQn86G3fI="},
    ];

    const [data, setData] = useState(raw)
    const handleClick = (changingIndex) =>{
        setData((prev)=>{
            return prev.map((item, index)=>{
                if(index === changingIndex) return {...item, friend: !item.friend}
                return item;
            })
        })
    }

    return (
        <>
        <div className="w-full h-screen bg-zinc-100 flex justify-center items-center gap-10">
            {data.map((item, index)=>(
                <Card key={index} index={index} handleClick={handleClick} values={item} />
                
                
            ))}
        </div>
        </>
    )
}

export default App;