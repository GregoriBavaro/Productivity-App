using ProductivityApp.Domain.Entities;
using ProductivityApp.Dtos.UserDtos;
using ProductivityApp.Shared;
using Task = System.Threading.Tasks.Task;

namespace ProductivityApp.Services.Interfaces
{
    public  interface IUserService
    {
        Task<ServiceResponse<int>> Register(RegisterUserDto request);

        Task<ServiceResponse<string>> LogIn(string email, string password);
        Task<ServiceResponse<List<UserDto>>> GetAllUsers();

        Task<ServiceResponse<UserDto>> GetUserById(int id);

        Task<ServiceResponse<List<UserDto>>> DeleteUser(int id);
        //Task<ServiceResponse<string>> Verify(string token);
        Task ForgotPassword(string email);
        Task ResetPassword(ResetPasswordDto request);

        Task<ServiceResponse<string>> GetPasswordResetToken(string email); 
        
    }
}
