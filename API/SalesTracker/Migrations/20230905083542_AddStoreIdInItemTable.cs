using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SalesTracker.Migrations
{
    /// <inheritdoc />
    public partial class AddStoreIdInItemTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "StoreInformationId",
                table: "item",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_item_StoreInformationId",
                table: "item",
                column: "StoreInformationId");

            migrationBuilder.AddForeignKey(
                name: "FK_item_store_information_StoreInformationId",
                table: "item",
                column: "StoreInformationId",
                principalTable: "store_information",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_item_store_information_StoreInformationId",
                table: "item");

            migrationBuilder.DropIndex(
                name: "IX_item_StoreInformationId",
                table: "item");

            migrationBuilder.DropColumn(
                name: "StoreInformationId",
                table: "item");
        }
    }
}
