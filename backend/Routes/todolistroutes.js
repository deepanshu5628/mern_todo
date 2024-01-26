const express=require("express");
const router=express.Router();
const mongoose=require("mongoose");
let Todo=require("../Model/Todo");

// get all task's 
router.get("/getall",async(req,res)=>{
    try {
        let alltask=await Todo.find();
        // console.log(alltask);
        if(!alltask){
            return res.status(200).json({
                success:true,
                data:null,
                message:"task list is empty ",
            })
        }
        res.status(200).json({
            success:true,
            data:alltask,
            message:"here are all the taskes",
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"error in fetching data form the database ",
        })
    }
})


// post A task
router.post("/task",async(req,res)=>{
   try {
    let {task}=req.body;
    let addedtask=await Todo.create({
        task:task,
    })
    res.status(200).json({
        success:true,
        data:addedtask,
        message:"data is saved successfully",
    });
   } catch (error) {
    res.status(500).json({
        success:false,
        message:"failed to post data",
        err:error,
    })
   }
});

// delte a task
router.delete("/:id",async(req,res)=>{
    try{
        let {id}=req.params;
        let deletedtask=await Todo.findByIdAndDelete(id);
        res.status(200).json({
        success:true,
        message:"task is delted successflly",
        data:deletedtask,
    })
    }catch(err){
        res.status(500).json({
            success:false,
            message:`err in delteing taks ${err}`,
        })
    }
})

// markasdone
router.get("/markdone/:id",async(req,res)=>{
    console.log("requrest is recived in the backedn of markasdone");
    try {
        let {id}=req.params;
    let markedasdone=await Todo.findByIdAndUpdate(id,{isdone:true},);
    res.status(200).json({
        success:true,
        data:markedasdone,
        message:"suucssdfully marked as done",
    })
    } catch (error) {
       res.status(500).json({
        success:false,
        message:`${error}`
       }) 
    }
})

module.exports=router;