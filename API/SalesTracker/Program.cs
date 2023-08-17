using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models.Model.Items;
using Models.Model.Sale;
using Models.Model.Sale.Reports;
using Models.Model.Sale.Sales;
using SalesTracker.Configuration.Items;
using SalesTracker.Configuration.Sales;
using SalesTracker.Controllers;
using SalesTracker.DatabaseHelpers;
using SalesTracker.DatabaseHelpers.DailyReport;
using SalesTracker.DatabaseHelpers.DateReport;
using SalesTracker.EntityFramework;
using Serilog;
using Serilog.Formatting.Json;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
//Set CORS
builder.Services.AddCors(o=> o.AddDefaultPolicy(builder=>builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod()));
//Set Connection to the Database
builder.Services.AddDbContext<DatabaseContext>(o => o.UseNpgsql(builder.Configuration.GetConnectionString("DatabaseConnection")));
//Set Auto mapper
builder.Services.AddAutoMapper(typeof(Program));
//Dependency Injection
builder.Services.AddScoped<IDBHelper<ItemDTO, Item>, ItemHelper>();
builder.Services.AddScoped<IDBHelper<SalesDTO, Sales>, SaleHelper>();
builder.Services.AddScoped<IDateHelper<SaleDTO>, SaleDateHelper>();
builder.Services.AddScoped<ISaleReportHelper<SaleReportDTO, Sale, SaleReport, SalesDTO>, SaleReportHelper>();
builder.Services.AddScoped<IController<Item>, ItemController>();
builder.Services.AddScoped<ISaleController<Sales>, SaleController>();

//Configuration Binding
builder.Services.Configure<SalesConfiguration>(builder.Configuration.GetSection("ApiFeatures:SalesConfiguration"));
builder.Services.Configure<ItemsConfiguration>(builder.Configuration.GetSection("ApiFeatures:ItemConfiguration"));

//Versioning
builder.Services.AddApiVersioning(config =>
{
    config.DefaultApiVersion = new ApiVersion(1, 0);
    config.AssumeDefaultVersionWhenUnspecified = true;
    config.ReportApiVersions = true;
});

//var logger = new LoggerConfiguration()
//    .ReadFrom.Configuration(builder.Configuration)
//    .WriteTo.File(new JsonFormatter(), @"C:\Users\Full Scale\Desktop\Personal Proj\Sales Tracker\log\log.json")
//    .WriteTo.Seq("http://localhost:5341")
//    .CreateLogger();

//builder.Logging.ClearProviders();
//builder.Logging.AddSerilog(logger);

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

app.UseCors();

app.MapControllers();

app.Run();
