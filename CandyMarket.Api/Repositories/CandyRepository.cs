using CandyMarket.Api.DataModels;
using CandyMarket.Api.Dtos;
using Dapper;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;

namespace CandyMarket.Api.Repositories
{
    public class CandyRepository : ICandyRepository
    {
        string _connectionString = "Server=localhost;Database=CandyMarket; Trusted_Connection=True";

        public IEnumerable<Candy> GetAllCandy()
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var candy = db.Query<Candy>("select * from Candy");
                return candy.ToList();
            }
        }

        public bool AddCandy(AddCandyDto newCandy)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                //var sql = @"Query";
                //return db.QueryFirst<Candy>(sql, newCandy);
                throw new NotImplementedException();
            }
        }

        public bool EatCandy(Guid candyIdToDelete)
        {
            // use dapper
            throw new NotImplementedException();
        }
    }
}