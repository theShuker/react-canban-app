import React, { useState } from 'react';
import { BiTrash } from 'react-icons/bi';

function DeleteButton({onDelete}: {onDelete: () => any}) {
  const [tryingDelete, setTryingDelete] = useState(false);

  return (
    <button
      className={`p-1 rounded hover:text-white ${
        tryingDelete ? 'hover:bg-red-500 bg-red-500' : 'hover:bg-slate-300'
      }`}
      title={tryingDelete ? 'Are u sure?' : 'Delete'}
      tabIndex={1}
      onClick={() => {
        if (!tryingDelete) {
          setTryingDelete(true);
          setTimeout(() => {
            setTryingDelete(false);
          }, 2000);
          return;
        }
        onDelete()
      }}>
      <BiTrash className="text-sm" />
    </button>
  );
}

export default DeleteButton;
