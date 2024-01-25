import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

import Header from './Header';
import Table from './Table';
import Add from './Add';
import Edit from './Edit';

import { tasksData } from '../../data';
import axios from 'axios';

const Dashboard = ({ setIsAuthenticated }) => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [post, setPost] = React.useState(null);
  const baseURL = "http://localhost:56912/"
  const headers = {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
  }
  React.useEffect(() => {
    if (!isAdding && !isEditing) {
      alert('here')
      const userData = {
        taskId: 1
      };
      axios.post(baseURL + "GetTaskDetailsList",
      ).then((response) => {
        setTasks(response.data);
      });
    }
  }, []);
  // console.log(post, "post");
  // useEffect(() => {
  //   const data = JSON.parse(localStorage.getItem('tasks_data'));
  //   if (data !== null && Object.keys(data).length !== 0) setTasks(data);
  // }, []);

  const handleEdit = (taskId) => {
    setIsEditing(true);
    // const [task] = tasks.filter(task => task.taskId === taskId);
    const userData = {
      taskId: taskId
    };
    axios.post(baseURL + "GetTaskDetails", userData, { headers: headers }).then((response) => {
      setSelectedTask(response.data);
    });
    // setSelectedTask(task);
  };

  const handleDelete = taskId => {
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then(result => {
      if (result.value) {
        const [task] = tasks.filter(task => task.taskId === taskId);

        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: `${task.taskId} ${task.taskTitle} data has been deleted.`,
          showConfirmButton: false,
          timer: 1500,
        });

        const userData = {
          taskId: taskId
        };
        axios.post(baseURL + "DeleteTaskDetails", userData, { headers: headers });

        // const tasksCopy = tasks.filter(task => task.taskId !== taskId);
        // localStorage.setItem('tasks_data', JSON.stringify(tasksCopy));
        // setTasks(tasksCopy);
      }
    });
  };

  return (
    <div className="container">
      {!isAdding && !isEditing && (
        <>
          <Header
            setIsAdding={setIsAdding}
            setIsAuthenticated={setIsAuthenticated}
          />
          {tasks.length > 0 &&
            <Table
              tasks={tasks}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />}
        </>
      )}
      {isAdding && (
        <Add
          tasks={tasks}
          setTasks={setTasks}
          setIsAdding={setIsAdding}
        />
      )}
      {(isEditing &&
        tasks.length > 0 &&
        selectedTask != null) && (
          <Edit
            tasks={tasks}
            selectedTask={selectedTask}
            setTasks={setTasks}
            setIsEditing={setIsEditing}
          />
        )}
    </div>
  );
};

export default Dashboard;
