namespace ProductivityApp.Shared.ServerExceptions
{
   public  class InternalServerException:Exception
    {

        public InternalServerException():base("An error occurred, contact the admin!")
        {

        }
    }
}
