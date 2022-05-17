using System;
using System.Collections.Generic;

namespace order.Model
{
    public partial class Tbluserleverantor
    {
        public Tbluserleverantor()
        {
            Leverantors = new HashSet<Tblleverantor>();
        }

        public int Id { get; set; }
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;
        public bool Blocked { get; set; }

        public virtual ICollection<Tblleverantor> Leverantors { get; set; }
    }
}
