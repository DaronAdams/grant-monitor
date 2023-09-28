using Microsoft.EntityFrameworkCore;
using GrantMonitor.Models;

namespace GrantMonitor.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options) { }

        public DbSet<Grant> Grants { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<UserDto> UserDtos { get; set; }
    }

}