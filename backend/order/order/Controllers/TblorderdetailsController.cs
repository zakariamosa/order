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
    public class TblorderdetailsController : ControllerBase, ITblorderdetailsController
    {
        private readonly orderContext _context;

        public TblorderdetailsController(orderContext context)
        {
            _context = context;
        }

        // GET: api/Tblorderdetails
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Tblorderdetail>>> GetTblorderdetails()
        {
            if (_context.Tblorderdetails == null)
            {
                return NotFound();
            }
            return await _context.Tblorderdetails.ToListAsync();
        }

        // GET: api/Tblorderdetails/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Tblorderdetail>> GetTblorderdetail(long id)
        {
            if (_context.Tblorderdetails == null)
            {
                return NotFound();
            }
            var tblorderdetail = await _context.Tblorderdetails.FindAsync(id);

            if (tblorderdetail == null)
            {
                return NotFound();
            }

            return tblorderdetail;
        }

        // PUT: api/Tblorderdetails/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTblorderdetail(long id, Tblorderdetail tblorderdetail)
        {
            if (id != tblorderdetail.Id)
            {
                return BadRequest();
            }

            _context.Entry(tblorderdetail).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TblorderdetailExists(id))
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

        // POST: api/Tblorderdetails
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Tblorderdetail>> PostTblorderdetail(Tblorderdetail tblorderdetail)
        {
            if (_context.Tblorderdetails == null)
            {
                return Problem("Entity set 'orderContext.Tblorderdetails'  is null.");
            }
            _context.Tblorderdetails.Add(tblorderdetail);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTblorderdetail", new { id = tblorderdetail.Id }, tblorderdetail);
        }

        // DELETE: api/Tblorderdetails/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTblorderdetail(long id)
        {
            if (_context.Tblorderdetails == null)
            {
                return NotFound();
            }
            var tblorderdetail = await _context.Tblorderdetails.FindAsync(id);
            if (tblorderdetail == null)
            {
                return NotFound();
            }

            _context.Tblorderdetails.Remove(tblorderdetail);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TblorderdetailExists(long id)
        {
            return (_context.Tblorderdetails?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
