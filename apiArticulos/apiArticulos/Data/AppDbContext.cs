using Microsoft.EntityFrameworkCore;
using autor.Models;
using articulo.Models;
public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<Articulo> Articulo { get; set; }
    public DbSet<Autor> Autor { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
    }
}
