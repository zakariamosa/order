using System;
using System.Collections.Generic;

namespace order.Model
{
    public partial class Tblleverantor
    {
        public Tblleverantor()
        {
            Tblitems = new HashSet<Tblitem>();
            Leverantorusers = new HashSet<Tbluserleverantor>();
        }

        public int Id { get; set; }
        public string? Leverantorname { get; set; }
        public string? Leverantoremail { get; set; }
        public string? Leverantortelefon { get; set; }

        public virtual ICollection<Tblitem> Tblitems { get; set; }

        public virtual ICollection<Tbluserleverantor> Leverantorusers { get; set; }
    }
}
