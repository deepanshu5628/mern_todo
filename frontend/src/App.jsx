import { MdDelete } from "react-icons/md";
import { FaCheck, FaCross } from "react-icons/fa";
import './App.css'
import useTodo from "./hooks/useTodo";
function App() {
  const {alltasks,inputtask,setinputtask,addtaskbtn,deletebtn,markasdone,markasundone}=useTodo();
 
  return (
    <>
      <h1>Todo List:</h1>
      <input type="text" placeholder='enter task' value={inputtask} onChange={(event)=>{setinputtask(event.target.value);}} />
      <button onClick={addtaskbtn} >Submit</button>
      <div className="Alltask">
            {alltasks.map((ta)=>{
             return  <div className="divno4" key={ta._id} >
              {ta.isdone ? (<div> <p style={{textDecoration:'line-through'}}>{ta.task}</p></div> ):(<div> <p>{ta.task}</p> </div>)} 
              <div>
              <MdDelete onClick={()=>deletebtn(ta._id)} /> 
              {ta.isdone? (<FaCross onClick={()=>markasundone(ta._id)} />):(<FaCheck onClick={()=>markasdone(ta._id)} />) } 
              </div>
              </div> 
            })}
              
            
        </div>
    </>
  )
}


export default App;
