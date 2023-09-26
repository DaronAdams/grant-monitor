using GrantApi.Models;

namespace GrantApi.Repositories
{
    public interface IGrantRepository
    {
        IEnumerable<Grant> GetAll();
        Grant GetById(int id);
        Grant Insert(Grant grant);
        Grant Update(int id, Grant grant);
        void Delete(int id);

        void SaveChanges();
    }
}