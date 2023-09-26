using Microsoft.EntityFrameworkCore;
using GrantApi.Models;

namespace GrantApi.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<Grant> Grants { get; set; }
    }

}
