using ProducitivityApp.DataAccess.Interfaces;
using ProductivityApp.Domain.Entities;
using ProductivityApp.Dtos.SessionDtos;
using ProductivityApp.Mappers.SessionMappers;
using ProductivityApp.Services.Interfaces;
using ProductivityApp.Shared.CustomSessionExceptions;
using ProductivityApp.Shared.CustomUserExceptions;
using Task = System.Threading.Tasks.Task;


namespace ProductivityApp.Services.Implementations
{
    public class SessionService : ISessionService
    {
        private readonly ISessionRepository _sessionRepository;
        private readonly IUserRepository _userRepository;
        

        public SessionService(ISessionRepository sessionRepository, IUserRepository userRepository)
        {
            _sessionRepository = sessionRepository;
            _userRepository = userRepository;
            
        }
        public async Task AddSession(AddSessionDto addSessionDto, int userId)
        {

            User userDb = await _userRepository.GetById(userId);
            if (userDb == null)
            {
                throw new UserNotFoundException($"User with id {addSessionDto.UserId} was not found in the database.");
            }
            if (string.IsNullOrEmpty(addSessionDto.StartTime.ToString("o")) || string.IsNullOrEmpty(addSessionDto.FinishTime.ToString("o")))
            {
                throw new SessionDataException("Start time and Finish time are required fields. ");
            }

            if (addSessionDto.SessionLength == 0)
            {
                throw new SessionDataException("Session length can not be zero.");
            }
            if (addSessionDto.Tasks.Count == 0)
            {
                throw new SessionDataException("The list of tasks for the current session can not be empty.");
            }

            Session newSession = addSessionDto.ToSession();
            newSession.UserId = userId;

            await _sessionRepository.Add(newSession);
        }

        public async Task DeleteSession(int id)
        {
            Session sessionDb = await _sessionRepository.GetById(id);
            if (sessionDb == null)
            {
                throw new SessionNotFoundException($"Session with id {id} was not found in the database.");
            }
            await _sessionRepository.Delete(sessionDb);
        }

        public async Task<List<SessionDto>> GetAllSessions(int userId)
        {
            List<Session> sessionsDb = await _sessionRepository.GetAll();

            List<SessionDto> sessionsDto = sessionsDb.Where(x => x.UserId == userId).Select(s => s.ToSessionDto()).ToList();
            return sessionsDto;

        }

        public async Task<SessionDto> GetSessionById(int id)
        {
            Session sessionDb = await _sessionRepository.GetById(id);
            if (sessionDb == null)
            {
                throw new SessionNotFoundException($"Session with id {id} was not found in the database.");
            }
            SessionDto sessionDto = sessionDb.ToSessionDto();

            return sessionDto;
        }

        public async Task UpdateSession(UpdateSessionDto updateSessionDto)
        {
            Session sessionDb = await _sessionRepository.GetById(updateSessionDto.Id);
            if (sessionDb == null)
            {
                throw new SessionNotFoundException($"Session with id {updateSessionDto.Id} was not found in the database.");
            }

            User userDb = await _userRepository.GetById(updateSessionDto.UserId);
            if (userDb == null)
            {
                throw new UserNotFoundException($"User with id {updateSessionDto.UserId} was not found in the database.");
            }
            if (string.IsNullOrEmpty(updateSessionDto.StartTime.ToString("o")) || string.IsNullOrEmpty(updateSessionDto.FinishTime.ToString("o")))
            {
                throw new SessionDataException("Start time and Finish time are required fields. ");
            }

            if (updateSessionDto.SessionLength == 0)
            {
                throw new SessionDataException("Session length can not be zero.");
            }
            if (updateSessionDto.Tasks.Count == 0)
            {
                throw new SessionDataException("The list of tasks for the current session can not be empty.");
            }

            updateSessionDto.UpdateDbSession(sessionDb);

            await _sessionRepository.Update(sessionDb);
        }
    }
}
