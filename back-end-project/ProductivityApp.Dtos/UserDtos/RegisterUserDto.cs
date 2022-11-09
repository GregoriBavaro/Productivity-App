using System.ComponentModel.DataAnnotations;

namespace ProductivityApp.Dtos.UserDtos
{
    public  class RegisterUserDto

    {
        public string Fullname { get; set; } = string.Empty;
        [Required,EmailAddress] // to check if this really looks like email address
        public string Email { get; set; } = string.Empty;
        public string Username { get; set; } = string.Empty;
        [Required,MinLength(6, ErrorMessage ="Please enter at least 6 characters.")]
        public string Password { get; set; } = string.Empty;
        [Required,Compare("Password")]

        public string ConfirmPassword { get; set; } = string.Empty;
        




    }
}
