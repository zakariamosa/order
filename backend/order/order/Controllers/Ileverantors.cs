using Microsoft.AspNetCore.Mvc;
using order.Model;

namespace order.Controllers
{
    public interface IleverantorsController
    {
        Task<IActionResult> DeleteTblleverantor(int id);
        Task<ActionResult<Tblleverantor>> GetTblleverantor(int id);
        Task<ActionResult<IEnumerable<Tblleverantor>>> GetTblleverantors();
        Task<ActionResult<Tblleverantor>> PostTblleverantor(Tblleverantor tblleverantor);
        Task<IActionResult> PutTblleverantor(int id, Tblleverantor tblleverantor);
    }
}