using System;
using System.Collections.Generic;

namespace order.Model
{
    public partial class Tblorder
    {
        public Tblorder()
        {
            Tblorderdetails = new HashSet<Tblorderdetail>();
        }

        public long Id { get; set; }
        public int? Bestallareid { get; set; }
        public int? Bestallareuserid { get; set; }
        public DateTime Orderdate { get; set; }
        public bool Isready { get; set; }
        public bool Closed { get; set; }

        public virtual Tblbestallare? Bestallare { get; set; }
        public virtual Tbluserbestallare? Bestallareuser { get; set; }
        public virtual ICollection<Tblorderdetail> Tblorderdetails { get; set; }
    }
}
