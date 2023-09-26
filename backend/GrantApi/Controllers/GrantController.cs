using GrantApi.Models;
using GrantApi.Repositories;
using Microsoft.AspNetCore.Mvc;



namespace GrantApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GrantController : ControllerBase
    {
        private readonly IGrantRepository _grantRepository;

        public GrantController(IGrantRepository grantRepository)
        {
            _grantRepository = grantRepository;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Grant>> GetGrants()
        {
            return Ok(_grantRepository.GetAll());
        }

        [HttpGet("{id}")]
        public ActionResult<Grant> GetGrantById(int id)
        {
            var grant = _grantRepository.GetById(id);
            if (grant == null)
            {
                return NotFound();
            }
            return Ok(grant);
        }

        [HttpPost]
        public ActionResult<Grant> CreateGrant([FromBody] Grant grant)
        {
            _grantRepository.Insert(grant);
            _grantRepository.SaveChanges();
            return CreatedAtAction(nameof(GetGrantById), new { id = grant.Id }, grant);
        }

        [HttpPut("{id}")]
        public ActionResult<Grant> UpdateGrant(int id, [FromBody] Grant grant)
        {
            if (id != grant.Id)
            {
                return BadRequest();
            }
            _grantRepository.Update(id, grant);
            try
            {
                _grantRepository.SaveChanges();
            }
            catch (Exception)
            {
                if (_grantRepository.GetById(id) == null)
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
            var grant = _grantRepository.GetById(id);
            if (grant == null)
            {
                return NotFound();
            }
            _grantRepository.Delete(id);
            _grantRepository.SaveChanges();
            return NoContent();
        }
    }
}