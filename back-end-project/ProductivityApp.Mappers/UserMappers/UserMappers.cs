using ProductivityApp.Domain.Entities;
using ProductivityApp.Dtos.UserDtos;
using ProductivityApp.Mappers.SessionMappers;

namespace ProductivityApp.Mappers.UserMappers
{
    public static class UserMappers
    {


        public static UserDto ToUserDto(this User userDb)
        {
            return new UserDto
            {
                FullName = userDb.Fullname,
                UserName = userDb.Username,
                Role = userDb.Role,
                Sessions = userDb.Sessions.Select(s => s.ToSessionDto()).ToList()
            };
        }
        public static User ToUserDb (this RegisterUserDto registerUserDto)
        {
            return new User
            {
                Email = registerUserDto.Email,
                Username = registerUserDto.Username,
                Fullname = registerUserDto.Fullname,
               
            
                
            };
        }
        public static User ResetPasswordMapper(this ResetPasswordDto request, User userDb)
        {
            userDb.PasswordResetToken = request.Token;
          //  userDb.Password = request.Password;

            return userDb;
        }
        //public static Session UpdateDbSession(this UpdateSessionDto updateSessionDto, Session sessionDb)
        //{
        //    sessionDb.StartTime = updateSessionDto.StartTime;
        //    sessionDb.FinishTime = updateSessionDto.FinishTime;
        //    sessionDb.SessionLength = updateSessionDto.SessionLength;
        //    sessionDb.Tasks = updateSessionDto.Tasks.Select(t => t.ToTask()).ToList();
        //    sessionDb.UserId = updateSessionDto.UserId;

        //    return sessionDb;

        //}
    }
}
