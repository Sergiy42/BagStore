using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace BagStore.Backend.Models
{
    public class Order
    {
        public int Id { get; set; }

        [Column(TypeName = "nvarchar(255)")] 
        public string CustomerName { get; set; } = string.Empty;

        [Column(TypeName = "nvarchar(MAX)")]
        public string DeliveryAddress { get; set; } = string.Empty;

        [Column(TypeName = "nvarchar(50)")] 
        public string Phone { get; set; } = string.Empty;

        [Column(TypeName = "nvarchar(255)")] 
        public string Email { get; set; } = string.Empty;

        [Column(TypeName = "decimal(10,2)")]
        public decimal TotalAmount { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public OrderStatus Status { get; set; } = OrderStatus.Created;

        public List<OrderItem> Items { get; set; } = new List<OrderItem>();
    }

    public enum OrderStatus
    {
        Created,
        Paid,
        Shipped,
        Completed,
        PaymentFailed,
        Cancelled
    }
}