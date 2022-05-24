using Microsoft.AspNetCore.Mvc;
using order.Model;

namespace order.Controllers
{
    public interface ITbluserbestallaresController
    {
        Task<IActionResult> DeleteTbluserbestallare(int id);
        Task<ActionResult<Tbluserbestallare>> GetTbluserbestallare(int id);
        Task<ActionResult<IEnumerable<Tbluserbestallare>>> GetTbluserbestallares();
        Task<ActionResult<Tbluserbestallare>> PostTbluserbestallare(Tbluserbestallare tbluserbestallare);
        Task<IActionResult> PutTbluserbestallare(int id, Tbluserbestallare tbluserbestallare);
        Task<ActionResult<Tbluserbestallare>> LoginBuyer(string email, string password);
    }
}