using System;
namespace BagStore.Backend.Models
{
    public class PaymentResult
    {
        public int OrderId { get; set; }
        public string PaymentUrl { get; set; } = string.Empty;
        public bool IsSuccess { get; set; }
        public string ErrorMessage { get; set; } = string.Empty;
    }
}