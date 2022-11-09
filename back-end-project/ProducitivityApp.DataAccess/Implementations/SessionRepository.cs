using Microsoft.EntityFrameworkCore;
using ProducitivityApp.DataAccess.Interfaces;
using ProductivityApp.Domain.Entities;

using Task = System.Threading.Tasks.Task;

namespace ProducitivityApp.DataAccess.Implementations
{
    public class SessionRepository : ISessionRepository
    {
        private readonly ProductivityAppDbContext _dbContext;

        public SessionRepository(ProductivityAppDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task Add(Session entity)
        {
            _dbContext.Sessions.Add(entity);
            await _dbContext.SaveChangesAsync();
        }

        public async Task Delete(Session entity)
        {
            _dbContext.Sessions.Remove(entity);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<List<Session>> GetAll()
        {
            return await _dbContext.Sessions
                .Include(x => x.User)
                .Include(t => t.Tasks)
                .ToListAsync();
        }

        public async Task<Session> GetById(int id)
        {
#pragma warning disable CS8603 // Possible null reference return.
            return await _dbContext.Sessions
                .Include(x => x.User)
                .Include(t => t.Tasks)
                .SingleOrDefaultAsync(s => s.Id == id);

        }

        public async Task Update(Session entity)
        {
            _dbContext.Sessions.Update(entity);
            await _dbContext.SaveChangesAsync();
        }
    }
}
