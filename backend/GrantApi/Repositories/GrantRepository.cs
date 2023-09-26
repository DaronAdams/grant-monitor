using GrantApi.Data;
using GrantApi.Models;

namespace GrantApi.Repositories
{

    public class GrantRepository : IGrantRepository
    {
        private readonly AppDbContext _context;

        public GrantRepository(AppDbContext context)
        {
            _context = context;
        }

        public IEnumerable<Grant> GetAll()
        {
            return _context.Grants.ToList();
        }

        public Grant GetById(int id)
        {
            return _context.Grants.Find(id);
        }

        public Grant Insert(Grant grant)
        {
            _context.Grants.Add(grant);
            _context.SaveChanges();
            return grant;
        }

        public Grant Update(int id, Grant grant)
        {
            var grantToUpdate = _context.Grants.FirstOrDefault(p => p.Id == id);
            if (grantToUpdate != null)
            {
                grantToUpdate.Title = grant.Title;
                grantToUpdate.Amount = grant.Amount;
                _context.SaveChanges();
            }
            return grantToUpdate;
        }

        public void Delete(int id)
        {
            var grantToDelete = _context.Grants.FirstOrDefault(p => p.Id == id);
            if (grantToDelete != null)
            {
                _context.Grants.Remove(grantToDelete);
                _context.SaveChanges();
            }
        }

        public void SaveChanges()
        {
            _context.SaveChanges();
        }
    }
}