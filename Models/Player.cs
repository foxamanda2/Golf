using System;
using System.ComponentModel.DataAnnotations;

namespace Golf.Models
{
    public class Player
    {
        public int Id { get; set; }
        [Required]
        public string FirstName { get; set; }

        public string LastName { get; set; }
        [Required]
        public int AverageScore { get; set; }
        [Required]
        public DateTime Date { get; set; }

    }
}