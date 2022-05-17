using System;
using System.Collections.Generic;

namespace order.Model
{
    public partial class Tblitem
    {
        public Tblitem()
        {
            Bestallareitems = new HashSet<Bestallareitem>();
            Tblorderdetails = new HashSet<Tblorderdetail>();
        }

        public long Id { get; set; }
        public string? Itemname { get; set; }
        public byte[]? Itemimage { get; set; }
        public int Leverantorid { get; set; }

        public virtual Tblleverantor Leverantor { get; set; } = null!;
        public virtual ICollection<Bestallareitem> Bestallareitems { get; set; }
        public virtual ICollection<Tblorderdetail> Tblorderdetails { get; set; }
    }
}
