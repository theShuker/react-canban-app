import { useLiveQuery } from 'dexie-react-hooks';
import { FaBars } from 'react-icons/fa';
import { db } from '../../models/db';
import { ICanbanColumn } from '../../models/ICanbanColumn';
import CanbanAddNewTask from './CanbanAddNewTask';
import CanbanTask from './CanbanTask';
import { ICanbanTask } from '../../models/ICanbanTask';
import { useRef } from 'react';
import DeleteButton from './DeleteButton';

export interface CanbanColumnProps {
  column: ICanbanColumn;
}

function CanbanColumn({ column }: CanbanColumnProps) {
  

  const tasks = useLiveQuery(async () =>
    db.canbanTasks.where({ canbanColumnId: column.id }).sortBy('order')
  );
  if (!tasks) return null;

  async function updateColumn(update: Partial<ICanbanColumn>) {
    try {
      await db.canbanColumns.update(column, update);
    } catch (error) {
      console.log(`Error updating task with id ${column.id}`, error);
    }
  }

  async function deleteColumn(){
    try {
      await db.canbanColumns.delete(column.id as number)
    } catch (error) {
      console.log(`Error deleting col with id ${column.id}`, error);
    }
  }

  const refs: HTMLElement[] = []

  return (
    <section className="flex flex-col flex-shrink-0 p-4 bg-slate-50 w-[300px] border-r min-h-full">
      {/* Column title and menu */}
      <div className="flex justify-between items-center mb-3">
        <h2
          className="font-semibold text-lg w-full mr-1"
          suppressContentEditableWarning={true}
          spellCheck={false}
          contentEditable
          onBlur={(e) => {
            updateColumn({ title: e.target.innerText });
          }}>
          {column.title}
        </h2>
        
        <DeleteButton onDelete={() => {deleteColumn()}} />
      </div>

      <div className="overflow-y-auto flex flex-col gap-3">
        {/* Column items */}
        {tasks.map((task, i) => (
          <CanbanTask refs={refs} key={task.id} task={task} index={i} />
        ))}

        <CanbanAddNewTask itemRefs={refs} column={column} tasks={tasks}/>
      </div>
    </section>
  );
}

export default CanbanColumn;
