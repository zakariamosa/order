using System;
using System.Collections.Generic;

namespace order.Model
{
    public partial class Tblbestallare
    {
        public Tblbestallare()
        {
            Tblorders = new HashSet<Tblorder>();
            Tblstores = new HashSet<Tblstore>();
            Userbestallares = new HashSet<Tbluserbestallare>();
        }

        public int Id { get; set; }
        public string? Bestallarename { get; set; }
        public string? Bestallaretelefon { get; set; }
        public string? Bestallareaddress { get; set; }

        public virtual ICollection<Tblorder> Tblorders { get; set; }
        public virtual ICollection<Tblstore> Tblstores { get; set; }

        public virtual ICollection<Tbluserbestallare> Userbestallares { get; set; }
    }
}
