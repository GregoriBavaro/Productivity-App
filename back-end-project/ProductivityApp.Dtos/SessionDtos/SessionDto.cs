using ProductivityApp.Dtos.TaskDtos;

namespace ProductivityApp.Dtos.SessionDtos
{
    public  class SessionDto
    {

        public DateTimeOffset StartTime { get; set; } = DateTimeOffset.UtcNow;
        public DateTimeOffset FinishTime { get; set; } = DateTimeOffset.UtcNow;

        public int SessionLength { get; set; } = 0;

        public List<TaskDto> Tasks { get; set; } = new List<TaskDto>() { };
    }
}
