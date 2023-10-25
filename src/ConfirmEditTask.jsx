import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function EditTask({ taskName, onConfirm }) {
  const [editedTask, setEditedTask] = useState(taskName);

  const handleEdit = () => {
    onConfirm(editedTask);
  };

  return (
    <div>
      <input
        type="text"
        value={editedTask}
        onChange={(e) => setEditedTask(e.target.value)}
      />
      <button onClick={handleEdit}>Salvar</button>
    </div>
  );
}

export default EditTask;
