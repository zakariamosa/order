using System;
using System.Collections.Generic;

namespace order.Model
{
    public partial class VuOrderDetailsRelatedToLeverantor
    {
        public string? Bestallarename { get; set; }
        public string? Bestallareaddress { get; set; }
        public string? Bestallaretelefon { get; set; }
        public string Email { get; set; } = null!;
        public DateTime Orderdate { get; set; }
        public bool Isready { get; set; }
        public bool Closed { get; set; }
        public long Orderid { get; set; }
        public int Leverantoruserid { get; set; }
        public string? Itemname { get; set; }
        public decimal Amount { get; set; }
        public string Typename { get; set; } = null!;
    }
}
