namespace ProductivityApp.Shared.CustomSessionExceptions
{
    public  class SessionNotFoundException:Exception
    {


        public SessionNotFoundException(string message):base(message)
        {

        }
    }
}
