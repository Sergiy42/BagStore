using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
namespace BagStore.Backend.Models
{
    public class Product
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Name { get; set; } = string.Empty;

        [Required]
        [MaxLength(20)] 
        public string Material { get; set; } = string.Empty;

        [Required]
        [MaxLength(10)]
        public string Size { get; set; } = string.Empty;

        [Column(TypeName = "decimal(10, 0)")]
        public decimal Price { get; set; }

        [MaxLength(200)]
        public string ImageUrl { get; set; } = string.Empty;

        [MaxLength(500)]
        public string Description { get; set; } = string.Empty;
    }
}
