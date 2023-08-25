using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace SalesTracker.Migrations
{
    /// <inheritdoc />
    public partial class AddedBuyingPriceAndSellingPriceLogTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "date_update",
                table: "StockLog",
                type: "timestamp with time zone",
                nullable: false,
                oldClrType: typeof(DateOnly),
                oldType: "date");

            migrationBuilder.CreateTable(
                name: "buying_price_log",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    old_price = table.Column<decimal>(type: "numeric", nullable: false),
                    new_price = table.Column<decimal>(type: "numeric", nullable: false),
                    date_update = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    ItemIDId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_buying_price_log", x => x.Id);
                    table.ForeignKey(
                        name: "FK_buying_price_log_item_ItemIDId",
                        column: x => x.ItemIDId,
                        principalTable: "item",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "selling_price_log",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    old_price = table.Column<decimal>(type: "numeric", nullable: false),
                    new_price = table.Column<decimal>(type: "numeric", nullable: false),
                    date_update = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    ItemIDId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_selling_price_log", x => x.Id);
                    table.ForeignKey(
                        name: "FK_selling_price_log_item_ItemIDId",
                        column: x => x.ItemIDId,
                        principalTable: "item",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_buying_price_log_ItemIDId",
                table: "buying_price_log",
                column: "ItemIDId");

            migrationBuilder.CreateIndex(
                name: "IX_selling_price_log_ItemIDId",
                table: "selling_price_log",
                column: "ItemIDId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "buying_price_log");

            migrationBuilder.DropTable(
                name: "selling_price_log");

            migrationBuilder.AlterColumn<DateOnly>(
                name: "date_update",
                table: "StockLog",
                type: "date",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "timestamp with time zone");
        }
    }
}
