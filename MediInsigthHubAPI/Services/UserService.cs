using MediInsigthHubAPI.Contracts.Requests;
using MediInsigthHubAPI.Contracts.Responses;
using MediInsigthHubAPI.Data;
using MediInsigthHubAPI.Models;
using MediInsigthHubAPI.Services.Interfaces;
using MediInsigthHubAPI.Utilities;
using AutoMapper;
using Microsoft.AspNetCore.Identity;

namespace MediInsigthHubAPI.Services
{
    public class UserService : IUserService
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IConfiguration _configuration;
        private readonly IMapper _mapper;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly AppDbContext _context;
        private readonly IHttpContextAccessor _httpContext;

        public UserService(
            UserManager<User> userManager,
            SignInManager<User> signInManager,
            IConfiguration configuration,
            IMapper mapper,
            RoleManager<IdentityRole> roleManager,
            AppDbContext context,
            IHttpContextAccessor httpContext)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
            _mapper = mapper;
            _roleManager = roleManager;
            _context = context;
            _httpContext = httpContext;
        }

        public async Task<AuthenticationResult> Login(LoginRequest loginRequest)
        {
            User user = new User();

            if (loginRequest.Email != null)
                user = await _userManager.FindByEmailAsync(loginRequest.Email);
            else
                user = _userManager.Users.FirstOrDefault(u => u.PhoneNumber == loginRequest.Phone);

            if (user == null)
                return new AuthenticationResult
                {
                    Errors = new[] { "User not found!" }
                };



            if (!await _userManager.CheckPasswordAsync(user, loginRequest.Password))
            {
                return new AuthenticationResult
                {
                    Errors = new[] { "Email/Phone/Password combination mismatch!" }
                };
            }

            if ((loginRequest.Email != null && !user.EmailConfirmed) || (loginRequest.Phone != null && !user.PhoneNumberConfirmed))
                return new AuthenticationResult
                {
                    Errors = new[] { "Provided email/phone is not confirmed!" }
                };

            var authClaims = await TokenUtilities.GetAuthClaimsAsync(user, _userManager);

            var token = await TokenUtilities.CreateTokenAsync(authClaims, _configuration, _context);

            return new AuthenticationResult
            {
                Success = true,
                Token = token
            };
        }


        public bool IsTokenValid(string jwt)
        {
            var validity = _context.TokenValidities.FirstOrDefault(x => x.Token.Equals(jwt));

            if (validity != null && validity.IsValid == false)
                throw new Exception("Token has been invalidated! Please login again.");

            return true;
        }

        public async Task InvalidateToken(string jwt)
        {
            var token = _context.TokenValidities.FirstOrDefault(x => x.Token.Equals(jwt));
            if (token != null)
                token.IsValid = false;

            await _context.SaveChangesAsync();
        }


        public async Task<Boolean> IsLoggedInUserAdmin()
        {
            var loggedInUser = await _userManager.GetUserAsync(_httpContext.HttpContext.User);
            if (loggedInUser == null)
            {
                throw new Exception("Not logged in");
            }
            return await _signInManager.UserManager.IsInRoleAsync(loggedInUser, "Admin");
        }
    }
}
