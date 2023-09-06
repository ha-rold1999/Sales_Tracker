using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Models.Model.Items;
using Models.Model.Sale;
using Models.Model.Sale.Reports;
using Models.Model.Sale.Sales;
using SalesTracker.Configuration.Items;
using SalesTracker.Configuration.Sales;
using SalesTracker.Controllers;
using SalesTracker.Controllers.Interfaces;
using SalesTracker.DatabaseHelpers;
using SalesTracker.DatabaseHelpers.Account;
using SalesTracker.DatabaseHelpers.DailyReport;
using SalesTracker.DatabaseHelpers.DateReport;
using SalesTracker.DatabaseHelpers.Interfaces;
using SalesTracker.EntityFramework;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
//Set CORS
builder.Services.AddCors(o=> o.AddDefaultPolicy(builder=> builder.AllowAnyHeader().AllowAnyOrigin().AllowAnyMethod()));
//Set Connection to the Database
builder.Services.AddDbContext<DatabaseContext>(o => o.UseNpgsql(builder.Configuration.GetConnectionString("DatabaseConnection")));
//Caching
builder.Services.AddMemoryCache();
//Set Auto mapper
builder.Services.AddAutoMapper(typeof(Program));
//Dependency Injection
builder.Services.AddScoped<ILogHelper, LogHelper>();
builder.Services.AddScoped<IItemHelper, ItemHelper>();
builder.Services.AddScoped<ISaleHelper, SaleHelper>();
builder.Services.AddScoped<ISaleDateHelper, SaleDateHelper>();
builder.Services.AddScoped<ISaleReportHelper, SaleReportHelper>();
builder.Services.AddScoped<IExpenseHelper,  ExpenseHelper>();
builder.Services.AddScoped<IExpenseDateHelper, ExpenseDateHelper>();
builder.Services.AddScoped<IExpenseReportHelper,  ExpenseReportHelper>();
builder.Services.AddScoped(typeof(AccountHelper));
builder.Services.AddScoped(typeof(TokenHelper));
//controller dependency injection
builder.Services.AddScoped<IItemController, ItemController>();
builder.Services.AddScoped<ISaleController, SaleController>();
builder.Services.AddScoped<IExpenseController, ExpenseController>();
//Configuration Binding
builder.Services.Configure<SalesConfiguration>(builder.Configuration.GetSection("ApiFeatures:SalesConfiguration"));
builder.Services.Configure<ItemsConfiguration>(builder.Configuration.GetSection("ApiFeatures:ItemConfiguration"));
//Authentication
builder.Services.AddAuthentication(o =>
{
    o.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    o.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    o.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
})
    .AddJwtBearer(o =>
    {
        o.SaveToken = true;
        o.RequireHttpsMetadata = false;
        o.TokenValidationParameters = new TokenValidationParameters()
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidAudience = builder.Configuration["JWT:ValidAudience"],
            ValidIssuer = builder.Configuration["JWT:ValidIssuer"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWT:Secret"]))
        };
    });

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
//if (app.Environment.IsDevelopment())
//{
app.UseSwagger();
    app.UseSwaggerUI();
//}

app.UseHttpsRedirection();

app.UseCors();

app.UseAuthentication();
app.UseAuthorization();

app.UseCors();

app.MapControllers();

app.Run();
