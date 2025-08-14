using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using BagStore.Backend.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;

namespace BagStore.Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrdersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public OrdersController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> CreateOrder([FromBody] OrderCreateRequest request)
        {
            var order = new Order
            {
                CustomerName = request.CustomerName,
                DeliveryAddress = request.DeliveryAddress,
                Phone = request.Phone,
                Email = request.Email,
                TotalAmount = request.TotalAmount,
                Status = OrderStatus.Created,
                Items = new List<OrderItem>()
            };

            foreach (var itemDto in request.Items)
            {
                var product = await _context.Products.FindAsync(itemDto.ProductId);
                if (product == null)
                {
                    return BadRequest($"Товар с ID {itemDto.ProductId} не найден");
                }

                order.Items.Add(new OrderItem
                {
                    ProductId = itemDto.ProductId,
                    Quantity = itemDto.Quantity,
                    Price = itemDto.Price
                });
            }

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetOrder), new { id = order.Id }, order);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetOrder(int id)
        {
            var order = await _context.Orders
                .Include(o => o.Items)
                .FirstOrDefaultAsync(o => o.Id == id);

            if (order == null)
                return NotFound();

            return Ok(order);
        }
    }

    public class OrderCreateRequest
    {
        [JsonPropertyName("Items")]
        public List<OrderItemDto> Items { get; set; } = new List<OrderItemDto>();

        [JsonPropertyName("CustomerName")]
        public string CustomerName { get; set; } = string.Empty;

        [JsonPropertyName("DeliveryAddress")]
        public string DeliveryAddress { get; set; } = string.Empty;

        [JsonPropertyName("Phone")]
        public string Phone { get; set; } = string.Empty;

        [JsonPropertyName("Email")]
        public string Email { get; set; } = string.Empty;

        [JsonPropertyName("TotalAmount")]
        public decimal TotalAmount { get; set; }
    }

    public class OrderItemDto
    {
        [JsonPropertyName("ProductId")]
        public int ProductId { get; set; }

        [JsonPropertyName("Quantity")]
        public int Quantity { get; set; }

        [JsonPropertyName("Price")]
        public decimal Price { get; set; }
    }
}