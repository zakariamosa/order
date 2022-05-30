using Microsoft.AspNetCore.Mvc;
using order.Model;

namespace order.Controllers
{
    public interface ITblorderdetailsController
    {
        Task<IActionResult> DeleteTblorderdetail(long id);
        Task<ActionResult<Tblorderdetail>> GetTblorderdetail(long id);
        Task<ActionResult<IEnumerable<Tblorderdetail>>> GetTblorderdetails();
        Task<ActionResult<Tblorderdetail>> PostTblorderdetail(Tblorderdetail tblorderdetail);
        Task<IActionResult> PutTblorderdetail(long id, Tblorderdetail tblorderdetail);
    }
}