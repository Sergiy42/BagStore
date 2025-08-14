using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using BagStore.Backend.Models;
using Microsoft.EntityFrameworkCore;
namespace BagStore.Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PaymentWebhookController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly ILogger<PaymentWebhookController> _logger;

        public PaymentWebhookController(
            AppDbContext context,
            ILogger<PaymentWebhookController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpPost("sberbank")]
        public async Task<IActionResult> HandleSberbankNotification([FromBody] SberbankNotification notification)
        {
            _logger.LogInformation($"Received payment notification: {notification.OrderNumber} - {notification.Status}");

            if (!int.TryParse(notification.OrderNumber, out int orderId))
            {
                return BadRequest("Invalid order number");
            }

            var order = await _context.Orders.FindAsync(orderId);

            if (order == null)
            {
                _logger.LogWarning($"Order not found: {orderId}");
                return NotFound();
            }

            switch (notification.Status)
            {
                case 1: 
                    order.Status = OrderStatus.Paid;
                    break;
                case 0: 
                default:
                    order.Status = OrderStatus.PaymentFailed;
                    break;
            }

            await _context.SaveChangesAsync();
            return Ok();
        }
    }

    public class SberbankNotification
    {
        public string? OrderNumber { get; set; }
        public int Status { get; set; }
    }
}