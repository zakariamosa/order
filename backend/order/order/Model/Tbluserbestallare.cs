using System;
using System.Collections.Generic;

namespace order.Model
{
    public partial class Tbluserbestallare
    {
        public Tbluserbestallare()
        {
            Tblorders = new HashSet<Tblorder>();
            Bestallares = new HashSet<Tblbestallare>();
        }

        public int Id { get; set; }
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;
        public bool Blocked { get; set; }

        public virtual ICollection<Tblorder> Tblorders { get; set; }

        public virtual ICollection<Tblbestallare> Bestallares { get; set; }
    }
}
