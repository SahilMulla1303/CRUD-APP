import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';


const Edit = ({ tasks, selectedTask, setTasks, setIsEditing }) => {
  const taskId = selectedTask.taskId;

  const [taskTitle, setTaskTitle] = useState(selectedTask.taskTitle);
  const [taskDisc, setTaskDisc] = useState(selectedTask.taskDisc);
  const [assignTo, setAssignTo] = useState(selectedTask.assignTo);
  const [dueDate, setDueDate] = useState(selectedTask.dueDate);
  const baseURL = "http://localhost:56912/"
  const headers = {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
  }

  const handleUpdate = e => {
    e.preventDefault();

    if (!taskTitle || !taskDisc || !assignTo || !dueDate) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    }

    const task = {
      taskId,
      taskTitle,
      taskDisc,
      assignTo,
      dueDate,
    };

    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].taskId === taskId) {
        tasks.splice(i, 1, task);
        
    axios.post(baseURL + "EditTaskDetails",  task, { headers: headers })
    .then((response) => {
      console.log('Data added successfully:', response.data);
      // Optionally, you can perform additional actions after successful API call
    })
    .catch((error) => {
      console.error('Error adding data:', error);
      // Handle error scenarios
    });
        break;
      }
    }
    // localStorage.setItem('tasks_data', JSON.stringify(tasks));
    // setTasks(tasks);
    // setIsEditing(false);
        setTasks(tasks);
        setIsEditing(false);

    Swal.fire({
      icon: 'success',
      title: 'Updated!',
      text: `${task.taskId} ${task.taskTitle} data has been updated.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="small-container">
      <form onSubmit={handleUpdate}>
        <h1>Edit Task</h1>
        <label htmlFor="taskTitle">Task Title</label>
        <input
          id="taskTitle"
          type="text"
          name="taskTitle"
          value={taskTitle}
          onChange={e => setTaskTitle(e.target.value)}
        />
        <label htmlFor="taskDisc">Task Disc</label>
        <input
          id="taskDisc"
          type="text"
          name="taskDisc"
          value={taskDisc}
          onChange={e => setTaskDisc(e.target.value)}
        />
        <label htmlFor="assignTo">Assign To</label>
        <input
          id="assignTo"
          type="text"
          name="assignTo"
          value={assignTo}
          onChange={e => setAssignTo(e.target.value)}
        />
        <label htmlFor="dueDate">Due Date</label>
        <input
          id="dueDate"
          type="date"
          name="dueDate"
          value={dueDate}
          onChange={e => setDueDate(e.target.value)}
        />
        <div style={{ marginTop: '30px' }}>
          <input type="submit" value="Update" />
          <input
            style={{ marginLeft: '12px' }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsEditing(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default Edit;
