using ProductivityApp.Domain.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProductivityApp.Domain.Entities
{

    public  class Reminder
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ReminderId { get; set; }
        public int UserId { get; set; }
        public string ReminderTitle { get; set; } = string.Empty;
        public string ReminderNote { get; set; } = string.Empty;
        public string ReminderDate { get; set; } = string.Empty;
        public string ReminderTime { get; set; } = string.Empty;
        public PriorityEnum Priority { get; set; } = PriorityEnum.High;
        public User? User { get; set; }


    }
}
