using ProductivityApp.Dtos.TaskDtos;
using Task = ProductivityApp.Domain.Entities.Task;

namespace ProductivityApp.Mappers.TaskMappers
{
    public static class TaskMapper
    {

        public static TaskDto ToTaskDto(this Task taskDb)
        {
            return new TaskDto
            {
                Title = taskDb.Title,
                AssignedTimeDuration = taskDb.AssignedTimeDuration,
                Note = taskDb.Note,
                Priority = taskDb.Priority,
                Pace = taskDb.Pace,
            };
        }
        public static Task ToTask(this TaskDto taskDto)
        {
            return new Task
            {
                Title = taskDto.Title,
                AssignedTimeDuration = taskDto.AssignedTimeDuration,
                Note = taskDto.Note,
                Priority = taskDto.Priority,
                Pace = taskDto.Pace,
            };
        }
    }
}
