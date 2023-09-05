using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SalesTracker.Migrations
{
    /// <inheritdoc />
    public partial class AddDeleteColumnInItemTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "is_delete",
                table: "item",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "is_delete",
                table: "item");
        }
    }
}
