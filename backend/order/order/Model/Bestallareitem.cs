using System;
using System.Collections.Generic;

namespace order.Model
{
    public partial class Bestallareitem
    {
        public long Id { get; set; }
        public int Storeid { get; set; }
        public long? Itemid { get; set; }
        public decimal Amount { get; set; }
        public int? Itemtypeid { get; set; }
        public string? Itemeditedname { get; set; }

        public virtual Tblitem? Item { get; set; }
        public virtual Tblitemtype? Itemtype { get; set; }
        public virtual Tblstore Store { get; set; } = null!;
    }
}
