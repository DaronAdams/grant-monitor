using Microsoft.EntityFrameworkCore;
using GrantApi.Models;

namespace GrantApi.Data
{
    public class AppDbContext : DbContext
    {
        protected readonly IConfiguration Configuration;

        public AppDbContext(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            // connect to postgres with connection string from app settings
            options.UseNpgsql(Configuration.GetConnectionString("DefaultConnection"));
        }

        public DbSet<Grant> Grants { get; set; }
        public DbSet<User> Users { get; set; }
    }
}