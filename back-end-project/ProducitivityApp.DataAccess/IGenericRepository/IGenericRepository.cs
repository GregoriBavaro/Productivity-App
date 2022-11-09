namespace ProducitivityApp.DataAccess.IGenericRepository
{
    public interface IGenericRepository<T>
    {
        
        Task<List<T>> GetAll();

        Task<T> GetById(int id);
        Task Add(T entity);
        Task Update(T entity);
        Task Delete(T entity);

    }
}
