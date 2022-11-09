using ProductivityApp.Domain.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProductivityApp.Domain.Entities
{
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Email { get; set; } = string.Empty;
        //doesn't have any connection with the jwt token , 
        //when a user register, we will create a verification token,
        //is a series of random characters, user has to call certain end point,
        // where we will use this token to search in the database, if we found him
        //is verified
        public string? VerificationToken { get; set; }
        //store the date when the user called this action, we would now that the user done this,
        //and we would now is verified
        public DateTime? VerifiedAt { get; set; }
        //password reset token is essentialy the same thing as up

        public string? PasswordResetToken { get; set; }
        //maybe this should available for one day , security reasons
        public DateTime? ResetTokenExpires { get; set; }
        public string Fullname { get; set; } = string.Empty;
        public string Username { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string? PhoneNumber { get; set; }

        public byte[] PasswordHash { get; set; } = new byte[] { };

        public byte[] PasswordSalt { get; set; } = new byte[] { };

        public RoleEnum Role { get; set; } = RoleEnum.User;

        public List<Session> Sessions { get; set; } = new List<Session>() { };

        public List<Reminder> Reminders { get; set; } = new List<Reminder>() { };




    }
}
