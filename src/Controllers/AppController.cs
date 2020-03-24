using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Runtime.CompilerServices;
using Microsoft.AspNetCore.Mvc;
using whatever_todo.Model;
using whatever_todo.Model.DBRepository;

namespace whatever_todo.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AppController : ControllerBase
    {
        private SqliteTasksRepository repository;
        
        public AppController()
        {
            repository = new SqliteTasksRepository();
        }
        
        [HttpPost]
        public IActionResult Post([FromBody] TaskItem item)
        {
            var dateValues = item.Date.Split('.').Select(int.Parse).ToArray();
            var dt = new DateTime(dateValues[2], dateValues[1], dateValues[0]);

            var lastId = repository.InsertTask(1, dt, item.Task, false);
            Console.WriteLine(item.Task);
            return Ok(lastId);
        }

        [HttpPatch]
        public IActionResult Patch([FromBody] TaskItem item)
        {
            if (item.Id == -1)
                return NotFound();
            repository.ChangeTaskStatus(item.Id, item.IsDone);
            return Ok();
        }

        [HttpGet]
        public IActionResult Get(string date, int id)
        {
            var dt = DateTime.ParseExact(date, "dd.MM.yyyy", CultureInfo.InvariantCulture);
            var tasks = repository.GetTasksByDate(dt, id).ToArray();
            return Ok(tasks);
        }

        [HttpDelete]
        public IActionResult Delete([FromBody] TaskItem item)
        {
            if (item.Id == -1)
                return NotFound();
            
            repository.DeleteTask(item.Id);
            return Ok();
        }
    }
}