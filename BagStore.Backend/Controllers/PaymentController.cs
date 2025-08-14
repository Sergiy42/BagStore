using Microsoft.AspNetCore.Mvc;
using BagStore.Backend.Services;
using BagStore.Backend.Models;
using System.Threading.Tasks;
[ApiController]
[Route("api/[controller]")]
public class PaymentController : ControllerBase
{
    private readonly IPaymentService _paymentService;

    public PaymentController(IPaymentService paymentService)
    {
        _paymentService = paymentService;
    }

    [HttpPost]
    public IActionResult CreatePayment([FromBody] Order order)
    {
        var result = _paymentService.InitiatePayment(order);
        return Ok(new { PaymentUrl = result.PaymentUrl });
    }
}