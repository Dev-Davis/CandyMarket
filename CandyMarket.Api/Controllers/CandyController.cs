using System;
using System.Collections.Generic;
using System.Linq;
using CandyMarket.Api.DataModels;
using CandyMarket.Api.Dtos;
using CandyMarket.Api.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace CandyMarket.Api.Controllers
{
    [Route("api/candy")]
    [ApiController]
    public class CandyController : ControllerBase
    {
        private readonly ILogger<CandyController> _logger;
        private readonly ICandyRepository _repo;

        public CandyController(ILogger<CandyController> logger, ICandyRepository repo)
        {
            _logger = logger;
            _repo = repo;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Candy>> GetAll()
        {
            var repo = new Candy();
            return Ok(_repo.GetAllCandy());
        }

        [HttpGet("{candyId}")]
        public ActionResult<Candy> GetById(int candyId)
        {
            var _repo = new CandyRepository();
            return _repo.GetAllCandy().FirstOrDefault(candy => candy.Id == candyId);
        }

        [HttpPost]
        public IActionResult Add(AddCandyDto newCandy)
        {
            var candy = new Candy
            {
                Name = newCandy.Name,
                Texture = newCandy.Texture
            };
            _repo.AddCandy(newCandy);
            return Ok();
        }

        [HttpDelete("{candyIdToDelete}/eat")]
        public void Delete(string name)
        {
            _repo.EatCandy(name);
        }

        [HttpDelete("{candyIdToDonate}/donate")]
        public void Donate(string name)
        {
            // todo: make this endpoint behave less greedy and more honest
            _repo.EatCandy(name);
        }

        //[HttpPost]
        public void Trade()
        {
            /**
             * flex goal: Trade Candy
             * Hint: you're going to need to add Users to your application
             */
        }
    }
}
