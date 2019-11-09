using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CandyMarket.Api.DataModels
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<Candy> Pocket { get; set; }
    }
}
