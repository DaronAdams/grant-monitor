using GrantApi.Data;
using Microsoft.AspNetCore.Mvc;
namespace GrantApi.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        // Database context
        private readonly AppDbContext _dbContext;

        // Static instance of the user model
        public static User user = new User();

        // Constructor to pass the database context to the controller
        public AuthController(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpPost("register")]
        public ActionResult<User> Register(UserDto request)
        {
            user.Id = (int)GenerateId.GenerateNewId();
            user.Username = request.Username;
            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password);

            // This is where we actually save the user to the database
            if (ModelState.IsValid)
            {
                _dbContext.Users.Add(user);
                _dbContext.SaveChanges();
            }

            return Ok(user);
        }

        [HttpPost("login")]
        public ActionResult<User> Login(UserDto request)
        {
            if (_dbContext.Find<User>(request.Username) == null)
            {
                return NotFound();
            }
            else
            {
                user = _dbContext.Find<User>(request.Username);
                if (BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
                {
                    return Ok(user);
                }
                else
                {
                    return Unauthorized();
                }
            }
        }
    }
}