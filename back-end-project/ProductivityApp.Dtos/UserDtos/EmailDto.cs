using System.ComponentModel.DataAnnotations;

namespace ProductivityApp.Dtos.UserDtos
{
    public class EmailObj
    {
        [Display(Name ="ProductivityApp")]   
        public string ProductivityApp { get; set; } = string.Empty;
        public string To { get; set; } =  string.Empty;

        public string Subject { get; set; } = string.Empty;
        public string Body { get; set; } = string.Empty;
    }
}
