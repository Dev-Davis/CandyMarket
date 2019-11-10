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
                var sql = @"insert into Candy([Name], Texture)
                          values(@candyName, @Texture)";

                var parameters = new
                {
                    candyName = newCandy.Name,
                    Texture = newCandy.Texture
                };
                return db.Execute(sql, parameters) == 1;
            }
        }

        public bool EatCandy(string name)
        {
            // use dapper
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"delete from Candy where [Name] = @name";
                return db.Execute(sql, new { name }) == 1;
            }
        }

        public Candy Get(int candyId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"select *
                            from Candy
                            where Id = @candyId";
                var parameters = new 
                { 
                    CandyId = candyId 
                };

                var candy = db.QueryFirst<Candy>(sql, parameters);
                return candy;
            }
        }

        public IEnumerable<Candy> GetCandyForUsers(int userId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"select * from UserCandy where UserId = @userId";
                var parameters = new
                {
                    UserId = userId
                };

                var userCandyOwned = db.Query<Candy>(sql, parameters);
                return userCandyOwned;
            }
        }
    }
}