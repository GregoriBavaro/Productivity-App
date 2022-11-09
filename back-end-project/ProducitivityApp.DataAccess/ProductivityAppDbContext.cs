using Microsoft.EntityFrameworkCore;
using ProductivityApp.Domain.Entities;
using Task = ProductivityApp.Domain.Entities.Task;

namespace ProducitivityApp.DataAccess
{
    public class ProductivityAppDbContext : DbContext
    {
        public ProductivityAppDbContext(DbContextOptions<ProductivityAppDbContext> options) : base(options) { }

        public DbSet<User> Users => Set<User>();
        public DbSet<Session> Sessions => Set<Session>();
        public DbSet<Task> Tasks => Set<Task>();
        public DbSet<Reminder> Reminders => Set<Reminder>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            //Session
            modelBuilder.Entity<Session>()
                .Property(x => x.StartTime)
                .IsRequired();

            modelBuilder.Entity<Session>()
                .Property(x => x.FinishTime)
                .IsRequired();

            modelBuilder.Entity<Session>()
                .Property(x => x.SessionLength)
                .IsRequired();

            //Session -> User Relation 
            modelBuilder.Entity<Session>()
                .HasOne(x => x.User)
                .WithMany(x => x.Sessions)
                .HasForeignKey(x => x.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            //User
            modelBuilder.Entity<User>()
                .Property(f => f.Fullname)
                .HasMaxLength(50)
                .IsRequired();

            modelBuilder.Entity<User>()
                .Property(u => u.Username)
                .IsRequired();
            //modelBuilder.Entity<User>()
            //    .Property(u => u.Email)
            //    .IsRequired();
            modelBuilder.Entity<User>()
                .Property(u => u.PhoneNumber)
                .HasMaxLength(30);
                

            //modelBuilder.Entity<User>()
            //    .Property(x => x.Password)
            //    .IsRequired();

            //modelBuilder.Entity<User>()
            //    .Property(x => x.ConfirmPassword)
            //    .IsRequired();

            //Task
            modelBuilder.Entity<Task>()
                .Property(t => t.Title)
                .HasMaxLength(50)
                .IsRequired();

            modelBuilder.Entity<Task>()
                .Property(t => t.AssignedTimeDuration)
                .IsRequired();

            modelBuilder.Entity<Task>()
                .Property(t => t.Note)
                .HasMaxLength(250);


            modelBuilder.Entity<Task>()
                .Property(t => t.Priority)
                .IsRequired();

            modelBuilder.Entity<Task>()
                .Property(t => t.Pace)
                .IsRequired();

            //Task -> Session Relation 
            modelBuilder.Entity<Task>()
                .HasOne(s => s.Session)
                .WithMany(t => t.Tasks)
                .HasForeignKey(s => s.SessionId)
                .OnDelete(DeleteBehavior.Cascade);

            //Reminder
            modelBuilder.Entity<Reminder>()
                .Property(f => f.ReminderTitle)
                .HasMaxLength(50)
                .IsRequired();

            modelBuilder.Entity<Reminder>()
                .Property(f => f.ReminderNote);

            modelBuilder.Entity<Reminder>()
                .Property(l => l.ReminderTime)
                .IsRequired();

            modelBuilder.Entity<Reminder>()
                .Property(l => l.ReminderDate)
                .IsRequired();

            modelBuilder.Entity<Reminder>()
                .Property(u => u.Priority)
                .HasMaxLength(30)
                .IsRequired();

            //Reminder -> User Relation
            modelBuilder.Entity<Reminder>()
                .HasOne(x => x.User)
                .WithMany(x => x.Reminders)
                .HasForeignKey(x => x.UserId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
