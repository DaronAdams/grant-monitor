using GrantMonitor.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _context;

    public AuthController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost("register")]
    public async Task<ActionResult<User>> RegisterUser(UserDto request)
    {
        string passwordHash = BCrypt.Net.BCrypt.HashPassword(request.password);
        User user = new User
        {
            Email = request.email,
            HashedPassword = passwordHash
        };

        // Make sure email is in allowlist AND a memphis.edu
        // This means we'll need to add the allowlist to the database

        try
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return Ok(user);
        }
        catch (DbUpdateException)
        {
            return BadRequest("Email already exists");
        }

    }
}