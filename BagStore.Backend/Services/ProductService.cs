using BagStore.Backend.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace BagStore.Backend.Services
{
    public class ProductService : IProductService
    {
        private readonly AppDbContext _context;

        public ProductService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Product>> GetFilteredProductsAsync(string? material, string? size)
        {
            IQueryable<Product> query = _context.Products.AsNoTracking();

            if (!string.IsNullOrEmpty(material))
                query = query.Where(p => p.Material == material);

            if (!string.IsNullOrEmpty(size))
                query = query.Where(p => p.Size == size);

            return await query.ToListAsync();
        }

        public async Task<Product?> GetProductByIdAsync(int id)
        {
            return await _context.Products
                .AsNoTracking()
                .FirstOrDefaultAsync(p => p.Id == id);
        }
    }
}