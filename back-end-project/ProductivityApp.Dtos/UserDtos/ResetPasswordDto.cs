using System.ComponentModel.DataAnnotations;

namespace ProductivityApp.Dtos.UserDtos
{
    public class ResetPasswordDto
    {
        //[Required] // to check if this really looks like email address
        public string Token { get; set; } = string.Empty;
        public string NewPassword { get; set; } = string.Empty;
        [Required, Compare("NewPassword")]

        public string ConfirmNewPassword { get; set; } = string.Empty;
    }
}

//clients job to create another form for sending the token , 
// the new password and the confirm password
