using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace ProductivityApp.Domain.Entities
{
    public class Session
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public DateTimeOffset StartTime { get; set; } = DateTimeOffset.UtcNow;
        public DateTimeOffset FinishTime { get; set; } = DateTimeOffset.UtcNow;

        public int SessionLength { get; set; } = 0;

        public User? User { get; set; }
        public int UserId { get; set; }

        public List<Task> Tasks { get; set; } = new List<Task>() { };

    }
}
