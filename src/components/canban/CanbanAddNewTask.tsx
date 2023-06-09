import React, {useEffect, useRef, useState} from 'react';
import { db } from '../../models/db';
import { ICanbanColumn } from '../../models/ICanbanColumn';
import { ICanbanTask } from '../../models/ICanbanTask';

function CanbanAddNewTask({column, tasks, itemRefs}: {itemRefs:any, column: ICanbanColumn, tasks: ICanbanTask[]}) {

  const focusCreatedElement = useRef(false)

  useEffect(()=>{
    if(focusCreatedElement.current){
      console.log(itemRefs.at(-1))

      let title = itemRefs.at(-1).getElementsByClassName("canban-task-title")[0]
      console.log(title)
      window.getSelection()?.selectAllChildren(title)
      title.focus()

      focusCreatedElement.current = false
    }
  }, [tasks])

  async function createNewTask(){
    await db.canbanTasks.add({
      canbanColumnId: column.id as number,
      title: "New task",
      description: "New task description",
      order: tasks.length + 1
    })

    focusCreatedElement.current = true
  }

  return (
    <div className="border border-dashed flex justify-center hover:bg-slate-300 cursor-pointer" onClick={() => {createNewTask()}}>
      <span className="font-thin text-3xl pb-1">+</span>
    </div>
  )
}

export default CanbanAddNewTask;
