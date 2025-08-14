using BagStore.Backend.Models;
using System.Net.Http.Json;
using Microsoft.Extensions.Configuration;


//Заглушка
namespace BagStore.Backend.Services
{
    public class SberbankPaymentService : IPaymentService
    {
        private readonly IConfiguration _config;
        private readonly HttpClient _httpClient;
        private readonly bool _useSandbox;

        public SberbankPaymentService(IConfiguration config, HttpClient httpClient)
        {
            _config = config;
            _httpClient = httpClient;
            _useSandbox = _config.GetValue<bool>("Sberbank:UseSandbox", false);
        }

        public PaymentResult InitiatePayment(Order order)
        {
            if (_useSandbox)
            {
                
                return new PaymentResult
                {
                    OrderId = order.Id,
                    PaymentUrl = _config["Sberbank:SandboxPaymentUrl"],
                    IsSandbox = true
                };
            }

            var userName = _config["Sberbank:UserName"];
            var password = _config["Sberbank:Password"];

            var request = new
            {
                userName,
                password,
                orderNumber = order.Id.ToString(),
                amount = (order.TotalAmount * 100).ToString("0"),
                returnUrl = "https://yourstore.com/payment/success"
            };

            var response = _httpClient.PostAsJsonAsync(
                _config["Sberbank:ApiUrl"] + "register.do",
                request).Result;

            var result = response.Content.ReadFromJsonAsync<Dictionary<string, string>>().Result;

            return new PaymentResult
            {
                OrderId = order.Id,
                PaymentUrl = result?["formUrl"] ?? string.Empty
            };
        }
    }
    

}