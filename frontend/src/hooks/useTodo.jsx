import { useState,useEffect } from "react";
import { toast } from 'react-toastify';
function useTodo(){
    let [alltasks,setalltasks]=useState([]);
    let [inputtask,setinputtask]=useState("");
   
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
        if(inputtask.length===0){
          return toast.warning("kuch likh to le mc ");
          
        }
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
      toast.success("posted successfullY");
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
        toast.success("delted successfully");
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
      toast.success("marked as done")
      } catch (error) {
        console.log("eroor in sending requres to backend");
        console.log(error); 
      }
    }
    // undone
    async function markasundone(id){
      try {
        let res=await fetch(`http://localhost:3000/markundone/${id}`,{
          method:"GET",
        })
        let data=res.json();
        console.log(data);
        toast.success("unmarked");
        getalltasks();
      } catch (error) {
        console.log(error);
      }
    }

    return {alltasks,setalltasks,inputtask,setinputtask,getalltasks,addtaskbtn,deletebtn,markasdone,markasundone};
}

export default useTodo;