using ProductivityApp.Domain.Entities;
using ProductivityApp.Dtos.SessionDtos;
using ProductivityApp.Mappers.TaskMappers;

namespace ProductivityApp.Mappers.SessionMappers
{
    public static class SessionMapper
    {

        public static SessionDto ToSessionDto(this Session sessionDb)
        {
            return new SessionDto
            {
                StartTime = sessionDb.StartTime,
                FinishTime = sessionDb.FinishTime,
                SessionLength = sessionDb.SessionLength,
                Tasks = sessionDb.Tasks.Select(t => t.ToTaskDto()).ToList()
            };
        }


        public static Session ToSession(this AddSessionDto addSessionDto)
        {
            return new Session
            {
                StartTime = addSessionDto.StartTime,
                FinishTime = addSessionDto.FinishTime,
                SessionLength = addSessionDto.SessionLength,
                Tasks = addSessionDto.Tasks.Select(t => t.ToTask()).ToList(),
                UserId = addSessionDto.UserId,
            };
        }

        public static Session UpdateDbSession(this UpdateSessionDto updateSessionDto, Session sessionDb)
        {
            sessionDb.StartTime = updateSessionDto.StartTime;
            sessionDb.FinishTime = updateSessionDto.FinishTime;
            sessionDb.SessionLength = updateSessionDto.SessionLength;
            sessionDb.Tasks = updateSessionDto.Tasks.Select(t => t.ToTask()).ToList();
            sessionDb.UserId = updateSessionDto.UserId;

            return sessionDb;

        }
    }
}
