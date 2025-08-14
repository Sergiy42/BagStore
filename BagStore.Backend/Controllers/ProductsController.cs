using Microsoft.AspNetCore.Mvc;
using BagStore.Backend.Services;
using System.Threading.Tasks;

namespace BagStore.Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly IProductService _productService;

        public ProductsController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpGet]
        public async Task<IActionResult> GetProducts([FromQuery] string? material, [FromQuery] string? size)
        {
            var products = await _productService.GetFilteredProductsAsync(material, size);
            return Ok(products);
        }
    }
}