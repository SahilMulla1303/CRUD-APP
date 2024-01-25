using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;
using System.Web.UI;
using System.IO;

namespace Task.Models
{
    public class TaskModel
    {
        public int taskId { get; set; }
        public string taskTitle { get; set; }
        public string taskDisc { get; set; }
        public string assignTo { get; set; }
        public string dueDate { get; set; }

        public string AddTaskDetails()
        {
            string addTaskDetailsReturn = "";
            string connetionString = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
            using (SqlConnection oConnection = new SqlConnection(connetionString))
            {
                oConnection.Open();
                using (SqlCommand oCommand = oConnection.CreateCommand())
                {
                    oCommand.CommandType = CommandType.StoredProcedure;
                    oCommand.CommandText = "usp_AddTaskDetails";

                    oCommand.Parameters.Add(new SqlParameter("@taskId", SqlDbType.Int))
                        .Value = taskId;
                    oCommand.Parameters.Add(new SqlParameter("@taskTitle", SqlDbType.VarChar))
                        .Value = taskTitle;
                    oCommand.Parameters.Add(new SqlParameter("@taskDisc", SqlDbType.VarChar))
                        .Value = taskDisc;
                    oCommand.Parameters.Add(new SqlParameter("@assignTo", SqlDbType.VarChar))
                        .Value = assignTo;
                    oCommand.Parameters.Add(new SqlParameter("@dueDate", SqlDbType.DateTime))
                        .Value = dueDate;

                    try
                    {
                        oCommand.ExecuteNonQuery();
                        addTaskDetailsReturn = "Task Added Successfully";
                    }
                    catch (Exception e)
                    {
                        oConnection.Close();
                        addTaskDetailsReturn = "Failed to add Task";
                    }

                }
            }
            return addTaskDetailsReturn;
        }
        public TaskModel GetTaskDetails()
        {
            TaskModel taskDetailModel = new TaskModel();

            string connectionString = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
            using (SqlConnection oConnection = new SqlConnection(connectionString))
            {
                oConnection.Open();
                using (SqlCommand oCommand = oConnection.CreateCommand())
                {
                    oCommand.CommandType = CommandType.StoredProcedure;
                    oCommand.CommandText = "usp_GetTaskDetails";


                    oCommand.Parameters.Add(new SqlParameter("@taskId", SqlDbType.Int))
                    .Value = taskId;

                    try
                    {
                        SqlDataReader dr = oCommand.ExecuteReader();
                        while (dr.Read())
                        {
                            taskDetailModel =
                            new TaskModel
                            {
                                taskId = Convert.ToInt32(dr["TaskId"].ToString()),
                                taskTitle = dr["TaskTitle"].ToString(),
                                taskDisc = dr["TaskDisc"].ToString(),
                                assignTo = dr["AssignTo"].ToString(),
                                dueDate = dr["DueDate"].ToString()
                            };
                        }
                    }
                    catch (Exception e)
                    {
                        oConnection.Close();
                        // Action after the exception is caught  
                    }
                }
            }
            return taskDetailModel;
        }
        public string DeleteTaskDetails()
        {
            string DeleteTaskDetailsReturn = "";
            string connectionString = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
            using (SqlConnection oConnection = new SqlConnection(connectionString))
            {
                try
                {
                    oConnection.Open();
                    using (SqlCommand oCommand = oConnection.CreateCommand())
                    {
                        oCommand.CommandType = CommandType.StoredProcedure;
                        oCommand.CommandText = "usp_DeleteTaskDetails";

                        SqlParameter param;
                        param = oCommand.Parameters.Add("@taskId", SqlDbType.Int);
                        param.Value = taskId;
                        oCommand.ExecuteNonQuery();
                        DeleteTaskDetailsReturn = " Task Details Deleted Successfully";
                    }
                }
                catch (Exception e)
                {
                    oConnection.Close();
                    DeleteTaskDetailsReturn = "Failed to Delete Task Details  ";

                }
            }
            return DeleteTaskDetailsReturn;
        }
        public TaskModel EditTaskdetails()
        {
            TaskModel EditDetails = new TaskModel();

            string connectionString = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
            using (SqlConnection oConnection = new SqlConnection(connectionString))
            {
                oConnection.Open();
                using (SqlCommand oCommand = oConnection.CreateCommand())
                {
                    oCommand.CommandType = CommandType.StoredProcedure;
                    oCommand.CommandText = "usp_EditTaskDetails";

                    SqlParameter param;
                    param = oCommand.Parameters.Add("@taskId", SqlDbType.Int);
                    param.Value = taskId;
                    param = oCommand.Parameters.Add("@taskTitle", SqlDbType.VarChar);
                    param.Value = taskTitle;
                    param = oCommand.Parameters.Add("@taskDisc", SqlDbType.VarChar);
                    param.Value = taskDisc;
                    param = oCommand.Parameters.Add("@assignTo", SqlDbType.VarChar);
                    param.Value = assignTo;
                    param = oCommand.Parameters.Add("@dueDate", SqlDbType.VarChar);
                    param.Value = dueDate;

                    try
                    {
                        SqlDataReader dr = oCommand.ExecuteReader();
                        while (dr.Read())
                        {
                            EditDetails = new TaskModel
                            {


                                taskId = Convert.ToInt32(dr["taskId"].ToString()),
                                taskTitle = dr["taskTitle"].ToString(),
                                taskDisc = dr["taskDisc"].ToString(),
                                assignTo = dr["assignTo"].ToString(),
                                dueDate = dr["dueDate"].ToString()

                            };
                        }
                    }
                    catch (Exception e)
                    {
                        oConnection.Close();
                    }
                }

            }
            return EditDetails;
        }

        public List<TaskModel> GetTaskDetailsList()
        {
            List<TaskModel> taskDetailModels = new List<TaskModel>();

            string connectionString = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
            using (SqlConnection oConnection = new SqlConnection(connectionString))
            {
                oConnection.Open();
                using (SqlCommand oCommand = oConnection.CreateCommand())
                {
                    oCommand.CommandType = CommandType.StoredProcedure;
                    oCommand.CommandText = "usp_GetTaskDetailsList";
                    try
                    {
                        SqlDataReader dr = oCommand.ExecuteReader();
                        while (dr.Read())
                        {
                            taskDetailModels.Add(
                            new TaskModel
                            {

                                taskId = Convert.ToInt32(dr["taskId"].ToString()),
                                taskTitle = dr["taskTitle"].ToString(),
                                taskDisc = dr["taskDisc"].ToString(),
                                assignTo = dr["assignTo"].ToString(),
                                dueDate = dr["dueDate"].ToString()

                            }
                            );
                        }
                    }
                    catch (Exception e)
                    {
                        oConnection.Close();
                        // Action after the exception is caught  
                    }
                }
            }
            return taskDetailModels;
        }
    }
}