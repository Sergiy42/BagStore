using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using BagStore.Backend.Models;
using BagStore.Backend.Services;
namespace BagStore.Backend.Services
{
    public interface IPaymentService
    {
        PaymentResult InitiatePayment(Order order);
    }
}