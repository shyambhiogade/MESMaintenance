using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using WebApplication1.Model;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    public class DieselController : Controller
    {
        static List<Diesel> todoRepository = new List<Diesel>();
        

        // GET: api/values
        [HttpGet]
        public string Get()
        {
            string output = JsonConvert.SerializeObject(todoRepository);
            return output;
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]Diesel request)
        {
            todoRepository.Add(request);
        }       
    }
}
