using System;
using System.Collections.Generic;

namespace order.Model
{
    public partial class VuBestallareStoreItem
    {
        public long Id { get; set; }
        public int? Storeid { get; set; }
        public long? Itemid { get; set; }
        public decimal Amount { get; set; }
        public int? Itemtypeid { get; set; }
        public string? Itemeditedname { get; set; }
        public decimal? Increasingrate { get; set; }
        public string Typename { get; set; } = null!;
        public bool? Selected { get; set; }
    }
}
