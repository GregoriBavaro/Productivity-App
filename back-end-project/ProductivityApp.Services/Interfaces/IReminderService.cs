using ProductivityApp.Dtos.ReminderDtos;
using ProductivityApp.Dtos.SessionDtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductivityApp.Services.Interfaces
{
    public interface IReminderService
    {
        Task<List<ReminderDto>> GetAllReminders(int userId);

        Task<ReminderDto> GetReminderById(int id);

        Task AddReminder(AddReminderDto addReminderDto, int userId);

        Task UpdateReminder(UpdateReminderDto updateReminderDto);

        Task DeleteReminder(int id);
    }
}
