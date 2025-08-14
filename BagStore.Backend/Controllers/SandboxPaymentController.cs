using Microsoft.AspNetCore.Mvc;

namespace BagStore.Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SandboxPaymentController : ControllerBase
    {
        [HttpPost("process")]
        public IActionResult ProcessPayment([FromBody] SandboxPaymentRequest request)
        {
            
            return Ok(new
            {
                success = true,
                message = "Платеж успешно обработан (заглушка)",
                orderId = request.OrderId,
                amount = request.Amount
            });
        }
    }

    public class SandboxPaymentRequest
    {
        public int OrderId { get; set; }
        public decimal Amount { get; set; }
    }
}