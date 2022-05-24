using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using order.Model;

namespace order.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TbluserbestallaresController : ControllerBase, ITbluserbestallaresController
    {
        private readonly orderContext _context;

        public TbluserbestallaresController(orderContext context)
        {
            _context = context;
        }

        // GET: api/Tbluserbestallares
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Tbluserbestallare>>> GetTbluserbestallares()
        {
            if (_context.Tbluserbestallares == null)
            {
                return NotFound();
            }
            return await _context.Tbluserbestallares.ToListAsync();
        }

        // Get: api/login user levernator
        [HttpGet("LoginBuyer")]
        public async Task<ActionResult<Tbluserbestallare>> LoginBuyer(string email, string password)
        {
            var tbluserbuyer = await _context.Tbluserbestallares.Where(u => u.Email == email && u.Password == password).FirstOrDefaultAsync();


            if (tbluserbuyer == null)
            {
                return NotFound();
            }

            return Ok(tbluserbuyer);
        }

        // GET: api/Tbluserbestallares/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Tbluserbestallare>> GetTbluserbestallare(int id)
        {
            if (_context.Tbluserbestallares == null)
            {
                return NotFound();
            }
            var tbluserbestallare = await _context.Tbluserbestallares.FindAsync(id);

            if (tbluserbestallare == null)
            {
                return NotFound();
            }

            return tbluserbestallare;
        }

        // PUT: api/Tbluserbestallares/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTbluserbestallare(int id, Tbluserbestallare tbluserbestallare)
        {
            if (id != tbluserbestallare.Id)
            {
                return BadRequest();
            }

            _context.Entry(tbluserbestallare).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TbluserbestallareExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Tbluserbestallares
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Tbluserbestallare>> PostTbluserbestallare(Tbluserbestallare tbluserbestallare)
        {
            if (_context.Tbluserbestallares == null)
            {
                return Problem("Entity set 'orderContext.Tbluserbestallares'  is null.");
            }
            _context.Tbluserbestallares.Add(tbluserbestallare);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTbluserbestallare", new { id = tbluserbestallare.Id }, tbluserbestallare);
        }

        // DELETE: api/Tbluserbestallares/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTbluserbestallare(int id)
        {
            if (_context.Tbluserbestallares == null)
            {
                return NotFound();
            }
            var tbluserbestallare = await _context.Tbluserbestallares.FindAsync(id);
            if (tbluserbestallare == null)
            {
                return NotFound();
            }

            _context.Tbluserbestallares.Remove(tbluserbestallare);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TbluserbestallareExists(int id)
        {
            return (_context.Tbluserbestallares?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
