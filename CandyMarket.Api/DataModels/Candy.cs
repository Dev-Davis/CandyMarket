using System;

namespace CandyMarket.Api.DataModels
{
    public class Candy
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public Texture Texture { get; set; }
    }

    public enum Texture
    {
        Soft,
        Hard,
        Sweet,
        Sour,
        Fruity,
        Chocolate,
        Other
    }
}
