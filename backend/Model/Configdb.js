const mongoose=require("mongoose");

async function connectdb(){
    await  mongoose.connect("mongodb://127.0.0.1:27017/Todo");
}
let connect=()=>{ connectdb()
.then(()=>{
    console.log("Connected to db successfully");
})
.catch((err)=>{
    console.log("error in connecting to db ");
    console.log(err);
})
}
module.exports=connect;