namespace BagStore.Backend.Services
{
    public class PaymentResult
    {
        public int OrderId { get; set; }
        public string PaymentUrl { get; set; } = string.Empty;
        public bool IsSandbox { get; set; }
    }
}