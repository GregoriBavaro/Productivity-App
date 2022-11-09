using ProducitivityApp.DataAccess.Interfaces;
using ProductivityApp.Domain.Entities;
using ProductivityApp.Dtos.ReminderDtos;
using ProductivityApp.Mappers.ReminderMappers;
using ProductivityApp.Services.Interfaces;
using ProductivityApp.Shared.CustomReminderExceptions;
using ProductivityApp.Shared.CustomUserExceptions;
using Task = System.Threading.Tasks.Task;

namespace ProductivityApp.Services.Implementations
{
    public class ReminderService : IReminderService
    {

        private readonly IReminderRepository _reminderRepository;
        private readonly IUserRepository _userRepository;

        public ReminderService(IReminderRepository reminderRepository, IUserRepository userRepository)
        {
            _reminderRepository = reminderRepository;
            _userRepository = userRepository;

        }

        public async Task AddReminder(AddReminderDto addReminderDto, int userId)
        {
            User userDb = await _userRepository.GetById(userId);
            if (userDb == null)
            {
                throw new UserNotFoundException($"User with id {userId} was not found in the database.");
            }
            if (string.IsNullOrEmpty(addReminderDto.ReminderTitle))
            {
                throw new ReminderDataException($"Reminder Title must not be empty!");
            }
            if (string.IsNullOrEmpty(addReminderDto.ReminderTime))
            {
                throw new ReminderDataException($"Reminder Time must not be empty!");
            }
            if (string.IsNullOrEmpty(addReminderDto.ReminderDate))
            {
                throw new ReminderDataException($"Reminder Date must not be empty!");
            }
            Reminder newReminder = addReminderDto.ToReminder();
            newReminder.UserId = userId;
            await _reminderRepository.Add(newReminder);

        }

        public async Task DeleteReminder(int id)
        {
            Reminder reminderDb = await _reminderRepository.GetById(id);
            if (reminderDb == null)
            {
                throw new ReminderNotFoundException($"User with id {id} was not found in the database.");
            }
            await _reminderRepository.Delete(reminderDb);
        }

        public async Task<List<ReminderDto>> GetAllReminders(int userId)
        {
            List<Reminder> remindersDb = await _reminderRepository.GetAll();

            List<ReminderDto> remindersDto = remindersDb.Where(x => x.UserId == userId).Select(s => s.ToReminderDto()).ToList();
            return remindersDto;
        }

        public async Task<ReminderDto> GetReminderById(int id)
        {

            Reminder reminderDb = await _reminderRepository.GetById(id);
            if(reminderDb == null)
            {
                throw new ReminderNotFoundException($"Reminder with the id {id} was not found in the database");
            }

            ReminderDto reminderDto = reminderDb.ToReminderDto();
            return reminderDto;
        }

        public async Task UpdateReminder(UpdateReminderDto updateReminderDto)
        {
            Reminder reminderDb = await _reminderRepository.GetById(updateReminderDto.Id);

            if(reminderDb == null)
            {
                throw new ReminderNotFoundException($"Reminder with the id {updateReminderDto.Id} was not found");
            }

            User userDb = await _userRepository.GetById(updateReminderDto.UserId);
            if (userDb == null)
            {
                throw new UserNotFoundException($"User with id {updateReminderDto.UserId} was not found in the database.");
            }
            if (string.IsNullOrEmpty(updateReminderDto.ReminderTitle))
            {
                throw new ReminderDataException($"Reminder Name must not be empty!");
            }
            if (string.IsNullOrEmpty(updateReminderDto.ReminderTime))
            {
                throw new ReminderDataException($"Reminder Time must not be empty!");
            }
            if (string.IsNullOrEmpty(updateReminderDto.ReminderDate))
            {
                throw new ReminderDataException($"Reminder Date must not be empty!");
            }

            updateReminderDto.UpdateDbReminder(reminderDb);
            await _reminderRepository.Update(reminderDb);
        }
    }
}
