import mongoose from "mongoose";

const todoSchema=new mongoose.Schema({
    title:String,
    text:String,
    status:{ type:String, enum:["not yet started","in progress","complete"], default: 'not yet started' }
},{timestamps:true})

todoSchema.methods.sayHello=()=>{
return `Hello this is todo the title is - ${this.title} and the text is ${this.text}`
}

const Todo=mongoose.model('todo',todoSchema)

export default Todo;