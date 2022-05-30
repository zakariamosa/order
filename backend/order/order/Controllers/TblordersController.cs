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
    public class TblordersController : ControllerBase, ITblordersController
    {
        private readonly orderContext _context;

        public TblordersController(orderContext context)
        {
            _context = context;
        }

        // GET: api/Tblorders
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Tblorder>>> GetTblorders()
        {
            if (_context.Tblorders == null)
            {
                return NotFound();
            }
            return await _context.Tblorders.ToListAsync();
        }

        // GET: api/Tblorders/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Tblorder>> GetTblorder(long id)
        {
            if (_context.Tblorders == null)
            {
                return NotFound();
            }
            var tblorder = await _context.Tblorders.FindAsync(id);

            if (tblorder == null)
            {
                return NotFound();
            }

            return tblorder;
        }

        // PUT: api/Tblorders/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTblorder(long id, Tblorder tblorder)
        {
            if (id != tblorder.Id)
            {
                return BadRequest();
            }

            _context.Entry(tblorder).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TblorderExists(id))
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

        // POST: api/Tblorders
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Tblorder>> PostTblorder(Tblorder tblorder)
        {
            if (_context.Tblorders == null)
            {
                return Problem("Entity set 'orderContext.Tblorders'  is null.");
            }
            _context.Tblorders.Add(tblorder);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTblorder", new { id = tblorder.Id }, tblorder);
        }

        // DELETE: api/Tblorders/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTblorder(long id)
        {
            if (_context.Tblorders == null)
            {
                return NotFound();
            }
            var tblorder = await _context.Tblorders.FindAsync(id);
            if (tblorder == null)
            {
                return NotFound();
            }

            _context.Tblorders.Remove(tblorder);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TblorderExists(long id)
        {
            return (_context.Tblorders?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
