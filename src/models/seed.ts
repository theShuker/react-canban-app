import { db } from './db'

export async function seed(){
  //clearing db
  await Promise.all([db.canbanBoards.clear(), db.canbanColumns.clear(), db.canbanTasks.clear()]);

  await db.transaction('rw', db.canbanBoards, db.canbanColumns, db.canbanTasks, async () => {
    let canbanBoardId = await db.canbanBoards.add({
      title: "Demo board"
    })

    let column1 = await db.canbanColumns.add({
      canbanBoardId,
      title: 'First col',
      order: 1
    })

    let column2 = await db.canbanColumns.add({
      canbanBoardId,
      title: 'Second col',
      order: 2
    })

    await db.canbanTasks.add({
      canbanColumnId: column1,
      title: 'Task1',
      description: 'demo task 1',
      order: 1,
    })

    await db.canbanTasks.add({
      canbanColumnId: column1,
      title: 'Task 2',
      description: 'demo task 2',
      order: 2,
    })

    await db.canbanTasks.add({
      canbanColumnId: column1,
      title: 'Task 3',
      description: 'demo task 3',
      order: 3,
    })

    await db.canbanTasks.add({
      canbanColumnId: column2,
      title: 'Task1',
      description: 'demo task 1',
      order: 1,
    })

    await db.canbanTasks.add({
      canbanColumnId: column2,
      title: 'Task 2',
      description: 'demo task 2',
      order: 2,
    })

    await db.canbanTasks.add({
      canbanColumnId: column2,
      title: 'Task 3',
      description: 'demo task 3',
      order: 3,
    })


    console.log('db seeded')
  })
}

