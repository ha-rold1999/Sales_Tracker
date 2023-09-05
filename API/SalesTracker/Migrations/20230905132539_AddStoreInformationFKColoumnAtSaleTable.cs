using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SalesTracker.Migrations
{
    /// <inheritdoc />
    public partial class AddStoreInformationFKColoumnAtSaleTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "StoreInformationId",
                table: "sale",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_sale_StoreInformationId",
                table: "sale",
                column: "StoreInformationId");

            migrationBuilder.AddForeignKey(
                name: "FK_sale_store_information_StoreInformationId",
                table: "sale",
                column: "StoreInformationId",
                principalTable: "store_information",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_sale_store_information_StoreInformationId",
                table: "sale");

            migrationBuilder.DropIndex(
                name: "IX_sale_StoreInformationId",
                table: "sale");

            migrationBuilder.DropColumn(
                name: "StoreInformationId",
                table: "sale");
        }
    }
}
