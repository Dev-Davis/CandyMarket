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
        public void Add(AddCandyDto newCandy)
        {
            //var candies = new Candy
            //{
            //    Id = 1,
            //    Name = newCandy.Name,
            //    Texture = newCandy.Texture
            //};

            var repo = new CandyRepository();
            var newCandyGotten = repo.AddCandy(newCandy);

            //    if (newCandyGotten == null)
            //    {
            //        return NotFound("Didn't get any candy.");
            //    }
            //    return Created($"api/candy/{newCandyGotten.Name}", newCandyGotten);
        }

        [HttpDelete("{candyIdToDelete}/eat")]
        public void Delete(Guid candyIdToDelete)
        {
            _repo.EatCandy(candyIdToDelete);
        }

        [HttpDelete("{candyIdToDonate}/donate")]
        public void Donate(Guid candyIdToDonate)
        {
            // todo: make this endpoint behave less greedy and more honest
            _repo.EatCandy(candyIdToDonate);
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
