using ProductivityApp.Domain.Enums;

namespace ProductivityApp.Dtos.TaskDtos
{
   public  class TaskDto
    {


        public string Title { get; set; } = string.Empty;
        public int AssignedTimeDuration { get; set; } = 0;

        public string Note { get; set; } = string.Empty;
        public PriorityEnum Priority { get; set; } = PriorityEnum.Low;
        public PaceEnum Pace { get; set; } = PaceEnum.Low;
    }
}
