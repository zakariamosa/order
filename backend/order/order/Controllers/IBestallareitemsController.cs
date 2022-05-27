using Microsoft.AspNetCore.Mvc;
using order.Model;

namespace order.Controllers
{
    public interface IBestallareitemsController
    {
        Task<IActionResult> DeleteBestallareitem(long id);
        Task<ActionResult<Bestallareitem>> GetBestallareitem(long id);
        Task<ActionResult<IEnumerable<Bestallareitem>>> GetBestallareitems();
        Task<ActionResult<Bestallareitem>> PostBestallareitem(Bestallareitem bestallareitem);
        Task<IActionResult> PutBestallareitem(long id, Bestallareitem bestallareitem);
        Task<ActionResult<List<Bestallareitem>>> GetBestallareStoreItems(int storeid);
    }
}