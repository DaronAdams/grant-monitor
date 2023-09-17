using System;

namespace GrantApi.Models
{
    public class Grant
    {
        public int Id { get; set; }
        public required string Title { get; set; }
        public double Amount { get; set; }
    }
}