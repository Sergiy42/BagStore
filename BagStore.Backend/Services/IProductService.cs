using System;
using BagStore.Backend.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BagStore.Backend.Services
{
    public interface IProductService
    {
        Task<IEnumerable<Product>> GetFilteredProductsAsync(string? material, string? size);
        Task<Product?> GetProductByIdAsync(int id);
    }
}