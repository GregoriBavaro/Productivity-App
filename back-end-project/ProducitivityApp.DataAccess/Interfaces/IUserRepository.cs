using ProducitivityApp.DataAccess.IGenericRepository;
using ProductivityApp.Domain.Entities;

namespace ProducitivityApp.DataAccess.Interfaces
{
    public interface IUserRepository : IGenericRepository<User>
    {

        Task<User> GetUserByUsername(string username);
        Task<User> GetUserByEmail(string email);
        Task<User> GetUserByToken(string token);
        Task<User> GetUserByResetPasswordToken(string resetPasswordToken);
        Task<bool> UserExists(string username);
        Task<bool> EmailExists(string email);



    }
}
