import React, { ChangeEvent, useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { BiTrash } from 'react-icons/bi';
import { db } from '../../models/db';
import { ICanbanTask } from '../../models/ICanbanTask';
import DeleteButton from './DeleteButton';

interface CanbanTaskProps {
  refs: any;
  task: ICanbanTask;
  index: number;
}

function CanbanTask({ refs, task, index }: CanbanTaskProps) {
  

  async function updateTask(update: Partial<ICanbanTask>) {
    try {
      await db.canbanTasks.update(task, update);
    } catch (error) {
      console.log(`Error updating task with id ${task.id}`, error);
    }
  }

  async function deleteTask() {
    try {
      await db.canbanTasks.delete(task.id as number);
    } catch (error) {
      console.log(`Error deleting task with id ${task.id}`, error);
    }
  }

  return (
    <div ref={el => refs[index] = el} className="flex flex-col gap-3 bg-white rounded border px-3 py-2" draggable={true}>
      <div className="flex justify-between items-center">
        <h2 
          className="canban-task-title font-semibold w-full mr-1"
          suppressContentEditableWarning={true}
          spellCheck={false}
          contentEditable
          tabIndex={1}
          onBlur={(e) => {
            updateTask({ title: e.target.innerText });
          }}>
          {task.title}
        </h2>
        
        <DeleteButton onDelete={() => deleteTask()} />
      </div>

      <p
        className="canban-task-description text-sm w-full"
        suppressContentEditableWarning={true}
        spellCheck={false}
        contentEditable
        tabIndex={1}
        onBlur={(e) => {
          updateTask({ description: e.target.innerText });
        }}>
        {task.description}
      </p>

      <small>
        index:{index}; order:{task.order}
      </small>
    </div>
  );
}

export default CanbanTask;
