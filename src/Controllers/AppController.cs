using System;
using System.Collections.Generic;
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
            var lastId = repository.InsertTask(1, DateTime.Now, item.Task, false);
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
        public IActionResult Get()
        {
            return Ok(repository.GetAllTasks(1));
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