using ProductivityApp.Domain.Enums;

namespace ProductivityApp.Dtos.ReminderDtos
{
    public class ReminderDto
    {
        public int ReminderId { get; set; }
        public string ReminderTitle { get; set; } = string.Empty; 
        public string ReminderNote { get; set; } = string.Empty;
        public string ReminderDate { get; set; } = string.Empty;
        public string ReminderTime { get; set; } = string.Empty;
        public PriorityEnum Priority { get; set; }  
    }
}
