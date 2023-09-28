using GrantMonitor.Models;
using GrantMonitor.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Route("api/[controller]")]
[ApiController]
public class GrantController : ControllerBase
{
    private readonly AppDbContext _context;

    public GrantController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Grant>>> GetGrants()
    {
        return await _context.Grants.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Grant>> GetGrant(Guid id)
    {
        var grant = await _context.Grants.FindAsync(id);

        if (grant == null)
        {
            return NotFound();
        }

        return grant;
    }

    [HttpPost]
    public async Task<ActionResult<Grant>> PostGrant(Grant grant)
    {
        _context.Grants.Add(grant);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetGrant), new { id = grant.Id }, grant);
    }
}