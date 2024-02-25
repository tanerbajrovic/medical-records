using Microsoft.AspNetCore.Identity;

namespace MediInsigthHubAPI.Models
{
    public class User : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Address { get; set; }
        public string? AccountNumber { get; set; }
        public string? Type { get; set; }
    }
}
