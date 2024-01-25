import React from 'react';

const Table = ({ tasks, handleEdit, handleDelete }) => {
  // tasks.forEach((task, i) => {
  //   task.taskId = i + 1;
  // });

  // const formatter = new Intl.NumberFormat('en-US', {
  //   style: 'currency',
  //   currency: 'USD',
  //   minimumFractionDigits: null,
  // });

  return (
    <div className="contain-table">
      <table className="striped-table">
        <thead>
          <tr>
            <th>Task Id</th>
            <th>Task Title</th>
            <th>Task Disc</th>
            <th>Assign To</th>
            <th>Due Date</th>
            <th colSpan={2} className="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {tasks.length > 0 ? (
            tasks.map((task, i) => (
              <tr key={i}>
                <td>{task.taskId}</td>
                <td>{task.taskTitle}</td>
                <td>{task.taskDisc}</td>
                <td>{task.assignTo} </td>
                <td>{task.dueDate} </td>
                <td className="text-right">
                  <button
                    onClick={() => handleEdit(task.taskId)}
                    className="button muted-button"
                  >
                    Edit
                  </button>
                </td>
                <td className="text-left">
                  <button
                    onClick={() => handleDelete(task.taskId)}
                    className="button muted-button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>NoTask</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
