using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SalesTracker.Migrations
{
    /// <inheritdoc />
    public partial class AddStockAttributeInItemTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "stock",
                table: "item",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "stock",
                table: "item");
        }
    }
}
