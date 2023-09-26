using GrantApi.Models;
using GrantApi.Data;
using Microsoft.AspNetCore.Mvc;


namespace GrantApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GrantController : ControllerBase
    {
        private readonly AppDbContext _dbContext;

        public GrantController(AppDbContext dbContext)
        {
            _dbContext = dbContext;
            Console.WriteLine("AppDbContext injected into GrantController.");
        }




        [HttpGet]
        public ActionResult<IEnumerable<Grant>> GetGrants()
        {
            return Ok(_dbContext.Grants.ToList());
        }

        [HttpGet("{id}")]
        public ActionResult<Grant> GetGrantById(int id)
        {
            var grant = _dbContext.Grants.Find(id);
            if (grant == null)
            {
                return NotFound();
            }
            return Ok(grant);
        }

        [HttpPost]
        public ActionResult<Grant> CreateGrant([FromBody] Grant grant)
        {
            _dbContext.Grants.Add(grant);
            _dbContext.SaveChanges();
            return CreatedAtAction(nameof(GetGrantById), new { id = grant.Id }, grant);
        }

        [HttpPut("{id}")]
        public ActionResult<Grant> UpdateGrant(int id, [FromBody] Grant grant)
        {
            if (id != grant.Id)
            {
                return BadRequest();
            }
            _dbContext.Entry(grant).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            try
            {
                _dbContext.SaveChanges();
            }
            catch (Exception)
            {
                if (_dbContext.Grants.Find(id) == null)
                {
                    return NotFound();
                }
                throw;
            }
            return BadRequest();
        }

        [HttpDelete("{id}")]
        public ActionResult DeleteGrant(int id)
        {
            var grant = _dbContext.Grants.Find(id);
            if (grant == null)
            {
                return NotFound();
            }
            _dbContext.Grants.Remove(grant);
            _dbContext.SaveChanges();
            return NoContent();
        }
    }
}