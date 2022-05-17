using System;
using System.Collections.Generic;

namespace order.Model
{
    public partial class Tblorderdetail
    {
        public long Id { get; set; }
        public long Orderid { get; set; }
        public long Itemid { get; set; }
        public decimal Amount { get; set; }

        public virtual Tblitem Item { get; set; } = null!;
        public virtual Tblorder Order { get; set; } = null!;
    }
}
