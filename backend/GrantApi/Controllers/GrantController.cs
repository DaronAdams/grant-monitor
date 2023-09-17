using System;
using System.Collections.Generic;
using GrantApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace GrantApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GrantController : ControllerBase
    {
        private static List<Grant> grants = new List<Grant>
        {
            new Grant { Id = 1, Title = "Grant 1", Amount = 100.00 },
            new Grant { Id = 2, Title = "Grant 2", Amount = 200.00 },
            new Grant { Id = 3, Title = "Grant 3", Amount = 300.00 },
            new Grant { Id = 4, Title = "Grant 4", Amount = 400.00 },
            new Grant { Id = 5, Title = "Grant 5", Amount = 500.00 },
        };

        [HttpGet]
        public ActionResult<IEnumerable<Grant>> Get()
        {
            return Ok(grants);
        }

        [HttpGet("{id}")]
        public ActionResult<Grant> Get(int id)
        {
            var grant = grants.Find(grant => grant.Id == id);
            if (grant == null)
            {
                return NotFound();
            }
            return Ok(grant);
        }

        [HttpPost]
        public ActionResult<Grant> Post([FromBody] Grant grant)
        {
            grant.Id = grants.Count + 1;
            grants.Add(grant);
            return CreatedAtAction(nameof(Get), new { id = grant.Id }, grant);
        }

        [HttpPut("{id}")]
        public ActionResult<Grant> Put(int id, [FromBody] Grant grant)
        {
            var grantToUpdate = grants.Find(grant => grant.Id == id);
            if (grantToUpdate == null)
            {
                return NotFound();
            }
            grantToUpdate.Title = grant.Title;
            grantToUpdate.Amount = grant.Amount;
            return Ok(grantToUpdate);
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            var grantToDelete = grants.Find(grant => grant.Id == id);
            if (grantToDelete == null)
            {
                return NotFound();
            }
            grants.Remove(grantToDelete);
            return Ok();
        }
    }
}