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
    public class BestallareitemsController : ControllerBase, IBestallareitemsController
    {
        private readonly orderContext _context;

        public BestallareitemsController(orderContext context)
        {
            _context = context;
        }

        // GET: api/Bestallareitems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Bestallareitem>>> GetBestallareitems()
        {
            if (_context.Bestallareitems == null)
            {
                return NotFound();
            }
            return await _context.Bestallareitems.ToListAsync();
        }

        // GET: api/Bestallareitems/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Bestallareitem>> GetBestallareitem(long id)
        {
            if (_context.Bestallareitems == null)
            {
                return NotFound();
            }
            var bestallareitem = await _context.Bestallareitems.FindAsync(id);

            if (bestallareitem == null)
            {
                return NotFound();
            }

            return bestallareitem;
        }

        // PUT: api/Bestallareitems/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBestallareitem(long id, Bestallareitem bestallareitem)
        {
            if (id != bestallareitem.Id)
            {
                return BadRequest();
            }

            _context.Entry(bestallareitem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BestallareitemExists(id))
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

        // POST: api/Bestallareitems
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Bestallareitem>> PostBestallareitem(Bestallareitem bestallareitem)
        {
            if (_context.Bestallareitems == null)
            {
                return Problem("Entity set 'orderContext.Bestallareitems'  is null.");
            }
            _context.Bestallareitems.Add(bestallareitem);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBestallareitem", new { id = bestallareitem.Id }, bestallareitem);
        }

        // DELETE: api/Bestallareitems/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBestallareitem(long id)
        {
            if (_context.Bestallareitems == null)
            {
                return NotFound();
            }
            var bestallareitem = await _context.Bestallareitems.FindAsync(id);
            if (bestallareitem == null)
            {
                return NotFound();
            }

            _context.Bestallareitems.Remove(bestallareitem);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BestallareitemExists(long id)
        {
            return (_context.Bestallareitems?.Any(e => e.Id == id)).GetValueOrDefault();
        }
        [HttpGet("GetBestallareStoreItems/{storeid}")]
        public async Task<ActionResult<List<Bestallareitem>>> GetBestallareStoreItems(int storeid)
        {
            if (_context.Bestallareitems == null)
            {
                return NotFound();
            }
            var tblstoreItems = await _context.Bestallareitems.Where(bi=>bi.Storeid==storeid).ToListAsync();

            if (tblstoreItems == null)
            {
                return NotFound();
            }

            return tblstoreItems;
        }
    }
}
