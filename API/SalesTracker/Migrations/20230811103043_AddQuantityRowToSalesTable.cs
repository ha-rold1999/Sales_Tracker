using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SalesTracker.Migrations
{
    /// <inheritdoc />
    public partial class AddQuantityRowToSalesTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "quantity",
                table: "sales",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "quantity",
                table: "sales");
        }
    }
}
