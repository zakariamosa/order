#nullable disable
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
    public class leverantorsController : ControllerBase, IleverantorsController
    {
        private readonly orderContext _context;

        public leverantorsController(orderContext context)
        {
            _context = context;
        }

        // GET: api/leverantors
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Tblleverantor>>> GetTblleverantors()
        {
            return await _context.Tblleverantors.ToListAsync();
        }

        // GET: api/leverantors/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Tblleverantor>> GetTblleverantor(int id)
        {
            var tblleverantor = await _context.Tblleverantors.FindAsync(id);

            if (tblleverantor == null)
            {
                return NotFound();
            }

            return tblleverantor;
        }

        // PUT: api/leverantors/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTblleverantor(int id, Tblleverantor tblleverantor)
        {
            if (id != tblleverantor.Id)
            {
                return BadRequest();
            }

            _context.Entry(tblleverantor).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TblleverantorExists(id))
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

        // POST: api/leverantors
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Tblleverantor>> PostTblleverantor(Tblleverantor tblleverantor)
        {
            _context.Tblleverantors.Add(tblleverantor);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTblleverantor", new { id = tblleverantor.Id }, tblleverantor);
        }

        // DELETE: api/leverantors/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTblleverantor(int id)
        {
            var tblleverantor = await _context.Tblleverantors.FindAsync(id);
            if (tblleverantor == null)
            {
                return NotFound();
            }

            _context.Tblleverantors.Remove(tblleverantor);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TblleverantorExists(int id)
        {
            return _context.Tblleverantors.Any(e => e.Id == id);
        }
    }
}
