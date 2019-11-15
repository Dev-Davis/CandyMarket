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
                var sql = @"INSERT INTO [Candy]
                                           ([Name]
                                           ,[Texture])
	                                 output inserted.*
                                     VALUES
                                           (@name
                                           ,@texture)";

                //var parameters = new
                //{
                //    candyName = newCandy.Name,
                //    candyType = newCandy.Type
                //};
                return db.Execute(sql, newCandy) == 1;
            }
        }

        public bool EatCandy(int candyId)
        {
            // use dapper
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"delete from Candy where [id] = @candyId";
                return db.Execute(sql, new { candyId }) == 1;
            }
        }

        public Candy Get(int candyId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"select *
                            from Candy
                            where id = @candyId";
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