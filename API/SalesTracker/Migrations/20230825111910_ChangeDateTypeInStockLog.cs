using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SalesTracker.Migrations
{
    /// <inheritdoc />
    public partial class ChangeDateTypeInStockLog : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_StockLog_item_ItemIDId",
                table: "StockLog");

            migrationBuilder.DropPrimaryKey(
                name: "PK_StockLog",
                table: "StockLog");

            migrationBuilder.RenameTable(
                name: "StockLog",
                newName: "stock_log");

            migrationBuilder.RenameIndex(
                name: "IX_StockLog_ItemIDId",
                table: "stock_log",
                newName: "IX_stock_log_ItemIDId");

            migrationBuilder.AlterColumn<DateOnly>(
                name: "date_update",
                table: "stock_log",
                type: "date",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "timestamp with time zone");

            migrationBuilder.AddPrimaryKey(
                name: "PK_stock_log",
                table: "stock_log",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_stock_log_item_ItemIDId",
                table: "stock_log",
                column: "ItemIDId",
                principalTable: "item",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_stock_log_item_ItemIDId",
                table: "stock_log");

            migrationBuilder.DropPrimaryKey(
                name: "PK_stock_log",
                table: "stock_log");

            migrationBuilder.RenameTable(
                name: "stock_log",
                newName: "StockLog");

            migrationBuilder.RenameIndex(
                name: "IX_stock_log_ItemIDId",
                table: "StockLog",
                newName: "IX_StockLog_ItemIDId");

            migrationBuilder.AlterColumn<DateTime>(
                name: "date_update",
                table: "StockLog",
                type: "timestamp with time zone",
                nullable: false,
                oldClrType: typeof(DateOnly),
                oldType: "date");

            migrationBuilder.AddPrimaryKey(
                name: "PK_StockLog",
                table: "StockLog",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_StockLog_item_ItemIDId",
                table: "StockLog",
                column: "ItemIDId",
                principalTable: "item",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
