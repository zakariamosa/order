using System;
using System.Collections.Generic;

namespace order.Model
{
    public partial class Tblitemtype
    {
        public Tblitemtype()
        {
            Bestallareitems = new HashSet<Bestallareitem>();
        }

        public int Id { get; set; }
        public string Typename { get; set; } = null!;

        public virtual ICollection<Bestallareitem> Bestallareitems { get; set; }
    }
}
