using System;
using System.Collections.Generic;

namespace order.Model
{
    public partial class Tblstore
    {
        public Tblstore()
        {
            Bestallareitems = new HashSet<Bestallareitem>();
        }

        public int Id { get; set; }
        public string? Storename { get; set; }
        public byte[]? Storeimage { get; set; }
        public int Bestallareid { get; set; }

        public virtual Tblbestallare Bestallare { get; set; } = null!;
        public virtual ICollection<Bestallareitem> Bestallareitems { get; set; }
    }
}
