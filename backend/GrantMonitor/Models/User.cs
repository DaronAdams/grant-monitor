public class User : BaseEntity
{
    public string Email { get; set; } = "";
    public string HashedPassword { get; set; } = "";
}