using Microsoft.AspNetCore.Mvc;
using order.Model;

namespace order.Controllers
{
    public interface ITblitemtypesController
    {
        Task<IActionResult> DeleteTblitemtype(int id);
        Task<ActionResult<Tblitemtype>> GetTblitemtype(int id);
        Task<ActionResult<IEnumerable<Tblitemtype>>> GetTblitemtypes();
        Task<ActionResult<Tblitemtype>> PostTblitemtype(Tblitemtype tblitemtype);
        Task<IActionResult> PutTblitemtype(int id, Tblitemtype tblitemtype);
    }
}