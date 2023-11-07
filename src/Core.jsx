import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import "./Core.scss";
import ConfirmationModal from "./ConfirmationModal";
import "./ConfirmationModal.scss";

function Core() {
  const [tasks, setTasks] = useState([
    { task: "Limpar a casa", completed: false },
    { task: "Responder e-mails", completed: false },
  ]);

  const [editingTask, setEditingTask] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [taskToDeleteName, setTaskToDeleteName] = useState("");
  const [showEditConfirmation, setShowEditConfirmation] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [editedTask, setEditedTask] = useState("");

  const addTaskButtonRef = useRef(null);
  const newTaskSectionRef = useRef(null);

  const addTask = () => {
    setTasks([...tasks, { task: "", completed: false }]);
  };

  useEffect(() => {
    if (addTaskButtonRef.current && newTaskSectionRef.current) {
      newTaskSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [tasks]);

  const editTask = (index) => {
    setEditedTask(tasks[index].task);
    setTaskToEdit(index);
    setShowEditConfirmation(true);
  };

  const saveTask = () => {
    const updatedTasks = [...tasks];
    updatedTasks[taskToEdit].task = editedTask;
    setTasks(updatedTasks);
    setTaskToEdit(null);
    setShowEditConfirmation(false);
  };

  const deleteTask = (index) => {
    setTaskToDelete(index);
    setTaskToDeleteName(tasks[index].task);
    setShowDeleteConfirmation(true);
  };

  const confirmDeleteTask = () => {
    const updatedTasks = tasks.filter((_, i) => i !== taskToDelete);
    setTasks(updatedTasks);
    setShowDeleteConfirmation(false);
    setTaskToDelete(null);
    setTaskToDeleteName("");
  };

  const cancelDeleteTask = () => {
    setShowDeleteConfirmation(false);
    setTaskToDelete(null);
    setTaskToDeleteName("");
  };

  const toggleTaskStatus = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  return (
    <div className="core">
      <h1 className="core-heading">
        Otimize seu tempo e se organize com o nosso Planejador Diário.
      </h1>
      {showDeleteConfirmation ? (
        <ConfirmationModal
          isOpen={showDeleteConfirmation}
          onConfirm={confirmDeleteTask}
          onCancel={cancelDeleteTask}
          taskName={taskToDeleteName}
        />
      ) : showEditConfirmation ? (
        <ConfirmationModal
          isOpen={showEditConfirmation}
          onConfirm={() => saveTask()}
          onCancel={() => {
            setTaskToEdit(null);
            setShowEditConfirmation(false);
          }}
          taskName={tasks[taskToEdit].task}
          isEditing={true}
          editedTask={editedTask}
          setEditedTask={setEditedTask}
        />
      ) : (
        <div>
          <div className="center-table">
            <table className="core-table">
              <tbody>
                <tr>
                  <td className="task-column">Tarefa</td>
                  <td className="status-column">Status</td>
                  <td className="options-column">Opções</td>
                </tr>
                <tr className="divider-row">
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                {tasks.map((task, index) => (
                  <tr key={index}>
                    <td className="task-column">
                      {index === taskToEdit ? (
                        <input
                          type="text"
                          value={editedTask}
                          onChange={(e) => {
                            setEditedTask(e.target.value);
                          }}
                        />
                      ) : (
                        <span
                          style={{
                            textDecoration: task.completed
                              ? "line-through"
                              : "none",
                          }}
                        >
                          {task.task}
                        </span>
                      )}
                    </td>
                    <td className="status-column">
                      <input
                        type="checkbox"
                        className="checkbox"
                        checked={task.completed}
                        onChange={() => toggleTaskStatus(index)}
                      />
                    </td>
                    <td className="options-column">
                      {index === taskToEdit ? (
                        <button onClick={saveTask}>Salvar</button>
                      ) : (
                        <>
                          <button onClick={() => editTask(index)}>
                            <FontAwesomeIcon icon={faPen} />
                          </button>
                          <button onClick={() => deleteTask(index)}>
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="add-task-section" ref={newTaskSectionRef}>
            <button className="add-button" onClick={addTask}>
              <FontAwesomeIcon icon={faPlus} />
            </button>
            <p className="new-task-text">Nova Tarefa...</p>
          </div>
        </div>
      )}
      <div ref={addTaskButtonRef}></div>
    </div>
  );
}

export default Core;
