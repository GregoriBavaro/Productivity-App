using Microsoft.EntityFrameworkCore;
using ProducitivityApp.DataAccess.Interfaces;
using ProductivityApp.Domain.Entities;
using Task = System.Threading.Tasks.Task;

namespace ProducitivityApp.DataAccess.Implementations
{
    public class UserRepository : IUserRepository
    {
        private readonly ProductivityAppDbContext _dbContext;


        public UserRepository(ProductivityAppDbContext dbContext)
        {
            _dbContext = dbContext;

        }
        public async Task Add(User entity)
        {
            _dbContext.Users.Add(entity);
            await _dbContext.SaveChangesAsync();
        }

        public async Task Delete(User entity)
        {
            _dbContext.Users.Remove(entity);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<List<User>> GetAll()
        {
            return await _dbContext.Users
                .Include(x => x.Sessions)
                .ToListAsync();
        }

        public async Task<User> GetById(int id)
        {
#pragma warning disable CS8603 // Possible null reference return.
            return await _dbContext.Users
                .Include(x => x.Sessions)
                .SingleOrDefaultAsync(s => s.Id == id);

        }

        public async Task<bool> UserExists(string username)
        {
            if (await _dbContext.Users.AnyAsync(u => u.Username.ToLower() == username.ToLower()))
            {
                return true;
            }
            return false;
        }

        public async Task Update(User entity)
        {
            _dbContext.Users.Update(entity);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<User> GetUserByUsername(string username)
        {
            return await _dbContext.Users.FirstOrDefaultAsync(x => x.Username.ToLower() == username.ToLower());
        }

        public async Task<bool> EmailExists(string email)
        {
            if (await _dbContext.Users.AnyAsync(x => x.Email.ToLower() == email.ToLower()))
            {
                return true;
            }
            return false;
        }

        public async Task<User> GetUserByEmail(string email)
        {
            return await _dbContext.Users.FirstOrDefaultAsync(x => x.Email.ToLower() == email.ToLower());
        }

        public async Task<User> GetUserByToken(string token)
        {
            return await _dbContext.Users.FirstOrDefaultAsync(u => u.VerificationToken == token);

        }

        public async Task<User> GetUserByResetPasswordToken(string resetPasswordToken)
        {
            return await _dbContext.Users.FirstOrDefaultAsync(u => u.PasswordResetToken == resetPasswordToken);
        }
    }
}
