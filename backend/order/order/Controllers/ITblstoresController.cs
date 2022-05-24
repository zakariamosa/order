using Microsoft.AspNetCore.Mvc;
using order.Model;

namespace order.Controllers
{
    public interface ITblstoresController
    {
        Task<IActionResult> DeleteTblstore(int id);
        Task<ActionResult<Tblstore>> GetTblstore(int id);
        Task<ActionResult<IEnumerable<Tblstore>>> GetTblstores();
        Task<ActionResult<Tblstore>> PostTblstore(Tblstore tblstore, int userid);
        Task<IActionResult> PutTblstore(int id, Tblstore tblstore);
        Task<ActionResult<List<VuBestallareStore>>> GetBestallareStores(int userid);
    }
}