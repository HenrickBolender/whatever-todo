using System;
using System.Collections.Generic;
using whatever_todo.Controllers;

namespace whatever_todo.Model.DBRepository
{
    public interface ITasksRepository
    {
        long InsertTask(int id, DateTime date, string task, bool isDone);

        void DeleteTask(int taskId);
        IEnumerable<TaskItem> GetAllTasks(int id);
    }
}