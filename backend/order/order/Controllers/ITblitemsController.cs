using Microsoft.AspNetCore.Mvc;
using order.Model;

namespace order.Controllers
{
    public interface ITblitemsController
    {
        Task<IActionResult> DeleteTblitem(long id);
        Task<ActionResult<Tblitem>> GetTblitem(long id);
        Task<ActionResult<List<VuLeverantorItem>>> GetLeverantorsItemList(int userid);
        Task<ActionResult<IEnumerable<Tblitem>>> GetTblitems();
        Task<ActionResult<Tblitem>> PostTblitem(Tblitem tblitem);
        Task<IActionResult> PutTblitem(long id, Tblitem tblitem);
        Task<IActionResult> AddProduct(string productName, int userid);
        Task<ActionResult<List<Tblitem>>> GetAllItemsRelatedToSpecificLeverantor(int leverantorid);
    }
}