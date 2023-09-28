namespace GrantMonitor.Models
{
    public class Grant : BaseEntity
    {
        public string Title { get; set; }
        public int Amount { get; set; }
    }
}
