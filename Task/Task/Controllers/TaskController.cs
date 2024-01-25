using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Task.Models;

namespace Task.Controllers
{
    public class TaskController : ApiController
    {
        [HttpPost]
        [Route("AddTaskDetails")]
        public string AddTaskDetails([FromBody] TaskModel TaskModel)
        {
            return TaskModel.AddTaskDetails();
        }
        [HttpPost]
        [Route("GetTaskDetails")]
        public TaskModel GetTaskDetails([FromBody] TaskModel taskDetailModel)
        {
            return taskDetailModel.GetTaskDetails();
        }
        [HttpPost]
        [Route("DeleteTaskDetails")]
        public string DeleteTaskDetails([FromBody] TaskModel taskDetailModel)
        {
            return taskDetailModel.DeleteTaskDetails();
        }
        [HttpPost]
        [Route("EditTaskdetails")]
        public TaskModel EditTaskdetails([FromBody] TaskModel taskDetailModel)
        {
            return taskDetailModel.EditTaskdetails();
        }
        [HttpPost]
        [Route("GetTaskDetailsList")]
        public List<TaskModel> GetTaskDetailsList()
        {
            TaskModel taskDetailModel = new TaskModel();
            return taskDetailModel.GetTaskDetailsList();
        }
    }
}