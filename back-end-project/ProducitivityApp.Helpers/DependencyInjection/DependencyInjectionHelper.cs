using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using ProducitivityApp.DataAccess;
using ProducitivityApp.DataAccess.Implementations;
using ProducitivityApp.DataAccess.Interfaces;
using ProductivityApp.Services.Implementations;
using ProductivityApp.Services.Interfaces;

namespace ProducitivityApp.Helpers.DependencyInjection
{
    public static class DependencyInjectionHelper
    {


        public static void InjectDbContext(IServiceCollection services, string connectionSting)
        {
            services.AddDbContext<ProductivityAppDbContext>(x =>
            x.UseSqlServer(connectionSting));
        }

        public static void InjectRepositories(IServiceCollection services)
        {
            services.AddTransient<ISessionRepository, SessionRepository>();
            services.AddTransient<IUserRepository, UserRepository>();
            services.AddTransient<ITaskRepository, TaskRepository>();
            services.AddTransient<IReminderRepository, ReminderRepository>();
        }

        public static void InjectServices(IServiceCollection services)
        {
            services.AddTransient<ISessionService, SessionService>();
            services.AddTransient<IUserService, UserService>();
            services.AddTransient<IReminderService, ReminderService>();
        }
    }
}
