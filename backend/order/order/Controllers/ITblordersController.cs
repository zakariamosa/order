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
        Task<ActionResult<IEnumerable<VuOrdersRelatedToLeverantor>>> GetTblordersRelatedToBuyer(int userleverantorid);
        Task<ActionResult<IEnumerable<VuOrderDetailsRelatedToLeverantor>>> GetOrderDetailsRelatedToLeverantor(int userleverantorid, Int64 orderid);
    }
}