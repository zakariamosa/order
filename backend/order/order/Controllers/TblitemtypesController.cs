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
    public class TblitemtypesController : ControllerBase, ITblitemtypesController
    {
        private readonly orderContext _context;

        public TblitemtypesController(orderContext context)
        {
            _context = context;
        }

        // GET: api/Tblitemtypes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Tblitemtype>>> GetTblitemtypes()
        {
            if (_context.Tblitemtypes == null)
            {
                return NotFound();
            }
            return await _context.Tblitemtypes.ToListAsync();
        }

        // GET: api/Tblitemtypes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Tblitemtype>> GetTblitemtype(int id)
        {
            if (_context.Tblitemtypes == null)
            {
                return NotFound();
            }
            var tblitemtype = await _context.Tblitemtypes.FindAsync(id);

            if (tblitemtype == null)
            {
                return NotFound();
            }

            return tblitemtype;
        }

        // PUT: api/Tblitemtypes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTblitemtype(int id, Tblitemtype tblitemtype)
        {
            if (id != tblitemtype.Id)
            {
                return BadRequest();
            }

            _context.Entry(tblitemtype).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TblitemtypeExists(id))
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

        // POST: api/Tblitemtypes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Tblitemtype>> PostTblitemtype(Tblitemtype tblitemtype)
        {
            if (_context.Tblitemtypes == null)
            {
                return Problem("Entity set 'orderContext.Tblitemtypes'  is null.");
            }
            _context.Tblitemtypes.Add(tblitemtype);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTblitemtype", new { id = tblitemtype.Id }, tblitemtype);
        }

        // DELETE: api/Tblitemtypes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTblitemtype(int id)
        {
            if (_context.Tblitemtypes == null)
            {
                return NotFound();
            }
            var tblitemtype = await _context.Tblitemtypes.FindAsync(id);
            if (tblitemtype == null)
            {
                return NotFound();
            }

            _context.Tblitemtypes.Remove(tblitemtype);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TblitemtypeExists(int id)
        {
            return (_context.Tblitemtypes?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
