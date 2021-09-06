import Sign from "./Components/Sign";
import React, {useState} from "react";
import {ToastContainer} from "react-toastify";
import ChatWin from "./Components/ChatWin";

export default function App() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('data')));
    if(user === null){
           return <Sign setUser={(u)=>setUser(u)}/>
    }
    return (
        <>
                <ToastContainer/>
                <ChatWin/>
        </>
    )

}