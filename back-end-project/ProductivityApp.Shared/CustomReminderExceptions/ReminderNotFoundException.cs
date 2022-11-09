namespace ProductivityApp.Shared.CustomReminderExceptions
{
    public class ReminderNotFoundException:Exception
    {
        public ReminderNotFoundException(string message) : base(message) { }
    }
}
