using Microsoft.AspNetCore.Mvc;
using order.Model;

namespace order.Controllers
{
    public interface ITblordersController
    {
        Task<IActionResult> DeleteTblorder(long id);
        Task<ActionResult<Tblorder>> GetTblorder(long id);
        Task<ActionResult<IEnumerable<Tblorder>>> GetTblorders();
        Task<ActionResult<Tblorder>> PostTblorder(Tblorder tblorder);
        Task<IActionResult> PutTblorder(long id, Tblorder tblorder);
    }
}