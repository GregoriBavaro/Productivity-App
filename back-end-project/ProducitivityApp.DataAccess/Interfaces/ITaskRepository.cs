using ProducitivityApp.DataAccess.IGenericRepository;
using Task = ProductivityApp.Domain.Entities.Task;

namespace ProducitivityApp.DataAccess.Interfaces
{
   public  interface ITaskRepository:IGenericRepository<Task>
    {
    }
}
