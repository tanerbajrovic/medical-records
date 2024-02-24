using MediInsigthHubAPI.Contracts.Requests;
using MediInsigthHubAPI.Contracts.Responses;

namespace MediInsigthHubAPI.Services.Interfaces
{
    public interface IUserService
    {
        Task<AuthenticationResult> Login(LoginRequest loginRequest);
        Task InvalidateToken(string jwt);
        bool IsTokenValid(string jwt);
        Task<Boolean> IsLoggedInUserAdmin();
    }
}
