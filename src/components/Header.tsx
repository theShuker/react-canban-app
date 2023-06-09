import { BiTable } from 'react-icons/bi';
import { ICanbanBoard } from '../models/ICanbanBoard';
import { seed } from '../models/seed';

function Header({currentBoard}: {currentBoard: ICanbanBoard}) {
  return (
    <header className="px-4 py-2 border-b h-[42px] flex justify-between items-center">
      <span className="font-bold flex items-center gap-1">
        <BiTable className="text-xl" />
        Canban App
      </span>

      <span>{currentBoard?.title}</span>

      <button onClick={() => {seed()}}>Seed db</button>
    </header>
  );
}

export default Header;
