using System.ComponentModel.DataAnnotations;

namespace ProductivityApp.Dtos.UserDtos
{
    public  class LoginUserDto
    {
        [Required,EmailAddress]
        public string Email { get; set; } = string.Empty;
       
        public string Password { get; set; } = string.Empty;
    }
}
