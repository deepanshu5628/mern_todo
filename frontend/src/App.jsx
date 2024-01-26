import { MdDelete } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import './App.css'
import { useState,useEffect } from 'react';
function App() {
  let [alltasks,setalltasks]=useState([]);
  let [inputtask,setinputtask]=useState("");
  function inputchangehandler(event){
    setinputtask(event.target.value);
  }
  // get request 
    async function getalltasks(){
     try {
      let res=await fetch("http://localhost:3000/getall",{
        method :"GET",
      });
      let data=await res.json();
      let output=data.data;
      // console.log(output);
      setalltasks([...output]);
     } catch (error) {
      console.log(error);
     }
    }
    useEffect(()=>{
      getalltasks();
    },[]);


    // post request 
    async  function addtaskbtn(){
    try {
      let res= await fetch("http://localhost:3000/task",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify({
        task:inputtask,
      }),
    });
    let data=await res.json();
    console.log(data.message);
    setinputtask("");
    getalltasks();
   } catch (error) {
      console.log("eroor in sending requres to backend");
      console.log(error);      
    }
  }

  // delte 
  async function deletebtn(id){
    console.log(id);
    try {
      let res=await fetch(`http://localhost:3000/${id}`,{
        method:"DELETE",
      });
      let data=await res.json();
      console.log(data);
      getalltasks();
    } catch (error) {
      console.log("eroor in sending requres to backend");
      console.log(error); 
    }
  }

  // markasdone 
  async function markasdone(id){
    console.log(id);
    try {
      let res=await fetch(`http://localhost:3000/markdone/${id}`,{
      method:"GET",
      });
    let data=await res.json();
    console.log(data);
    getalltasks();
    } catch (error) {
      console.log("eroor in sending requres to backend");
      console.log(error); 
    }
  }
let style={textDecoration:'line-through'};
  return (
    <>
      <h1>Todo List:</h1>
      <input type="text" placeholder='enter task' value={inputtask} onChange={inputchangehandler} />
      <button onClick={addtaskbtn} >Submit</button>
      <div className="Alltask">
            {alltasks.map((ta)=>{
             return  <div className="divno4" key={ta._id} >
              {ta.isdone ? (<div> <p style={style}>{ta.task}</p></div> ):(<div> <p>{ta.task}</p> </div>)} 
              <div>
              <MdDelete onClick={()=>deletebtn(ta._id)} /> 
              <FaCheck onClick={()=>markasdone(ta._id)} /> 
              <MdEdit />
              </div>
              </div> 
            })}
              
            
        </div>
    </>
  )
}


export default App;
