import { useLiveQuery } from 'dexie-react-hooks';
import CanbanBoard from './components/canban/CanbanBoard';
import Header from './components/Header';
import { db } from './models/db';

function App() {
  if (!('indexedDB' in window)) {
    return (
      <div className="flex h-screen justify-center items-center bg-red-400">
        <p className="text-2xl">This browser doesn't support IndexedDB, which is required.</p>
      </div>
    );
  }

  const board = useLiveQuery(() => db.canbanBoards.limit(1).toArray());
  if (!board) return null;

  return (
    <div className="App">
      <Header currentBoard={board[0]} />
      <CanbanBoard board={board[0]} />
    </div>
  );
}

export default App;
