import Sign from "./Components/Sign";
import {useState} from "react";

export default function App() {
    const [user, setUser] = useState(null);
    if(user === null){
           return <Sign setUser={(u)=>setUser(u)}/>
    }
    return (
        <div >
           <h1>Welcome</h1>
        </div>
    )

}