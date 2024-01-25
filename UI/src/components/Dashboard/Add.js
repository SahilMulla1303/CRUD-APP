import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

const Add = ({ tasks, setTasks, setIsAdding }) => {
  const [taskId, setTaskId] = useState('');
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDisc, setTaskDisc] = useState('');
  const [assignTo, setAssignTo] = useState('');
  const [dueDate, setDueDate] = useState('');
  const baseURL = "http://localhost:56912/"
  const headers = {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
  }

   const handleAdd = e => {                   
    e.preventDefault();


    if (!taskId || !taskTitle || !taskDisc || !assignTo || !dueDate) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',

        showConfirmButton: true,
      });
    }

    const newTask = {
      taskId,
      taskTitle,
      taskDisc,
      assignTo,
      dueDate,
    };

    // tasks.push(newTask);
    // localStorage.setItem('tasks_data', JSON.stringify(tasks));
    // setTasks(tasks);
    // setIsAdding(false);

    axios.post(baseURL + "AddTaskDetails",  newTask, { headers: headers })
    .then((response) => {
      console.log('Data added successfully:', response.data);
      
      // Optionally, you can perform additional actions after successful API call
    })
    .catch((error) => {
      console.error('Error adding data:', error);
      // Handle error scenarios
    });
     setTasks(tasks);
    setIsAdding(false);

    Swal.fire({
      icon: 'success',
      title: 'Added!',
      text: `${taskId} ${taskTitle} data has been Added.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  

  return (
    <div className="small-container">
      <form onSubmit={handleAdd}>
        <h1>Add Task</h1>
        <label htmlFor="taskId">Task Id</label>
        <input
          id="taskId"
          type="text"
          name="taskId"
          value={taskId}
          onChange={e => setTaskId(e.target.value)}
        />
        
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
        <label htmlFor="asignTo">Asign To</label>
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
          <input type="submit" value="Add" />
          <input
            style={{ marginLeft: '12px' }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsAdding(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default Add;
