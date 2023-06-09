import React from 'react';
import { db } from '../../models/db';
import { ICanbanBoard } from '../../models/ICanbanBoard';

function CanbanAddNewColumn({board}: {board: ICanbanBoard}) {
  if(!board) return null

  async function createNewColumn(){
    await db.canbanColumns.add({
      canbanBoardId: board.id as number,
      title: "New column",
      order: 1
    })
    
  }
  
  return (
    <section className="flex justify-center cursor-pointer items-center flex-col flex-shrink-0 p-4 w-[300px] border border-dashed border-slate-500 min-h-full hover:bg-white/20"
    onClick={() => createNewColumn()}
    >
      <span className='text-sm mb-2 font-semibold'>Add new column</span>
      <div className='rounded-full bg-white font-thin w-10 h-10 flex justify-center items-center text-3xl pb-1'>+</div>
    </section>
  );
}

export default CanbanAddNewColumn;
