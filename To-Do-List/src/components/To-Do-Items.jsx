import React from "react";

function ToDoItems({text, isComplete, id, toggleTask, deleteTodo}){
    return(
        <div className="flex justify-between items-center gap-2" >
        <label className={`hover:bg-slate-200 flex-1 p-2 rounded-md cursor-pointer select-none ${isComplete?"line-through text-slate-600" :""}`} onClick={() => toggleTask(id)}>{text}</label>
        <div className="size-[26px] p-1 rounded-md text-black-500 hover:text-red-500 cursor-default " onClick={()=>{deleteTodo(id)}}>
            x
        </div>
    </div>
    )
}

export default ToDoItems