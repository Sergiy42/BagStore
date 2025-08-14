using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.EntityFrameworkCore;

namespace BagStore.Backend.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Product> Products { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<OrderItem>()
                .Property(oi => oi.Price)
                .HasPrecision(10, 2);

            modelBuilder.Entity<Product>()
                .Property(p => p.Price)
                .HasPrecision(10, 2);

            modelBuilder.Entity<Order>()
                .Property(o => o.TotalAmount)
                .HasPrecision(10, 2);

            modelBuilder.Entity<Order>()

                .HasMany(o => o.Items)
                .WithOne()
                .HasForeignKey(i => i.OrderId)
                .OnDelete(DeleteBehavior.Cascade);
            

            foreach (var entity in modelBuilder.Model.GetEntityTypes())
            {
                foreach (var property in entity.GetProperties())
                {
                    if (property.ClrType == typeof(string))
                    {
                        property.SetColumnType("nvarchar(MAX) COLLATE Cyrillic_General_CI_AS");
                    }
                }
            }

            modelBuilder.Entity<Product>()
                .HasIndex(p => p.Material);

            modelBuilder.Entity<Product>()
                .HasIndex(p => p.Size);

            modelBuilder.Entity<Order>()
                .HasIndex(o => o.Status);

           
          

            modelBuilder.Entity<Product>().HasData(
        new Product
        {
            Id = 1,
            Name = "Элегантная сумка из натуральной кожи",
            Material = "natural",
            Size = "large",
            Price = 3200,
            ImageUrl = "/images/bag1.jpg",
            Description = "Просторная сумка из высококачественной натуральной кожи. Идеальный выбор для деловых встреч и повседневного использования."
        },
        new Product
        {
            Id = 2,
            Name = "Компактная сумка из искусственной кожи",
            Material = "artificial",
            Size = "small",
            Price = 3400,
            ImageUrl = "/images/bag2.jpg",
            Description = "Стильная маленькая сумка из экологичной искусственной кожи. Легкая и удобная для ежедневного ношения."
        },
        new Product
        {
            Id = 3,
            Name = "Деловая сумка премиум класса",
            Material = "natural",
            Size = "large",
            Price = 3600,
            ImageUrl = "/images/bag3.jpg",
            Description = "Премиум сумка из натуральной кожи."
        },
        new Product
        {
            Id = 4,
            Name = "Миниатюрная вечерняя сумка",
            Material = "artificial",
            Size = "small",
            Price = 3800,
            ImageUrl = "/images/bag4.jpg",
            Description = "Элегантная вечерняя сумка для особых случаев. Вмещает все необходимое для вечеринки или свидания."
        }
    );
        }
    }
}