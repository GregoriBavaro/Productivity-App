namespace ProductivityApp.Shared.CustomUserExceptions
{
    public  class UserNotFoundException:Exception
    {

        public UserNotFoundException(string message):base(message)
        {

        }
    }
}
