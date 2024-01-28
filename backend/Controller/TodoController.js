const mongoose=require("mongoose");
let Todo=require("../Model/Todo");
exports.get=async(req,res)=>{
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
};

exports.post=async(req,res)=>{
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
 };

exports.delete=async(req,res)=>{
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
};

exports.mark=async(req,res)=>{
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
};


exports.unmark=async(req,res)=>{
    try {
        let {id}=req.params;
        let unmarked=await Todo.findByIdAndUpdate(id,{isdone:false});
        res.status(200).json({
            success:true,
            data:unmarked,
            message:"successfuly unmarked",
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error,
        })
    }
};