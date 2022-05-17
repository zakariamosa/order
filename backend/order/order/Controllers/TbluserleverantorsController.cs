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
    public class TbluserleverantorsController : ControllerBase, ITbluserleverantorsController
    {
        private readonly orderContext _context;

        public TbluserleverantorsController(orderContext context)
        {
            _context = context;
        }

        // GET: api/Tbluserleverantors
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Tbluserleverantor>>> GetTbluserleverantors()
        {
            return await _context.Tbluserleverantors.ToListAsync();
        }

        // Get: api/login user levernator
        [HttpGet("LoginLeverantor")]
        public async Task<ActionResult<Tbluserleverantor>> LoginLeverantor(string email, string password)
        {
            var tbluserleverantor = await _context.Tbluserleverantors.Where(u => u.Email == email && u.Password == password).FirstOrDefaultAsync();
            

            if (tbluserleverantor == null)
            {
                return NotFound();
            }

            return Ok(tbluserleverantor);
        }

        // GET: api/Tbluserleverantors/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Tbluserleverantor>> GetTbluserleverantor(int id)
        {
            var tbluserleverantor = await _context.Tbluserleverantors.FindAsync(id);

            if (tbluserleverantor == null)
            {
                return NotFound();
            }

            return tbluserleverantor;
        }

        // PUT: api/Tbluserleverantors/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTbluserleverantor(int id, Tbluserleverantor tbluserleverantor)
        {
            if (id != tbluserleverantor.Id)
            {
                return BadRequest();
            }

            _context.Entry(tbluserleverantor).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TbluserleverantorExists(id))
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

        // POST: api/Tbluserleverantors
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Tbluserleverantor>> PostTbluserleverantor(Tbluserleverantor tbluserleverantor)
        {
            _context.Tbluserleverantors.Add(tbluserleverantor);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTbluserleverantor", new { id = tbluserleverantor.Id }, tbluserleverantor);
        }

        // DELETE: api/Tbluserleverantors/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTbluserleverantor(int id)
        {
            var tbluserleverantor = await _context.Tbluserleverantors.FindAsync(id);
            if (tbluserleverantor == null)
            {
                return NotFound();
            }

            _context.Tbluserleverantors.Remove(tbluserleverantor);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TbluserleverantorExists(int id)
        {
            return _context.Tbluserleverantors.Any(e => e.Id == id);
        }
    }
}
