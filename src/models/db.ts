import Dexie, { Table } from 'dexie';

import { ICanbanBoard } from './ICanbanBoard';
import { ICanbanColumn } from './ICanbanColumn';
import { ICanbanTask } from './ICanbanTask';

export class CanbanDB extends Dexie {
  canbanBoards!: Table<ICanbanBoard, number>;
  canbanColumns!: Table<ICanbanColumn, number>;
  canbanTasks!: Table<ICanbanTask, number>;

  db = this;

  constructor() {
    super('CanbanDB');

    this.version(1).stores({
      canbanBoards: '++id',
      canbanColumns: '++id, canbanBoardId, order',
      canbanTasks: '++id, canbanColumnId, order',
    });

    // this.canbanBoards.mapToClass(CanbanBoardController);
  }
}

export const db = new CanbanDB()

// export class CanbanBoardController {
//   id: number;
//   title: string;

//   columns:

//   constructor() {}
// }
