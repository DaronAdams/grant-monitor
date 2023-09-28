namespace GrantMonitor.Utils
{
    public class VerifyEmail
    {
        public static bool IsMemphisEmail(string email)
        {
            return email.EndsWith("@memphis.edu");
        }
    }
}