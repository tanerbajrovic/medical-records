using MediInsigthHubAPI.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Npgsql.NameTranslation;

namespace MediInsigthHubAPI.Data
{
    public class AppDbContext : IdentityDbContext<User>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public AppDbContext()
        {
            // Constructor logic
        }

        // Seed Roles

        public DbSet<TokenValidity> TokenValidities { get; set; }
        public virtual DbSet<MedicalRecord> MedicalRecords { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<User>(entity => { entity.ToTable(name: "usrUsers"); });
            builder.Entity<IdentityRole>(entity => { entity.ToTable(name: "usrRoles"); });
            builder.Entity<IdentityUserRole<string>>(entity => { entity.ToTable("usrUserRoles"); });
            builder.Entity<IdentityUserLogin<string>>(entity => { entity.ToTable("usrUserLogins"); });
            builder.Entity<IdentityUserToken<string>>(entity => { entity.ToTable("usrUserTokens"); });
            builder.Entity<TokenValidity>(entity => { entity.ToTable("usrTokenValidities"); });
            builder.Entity<MedicalRecord>(entity => { entity.ToTable("mdMedicalRecords"); });

            Seed(builder);
        }
        public static void Seed(ModelBuilder builder)
        {

            // Seed Roles

            List<IdentityRole> roles = new List<IdentityRole>()
            {
                new IdentityRole() { Name = "Entry", ConcurrencyStamp = "1", NormalizedName = "ENTRY" },
                new IdentityRole() { Name = "Viewer", ConcurrencyStamp = "2", NormalizedName = "VIEWER" },
            };

            builder.Entity<IdentityRole>().HasData(roles);

            // Seed Users

            List<User> users = new List<User>()
            {
                new User() { FirstName = "Kenan", LastName = "Fejzic", UserName = "kfejzic", NormalizedUserName = "KFEJZIC", ConcurrencyStamp = "1", Email = "kfejzic1@etf.unsa.ba", NormalizedEmail = "KFEJZIC1@ETF.UNSA.BA", EmailConfirmed = true, PasswordHash = "AQAAAAIAAYagAAAAENao66CqvIXroh/6aTaoJ/uThFfjLemBtjLfuiJpP/NoWXkhJO/G8wspnWhjLJx9WQ==", PhoneNumber = "061112223", PhoneNumberConfirmed = true, Address = "Tamo negdje 1", TwoFactorEnabled = false, LockoutEnabled = false },
                new User() { FirstName = "Admin", LastName = "User", UserName = "adminUser", NormalizedUserName = "ADMINUSER", ConcurrencyStamp = "1", Email = "admin@gmail.com", NormalizedEmail = "ADMIN@GMAIL.COM", EmailConfirmed = true, PasswordHash = "AQAAAAIAAYagAAAAENao66CqvIXroh/6aTaoJ/uThFfjLemBtjLfuiJpP/NoWXkhJO/G8wspnWhjLJx9WQ==", PhoneNumber = "063445556", PhoneNumberConfirmed = true, Address = "Tamo negdje 1", TwoFactorEnabled = false, LockoutEnabled = false },
            };


            builder.Entity<User>().HasData(users);


            // Seed UserRoles
            List<IdentityUserRole<string>> userRoles = new List<IdentityUserRole<string>>();

            foreach (var user in users)
            {
                if (user.UserName != "kfejzic")
                    userRoles.Add(new IdentityUserRole<string>
                    {
                        UserId = user.Id,
                        RoleId = roles.First(q => q.Name == "Entry").Id
                    });
                else
                    userRoles.Add(new IdentityUserRole<string>
                    {
                        UserId = user.Id,
                        RoleId = roles.First(q => q.Name == "Viewer").Id
                    });
            }


            builder.Entity<IdentityUserRole<string>>().HasData(userRoles);
        }
    }
}
