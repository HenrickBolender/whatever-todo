﻿using System;
using System.Collections.Generic;
using System.Data.SQLite;
using System.Globalization;
using System.IO;

namespace whatever_todo.Model.DBRepository
{
    public class SqliteTasksRepository : ITasksRepository
    {
        public static string DataSourcePath { get; }
        
        static SqliteTasksRepository()
        {
            DataSourcePath = $"Data Source={Path.Combine(Environment.CurrentDirectory, "whatever-todo.s3db")};";
        }
        
        private readonly SQLiteConnection connection;
        
        public SqliteTasksRepository()
        {
            connection = new SQLiteConnection(DataSourcePath);
            connection.Open();
        }
        
        public long InsertTask(int userId, DateTime date, string task, bool isDone)
        {
            using var cmd = new SQLiteCommand(connection);
            cmd.CommandText = 
                @"INSERT INTO tasks(user_id, datetime, task, isDone) 
                    values (@user_id,@datetime,@task,@isDone)";
            cmd.Parameters.AddWithValue("user_id", userId.ToString());
            cmd.Parameters.AddWithValue("datetime", date.ToShortDateString());
            cmd.Parameters.AddWithValue("task", task);
            cmd.Parameters.AddWithValue("isDone", isDone ? "1" : "0");
            cmd.ExecuteNonQuery();

            return cmd.Connection.LastInsertRowId;
        }

        public void DeleteTask(int taskId)
        {
            using var cmd = new SQLiteCommand(connection);
            cmd.CommandText = @"DELETE FROM tasks WHERE task_id=@task_id";
            cmd.Parameters.AddWithValue("task_id", taskId);
            cmd.ExecuteNonQuery();
        }

        public void ChangeTaskStatus(int taskId, bool isDone)
        {
            using var cmd = new SQLiteCommand(connection);
            cmd.CommandText = @"UPDATE tasks SET isDone=@isDone WHERE task_id=@task_id";
            cmd.Parameters.AddWithValue("isDone", isDone ? 1 : 0);
            cmd.Parameters.AddWithValue("task_id", taskId);
            cmd.ExecuteNonQuery();
        }

        public IEnumerable<TaskItem> GetAllTasks(int id)
        {
            using var cmd = new SQLiteCommand(connection);
            cmd.CommandText = @"SELECT * FROM tasks WHERE user_id=@user_id ORDER BY datetime";
            cmd.Parameters.AddWithValue("user_id", id.ToString());

            using SQLiteDataReader rdr = cmd.ExecuteReader();
            while (rdr.Read())
            {
                yield return new TaskItem()
                {
                    Id = rdr.GetInt32(0),
                    Task = rdr.GetString(3),
                    Date = rdr.GetDateTime(2).ToString(CultureInfo.InvariantCulture),
                    IsDone = rdr.GetBoolean(4)
                };
            }
        }

        public IEnumerable<TaskItem> GetTasksByDate(DateTime date, int id)
        {

            using var cmd = new SQLiteCommand(connection);
            cmd.CommandText = @"SELECT * FROM tasks WHERE user_id=@user_id AND datetime=@datetime";
            cmd.Parameters.AddWithValue("user_id", id.ToString());
            cmd.Parameters.AddWithValue("datetime", date.ToShortDateString());
            using SQLiteDataReader rdr = cmd.ExecuteReader();
            while (rdr.Read())
            {
                yield return new TaskItem()
                {
                    Id = rdr.GetInt32(0),
                    Task = rdr.GetString(3),
                    Date = rdr.GetString(2),
                    IsDone = rdr.GetBoolean(4)
                };
            }
        }
    }
}