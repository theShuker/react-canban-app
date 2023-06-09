import React from 'react';
import CanbanColumn from './CanbanColumn';
import CanbanTask from './CanbanTask';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../models/db';
import { ICanbanBoard } from '../../models/ICanbanBoard';
import CanbanAddNewColumn from './CanbanAddNewColumn';

function CanbanBoard({ board }: { board: ICanbanBoard }) {
  if (!board) return null;

  const columns = useLiveQuery(async () =>
    db.canbanColumns.where({ canbanBoardId: board.id }).sortBy('order')
  );

  console.log(columns);

  if (!columns?.length) return <p>Loading</p>;

  return (
    <main className="flex flex-nowrap gap-4 overflow-x-auto h-[calc(100vh-42px)] bg-slate-200">
      {/* Canban column */}
      {columns?.map((column) => (
        <CanbanColumn key={column.id} column={column} />
      ))}

      <CanbanAddNewColumn board={board} />
    </main>
  );
}

export default CanbanBoard;
