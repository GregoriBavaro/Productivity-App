using ProductivityApp.Dtos.SessionDtos;

namespace ProductivityApp.Services.Interfaces
{
    public interface ISessionService
    {

        Task<List<SessionDto>> GetAllSessions(int userId);

        Task<SessionDto> GetSessionById(int id);

        Task AddSession(AddSessionDto addSessionDto, int userId);

        Task UpdateSession(UpdateSessionDto updateSessionDto);

        Task DeleteSession(int id);
    }
}
