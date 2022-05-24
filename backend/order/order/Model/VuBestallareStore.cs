using System;
using System.Collections.Generic;

namespace order.Model
{
    public partial class VuBestallareStore
    {
        public int Id { get; set; }
        public string? Storename { get; set; }
        public byte[]? Storeimage { get; set; }
        public int? Bestallareid { get; set; }
        public int Userid { get; set; }
    }
}
