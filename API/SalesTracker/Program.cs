using Microsoft.EntityFrameworkCore;
using Models.Model.Items;
using SalesTracker.Controllers;
using SalesTracker.DatabaseHelpers;
using SalesTracker.DatabaseHelpers.DailyReport;
using SalesTracker.DatabaseHelpers.DateReport;
using SalesTracker.EntityFramework;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
//Set Connection to the Database
builder.Services.AddDbContext<DatabaseContext>(o => o.UseNpgsql(builder.Configuration.GetConnectionString("DatabaseConnection")));
//Set Auto mapper
builder.Services.AddAutoMapper(typeof(Program));
//Dependency Injection
builder.Services.AddScoped<ItemHelper>();

builder.Services.AddScoped<SaleHelper>();
builder.Services.AddScoped<SaleDateHelper>();
builder.Services.AddScoped<SaleReportHelper>();

builder.Services.AddScoped<ItemController>();
builder.Services.AddScoped<SaleController>();


var app = builder.Build();

//using (var migrate = app.Services.CreateScope())
//{
//    var dbMigrate = migrate.ServiceProvider.GetRequiredService<DatabaseContext>();
//    dbMigrate.Database.Migrate();
//}


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
