using System;
using System.IO;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using System.Data.SQLite;
using whatever_todo.Model.DBRepository;

namespace whatever_todo
{
    public static class Program
    {
        public static void Main(string[] args)
        {
            CreateDatabase();
            CreateHostBuilder(args).Build().Run();
        }

        private static void CreateDatabase()
        {
            using var connection = new SQLiteConnection(SqliteTasksRepository.DataSourcePath);
            connection.Open();

            using var cmd = new SQLiteCommand(connection);

            cmd.CommandText = 
                @"CREATE TABLE IF NOT EXISTS
                    users(user_id INTEGER PRIMARY KEY NOT NULL)";
            cmd.ExecuteNonQuery();
            cmd.CommandText =
                @"CREATE TABLE IF NOT EXISTS 
                    tasks(
                    task_id INTEGER PRIMARY KEY NOT NULL, 
                    user_id INTEGER, 
                    datetime DATE, 
                    task VARCHAR(255), 
                    isDone INTEGER,
                    FOREIGN KEY (user_id) REFERENCES users(user_id)
                    )";
            cmd.ExecuteNonQuery();
        }

        private static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder => { webBuilder.UseStartup<Startup>(); });
    }
}