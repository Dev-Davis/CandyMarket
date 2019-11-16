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
        public IEnumerable<Candy> GetAll()
        {
            var candies = _repo.GetAllCandy();
            return candies;
        }

        [HttpGet("{candyId}")]
        public Candy GetById(int candyId)
        {
            var candyLand = _repo.Get(candyId);
            return candyLand;
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
        public void Delete(int candyId)
        {
            _repo.EatCandy(candyId);
        }

        [HttpDelete("{candyIdToDonate}/donate")]
        public void Donate(int candyId)
        {
            // todo: make this endpoint behave less greedy and more honest
            _repo.EatCandy(candyId);
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
