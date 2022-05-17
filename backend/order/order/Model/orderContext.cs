using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace order.Model
{
    public partial class orderContext : DbContext
    {
        public orderContext()
        {
        }

        public orderContext(DbContextOptions<orderContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Bestallareitem> Bestallareitems { get; set; } = null!;
        public virtual DbSet<Tblbestallare> Tblbestallares { get; set; } = null!;
        public virtual DbSet<Tblitem> Tblitems { get; set; } = null!;
        public virtual DbSet<Tblitemtype> Tblitemtypes { get; set; } = null!;
        public virtual DbSet<Tblleverantor> Tblleverantors { get; set; } = null!;
        public virtual DbSet<Tblorder> Tblorders { get; set; } = null!;
        public virtual DbSet<Tblorderdetail> Tblorderdetails { get; set; } = null!;
        public virtual DbSet<Tblstore> Tblstores { get; set; } = null!;
        public virtual DbSet<Tbluserbestallare> Tbluserbestallares { get; set; } = null!;
        public virtual DbSet<Tbluserleverantor> Tbluserleverantors { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Data Source=192.168.0.206\\SQLEXPRESS,49172;Initial Catalog=order;User Id=sa;Password=123;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Bestallareitem>(entity =>
            {
                entity.ToTable("bestallareitems");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Amount).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.Itemid).HasColumnName("itemid");

                entity.Property(e => e.Itemtypeid).HasColumnName("itemtypeid");

                entity.Property(e => e.Storeid).HasColumnName("storeid");

                entity.HasOne(d => d.Item)
                    .WithMany(p => p.Bestallareitems)
                    .HasForeignKey(d => d.Itemid)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_bestallareitems_tblitem");

                entity.HasOne(d => d.Itemtype)
                    .WithMany(p => p.Bestallareitems)
                    .HasForeignKey(d => d.Itemtypeid)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_bestallareitems_tblitemtype");

                entity.HasOne(d => d.Store)
                    .WithMany(p => p.Bestallareitems)
                    .HasForeignKey(d => d.Storeid)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_bestallareitems_tblstore");
            });

            modelBuilder.Entity<Tblbestallare>(entity =>
            {
                entity.ToTable("tblbestallare");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Bestallareaddress)
                    .HasMaxLength(50)
                    .HasColumnName("bestallareaddress");

                entity.Property(e => e.Bestallarename)
                    .HasMaxLength(50)
                    .HasColumnName("bestallarename");

                entity.Property(e => e.Bestallaretelefon)
                    .HasMaxLength(50)
                    .HasColumnName("bestallaretelefon");

                entity.HasMany(d => d.Userbestallares)
                    .WithMany(p => p.Bestallares)
                    .UsingEntity<Dictionary<string, object>>(
                        "Tblbestallareuser",
                        l => l.HasOne<Tbluserbestallare>().WithMany().HasForeignKey("Userbestallareid").OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("FK_tblbestallareusers_tbluserbestallare"),
                        r => r.HasOne<Tblbestallare>().WithMany().HasForeignKey("Bestallareid").OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("FK_tblbestallareusers_tblbestallare"),
                        j =>
                        {
                            j.HasKey("Bestallareid", "Userbestallareid");

                            j.ToTable("tblbestallareusers");

                            j.IndexerProperty<int>("Bestallareid").HasColumnName("bestallareid");

                            j.IndexerProperty<int>("Userbestallareid").HasColumnName("userbestallareid");
                        });
            });

            modelBuilder.Entity<Tblitem>(entity =>
            {
                entity.ToTable("tblitem");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Itemimage)
                    .HasMaxLength(500)
                    .HasColumnName("itemimage")
                    .IsFixedLength();

                entity.Property(e => e.Itemname)
                    .HasMaxLength(300)
                    .HasColumnName("itemname");

                entity.Property(e => e.Leverantorid).HasColumnName("leverantorid");

                entity.HasOne(d => d.Leverantor)
                    .WithMany(p => p.Tblitems)
                    .HasForeignKey(d => d.Leverantorid)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_tblitem_tblleverantor");
            });

            modelBuilder.Entity<Tblitemtype>(entity =>
            {
                entity.ToTable("tblitemtype");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Typename)
                    .HasMaxLength(50)
                    .HasColumnName("typename");
            });

            modelBuilder.Entity<Tblleverantor>(entity =>
            {
                entity.ToTable("tblleverantor");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Leverantoremail)
                    .HasMaxLength(50)
                    .HasColumnName("leverantoremail");

                entity.Property(e => e.Leverantorname)
                    .HasMaxLength(50)
                    .HasColumnName("leverantorname");

                entity.Property(e => e.Leverantortelefon)
                    .HasMaxLength(50)
                    .HasColumnName("leverantortelefon");

                entity.HasMany(d => d.Leverantorusers)
                    .WithMany(p => p.Leverantors)
                    .UsingEntity<Dictionary<string, object>>(
                        "Tblleverantoruser",
                        l => l.HasOne<Tbluserleverantor>().WithMany().HasForeignKey("Leverantoruserid").OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("FK_tblleverantorusers_tbluserleverantor"),
                        r => r.HasOne<Tblleverantor>().WithMany().HasForeignKey("Leverantorid").OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("FK_tblleverantorusers_tblleverantor"),
                        j =>
                        {
                            j.HasKey("Leverantorid", "Leverantoruserid");

                            j.ToTable("tblleverantorusers");

                            j.IndexerProperty<int>("Leverantorid").HasColumnName("leverantorid");

                            j.IndexerProperty<int>("Leverantoruserid").HasColumnName("leverantoruserid");
                        });
            });

            modelBuilder.Entity<Tblorder>(entity =>
            {
                entity.ToTable("tblorder");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Bestallareid).HasColumnName("bestallareid");

                entity.Property(e => e.Bestallareuserid).HasColumnName("bestallareuserid");

                entity.Property(e => e.Closed).HasColumnName("closed");

                entity.Property(e => e.Isready).HasColumnName("isready");

                entity.Property(e => e.Orderdate)
                    .HasColumnType("datetime")
                    .HasColumnName("orderdate")
                    .HasDefaultValueSql("(getdate())");

                entity.HasOne(d => d.Bestallare)
                    .WithMany(p => p.Tblorders)
                    .HasForeignKey(d => d.Bestallareid)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_tblorder_tblbestallare");

                entity.HasOne(d => d.Bestallareuser)
                    .WithMany(p => p.Tblorders)
                    .HasForeignKey(d => d.Bestallareuserid)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_tblorder_tbluserbestallare");
            });

            modelBuilder.Entity<Tblorderdetail>(entity =>
            {
                entity.ToTable("tblorderdetails");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Amount)
                    .HasColumnType("decimal(18, 2)")
                    .HasColumnName("amount");

                entity.Property(e => e.Itemid).HasColumnName("itemid");

                entity.Property(e => e.Orderid).HasColumnName("orderid");

                entity.HasOne(d => d.Item)
                    .WithMany(p => p.Tblorderdetails)
                    .HasForeignKey(d => d.Itemid)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_tblorderdetails_tblitem");

                entity.HasOne(d => d.Order)
                    .WithMany(p => p.Tblorderdetails)
                    .HasForeignKey(d => d.Orderid)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_tblorderdetails_tblorder");
            });

            modelBuilder.Entity<Tblstore>(entity =>
            {
                entity.ToTable("tblstore");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Bestallareid).HasColumnName("bestallareid");

                entity.Property(e => e.Storeimage)
                    .HasMaxLength(500)
                    .HasColumnName("storeimage")
                    .IsFixedLength();

                entity.Property(e => e.Storename)
                    .HasMaxLength(50)
                    .HasColumnName("storename");

                entity.HasOne(d => d.Bestallare)
                    .WithMany(p => p.Tblstores)
                    .HasForeignKey(d => d.Bestallareid)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_tblstore_tblbestallare");
            });

            modelBuilder.Entity<Tbluserbestallare>(entity =>
            {
                entity.ToTable("tbluserbestallare");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Blocked).HasColumnName("blocked");

                entity.Property(e => e.Email)
                    .HasMaxLength(50)
                    .HasColumnName("email");

                entity.Property(e => e.Password)
                    .HasMaxLength(50)
                    .HasColumnName("password");
            });

            modelBuilder.Entity<Tbluserleverantor>(entity =>
            {
                entity.ToTable("tbluserleverantor");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Blocked).HasColumnName("blocked");

                entity.Property(e => e.Email)
                    .HasMaxLength(50)
                    .HasColumnName("email");

                entity.Property(e => e.Password)
                    .HasMaxLength(50)
                    .HasColumnName("password");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
