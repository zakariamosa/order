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
    public class TblitemsController : ControllerBase, ITblitemsController
    {
        private readonly orderContext _context;

        public TblitemsController(orderContext context)
        {
            _context = context;
        }

        // GET: api/Tblitems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Tblitem>>> GetTblitems()
        {
            if (_context.Tblitems == null)
            {
                return NotFound();
            }
            return await _context.Tblitems.ToListAsync();
        }

        // GET: api/Tblitems/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Tblitem>> GetTblitem(long id)
        {
            if (_context.Tblitems == null)
            {
                return NotFound();
            }
            var tblitem = await _context.Tblitems.FindAsync(id);

            if (tblitem == null)
            {
                return NotFound();
            }

            return tblitem;
        }

        // PUT: api/Tblitems/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTblitem(long id, Tblitem tblitem)
        {
            if (id != tblitem.Id)
            {
                return BadRequest();
            }

            _context.Entry(tblitem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TblitemExists(id))
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

        // POST: api/Tblitems
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Tblitem>> PostTblitem(Tblitem tblitem)
        {
            if (_context.Tblitems == null)
            {
                return Problem("Entity set 'orderContext.Tblitems'  is null.");
            }
            _context.Tblitems.Add(tblitem);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTblitem", new { id = tblitem.Id }, tblitem);
        }
        
        //add product
        [HttpPost("AddProduct")]
        public async Task<IActionResult> AddProduct(string productName, int userid)
        {
            if (_context.Tblitems == null)
            {
                return Problem("Entity set 'orderContext.Tblitems'  is null.");
            }
            var paramList = new[] {
    new Microsoft.Data.SqlClient.SqlParameter("@itemname", productName),
    new Microsoft.Data.SqlClient.SqlParameter("@userId", userid)
};

            
            int n = _context.Database.ExecuteSqlRaw("EXEC proInsertNewItem @itemname, @userId", paramList);
            //_context.Database.ExecuteSqlInterpolatedAsync($"EXECUTE  dbo.proInsertNewItem @itemname={productName}, @userId={userid}");

            return NoContent();
        }

        // DELETE: api/Tblitems/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTblitem(long id)
        {
            if (_context.Tblitems == null)
            {
                return NotFound();
            }
            var tblitem = await _context.Tblitems.FindAsync(id);
            if (tblitem == null)
            {
                return NotFound();
            }

            _context.Tblitems.Remove(tblitem);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TblitemExists(long id)
        {
            return (_context.Tblitems?.Any(e => e.Id == id)).GetValueOrDefault();
        }

        [HttpGet("GetLeverantorsItemList/{userid}")]
        public async Task<ActionResult<List<VuLeverantorItem>>> GetLeverantorsItemList(int userid)
        {
            if (_context.VuLeverantorItems == null)
            {
                return NotFound();
            }
            var tblitem = await _context.VuLeverantorItems.Where(LI=>LI.Userid==userid).ToListAsync();

            if (tblitem == null)
            {
                return NotFound();
            }

            return tblitem;
        }
        //GetAllItemsRelatedToSpecificLeverantor
        [HttpGet("GetAllItemsRelatedToSpecificLeverantor/{leverantorid}")]
        public async Task<ActionResult<List<Tblitem>>> GetAllItemsRelatedToSpecificLeverantor(int leverantorid)
        {
            if (_context.Tblitems == null)
            {
                return NotFound();
            }
            var tblItemsRelatedToLeverantor = await _context.Tblitems.Where(i=>i.Leverantorid== leverantorid).ToListAsync();

            if (tblItemsRelatedToLeverantor == null)
            {
                return NotFound();
            }

            return tblItemsRelatedToLeverantor;
        }
    }
}
