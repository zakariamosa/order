using System;
using System.Collections.Generic;

namespace order.Model
{
    public partial class VuLeverantorItem
    {
        public int Userid { get; set; }
        public string? Itemname { get; set; }
        public byte[]? Itemimage { get; set; }
        public long Id { get; set; }
    }
}
