
using Microsoft.EntityFrameworkCore;

namespace order.Entities
{
    public class ApplicationContext : DbContext
    {
       



        private string _connectionString = @"server=DESKTOP-31D93O8\SQLEXPRESS; database=order;uid=sa;pwd=123;integrated Security=false";
        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            options.UseSqlServer(_connectionString);
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            
            
        }
    }
}
