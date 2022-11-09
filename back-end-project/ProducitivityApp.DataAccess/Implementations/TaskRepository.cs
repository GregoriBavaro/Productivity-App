using Microsoft.EntityFrameworkCore;
using ProducitivityApp.DataAccess.Interfaces;
using ProductivityApp.Domain.Entities;
using Task = System.Threading.Tasks.Task;


namespace ProducitivityApp.DataAccess.Implementations
{
    public class TaskRepository : ITaskRepository
    {
        private readonly ProductivityAppDbContext _dbContext;

        public TaskRepository(ProductivityAppDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task Add(ProductivityApp.Domain.Entities.Task entity)
        {
            _dbContext.Tasks.Add(entity);
            await _dbContext.SaveChangesAsync();
        }

        public async Task Delete(ProductivityApp.Domain.Entities.Task entity)
        {
            _dbContext.Tasks.Remove(entity);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<List<ProductivityApp.Domain.Entities.Task>> GetAll()
        {
            return await _dbContext.Tasks
                .Include(s => s.Session)
                .ToListAsync();
        }

        public async Task<ProductivityApp.Domain.Entities.Task> GetById(int id)
        {
#pragma warning disable CS8603 // Possible null reference return.
            return await _dbContext.Tasks
                .Include(s => s.Session)
                .FirstOrDefaultAsync(t => t.Id == id);

        }

        public async Task Update(ProductivityApp.Domain.Entities.Task entity)
        {
            _dbContext.Tasks.Update(entity);
            await _dbContext.SaveChangesAsync();
        }
    }
}
