const express=require("express");
const router=express.Router();

const controller=require("../Controller/TodoController");

// get all task's 
router.get("/getall",controller.get);


// post A task
router.post("/task",controller.post);

// delte a task
router.delete("/:id",controller.delete)

// markasdone
router.get("/markdone/:id",controller.mark)
// unmark
router.get("/markundone/:id",controller.unmark);

module.exports=router;