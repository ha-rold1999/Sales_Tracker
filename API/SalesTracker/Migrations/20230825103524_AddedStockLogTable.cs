using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace SalesTracker.Migrations
{
    /// <inheritdoc />
    public partial class AddedStockLogTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "StockLog",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    old_stock = table.Column<int>(type: "integer", nullable: false),
                    new_stock = table.Column<int>(type: "integer", nullable: false),
                    date_update = table.Column<DateOnly>(type: "date", nullable: false),
                    ItemIDId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StockLog", x => x.Id);
                    table.ForeignKey(
                        name: "FK_StockLog_item_ItemIDId",
                        column: x => x.ItemIDId,
                        principalTable: "item",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_StockLog_ItemIDId",
                table: "StockLog",
                column: "ItemIDId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "StockLog");
        }
    }
}
