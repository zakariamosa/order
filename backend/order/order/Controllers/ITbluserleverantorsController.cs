using Microsoft.AspNetCore.Mvc;
using order.Model;

namespace order.Controllers
{
    public interface ITbluserleverantorsController
    {
        Task<IActionResult> DeleteTbluserleverantor(int id);
        Task<ActionResult<Tbluserleverantor>> GetTbluserleverantor(int id);
        Task<ActionResult<Tbluserleverantor>> LoginLeverantor(string email, string password);
        Task<ActionResult<IEnumerable<Tbluserleverantor>>> GetTbluserleverantors();
        Task<ActionResult<Tbluserleverantor>> PostTbluserleverantor(Tbluserleverantor tbluserleverantor);
        Task<IActionResult> PutTbluserleverantor(int id, Tbluserleverantor tbluserleverantor);
    }
}