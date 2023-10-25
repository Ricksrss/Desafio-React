import React, { useState } from "react";
import "./ConfirmationModal.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function ConfirmationModal({
  isOpen,
  onConfirm,
  onCancel,
  taskName,
  isEditing,
  editedTask,
  setEditedTask,
}) {
  const confirmationText = isEditing
    ? "Tem certeza que deseja editar esse item?"
    : "Tem certeza que deseja excluir";

  const confirmationAction = isEditing ? "Editar" : "Excluir";

  const [isEditingTask, setIsEditingTask] = useState(false);

  const handleEdit = () => {
    setIsEditingTask(true);
  };

  const handleSaveEdit = () => {
    onConfirm(editedTask);
    setIsEditingTask(false);
  };

  const handleDelete = () => {
    onConfirm();
  };

  return isOpen ? (
    <div className="confirmation-modal">
      <p>{confirmationText}</p>
      <p>{`"${taskName}"?`}</p>
      {isEditingTask ? (
        <>
          <input
            type="text"
            value={editedTask}
            onChange={(e) => setEditedTask(e.target.value)}
          />
          <button className="button" onClick={handleSaveEdit}>
            Salvar
          </button>
        </>
      ) : (
        <div className="button-container">
          {isEditing ? (
            <button onClick={handleEdit}>Editar</button>
          ) : (
            <button onClick={handleDelete}>Excluir</button>
          )}
          <button onClick={onCancel}>Não</button>
        </div>
      )}
    </div>
  ) : null;
}

export default ConfirmationModal;
