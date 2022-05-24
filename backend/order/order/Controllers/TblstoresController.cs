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
    public class TblstoresController : ControllerBase, ITblstoresController
    {
        private readonly orderContext _context;

        public TblstoresController(orderContext context)
        {
            _context = context;
        }

        // GET: api/Tblstores
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Tblstore>>> GetTblstores()
        {
            if (_context.Tblstores == null)
            {
                return NotFound();
            }
            return await _context.Tblstores.ToListAsync();
        }

        // GET: api/Tblstores/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Tblstore>> GetTblstore(int id)
        {
            if (_context.Tblstores == null)
            {
                return NotFound();
            }
            var tblstore = await _context.Tblstores.FindAsync(id);

            if (tblstore == null)
            {
                return NotFound();
            }

            return tblstore;
        }

        // PUT: api/Tblstores/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTblstore(int id, Tblstore tblstore)
        {
            if (id != tblstore.Id)
            {
                return BadRequest();
            }

            _context.Entry(tblstore).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TblstoreExists(id))
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

        // POST: api/Tblstores
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Tblstore>> PostTblstore(Tblstore tblstore, int userid)
        {
            if (_context.Tblstores == null)
            {
                return Problem("Entity set 'orderContext.Tblstores'  is null.");
            }
            var listofuserbestallare=_context.Tbluserbestallares.Include(s => s.Bestallares).Single(u => u.Id == userid);
            tblstore.Bestallareid = listofuserbestallare.Bestallares.FirstOrDefault().Id;
            _context.Tblstores.Add(tblstore);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTblstore", new { id = tblstore.Id }, tblstore);
        }

        // DELETE: api/Tblstores/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTblstore(int id)
        {
            if (_context.Tblstores == null)
            {
                return NotFound();
            }
            var tblstore = await _context.Tblstores.FindAsync(id);
            if (tblstore == null)
            {
                return NotFound();
            }

            _context.Tblstores.Remove(tblstore);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TblstoreExists(int id)
        {
            return (_context.Tblstores?.Any(e => e.Id == id)).GetValueOrDefault();
        }

        [HttpGet("GetBestallareStores/{userid}")]
        public async Task<ActionResult<List<VuBestallareStore>>> GetBestallareStores(int userid)
        {
            if (_context.VuBestallareStores == null)
            {
                return NotFound();
            }
            var tblstores = await _context.VuBestallareStores.Where(bs => bs.Userid == userid).ToListAsync();

            if (tblstores == null)
            {
                return NotFound();
            }

            return tblstores;
        }
    }
}
