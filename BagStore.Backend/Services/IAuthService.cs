using System;
namespace BagStore.Backend.Services
{
    public interface IAuthService
    {
        string GenerateJwtToken(string username);
    }
} 